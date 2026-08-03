import { getMuralBySlug } from "@/db/dal";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

// Per-mural share card: the artwork itself, with the title and location laid
// over it, so a shared link shows a composed image rather than a random crop.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Mural by Rachel Dinda";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mural = await getMuralBySlug(slug);

  if (!mural) {
    return renderOgCard({
      eyebrow: "Portfolio",
      title: "Murals by Rachel Dinda",
      footnote: "dreamscaper.art",
    });
  }

  const location = [
    mural.location.city,
    mural.location.state || mural.location.country,
  ]
    .filter(Boolean)
    .join(", ");

  return renderOgCard({
    eyebrow: location,
    title: mural.title,
    footnote: `${mural.category} mural · ${mural.year}`,
    imageSrc: mural.images.hero,
  });
}
