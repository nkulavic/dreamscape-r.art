import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import * as schema from "@/db/schema";

const tableMap = {
  exhibition: schema.exhibitions,
  festival: schema.festivals,
  publication: schema.publications,
} as const;

type ExperienceType = keyof typeof tableMap;

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const result = await db.insert(table as any).values(data).returning();
  const created = (result as any[])[0];

  return NextResponse.json(created, { status: 201 });
}
