import type { Metadata } from "next";
import { getAllPublications } from "@/db/dal";
import PublicationsClient from "./PublicationsClient";

export const metadata: Metadata = {
  title: "Press & Publications",
  description:
    "Media features, press coverage, and publications featuring muralist Rachel Dinda and DREAMSCAPER mural projects.",
  keywords: [
    "Rachel Dinda press",
    "muralist publications",
    "DREAMSCAPER media",
    "mural artist press",
    "mural news",
  ],
  openGraph: {
    title: "Press & Publications | DREAMSCAPER",
    description:
      "Media features and press coverage of DREAMSCAPER mural projects by Rachel Dinda.",
    type: "website",
    url: "https://dreamscaper.art/publications",
  },
  twitter: {
    card: "summary",
    title: "Press & Publications | DREAMSCAPER",
    description:
      "Media features and press coverage of DREAMSCAPER mural projects.",
  },
  alternates: {
    canonical: "https://dreamscaper.art/publications",
  },
};

export default async function PublicationsPage() {
  const publications = await getAllPublications();
  return <PublicationsClient publications={publications} />;
}
