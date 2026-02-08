import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { put } from "@vercel/blob";
import * as fs from "fs";
import * as path from "path";
import * as schema from "./schema";

// Import existing data
import { murals as muralData } from "../app/data/murals";
import { clients as clientData } from "../app/data/clients";
import {
  exhibitions as exhibitionData,
  festivals as festivalData,
  publications as publicationData,
} from "../app/data/experience";
import { videos as videoData } from "../app/data/videos";
import { siteConfig, credentials, services } from "../app/data/siteConfig";

const sql = neon(process.env.DATABASE_URL_UNPOOLED!);
const db = drizzle(sql, { schema });

const PUBLIC_DIR = path.resolve(process.cwd(), "public");

// Track uploaded URLs to avoid re-uploading
const uploadCache = new Map<string, string>();

async function uploadToBlob(
  localPath: string,
  blobPath: string
): Promise<string> {
  if (uploadCache.has(localPath)) {
    return uploadCache.get(localPath)!;
  }

  const fullPath = path.join(PUBLIC_DIR, localPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ File not found: ${fullPath}`);
    return localPath; // Return original path as fallback
  }

  const file = fs.readFileSync(fullPath);
  const contentType = localPath.endsWith(".mp4")
    ? "video/mp4"
    : localPath.endsWith(".png")
      ? "image/png"
      : "image/jpeg";

  console.log(`  ↑ Uploading ${blobPath} (${(file.length / 1024 / 1024).toFixed(1)} MB)...`);

  const blob = await put(blobPath, file, {
    access: "public",
    contentType,
  });

  uploadCache.set(localPath, blob.url);
  return blob.url;
}

async function seedClients() {
  console.log("\n📋 Seeding clients...");

  for (const client of clientData) {
    let logoUrl: string | null = null;
    if (client.logo) {
      logoUrl = await uploadToBlob(
        client.logo,
        `logos/${path.basename(client.logo)}`
      );
    }

    await db
      .insert(schema.clients)
      .values({
        id: client.id,
        name: client.name,
        logoUrl,
        projectSize: client.projectSize || null,
        featured: client.featured,
        category: client.category,
      })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${clientData.length} clients seeded`);
}

async function seedMurals() {
  console.log("\n🎨 Seeding murals...");

  for (const mural of muralData) {
    // Upload hero image
    const heroUrl = await uploadToBlob(
      mural.images.hero,
      `murals/${path.basename(mural.images.hero)}`
    );

    // Upload thumbnail (same as hero for now)
    const thumbnailUrl = await uploadToBlob(
      mural.images.thumbnail,
      `murals/thumbs/${path.basename(mural.images.thumbnail)}`
    );

    // Upload gallery images
    const galleryUrls: string[] = [];
    for (const img of mural.images.gallery) {
      const url = await uploadToBlob(
        img,
        `murals/gallery/${path.basename(img)}`
      );
      galleryUrls.push(url);
    }

    // Find matching client ID
    const clientId = mural.client
      ? clientData.find(
          (c) => c.name.toLowerCase() === mural.client?.toLowerCase()
        )?.id || null
      : null;

    await db
      .insert(schema.murals)
      .values({
        id: mural.id,
        slug: mural.slug,
        title: mural.title,
        venue: mural.location.venue,
        city: mural.location.city,
        state: mural.location.state || null,
        country: mural.location.country,
        lat: mural.location.coordinates?.lat || null,
        lng: mural.location.coordinates?.lng || null,
        year: mural.year,
        description: mural.description,
        dimensionSize: mural.dimensions?.size || null,
        dimensionUnit: mural.dimensions?.unit || null,
        category: mural.category,
        tags: mural.tags,
        artistNote: mural.artistNote,
        inspiration: mural.inspiration,
        process: mural.process || null,
        impact: mural.impact || null,
        heroUrl,
        thumbnailUrl,
        galleryUrls,
        videoUrl: mural.video || null,
        clientId,
        clientDisplayName: mural.client || null,
        featured: mural.featured,
      })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${muralData.length} murals seeded`);
}

async function seedExhibitions() {
  console.log("\n🏛️  Seeding exhibitions...");

  for (const ex of exhibitionData) {
    await db
      .insert(schema.exhibitions)
      .values({
        id: ex.id,
        title: ex.title,
        venue: ex.venue,
        location: ex.location,
        year: ex.year,
        type: ex.type,
      })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${exhibitionData.length} exhibitions seeded`);
}

async function seedFestivals() {
  console.log("\n🎪 Seeding festivals...");

  for (const fest of festivalData) {
    await db
      .insert(schema.festivals)
      .values({
        id: fest.id,
        name: fest.name,
        location: fest.location,
        year: fest.year,
        international: fest.international,
      })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${festivalData.length} festivals seeded`);
}

async function seedPublications() {
  console.log("\n📰 Seeding publications...");

  for (const pub of publicationData) {
    await db
      .insert(schema.publications)
      .values({
        id: pub.id,
        outlet: pub.outlet,
        title: pub.title || null,
        location: pub.location || null,
        year: pub.year,
        type: pub.type,
        url: pub.url || null,
      })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${publicationData.length} publications seeded`);
}

async function seedVideos() {
  console.log("\n🎬 Seeding videos...");

  for (const video of videoData) {
    // Upload video file
    const srcUrl = await uploadToBlob(
      video.src,
      `videos/${path.basename(video.src)}`
    );

    // Upload poster if exists
    let posterUrl: string | null = null;
    if (video.poster) {
      posterUrl = await uploadToBlob(
        video.poster,
        `videos/posters/${path.basename(video.poster)}`
      );
    }

    await db
      .insert(schema.videos)
      .values({
        id: video.id,
        title: video.title,
        description: video.description,
        srcUrl,
        posterUrl,
        category: video.category,
        duration: video.duration || null,
        featured: video.featured,
      })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${videoData.length} videos seeded`);
}

async function seedSiteSettings() {
  console.log("\n⚙️  Seeding site settings...");

  const settings: Record<string, string> = {
    artistName: siteConfig.artistName,
    siteName: siteConfig.name,
    title: siteConfig.title,
    taglines: JSON.stringify(siteConfig.taglines),
    email: siteConfig.email,
    location: siteConfig.location,
    "social.instagram": siteConfig.social.instagram,
    "social.facebook": siteConfig.social.facebook,
    "social.tiktok": siteConfig.social.tiktok,
    "social.youtube": siteConfig.social.youtube,
    "social.linkedin": siteConfig.social.linkedin,
    "social.pinterest": siteConfig.social.pinterest,
    credentials: JSON.stringify(credentials),
    services: JSON.stringify(services),
  };

  for (const [key, value] of Object.entries(settings)) {
    await db
      .insert(schema.siteSettings)
      .values({ key, value })
      .onConflictDoNothing();
  }

  console.log(`  ✓ ${Object.keys(settings).length} settings seeded`);
}

async function seedAdminUser() {
  console.log("\n👤 Seeding admin user...");

  // Use Better Auth's API to create an admin user
  // We'll use a simple hash for the password
  const { default: crypto } = await import("crypto");
  const id = crypto.randomUUID();

  await db
    .insert(schema.user)
    .values({
      id,
      name: "Admin",
      email: "admin@dreamscape-r.art",
      emailVerified: true,
      role: "admin",
    })
    .onConflictDoNothing();

  // Create account with password
  const accountId = crypto.randomUUID();
  // Better Auth uses scrypt for passwords - we'll set a temp one
  // The admin should change it on first login
  const { scryptSync, randomBytes } = await import("crypto");
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync("admin123", salt, 64).toString("hex");

  await db
    .insert(schema.account)
    .values({
      id: accountId,
      accountId: id,
      providerId: "credential",
      userId: id,
      password: `${salt}:${hash}`,
    })
    .onConflictDoNothing();

  console.log(`  ✓ Admin user created (email: admin@dreamscape-r.art, password: admin123)`);
  console.log(`  ⚠ CHANGE THIS PASSWORD after first login!`);
}

async function main() {
  console.log("🌱 Starting seed...\n");

  try {
    await seedClients();
    await seedMurals();
    await seedExhibitions();
    await seedFestivals();
    await seedPublications();
    await seedVideos();
    await seedSiteSettings();
    await seedAdminUser();

    console.log("\n✅ Seed complete!");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}

main();
