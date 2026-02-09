import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { blobToProxyUrl } from "@/lib/media";

const sql = neon(process.env.DATABASE_URL_UNPOOLED!);
const db = drizzle(sql, { schema });

async function migrateBlobUrls() {
  console.log("\n🔄 Migrating blob URLs to proxy URLs...\n");

  // Migrate murals
  console.log("📸 Migrating mural images...");
  const murals = await db.select().from(schema.murals);

  let muralCount = 0;
  for (const mural of murals) {
    const updates: any = {};
    let hasChanges = false;

    if (mural.heroUrl?.includes("blob.vercel-storage.com")) {
      updates.heroUrl = blobToProxyUrl(mural.heroUrl);
      hasChanges = true;
    }

    if (mural.thumbnailUrl?.includes("blob.vercel-storage.com")) {
      updates.thumbnailUrl = blobToProxyUrl(mural.thumbnailUrl);
      hasChanges = true;
    }

    if (mural.galleryUrls && mural.galleryUrls.length > 0) {
      const newGalleryUrls = mural.galleryUrls.map((url) =>
        url.includes("blob.vercel-storage.com") ? blobToProxyUrl(url) : url
      );
      if (JSON.stringify(newGalleryUrls) !== JSON.stringify(mural.galleryUrls)) {
        updates.galleryUrls = newGalleryUrls;
        hasChanges = true;
      }
    }

    if (mural.videoUrl?.includes("blob.vercel-storage.com")) {
      updates.videoUrl = blobToProxyUrl(mural.videoUrl);
      hasChanges = true;
    }

    if (hasChanges) {
      await db
        .update(schema.murals)
        .set(updates)
        .where(eq(schema.murals.id, mural.id));
      muralCount++;
      console.log(`  ✓ Updated mural: ${mural.title}`);
    }
  }

  // Migrate clients
  console.log("\n🏢 Migrating client logos...");
  const clients = await db.select().from(schema.clients);

  let clientCount = 0;
  for (const client of clients) {
    if (client.logoUrl?.includes("blob.vercel-storage.com")) {
      await db
        .update(schema.clients)
        .set({ logoUrl: blobToProxyUrl(client.logoUrl) })
        .where(eq(schema.clients.id, client.id));
      clientCount++;
      console.log(`  ✓ Updated client: ${client.name}`);
    }
  }

  // Migrate videos
  console.log("\n🎥 Migrating video posters...");
  const videos = await db.select().from(schema.videos);

  let videoCount = 0;
  for (const video of videos) {
    const updates: any = {};
    let hasChanges = false;

    if (video.src?.includes("blob.vercel-storage.com")) {
      updates.src = blobToProxyUrl(video.src);
      hasChanges = true;
    }

    if (video.poster?.includes("blob.vercel-storage.com")) {
      updates.poster = blobToProxyUrl(video.poster);
      hasChanges = true;
    }

    if (hasChanges) {
      await db
        .update(schema.videos)
        .set(updates)
        .where(eq(schema.videos.id, video.id));
      videoCount++;
      console.log(`  ✓ Updated video: ${video.title}`);
    }
  }

  console.log("\n✨ Migration complete!");
  console.log(`  📸 Murals updated: ${muralCount}`);
  console.log(`  🏢 Clients updated: ${clientCount}`);
  console.log(`  🎥 Videos updated: ${videoCount}`);
  console.log(`\n✅ All media URLs now use your custom domain!`);
}

migrateBlobUrls()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  });
