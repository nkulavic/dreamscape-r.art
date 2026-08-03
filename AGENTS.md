# AGENTS.md

Project guide for AI coding agents working in this repository. Tool-agnostic —
Claude Code, Codex, Cursor, Copilot and friends all read this file. Anything
Claude-specific (Teamwork sync, plan files) lives in `CLAUDE.md`.

## Project Overview

Portfolio website for muralist Rachel Dinda (DREAMSCAPER) — a Next.js 15 App
Router site deployed on Vercel at dreamscaper.art. Showcases large-scale mural
artwork with parallax effects and storytelling, plus a full admin panel for
managing content.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on localhost:3000 |
| `npm run build` | Production build |
| `npm start` | Run the production server |
| `npx tsc --noEmit` | Type check — **the reliable pre-commit gate** |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:seed` | Seed content and the admin user |

**Two things to know before you trust a green run:**

- `npm run lint` **is currently broken** — the repo has no `eslint.config.js`
  and ESLint 9 requires flat config. It exits with a config error, not a lint
  result. Use `npx tsc --noEmit` as the gate; don't spend time "fixing" a lint
  run that was never wired up.
- `npm run build` needs a database connection. Without `POSTGRES_URL` it
  compiles fine and then fails at "Collecting page data" with a `neon()` error.
  **That failure is environmental, not your change** — "✓ Compiled
  successfully" plus a clean `tsc` is the real signal in a sandbox.
- No test framework is configured.

## Tech Stack

- **Next.js 15** App Router, React 19, TypeScript 5
- **Tailwind CSS v4** via `@tailwindcss/postcss` (`@theme inline` in
  `globals.css` — there is no `tailwind.config`)
- **Framer Motion 12** for parallax and scroll animation
- **Vercel Postgres** (Neon) via **Drizzle ORM**
- **Vercel Blob** for all media
- **Better Auth** for admin authentication
- **Groq SDK** (`openai/gpt-oss-120b`) for AI-assisted content generation
- **Sonner** toasts, **Leaflet** map, **React Icons**, **react-easy-crop**
- **UUIDv7** primary keys
- Path alias: `@/*` → `./src/*`

## Architecture

### Routing & data flow

Routes live under `src/app/`. Pages are Server Components that fetch through
the DAL and pass plain data to Client Components as props.

`/portfolio/[slug]` is the dynamic mural route.

### Data layer

**Schema** (`src/db/schema.ts`): `murals`, `clients`, `exhibitions`,
`festivals`, `publications`, `videos`, `site_settings` (key/value), plus Better
Auth's tables.

**DAL** (`src/db/dal.ts`): every query lives here and returns transformed,
typed objects — `getAllMurals()`, `getMuralBySlug()`, `getSocialLinks()`,
`getSeoDefaults()`, `getSiteTheme()`, and so on. Pages should not query the
database directly.

**Static content** (`src/app/data/`): `siteConfig.ts` (artist info, social
fallbacks), `marketing.ts` (editorial copy), `experience.ts` (credentials).

### Settings resolve DB-over-static

`site_settings` holds admin-editable values; `siteConfig.ts` holds the
fallbacks. Resolvers merge them — a blank admin field falls back to code.

> **Trap worth remembering:** the Settings page had social and SEO fields for a
> long time that nothing on the public site ever read. Editing them did
> nothing. If you add an admin field, wire a resolver and a consumer in the same
> change, or you have built another dead control.

Client components that need these (Footer, contact page) get them from
`SocialLinksProvider`, populated once by the root layout — they can't query the
database themselves.

Saving settings calls `revalidatePath("/", "layout")`. **Mural/client/video
admin routes do not revalidate**, so those edits can lag on cached pages.

### Media

Uploads go **straight from the browser to Vercel Blob** via
`upload()` from `@vercel/blob/client`. `/api/admin/upload` only mints a
short-lived session-authenticated token with `handleUpload()`. The file never
touches a serverless function, so **the 4.5 MB request body limit doesn't
apply** — this is why the endpoint must not be "simplified" back into a normal
POST handler.

- Limits in `src/lib/upload.ts`: images 50 MB, videos 500 MB, allow-listed
  content types. Enforced client-side for fast feedback *and* baked into the
  token so they can't be bypassed.
- `src/lib/upload-client.ts` → `uploadMedia(file, { folder, kind, onProgress })`
  validates, uploads (multipart above 10 MB) and returns the proxied
  `/media/...` URL.
- Folders: `murals/`, `logos/`, `videos/`, `posters/`. Random filename suffix,
  so re-uploads never collide.
- `DELETE /api/admin/blob/delete` refuses by default when a mural, client,
  video or setting still references the file, and names them; `force: true`
  overrides.

**Image editing** (`src/lib/image-edit.ts`,
`admin/(dashboard)/_components/ImageEditor.tsx`): crop with aspect presets,
zoom, rotate/straighten, and an output width cap — all on a canvas in the
browser. **Non-destructive**: the result uploads as a new blob and the entry
repoints; the original is never modified. Working canvas is capped at 24 MP so
large phone photos don't exhaust memory on mobile Safari.

### Sorting

Shared comparison rules in `src/lib/sort.ts` (`compareValues`,
`createComparator`, `sortItems`, `SortOption`): type-aware (numbers, dates,
booleans, natural string order), blanks always last, ties stable.

- **Admin tables** — `admin/(dashboard)/_components/SortableTable.tsx`:
  `useTableSort()` + `<SortableHeader>` / `<StaticHeader>`. `aria-sort` on
  headers, chosen column remembered in `localStorage`.
- **Public lists** — `components/ui/SortSelect.tsx`, a styled native `<select>`
  (keyboard/screen-reader behaviour for free, system picker on mobile). Used on
  `/portfolio`, `/cv` (per section) and `/publications`.

### Server rendering and search params

`/portfolio` reads its filters (`?tag=`, `?match=`, `?sort=`) **in the server
component** and passes them as props. Do not reintroduce `useSearchParams()`
there: it opts the whole subtree out of prerendering, and the page ships as an
empty shell until hydration. URL updates use `history.replaceState`, not
`router.replace`, so filtering stays instant instead of round-tripping.

Framer Motion renders its `initial` styles server-side too, so **anything with
`initial={{ opacity: 0 }}` is invisible in the HTML**. Above-the-fold chrome
(filter rows, counts) should not animate in; the grid uses
`initial={mounted ? "hidden" : false}` so it animates on filter changes but
paints immediately on load.

### Components

- `components/layout/` — Header (scroll-aware, mobile drawer), Footer
- `components/ui/` — ParallaxHero, ParallaxSection, VideoPlayer, ThemeSelector,
  MuralMap, SortSelect, InstagramFeed
- `components/seo/` — JsonLd (Person, LocalBusiness, WebSite, CollectionPage)

### Design system

Colour tokens and animations are CSS custom properties in `globals.css` (40+).
Palette: ocean blues (primary), coral/orange (accent), teal (secondary). Fonts:
Bebas Neue (display), Montserrat (headings), Inter (body). Component classes
`.card`, `.btn-primary`, `.btn-secondary`, `.btn-outline` live there too.

Mobile matters here — the site is browsed on phones. Scale controls down with
`base` values and restore desktop with `sm:` overrides rather than shipping
desktop sizing everywhere.

### Auth & admin

Better Auth (email/password, admin role). Config in `src/lib/auth.ts` /
`auth-client.ts`, route at `api/auth/[...all]`, `src/middleware.ts` guards
`/admin/*`. Every `api/admin/*` route must check the session itself — the
middleware is not a substitute.

### SEO

`sitemap.ts` and `robots.ts` are generated from the database. `JsonLd` supplies
structured data. Root layout builds metadata from `getSeoDefaults()`. Favicon
and Apple icon are generated at build time by `icon.tsx` / `apple-icon.tsx`
(`ImageResponse`) — there are no binary icon assets.

`public/llms.txt` describes the site for AI assistants; keep it current when
positioning or credentials change.

## Conventions

- Match surrounding style; comments explain *why*, not *what*.
- Every `<button>` inside a `<form>` needs `type="button"` unless it submits.
  A missing `type` defaults to submit — this shipped a bug where opening the
  media picker saved and navigated away from the edit form.
- Prefer `next/image` for new image work.
- Blanks sort last, ties stay stable — use the shared helpers.

## Deployment

Vercel auto-deploys from `master`. Build command is
`npm run db:push && npm run build`, so **schema changes apply on deploy**.
Security headers and the `www` → apex redirect live in `vercel.json`.

Manual production deploy:

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_OfYPlw7jJasdxfm26PbiPXMRFZIz/Iavom6qSdp
```

Vercel Analytics and Speed Insights are installed but **dormant** — they
collect and bill nothing until switched on in the Vercel dashboard.

## Known gaps / pending work

### Performance & SEO
- **Portfolio grid uses CSS `background-image`, not `next/image`** — no
  AVIF/WebP, no responsive sizes, no lazy loading, no `alt` text, and the murals
  are invisible to image search. Biggest available win.
- Social share images are raw photos from `public/images/` (~1.9 MB), not
  1200×630 cards, so platforms crop them unpredictably.
- **`public/images/` is 36 MB and still load-bearing** — Open Graph tags point
  into it. Deleting it (long-standing cleanup wish) breaks every share image
  unless share cards move to generated/blob images first.
- Lighthouse pass and WCAG AA audit never done.

### Features
- Lightbox gallery on mural detail pages
- Contact form is a placeholder — needs HubSpot or email wiring
- HubSpot scheduling integration
- Instagram feed (Behold.so)

### Business listings (Rachel)
Google Business Profile, Apple Business Connect, Yelp, social profile audit.
