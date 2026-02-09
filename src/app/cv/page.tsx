import type { Metadata } from "next";
import {
  getAllExhibitions,
  getAllFestivals,
  getAllPublications,
  getClientsByCategory,
} from "@/db/dal";
import CVClient from "./CVClient";

export const metadata: Metadata = {
  title: "CV & Credentials — Exhibitions, Festivals, Clients",
  description:
    "Rachel Dinda's professional CV: exhibitions, festival appearances, publications, and client list spanning 10+ years of mural artistry.",
  keywords: [
    "Rachel Dinda CV",
    "muralist resume",
    "mural exhibitions",
    "art festivals",
    "DREAMSCAPER credentials",
    "mural artist experience",
  ],
  openGraph: {
    title: "CV & Credentials | DREAMSCAPER",
    description:
      "Exhibitions, festivals, publications, and clients from 10+ years of professional mural artistry.",
    type: "profile",
    url: "https://dreamscaper.art/cv",
  },
  twitter: {
    card: "summary",
    title: "CV & Credentials | DREAMSCAPER",
    description:
      "Exhibitions, festivals, publications, and clients from 10+ years of professional mural artistry.",
  },
  alternates: {
    canonical: "https://dreamscaper.art/cv",
  },
};

export default async function CVPage() {
  const [exhibitions, festivals, publications, corporateClients, communityClients, educationClients] =
    await Promise.all([
      getAllExhibitions(),
      getAllFestivals(),
      getAllPublications(),
      getClientsByCategory("corporate"),
      getClientsByCategory("community"),
      getClientsByCategory("education"),
    ]);

  return (
    <CVClient
      exhibitions={exhibitions}
      festivals={festivals}
      publications={publications}
      corporateClients={corporateClients}
      communityClients={communityClients}
      educationClients={educationClients}
    />
  );
}
