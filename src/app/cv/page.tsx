import {
  getAllExhibitions,
  getAllFestivals,
  getAllPublications,
  getClientsByCategory,
} from "@/db/dal";
import CVClient from "./CVClient";

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
