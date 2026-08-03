import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Mural Commission Services & Process",
  description:
    "Commission a custom mural from Rachel Dinda. Commercial, community, educational, and residential mural services. Discovery, design, and creation process explained.",
  keywords: [
    "mural commission",
    "custom mural",
    "mural services",
    "commercial mural artist",
    "community mural",
    "mural process",
    "hire a muralist",
    "Denver mural commission",
    "DREAMSCAPER services",
  ],
  openGraph: {
    title: "Mural Commission Services | DREAMSCAPER",
    description:
      "From concept to completion — commission a custom mural for your business, school, or community space.",
    type: "website",
    url: "https://dreamscaper.art/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mural Commission Services | DREAMSCAPER",
    description:
      "From concept to completion — commission a custom mural from Rachel Dinda.",
  },
  alternates: {
    canonical: "https://dreamscaper.art/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
