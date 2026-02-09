# SEO & Technical Quality — Post-Deployment Next Steps

> Generated from the SEO audit on 2026-02-09. These are manual actions and remaining technical items that require human intervention or follow-up sessions.

---

## 1. Google Search Console Setup (HIGH PRIORITY)

These steps are critical for getting pages indexed after the canonical fix.

- [ ] **Submit sitemap** — Go to [Google Search Console](https://search.google.com/search-console), navigate to Sitemaps, and submit `https://dreamscaper.art/sitemap.xml`
- [ ] **Request indexing for key pages** — In the URL Inspection tool, paste each URL and click "Request Indexing":
  - `https://dreamscaper.art/`
  - `https://dreamscaper.art/portfolio`
  - `https://dreamscaper.art/about`
  - `https://dreamscaper.art/services`
  - `https://dreamscaper.art/contact`
  - `https://dreamscaper.art/cv`
  - `https://dreamscaper.art/publications`
- [ ] **Add verification code** — Get the Google verification meta tag from Search Console and add it to `src/app/layout.tsx` under `metadata.verification.google`
- [ ] **Set up alerts** — Enable email notifications for indexing issues and manual actions

## 2. Bing Webmaster Tools

- [ ] **Submit sitemap** — Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and submit `https://dreamscaper.art/sitemap.xml`
- [ ] **Import from Google Search Console** — Bing offers a one-click import of your GSC property

## 3. Verify OG Tags & Social Sharing

- [ ] **Test all pages** at [OpenGraph.xyz](https://www.opengraph.xyz/) — paste each public page URL and confirm the preview shows the correct title, description, and image
- [ ] **Test Twitter cards** at [Twitter Card Validator](https://cards-dev.twitter.com/validator) — confirm `summary_large_image` renders correctly
- [ ] **Share a test post** on LinkedIn/Facebook to verify the preview looks right

## 4. Lighthouse Audit

- [ ] **Run Lighthouse** in Chrome DevTools (Incognito mode) on each public page
  - Target: **SEO score 90+**
  - Check: Performance, Accessibility, Best Practices scores
  - Fix any flagged issues (missing alt text, contrast ratios, etc.)

## 5. Favicon & App Icons (STILL MISSING)

The site currently has **no favicon or apple-touch-icon**. This should be added:

- [ ] **Create favicon files** — Generate from the DREAMSCAPER logo:
  - `public/favicon.ico` (32x32)
  - `public/apple-touch-icon.png` (180x180)
  - Alternatively, create `src/app/icon.tsx` for dynamic generation
- [ ] **Add web manifest** — Create `public/manifest.json` or `src/app/manifest.ts` with:
  - `name`: "DREAMSCAPER | Rachel Dinda"
  - `short_name`: "DREAMSCAPER"
  - `theme_color`: ocean-deep color
  - `icons`: array of icon sizes

## 6. ESLint Configuration (DEV QUALITY)

The project has `eslint` and `eslint-config-next` installed but **no `eslint.config.mjs` at the root**. This means `npm run lint` fails.

- [ ] **Create `eslint.config.mjs`** at the project root:
  ```js
  import { dirname } from "path";
  import { fileURLToPath } from "url";
  import { FlatCompat } from "@eslint/eslintrc";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const compat = new FlatCompat({ baseDirectory: __dirname });

  export default [...compat.extends("next/core-web-vitals")];
  ```
- [ ] Run `npm run lint` and fix any reported issues

## 7. Image Alt Text Audit

- [ ] **Audit all `<Image>` and `<img>` tags** across the site for descriptive alt text
- [ ] The about page and services page use CSS `background-image` for some images — these are invisible to screen readers and search engines. Consider converting key images to Next.js `<Image>` components where feasible (tradeoff: some may be decorative and fine as backgrounds)

## 8. External Link Audit

- [ ] **Verify all external links** have `rel="noopener noreferrer"` and `target="_blank"`
  - Social links in the footer and contact page already have this (confirmed)
  - Check any links in blog-like content or mural detail pages

## 9. Backlink Building

Add the site URL to owned properties for backlinks:

- [ ] **LinkedIn profile** — Add `https://dreamscaper.art` to Rachel's profile website field
- [ ] **GitHub profile** — Add to bio/website field
- [ ] **Instagram bio** — Ensure `dreamscaper.art` is the link in bio
- [ ] **Facebook page** — Add website URL
- [ ] **Google Business Profile** — Create or update with `dreamscaper.art`
- [ ] **Apple Maps** (Apple Business Connect) — Create listing
- [ ] **Yelp** — Create business listing

## 10. Monitoring & Ongoing

- [ ] **Check Search Console weekly** for the first month after deployment — watch for:
  - Pages being indexed (should see gradual increase)
  - Any "Page with redirect" or "Duplicate without user-selected canonical" issues
  - Crawl errors
- [ ] **Re-run Lighthouse monthly** to catch regressions
- [ ] **Monitor Core Web Vitals** in Search Console → Experience section

---

## What Was Already Fixed (2026-02-09 Audit)

For reference, these items were completed in the SEO audit commit:

- **CRITICAL**: Removed hardcoded `<link rel="canonical">` from root layout that was pointing all pages to the homepage
- Split `about`, `services`, `contact` pages into server `page.tsx` + `*Client.tsx` for metadata exports
- Added unique metadata (title, description, keywords, OG, Twitter, canonical) to: about, services, contact, cv, publications, homepage
- Replaced buggy static `robots.txt` with dynamic `app/robots.ts`
- Added `/publications` to `sitemap.ts`
- Created custom `not-found.tsx` (404 page)
- Added `FAQPage` JSON-LD to contact page
- Added `ProfilePage` JSON-LD to about page
