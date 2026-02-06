# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for muralist Rachel Dinda (DREAMSCAPER) — a Next.js 15 App Router site deployed on Vercel at dreamscape-r.art. Showcases large-scale mural artwork with parallax effects and storytelling.

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm start` — Run production server
- `npm run lint` — ESLint (no --fix script; run `npx eslint --fix` manually)
- No test framework is configured

## Tech Stack

- **Next.js 15** with App Router, React 19, TypeScript 5
- **Tailwind CSS v4** via `@tailwindcss/postcss` (uses `@theme inline` directives, not tailwind.config)
- **Framer Motion 12** for parallax and scroll animations
- **Leaflet / React-Leaflet** for interactive mural map
- **React Icons** for iconography
- Path alias: `@/*` maps to `./src/*`

## Architecture

### Routing & Pages

All routes live under `src/app/` using file-based App Router conventions. Dynamic route: `/portfolio/[slug]` for individual mural detail pages. Pages are server components by default; interactive components use `"use client"`.

### Data Layer

No database or API routes. All content is static TypeScript in `src/app/data/`:
- `murals.ts` — Mural entries with storytelling fields (artistNote, inspiration, process, impact). Helper: `getFeaturedMurals()`
- `clients.ts` — Client list by category. Helpers: `getFeaturedClients()`, `getClientsByCategory()`
- `experience.ts` — CV data (exhibitions, festivals, publications)
- `siteConfig.ts` — Global config (artist info, social links, service definitions, credentials)
- `videos.ts` — Behind-the-scenes video collection

### Component Organization

- `components/layout/` — Header (fixed, scroll-aware with mobile drawer) and Footer
- `components/ui/` — ParallaxHero, ParallaxSection, VideoPlayer, ThemeSelector, MuralMap, InstagramFeed
- `components/seo/` — JsonLd structured data (Person, LocalBusiness, WebSite, CollectionPage schemas)

### Design System

Color tokens and animations are defined as CSS custom properties in `src/app/globals.css` (40+ variables). Key palette: ocean blues (primary), coral/orange (accent), teal (secondary). Three font families: Bebas Neue (display), Montserrat (headings), Inter (body). Component classes (`.card`, `.btn-primary`, `.btn-secondary`, `.btn-outline`) are defined there too.

### Parallax Pattern

ParallaxHero and ParallaxSection use Framer Motion's `useScroll` + `useTransform` hooks for scroll-based parallax. ParallaxHero supports configurable height and overlay opacity. This pattern was ported from a sibling project (destinyblazek).

### Image Handling

Mural images live in `public/images/murals/`. Next.js `<Image>` with `remotePatterns` configured for squarespace-cdn.com and myportfolio.com. Static assets cached for 1 year via next.config.ts headers.

## Deployment

Vercel with auto-deploy from GitHub master branch. Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) configured in `vercel.json`. Redirect: `/home` → `/`.

## Pending Work (from PLAN.md)

- HubSpot CRM scheduling integration (contact form is placeholder)
- Lightbox gallery
- Lighthouse performance optimization
- WCAG AA accessibility audit
- High-resolution image swap
