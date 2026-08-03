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
  },
  twitter: {
    card: "summary_large_image",
    title: "Mural Portfolio | DREAMSCAPER",
    description:
      "Browse 50+ professional mural projects by Rachel Dinda.",
  },
  alternates: {
    canonical: "https://dreamscaper.art/portfolio",
  },
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [murals, params] = await Promise.all([getAllMurals(), searchParams]);

  // Reading the filters here rather than with useSearchParams() keeps the grid
  // server-rendered — the client component would otherwise opt the whole page
  // out of prerendering and leave it blank until hydration.
  return (
    <PortfolioClient
      murals={murals}
      initialTag={firstValue(params.tag)}
      initialMatch={firstValue(params.match)}
      initialSort={firstValue(params.sort)}
    />
  );
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
