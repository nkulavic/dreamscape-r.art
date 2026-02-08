import {
  getAllExhibitions,
  getAllFestivals,
  getAllPublications,
} from "@/db/dal";
import ExperienceClient from "./ExperienceClient";

export default async function ExperiencePage() {
  const [exhibitions, festivals, publications] = await Promise.all([
    getAllExhibitions(),
    getAllFestivals(),
    getAllPublications(),
  ]);

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Experience
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Manage exhibitions, festivals, and publications.
      </p>

      <div className="mt-8">
        <ExperienceClient
          exhibitions={exhibitions}
          festivals={festivals}
          publications={publications}
        />
      </div>
    </div>
  );
}
