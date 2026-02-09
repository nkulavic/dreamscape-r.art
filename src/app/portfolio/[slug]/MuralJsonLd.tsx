import type { Mural } from "@/db/dal";

export default function MuralJsonLd({ mural }: { mural: Mural }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://dreamscaper.art/portfolio/${mural.slug}`,
    name: mural.title,
    description: mural.description,
    image: [mural.images.hero, ...mural.images.gallery],
    creator: {
      "@type": "Person",
      name: "Rachel Dinda",
      alternateName: "DREAMSCAPER",
      url: "https://dreamscaper.art",
      jobTitle: "Professional Muralist",
      sameAs: [
        "https://www.instagram.com/dreamscape_r",
      ],
    },
    dateCreated: new Date(mural.year, 0, 1).toISOString(),
    genre: "Mural Art",
    keywords: mural.tags.join(", "),
    artMedium: "Paint",
    artform: "Mural",
    ...(mural.dimensions && {
      width: {
        "@type": "QuantitativeValue",
        value: mural.dimensions.size?.split("x")[0]?.trim(),
        unitText: mural.dimensions.unit,
      },
      height: {
        "@type": "QuantitativeValue",
        value: mural.dimensions.size?.split("x")[1]?.trim(),
        unitText: mural.dimensions.unit,
      },
    }),
    locationCreated: {
      "@type": "Place",
      name: mural.location.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: mural.location.city,
        ...(mural.location.state && { addressRegion: mural.location.state }),
        addressCountry: mural.location.country,
      },
      ...(mural.location.coordinates && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: mural.location.coordinates.lat,
          longitude: mural.location.coordinates.lng,
        },
      }),
    },
    ...(mural.client && {
      sponsor: {
        "@type": "Organization",
        name: mural.client,
      },
    }),
    abstract: mural.artistNote,
    commentCount: 0,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ViewAction",
      userInteractionCount: 0,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
