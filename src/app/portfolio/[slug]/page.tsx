import { notFound } from "next/navigation";
import { getAllMurals, getMuralBySlug, getMuralsByCategory } from "@/db/dal";
import MuralDetailClient from "./MuralDetailClient";
import MuralJsonLd from "./MuralJsonLd";

export async function generateStaticParams() {
  const murals = await getAllMurals();
  return murals.map((mural) => ({ slug: mural.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mural = await getMuralBySlug(slug);

  if (!mural) {
    return {
      title: "Mural Not Found",
      robots: { index: false, follow: false }
    };
  }

  // Use SEO overrides if available, otherwise auto-generate
  const title = mural.seo?.title || `${mural.title} | DREAMSCAPER`;
  const description = mural.seo?.description || mural.description;
  const imageUrl = mural.images.hero;
  const url = `https://dreamscaper.art/portfolio/${slug}`;

  // Use custom keywords or generate from tags and location
  const keywords = mural.seo?.keywords
    ? mural.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : [
        ...mural.tags,
        mural.category + " mural",
        mural.location.city + " mural",
        mural.location.state || mural.location.country,
        "Rachel Dinda",
        "DREAMSCAPER",
        "mural art",
        "street art",
        mural.location.venue,
      ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "DREAMSCAPER",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: mural.title,
        },
      ],
      article: {
        publishedTime: new Date(mural.year, 0, 1).toISOString(),
        authors: ["Rachel Dinda"],
        tags: mural.tags,
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@dreamscape_r",
    },
    other: {
      "geo.region": mural.location.state ? `US-${mural.location.state}` : mural.location.country,
      "geo.placename": mural.location.city,
      ...(mural.location.coordinates && {
        "geo.position": `${mural.location.coordinates.lat};${mural.location.coordinates.lng}`,
        "ICBM": `${mural.location.coordinates.lat}, ${mural.location.coordinates.lng}`,
      }),
    },
  };
}

export default async function MuralDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mural = await getMuralBySlug(slug);

  if (!mural) notFound();

  const related = await getMuralsByCategory(mural.category);
  const relatedMurals = related.filter((m) => m.id !== mural.id).slice(0, 3);

  return (
    <>
      <MuralJsonLd mural={mural} />
      <MuralDetailClient mural={mural} relatedMurals={relatedMurals} />
    </>
  );
}
