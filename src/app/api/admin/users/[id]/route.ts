import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

// Get single user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const [user] = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, id));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { name, role, password } = body;

  try {
    // Update user
    const updates: any = {};
    if (name) updates.name = name;
    if (role) updates.role = role;
    updates.updatedAt = new Date();

    await db.update(schema.user).set(updates).where(eq(schema.user.id, id));

    // Update password if provided
    if (password) {
      const { scryptAsync } = await import("@noble/hashes/scrypt.js");
      const { bytesToHex } = await import("@noble/hashes/utils.js");

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

      // Update the account password
      await db
        .update(schema.account)
        .set({ password: `${salt}:${hash}` })
        .where(eq(schema.account.userId, id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Prevent deleting yourself
  if (session.user.id === id) {
    return NextResponse.json(
      { error: "Cannot delete your own account" },
      { status: 400 }
    );
  }

  try {
    // Delete account first (FK constraint)
    await db.delete(schema.account).where(eq(schema.account.userId, id));

    // Delete sessions
    await db.delete(schema.session).where(eq(schema.session.userId, id));

    // Delete user
    await db.delete(schema.user).where(eq(schema.user.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
