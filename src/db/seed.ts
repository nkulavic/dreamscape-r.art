import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
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
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  uploadCache.set(localPath, blob.url);
  return blob.url;
}

// Map client slug → UUID for mural FK lookups
const clientSlugToId = new Map<string, string>();

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

    const [inserted] = await db
      .insert(schema.clients)
      .values({
        slug: client.id, // old slug-based ID becomes the slug
        name: client.name,
        logoUrl,
        projectSize: client.projectSize || null,
        featured: client.featured,
        category: client.category,
      })
      .onConflictDoNothing()
      .returning({ id: schema.clients.id, slug: schema.clients.slug });

    if (inserted) {
      clientSlugToId.set(inserted.slug, inserted.id);
    }
  }

  // Also load any existing clients not just inserted (for idempotent re-runs)
  const allClients = await db
    .select({ id: schema.clients.id, slug: schema.clients.slug })
    .from(schema.clients);
  for (const c of allClients) {
    clientSlugToId.set(c.slug, c.id);
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

    // Find matching client UUID by looking up name → slug → UUID
    const matchingClient = mural.client
      ? clientData.find(
          (c) => c.name.toLowerCase() === mural.client?.toLowerCase()
        )
      : null;
    const clientId = matchingClient
      ? clientSlugToId.get(matchingClient.id) || null
      : null;

    await db
      .insert(schema.murals)
      .values({
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

  const { default: crypto } = await import("crypto");

  // Hash password using Better Auth's exact algorithm:
  // @noble/hashes scryptAsync with N=16384, r=16, p=1, dkLen=64
  // Salt is passed as hex STRING (not bytes) to match Better Auth's generateKey()
  const { scryptAsync } = await import("@noble/hashes/scrypt.js");
  const { bytesToHex } = await import("@noble/hashes/utils.js");

  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = bytesToHex(saltBytes);
  const password = "admin123";
  const keyBytes = await scryptAsync(password.normalize("NFKC"), salt, {
    N: 16384, r: 16, p: 1, dkLen: 64, maxmem: 128 * 16384 * 16 * 2,
  });
  const hash = bytesToHex(keyBytes);

  const id = crypto.randomUUID();

  // Delete existing admin user + account to allow re-seeding with correct hash
  await db.delete(schema.account).where(
    eq(schema.account.providerId, "credential")
  );
  await db.delete(schema.user).where(
    eq(schema.user.email, "admin@dreamscape-r.art")
  );

  await db
    .insert(schema.user)
    .values({
      id,
      name: "Admin",
      email: "admin@dreamscape-r.art",
      emailVerified: true,
      role: "admin",
    });

  const accountId = crypto.randomUUID();
  await db
    .insert(schema.account)
    .values({
      id: accountId,
      accountId: id,
      providerId: "credential",
      userId: id,
      password: `${salt}:${hash}`,
    });

  console.log(`  ✓ Admin user created (email: admin@dreamscape-r.art, password: admin123)`);
  console.log(`  ⚠ CHANGE THIS PASSWORD after first login!`);
}

async function clearContentTables() {
  console.log("🗑️  Clearing content tables...");
  // Delete in order respecting FK constraints (murals references clients)
  await db.delete(schema.murals);
  await db.delete(schema.clients);
  await db.delete(schema.exhibitions);
  await db.delete(schema.festivals);
  await db.delete(schema.publications);
  await db.delete(schema.videos);
  await db.delete(schema.siteSettings);
  console.log("  ✓ Content tables cleared");
}

async function main() {
  console.log("🌱 Starting seed...\n");

  try {
    await clearContentTables();
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
