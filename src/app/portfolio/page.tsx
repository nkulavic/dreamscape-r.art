import type { Metadata } from "next";
import { getAllMurals } from "@/db/dal";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio | Mural Gallery",
  description:
    "Explore Rachel Dinda's complete portfolio of large-scale murals. Commercial, community, education, and international projects spanning 10+ years of professional mural artistry.",
  keywords: [
    "mural portfolio",
    "mural gallery",
    "street art portfolio",
    "public art projects",
    "commercial murals",
    "community murals",
    "international murals",
    "Rachel Dinda portfolio",
    "DREAMSCAPER work",
  ],
  openGraph: {
    title: "Mural Portfolio | DREAMSCAPER",
    description:
      "Browse 50+ professional mural projects across the US and internationally. Commercial, community, and public art installations by Rachel Dinda.",
    type: "website",
    url: "https://dreamscaper.art/portfolio",
    images: [
      {
        url: "/images/murals/protect-your-peace.jpg",
        width: 1200,
        height: 630,
        alt: "DREAMSCAPER Mural Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mural Portfolio | DREAMSCAPER",
    description:
      "Browse 50+ professional mural projects by Rachel Dinda.",
    images: ["/images/murals/protect-your-peace.jpg"],
  },
  alternates: {
    canonical: "https://dreamscaper.art/portfolio",
  },
};

export default async function PortfolioPage() {
  const murals = await getAllMurals();
  return <PortfolioClient murals={murals} />;
}
