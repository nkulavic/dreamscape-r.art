import { getSeoDefaults } from "@/db/dal";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

// Site-wide share card. The background is whatever Settings → SEO → OG Image
// points at, so it stays admin-editable.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "DREAMSCAPER — Rachel Dinda, professional muralist";

export default async function OpengraphImage() {
  const seo = await getSeoDefaults();

  return renderOgCard({
    eyebrow: "Rachel Dinda · Denver, Colorado",
    title: "Large-scale murals, guided by community",
    footnote: "Commission a mural — dreamscaper.art",
    imageSrc: seo.ogImage,
  });
}
