import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { del } from "@vercel/blob";
import { arrayOverlaps, eq, or } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import * as schema from "@/db/schema";

/** A place that still points at the media file being deleted. */
interface Usage {
  type: string;
  label: string;
}

/**
 * Deletes a media file from Vercel Blob.
 *
 * Refuses by default when the file is still referenced by a mural, client or
 * video, and reports where — pass `force: true` to delete anyway.
 */
export async function DELETE(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let url: string;
  let force = false;
  try {
    const body = (await request.json()) as { url?: string; force?: boolean };
    if (!body.url) throw new Error("missing url");
    url = body.url;
    force = body.force === true;
  } catch {
    return NextResponse.json({ error: "A media url is required" }, { status: 400 });
  }

  const pathname = toBlobPathname(url);
  if (!pathname) {
    return NextResponse.json({ error: "Unrecognized media url" }, { status: 400 });
  }

  if (!force) {
    const usages = await findUsages(url, pathname);
    if (usages.length > 0) {
      return NextResponse.json(
        {
          error: "This file is still in use.",
          usages,
        },
        { status: 409 }
      );
    }
  }

  try {
    await del(pathname);
  } catch (error) {
    console.error("Blob delete error:", error);
    return NextResponse.json({ error: "Failed to delete the file" }, { status: 500 });
  }

  return NextResponse.json({ deleted: pathname });
}

/** Accepts a `/media/...` proxy url, a raw blob url, or a bare pathname. */
function toBlobPathname(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const blobMatch = trimmed.match(/\.public\.blob\.vercel-storage\.com\/(.+)$/);
  if (blobMatch) return decodeURIComponent(blobMatch[1]);

  if (trimmed.startsWith("/media/")) {
    return decodeURIComponent(trimmed.slice("/media/".length));
  }

  // Reject anything that isn't ours (external URLs, absolute paths elsewhere).
  if (trimmed.startsWith("http") || trimmed.startsWith("/")) return null;

  return decodeURIComponent(trimmed);
}

/**
 * Content rows are stored with proxy urls, but older rows may hold raw blob
 * urls, so every candidate form is checked.
 */
async function findUsages(url: string, pathname: string): Promise<Usage[]> {
  const candidates = Array.from(
    new Set([url, `/media/${pathname}`, pathname].filter(Boolean))
  );

  const anyOf = (column: Parameters<typeof eq>[0]) =>
    or(...candidates.map((value) => eq(column, value)));

  const [murals, clients, videos, settings] = await Promise.all([
    db
      .select({ title: schema.murals.title })
      .from(schema.murals)
      .where(
        or(
          anyOf(schema.murals.heroUrl),
          anyOf(schema.murals.thumbnailUrl),
          anyOf(schema.murals.videoUrl),
          arrayOverlaps(schema.murals.galleryUrls, candidates)
        )
      ),
    db
      .select({ name: schema.clients.name })
      .from(schema.clients)
      .where(anyOf(schema.clients.logoUrl)),
    db
      .select({ title: schema.videos.title })
      .from(schema.videos)
      .where(or(anyOf(schema.videos.srcUrl), anyOf(schema.videos.posterUrl))),
    db
      .select({ key: schema.siteSettings.key })
      .from(schema.siteSettings)
      .where(anyOf(schema.siteSettings.value)),
  ]);

  return [
    ...murals.map((row) => ({ type: "Mural", label: row.title })),
    ...clients.map((row) => ({ type: "Client", label: row.name })),
    ...videos.map((row) => ({ type: "Video", label: row.title })),
    ...settings.map((row) => ({ type: "Setting", label: row.key })),
  ];
}
