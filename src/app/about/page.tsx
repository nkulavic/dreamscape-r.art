import type { Metadata } from "next";
import { getSiteSettings, getSocialLinks } from "@/db/dal";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Rachel Dinda — Muralist & Artist",
  description:
    "Denver-based muralist Rachel Dinda brings 10+ years of experience transforming spaces with vibrant, community-driven murals across the US and internationally.",
  keywords: [
    "Rachel Dinda",
    "DREAMSCAPER",
    "Denver muralist",
    "mural artist bio",
    "about Rachel Dinda",
    "community muralist",
    "professional muralist",
    "Colorado artist",
  ],
  openGraph: {
    title: "About Rachel Dinda | DREAMSCAPER",
    description:
      "10+ years transforming spaces with vibrant, community-driven murals. Learn about the artist behind DREAMSCAPER.",
    type: "profile",
    url: "https://dreamscaper.art/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rachel Dinda | DREAMSCAPER",
    description:
      "10+ years transforming spaces with vibrant, community-driven murals.",
  },
  alternates: {
    canonical: "https://dreamscaper.art/about",
  },
};

export default async function AboutPage() {
  const [settings, social] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
  ]);

  // Parse testimonials from JSON string
  let testimonials: { name: string; org: string; rating: number; text: string }[] = [];
  try {
    testimonials = settings.testimonials ? JSON.parse(settings.testimonials) : [];
  } catch {
    testimonials = [];
  }

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": "https://dreamscaper.art/#person",
      name: "Rachel Dinda",
      alternateName: "DREAMSCAPER",
      jobTitle: "Professional Muralist",
      description:
        settings.artist_bio ||
        "Large-scale mural artist with 10+ years experience creating vibrant, community-driven public art across the United States and internationally.",
      url: "https://dreamscaper.art",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Denver",
        addressRegion: "CO",
        addressCountry: "US",
      },
      sameAs: [
        social.instagram,
        social.facebook,
        social.youtube,
        social.linkedin,
      ].filter(Boolean),
      knowsAbout: [
        "Mural Art",
        "Street Art",
        "Public Art",
        "Large Scale Painting",
        "Community Art",
        "Commercial Art",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <AboutClient
        bio={settings.artist_bio || ""}
        artistStatement={settings.artist_statement || ""}
        missionStatement={settings.mission_statement || ""}
        testimonials={testimonials}
      />
    </>
  );
}
