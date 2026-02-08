import { db } from ".";
import { eq, desc, inArray, and } from "drizzle-orm";
import * as schema from "./schema";

// ── Types (matching old interfaces for backward compatibility) ──

export interface Mural {
  id: string;
  slug: string;
  title: string;
  location: {
    venue: string;
    city: string;
    state?: string;
    country: string;
    coordinates?: { lat: number; lng: number };
  };
  year: number;
  description: string;
  dimensions?: { size: string; unit: string };
  category: "commercial" | "community" | "education" | "international";
  tags: string[];
  artistNote: string;
  inspiration: string;
  process?: string;
  impact?: string;
  images: {
    hero: string;
    thumbnail: string;
    gallery: string[];
  };
  video?: string;
  client?: string;
  featured: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
  projectSize?: string;
  featured: boolean;
  category: "corporate" | "education" | "nonprofit" | "restaurant" | "community";
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  year: number;
  type: "solo" | "collaborative" | "group";
}

export interface Festival {
  id: string;
  name: string;
  location: string;
  year: number;
  international: boolean;
}

export interface Publication {
  id: string;
  outlet: string;
  title?: string;
  location?: string;
  year: number;
  type: "tv" | "magazine" | "newspaper" | "online" | "museum";
  url?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
  category: "process" | "timelapse" | "festival" | "documentary";
  duration?: string;
  featured: boolean;
}

// ── Transform helpers ──────────────────────────────────

function transformMural(row: typeof schema.murals.$inferSelect): Mural {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: {
      venue: row.venue,
      city: row.city,
      state: row.state || undefined,
      country: row.country,
      coordinates:
        row.lat && row.lng ? { lat: row.lat, lng: row.lng } : undefined,
    },
    year: row.year,
    description: row.description,
    dimensions:
      row.dimensionSize && row.dimensionUnit
        ? { size: row.dimensionSize, unit: row.dimensionUnit }
        : undefined,
    category: row.category,
    tags: row.tags,
    artistNote: row.artistNote,
    inspiration: row.inspiration,
    process: row.process || undefined,
    impact: row.impact || undefined,
    images: {
      hero: row.heroUrl,
      thumbnail: row.thumbnailUrl,
      gallery: row.galleryUrls,
    },
    video: row.videoUrl || undefined,
    client: row.clientDisplayName || undefined,
    featured: row.featured,
  };
}

function transformClient(row: typeof schema.clients.$inferSelect): Client {
  return {
    id: row.id,
    name: row.name,
    logo: row.logoUrl || undefined,
    projectSize: row.projectSize || undefined,
    featured: row.featured,
    category: row.category,
  };
}

function transformExhibition(
  row: typeof schema.exhibitions.$inferSelect
): Exhibition {
  return {
    id: row.id,
    title: row.title,
    venue: row.venue,
    location: row.location,
    year: row.year,
    type: row.type,
  };
}

function transformFestival(
  row: typeof schema.festivals.$inferSelect
): Festival {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    year: row.year,
    international: row.international,
  };
}

function transformPublication(
  row: typeof schema.publications.$inferSelect
): Publication {
  return {
    id: row.id,
    outlet: row.outlet,
    title: row.title || undefined,
    location: row.location || undefined,
    year: row.year,
    type: row.type,
    url: row.url || undefined,
  };
}

function transformVideo(row: typeof schema.videos.$inferSelect): Video {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    src: row.srcUrl,
    poster: row.posterUrl || undefined,
    category: row.category,
    duration: row.duration || undefined,
    featured: row.featured,
  };
}

// ── Mural queries ──────────────────────────────────────

export async function getAllMurals(): Promise<Mural[]> {
  const rows = await db
    .select()
    .from(schema.murals)
    .orderBy(desc(schema.murals.year));
  return rows.map(transformMural);
}

export async function getFeaturedMurals(): Promise<Mural[]> {
  const rows = await db
    .select()
    .from(schema.murals)
    .where(eq(schema.murals.featured, true))
    .orderBy(desc(schema.murals.year));
  return rows.map(transformMural);
}

export async function getMuralsByCategory(
  category: Mural["category"]
): Promise<Mural[]> {
  const rows = await db
    .select()
    .from(schema.murals)
    .where(eq(schema.murals.category, category))
    .orderBy(desc(schema.murals.year));
  return rows.map(transformMural);
}

export async function getMuralBySlug(slug: string): Promise<Mural | null> {
  const rows = await db
    .select()
    .from(schema.murals)
    .where(eq(schema.murals.slug, slug))
    .limit(1);
  return rows[0] ? transformMural(rows[0]) : null;
}

export async function getMuralsByIds(ids: string[]): Promise<Mural[]> {
  if (ids.length === 0) return [];
  const rows = await db
    .select()
    .from(schema.murals)
    .where(inArray(schema.murals.id, ids));
  return rows.map(transformMural);
}

// ── Client queries ─────────────────────────────────────

export async function getAllClients(): Promise<Client[]> {
  const rows = await db.select().from(schema.clients);
  return rows.map(transformClient);
}

export async function getFeaturedClients(): Promise<Client[]> {
  const rows = await db
    .select()
    .from(schema.clients)
    .where(eq(schema.clients.featured, true));
  return rows.map(transformClient);
}

export async function getClientsByCategory(
  category: Client["category"]
): Promise<Client[]> {
  const rows = await db
    .select()
    .from(schema.clients)
    .where(eq(schema.clients.category, category));
  return rows.map(transformClient);
}

export async function getClientsByIds(ids: string[]): Promise<Client[]> {
  if (ids.length === 0) return [];
  const rows = await db
    .select()
    .from(schema.clients)
    .where(inArray(schema.clients.id, ids));
  return rows.map(transformClient);
}

// ── Exhibition queries ─────────────────────────────────

export async function getAllExhibitions(): Promise<Exhibition[]> {
  const rows = await db
    .select()
    .from(schema.exhibitions)
    .orderBy(desc(schema.exhibitions.year));
  return rows.map(transformExhibition);
}

export async function getSoloExhibitions(): Promise<Exhibition[]> {
  const rows = await db
    .select()
    .from(schema.exhibitions)
    .where(eq(schema.exhibitions.type, "solo"))
    .orderBy(desc(schema.exhibitions.year));
  return rows.map(transformExhibition);
}

// ── Festival queries ───────────────────────────────────

export async function getAllFestivals(): Promise<Festival[]> {
  const rows = await db
    .select()
    .from(schema.festivals)
    .orderBy(desc(schema.festivals.year));
  return rows.map(transformFestival);
}

export async function getInternationalFestivals(): Promise<Festival[]> {
  const rows = await db
    .select()
    .from(schema.festivals)
    .where(eq(schema.festivals.international, true))
    .orderBy(desc(schema.festivals.year));
  return rows.map(transformFestival);
}

// ── Publication queries ────────────────────────────────

export async function getAllPublications(): Promise<Publication[]> {
  const rows = await db
    .select()
    .from(schema.publications)
    .orderBy(desc(schema.publications.year));
  return rows.map(transformPublication);
}

// ── Video queries ──────────────────────────────────────

export async function getAllVideos(): Promise<Video[]> {
  const rows = await db.select().from(schema.videos);
  return rows.map(transformVideo);
}

export async function getFeaturedVideos(): Promise<Video[]> {
  const rows = await db
    .select()
    .from(schema.videos)
    .where(eq(schema.videos.featured, true));
  return rows.map(transformVideo);
}

export async function getVideosByCategory(
  category: Video["category"]
): Promise<Video[]> {
  const rows = await db
    .select()
    .from(schema.videos)
    .where(eq(schema.videos.category, category));
  return rows.map(transformVideo);
}

// ── Site Settings ──────────────────────────────────────

export async function getSiteSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(schema.siteSettings);
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

export async function getSiteSetting(key: string): Promise<string | null> {
  const rows = await db
    .select()
    .from(schema.siteSettings)
    .where(eq(schema.siteSettings.key, key))
    .limit(1);
  return rows[0]?.value ?? null;
}
