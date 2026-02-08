import { getAllPublications } from "@/db/dal";
import PublicationsClient from "./PublicationsClient";

export default async function PublicationsPage() {
  const publications = await getAllPublications();
  return <PublicationsClient publications={publications} />;
}
