import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

// List all users
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await db.select().from(schema.user);
  return NextResponse.json(users);
}

// Create new user using Better Auth
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 }
    );
  }

  try {
    // Use Better Auth's sign up method to create user with proper password hashing
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!result || !result.user) {
      throw new Error("Failed to create user");
    }

    // Update role if specified (Better Auth creates users with default role)
    if (role) {
      await db
        .update(schema.user)
        .set({ role, emailVerified: true })
        .where(eq(schema.user.id, result.user.id));
    } else {
      // Just mark email as verified
      await db
        .update(schema.user)
        .set({ emailVerified: true })
        .where(eq(schema.user.id, result.user.id));
    }

    return NextResponse.json({ success: true, userId: result.user.id });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
