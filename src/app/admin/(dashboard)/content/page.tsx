import { getSiteSettings } from "@/db/dal";
import ContentForm from "./ContentForm";

export default async function ContentPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Content
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Edit your artist bio, statement, mission, and testimonials. These appear
        on the About page and throughout the site.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ContentForm settings={settings} />
      </div>
    </div>
  );
}
