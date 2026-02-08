import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Support both single { key, value } and batch { settings: [...] }
  const entries: { key: string; value: string }[] = body.settings
    ? body.settings
    : [{ key: body.key, value: body.value }];

  const results = [];

  for (const entry of entries) {
    if (!entry.key || entry.value === undefined) {
      return NextResponse.json(
        { error: "Each setting must have a 'key' and 'value'" },
        { status: 400 }
      );
    }

    // Check if the setting already exists
    const existing = await db
      .select()
      .from(schema.siteSettings)
      .where(eq(schema.siteSettings.key, entry.key))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(schema.siteSettings)
        .set({ value: entry.value, updatedAt: new Date() })
        .where(eq(schema.siteSettings.key, entry.key))
        .returning();
      results.push(updated);
    } else {
      const [created] = await db
        .insert(schema.siteSettings)
        .values({ key: entry.key, value: entry.value })
        .returning();
      results.push(created);
    }
  }

  return NextResponse.json(
    body.settings ? { settings: results } : results[0]
  );
}
