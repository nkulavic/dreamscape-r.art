import { getSiteSettings } from "@/db/dal";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-4xl tracking-wide text-gray-900">
        Settings
      </h1>
      <p className="mt-1 font-heading text-sm text-gray-500">
        Configure site-wide settings.
      </p>

      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
