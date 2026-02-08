import {
  pgTable,
  text,
  integer,
  boolean,
  real,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// ── Enums ──────────────────────────────────────────────

export const muralCategoryEnum = pgEnum("mural_category", [
  "commercial",
  "community",
  "education",
  "international",
]);

export const clientCategoryEnum = pgEnum("client_category", [
  "corporate",
  "education",
  "nonprofit",
  "restaurant",
  "community",
]);

export const exhibitionTypeEnum = pgEnum("exhibition_type", [
  "solo",
  "collaborative",
  "group",
]);

export const publicationTypeEnum = pgEnum("publication_type", [
  "tv",
  "magazine",
  "newspaper",
  "online",
  "museum",
]);

export const videoCategoryEnum = pgEnum("video_category", [
  "process",
  "timelapse",
  "festival",
  "documentary",
]);

// ── Clients ────────────────────────────────────────────

export const clients = pgTable("clients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  projectSize: text("project_size"),
  featured: boolean("featured").notNull().default(false),
  category: clientCategoryEnum("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Murals ─────────────────────────────────────────────

export const murals = pgTable("murals", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),

  // Location (flattened)
  venue: text("venue").notNull(),
  city: text("city").notNull(),
  state: text("state"),
  country: text("country").notNull(),
  lat: real("lat"),
  lng: real("lng"),

  year: integer("year").notNull(),
  description: text("description").notNull(),

  // Dimensions
  dimensionSize: text("dimension_size"),
  dimensionUnit: text("dimension_unit"),

  category: muralCategoryEnum("category").notNull(),
  tags: text("tags").array().notNull().default([]),

  artistNote: text("artist_note").notNull(),
  inspiration: text("inspiration").notNull(),
  process: text("process"),
  impact: text("impact"),

  // Media (blob URLs)
  heroUrl: text("hero_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  galleryUrls: text("gallery_urls").array().notNull().default([]),
  videoUrl: text("video_url"),

  // Client reference
  clientId: text("client_id").references(() => clients.id),
  clientDisplayName: text("client_display_name"),

  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Exhibitions ────────────────────────────────────────

export const exhibitions = pgTable("exhibitions", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  venue: text("venue").notNull(),
  location: text("location").notNull(),
  year: integer("year").notNull(),
  type: exhibitionTypeEnum("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Festivals ──────────────────────────────────────────

export const festivals = pgTable("festivals", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  year: integer("year").notNull(),
  international: boolean("international").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Publications ───────────────────────────────────────

export const publications = pgTable("publications", {
  id: text("id").primaryKey(),
  outlet: text("outlet").notNull(),
  title: text("title"),
  location: text("location"),
  year: integer("year").notNull(),
  type: publicationTypeEnum("type").notNull(),
  url: text("url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Videos ─────────────────────────────────────────────

export const videos = pgTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  srcUrl: text("src_url").notNull(),
  posterUrl: text("poster_url"),
  category: videoCategoryEnum("category").notNull(),
  duration: text("duration"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Better Auth tables ─────────────────────────────────

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ── Site Settings (key-value) ──────────────────────────

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
