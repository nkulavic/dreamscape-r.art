import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

const tableMap = {
  exhibition: schema.exhibitions,
  festival: schema.festivals,
  publication: schema.publications,
} as const;

type ExperienceType = keyof typeof tableMap;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { entityType, ...data } = body;

  if (!entityType || !(entityType in tableMap)) {
    return NextResponse.json(
      { error: "Invalid entityType. Must be 'exhibition', 'festival', or 'publication'" },
      { status: 400 }
    );
  }

  const table = tableMap[entityType as ExperienceType];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateResult = await db
    .update(table as any)
    .set({ ...data, updatedAt: new Date() })
    .where(eq((table as any).id, id))
    .returning();
  const updated = (updateResult as any[])[0];

  if (!updated) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { entityType } = await request.json();

  if (!entityType || !(entityType in tableMap)) {
    return NextResponse.json(
      { error: "Invalid entityType. Must be 'exhibition', 'festival', or 'publication'" },
      { status: 400 }
    );
  }

  const table = tableMap[entityType as ExperienceType];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteResult = await db
    .delete(table as any)
    .where(eq((table as any).id, id))
    .returning();
  const deleted = (deleteResult as any[])[0];

  if (!deleted) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
