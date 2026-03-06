import { getSiteTheme } from "@/db/dal";
import { DEFAULT_THEME } from "@/lib/theme";
import ThemeEditor from "./ThemeEditor";

export default async function ThemePage() {
  const theme = await getSiteTheme();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Theme Customization</h1>
        <p className="mt-1 text-sm text-gray-500">
          Customize colors, fonts, buttons, and layout for the entire site.
        </p>
      </div>
      <ThemeEditor initialTheme={theme ?? DEFAULT_THEME} />
    </div>
  );
}
