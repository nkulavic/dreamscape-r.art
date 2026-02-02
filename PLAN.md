# dreamscape-r.art - Modern Mural Art Portfolio

## Overview
Build a sleek, modern portfolio site for muralist Rachel Dinda (DREAMSCAPER) that showcases her vibrant large-scale artwork with immersive parallax effects and compelling storytelling.

**Goal:** Attract organizations seeking murals through a visually stunning, professional presentation.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | App Router, server components |
| React | 19.x | UI framework |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling with `@theme inline` |
| Framer Motion | 12.x | Parallax effects, scroll animations |
| React Icons | 5.x | Social/UI icons |

**Deployment:** Vercel (github.com/nkulavic/dreamscape-r.art)

---

## Project Structure

```
src/app/
├── layout.tsx              # Root layout, fonts, metadata
├── page.tsx                # Homepage with parallax hero
├── globals.css             # Design system + color tokens
├── portfolio/
│   ├── page.tsx            # Gallery grid with filters
│   └── [slug]/page.tsx     # Individual mural + artist story
├── about/page.tsx          # Rachel's story (reworked)
├── services/page.tsx       # Commission process + booking
├── cv/page.tsx             # Experience, clients, exhibitions
├── publications/page.tsx   # Press coverage
├── contact/page.tsx        # Form + scheduling widget
├── components/
│   ├── layout/             # Header, Footer, Navigation
│   ├── home/               # Hero, FeaturedMurals, ClientLogos
│   ├── portfolio/          # MuralGrid, MuralCard, LightboxGallery
│   ├── ui/                 # ParallaxSection, ScrollReveal, Button
│   └── forms/              # ContactForm, SchedulingWidget
└── data/
    ├── siteConfig.ts       # Global config
    ├── murals.ts           # Mural data with artist stories
    ├── clients.ts          # Client list
    └── experience.ts       # CV data
public/
└── images/murals/          # High-res mural images
```

---

## Key Features

### 1. Full-Size Parallax Effects
- **Hero sections:** Full-bleed mural images with 50% parallax speed
- **Section dividers:** Subtle parallax between content sections
- **Individual mural pages:** Parallax hero for each piece
- **Implementation:** Framer Motion `useScroll` + `useTransform` (pattern from destinyblazek)

### 2. Artist Notes & Journey
Each mural includes storytelling elements:
```typescript
interface Mural {
  id: string;
  title: string;
  location: { venue: string; city: string; state?: string; country: string };
  year: number;
  dimensions?: { width: number; height: number; unit: "ft" | "m" };
  category: "commercial" | "community" | "education" | "international";
  // Storytelling fields
  artistNote: string;           // Rachel's personal reflection
  inspiration: string;          // What inspired this piece
  process: string;              // How it was created
  impact?: string;              // Community/client impact
  behindTheScenes?: string[];   // Process photos
  images: { hero: string; gallery: string[]; thumbnail: string };
}
```

### 3. Mobile Responsive
- Mobile-first design approach
- Touch-friendly gallery navigation
- Reduced parallax on mobile for performance
- Hamburger menu with slide-in drawer

### 4. Scheduling Integration
**Initial:** Placeholder contact form (design-focused first)
**Future:** HubSpot Free CRM + scheduling (to be integrated later)

Interactive contact form with project details:
- Organization name
- Project type (commercial/community/education)
- Estimated wall size
- Location
- Timeline
- Budget range
- Message

### 5. Future AI Feature (Placeholder)
Prepare structure for future "Mural Brainstormer" tool:
- Collect space details from potential clients
- Future: AI-powered concept suggestions
- Initial version: Structured form that emails Rachel

---

## Design Direction

### Color Palette (inspired by Rachel's murals)
```css
:root {
  /* Ocean Blues - Primary */
  --ocean-deep: #0a2463;
  --ocean: #1e6091;
  --ocean-light: #168aad;

  /* Coral & Orange - Accent */
  --coral: #f77f00;
  --coral-light: #fcbf49;

  /* Teal - Secondary */
  --teal: #2ec4b6;
  --teal-dark: #3d5a80;

  /* Sunset Purple - Highlight */
  --sunset: #7209b7;

  /* Neutrals */
  --cream: #faf8f5;
  --dark: #1f2937;
}
```

### Typography
- **Display:** Bold, impactful (Bebas Neue or similar)
- **Headings:** Clean sans-serif (Montserrat)
- **Body:** Highly readable (Inter)

### Visual Style
- Full-bleed mural images as heroes
- High contrast overlays for text legibility
- Generous whitespace to let artwork breathe
- Subtle grain/texture for artistic feel
- Smooth scroll-triggered animations

---

## Content Strategy (Reworked)

### About Page - New Direction
Instead of copying existing bio, create compelling narrative:
- **Opening:** Hook with Rachel's artistic mission
- **Journey:** How she became a muralist (10+ years)
- **Philosophy:** Community-driven, socially conscious art
- **Credentials:** RN BSN, OSHA certified, insured
- **Impact:** Organizations she's supported (ocean conservation, youth education)

### Mural Stories
Each piece needs artist-written content:
- What inspired this mural?
- Challenges/breakthroughs during creation
- Reaction from community/client
- Personal meaning to Rachel

### Key Messages to Convey
- Professional, experienced muralist (not hobbyist)
- Community-focused, values-driven
- Handles large-scale commercial projects (7,500 sq ft Molson Coors)
- International experience (Germany, UK, Colombia, Hawaii)
- Works with major organizations (Walmart, Girl Scouts, School Districts)

---

## Implementation Phases

### Phase 1: Project Setup
- Initialize Next.js 15 + TypeScript
- Configure Tailwind v4 with design tokens
- Set up Vercel deployment
- Create folder structure

### Phase 2: Design System
- Define color palette in globals.css
- Typography setup
- Core UI components (Button, Card)
- ParallaxSection component

### Phase 3: Layout Components
- Header with scroll-aware styling
- Mobile navigation
- Footer with social links

### Phase 4: Data Layer
- siteConfig.ts with all site data
- murals.ts with placeholder for artist stories
- clients.ts with major client list
- Download/organize mural images from existing sites

### Phase 5: Homepage
- Full-screen parallax hero
- Featured murals section
- Client logos
- About preview
- CTA section

### Phase 6: Portfolio
- Gallery grid with filters
- Individual mural pages with artist stories
- Lightbox functionality

### Phase 7: Content Pages
- About (new narrative needed)
- Services/Booking
- CV/Resume
- Publications

### Phase 8: Contact & Scheduling
- Contact form
- Calendly integration
- Form submission handling

### Phase 9: Polish
- Scroll animations
- Image optimization
- SEO metadata
- Accessibility audit

---

## Critical Reference Files

1. `/Users/nickkulavic/Projects/destinyblazek/src/app/components/ParallaxSection.tsx` - Parallax pattern
2. `/Users/nickkulavic/Projects/destinyblazek/src/app/globals.css` - Tailwind v4 design system
3. `/Users/nickkulavic/Projects/destinyblazek/src/app/data/siteConfig.ts` - Data layer pattern
4. `/Users/nickkulavic/Projects/destinyblazek/package.json` - Dependency versions

---

## Verification

### Pre-Launch Checklist
- [ ] All navigation works
- [ ] Contact form submits
- [ ] Scheduling widget functional
- [ ] Gallery/lightbox works
- [ ] Mobile responsive on all pages
- [ ] Parallax smooth on scroll
- [ ] Lighthouse Performance > 90
- [ ] Images optimized
- [ ] SEO metadata complete
- [ ] Accessibility (WCAG AA)

### Cross-Browser Testing
- Chrome, Safari, Firefox, Edge
- iOS Safari, Android Chrome

---

## Content Approach

### Initial Build (Now)
- **Images:** Download from existing sites (dreamscaper.myportfolio.com, dreamscape-r.art)
- **Artist stories:** AI-generated placeholder content based on visible info
- **Bio:** Reworked professional narrative (placeholder, Rachel reviews later)
- **Scheduling:** Placeholder form (HubSpot integration later)

### Future Updates (Rachel Provides)
1. High-resolution original images
2. Review/refine artist stories for accuracy
3. Updated bio content
4. Client testimonials (if available)
5. HubSpot account setup for scheduling

---

## Notes

- Design-first approach - get the visual experience right
- All written content is placeholder until Rachel reviews
- Images from existing sites will work for development; swap for high-res later
- Future AI brainstorming feature is planned but not in initial scope
