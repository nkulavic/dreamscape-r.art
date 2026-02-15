CREATE TYPE "public"."mural_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "murals" ADD COLUMN "status" "mural_status" DEFAULT 'draft' NOT NULL;