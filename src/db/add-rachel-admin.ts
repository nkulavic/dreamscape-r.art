import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL_UNPOOLED!);
const db = drizzle(sql, { schema });

async function addRachelAdmin() {
  console.log("\n👤 Adding Rachel admin user...");

  const { default: crypto } = await import("crypto");
  const { scryptAsync } = await import("@noble/hashes/scrypt.js");
  const { bytesToHex } = await import("@noble/hashes/utils.js");

  const email = "rachel@dreamscaper.art";
  const password = "Hawaii143!";

  // Check if user already exists
  const [existing] = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email));

  if (existing) {
    console.log(`  ℹ User ${email} already exists, skipping...`);
    return;
  }

  // Hash password using Better Auth's algorithm
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = bytesToHex(saltBytes);
  const keyBytes = await scryptAsync(password.normalize("NFKC"), salt, {
    N: 16384,
    r: 16,
    p: 1,
    dkLen: 64,
    maxmem: 128 * 16384 * 16 * 2,
  });
  const hash = bytesToHex(keyBytes);
  const id = crypto.randomUUID();

  // Create user
  await db.insert(schema.user).values({
    id,
    name: "Rachel Dinda",
    email,
    emailVerified: true,
    role: "admin",
  });

  // Create credential account
  const accountId = crypto.randomUUID();
  await db.insert(schema.account).values({
    id: accountId,
    accountId: id,
    providerId: "credential",
    userId: id,
    password: `${salt}:${hash}`,
  });

  console.log(`  ✅ Rachel admin user created successfully!`);
  console.log(`  📧 Email: ${email}`);
  console.log(`  🔑 Password: Hawaii143!`);
}

addRachelAdmin()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
