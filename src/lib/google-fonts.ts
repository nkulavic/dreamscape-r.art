export interface FontOption {
  name: string;
  category: "display" | "heading" | "body";
  weights: string[];
  style: string; // CSS sample for preview
}

/**
 * Curated list of Google Fonts suitable for a portfolio/art site.
 * Categorized by recommended usage.
 */
export const FONT_OPTIONS: FontOption[] = [
  // Display fonts (bold, impactful, great for hero titles)
  { name: "Bebas Neue", category: "display", weights: ["400"], style: "uppercase" },
  { name: "Anton", category: "display", weights: ["400"], style: "uppercase" },
  { name: "Oswald", category: "display", weights: ["400", "500", "600", "700"], style: "uppercase" },
  { name: "Russo One", category: "display", weights: ["400"], style: "uppercase" },
  { name: "Abril Fatface", category: "display", weights: ["400"], style: "normal" },
  { name: "Playfair Display", category: "display", weights: ["400", "500", "600", "700", "800"], style: "normal" },
  { name: "Josefin Sans", category: "display", weights: ["400", "500", "600", "700"], style: "uppercase" },
  { name: "Righteous", category: "display", weights: ["400"], style: "normal" },
  { name: "Permanent Marker", category: "display", weights: ["400"], style: "normal" },
  { name: "Bungee", category: "display", weights: ["400"], style: "uppercase" },

  // Heading fonts (versatile, clean, great for section titles)
  { name: "Montserrat", category: "heading", weights: ["400", "500", "600", "700", "800"], style: "normal" },
  { name: "Raleway", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "Poppins", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "Lato", category: "heading", weights: ["400", "700"], style: "normal" },
  { name: "Source Sans 3", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "Work Sans", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "DM Sans", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "Cormorant Garamond", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "Libre Baskerville", category: "heading", weights: ["400", "700"], style: "normal" },
  { name: "Quicksand", category: "heading", weights: ["400", "500", "600", "700"], style: "normal" },

  // Body fonts (highly readable, clean for long-form text)
  { name: "Inter", category: "body", weights: ["300", "400", "500", "600"], style: "normal" },
  { name: "Nunito", category: "body", weights: ["300", "400", "500", "600"], style: "normal" },
  { name: "Open Sans", category: "body", weights: ["300", "400", "500", "600"], style: "normal" },
  { name: "Roboto", category: "body", weights: ["300", "400", "500", "700"], style: "normal" },
  { name: "Source Serif 4", category: "body", weights: ["300", "400", "500", "600"], style: "normal" },
  { name: "Merriweather", category: "body", weights: ["300", "400", "700"], style: "normal" },
  { name: "Crimson Text", category: "body", weights: ["400", "600", "700"], style: "normal" },
  { name: "Karla", category: "body", weights: ["300", "400", "500", "600"], style: "normal" },
  { name: "Cabin", category: "body", weights: ["400", "500", "600", "700"], style: "normal" },
  { name: "Libre Franklin", category: "body", weights: ["300", "400", "500", "600"], style: "normal" },
];

/**
 * Get fonts filtered by category
 */
export function getFontsByCategory(category: FontOption["category"]): FontOption[] {
  return FONT_OPTIONS.filter((f) => f.category === category);
}

/**
 * Get all unique font names used across categories
 */
export function getAllFontNames(): string[] {
  return [...new Set(FONT_OPTIONS.map((f) => f.name))];
}

/**
 * Build a Google Fonts CSS URL for loading specific fonts.
 * Used client-side in the theme editor for live preview.
 */
export function buildPreviewFontURL(fontNames: string[]): string {
  if (fontNames.length === 0) return "";

  const families = fontNames
    .map((name) => {
      const font = FONT_OPTIONS.find((f) => f.name === name);
      const weights = font ? font.weights.join(";") : "400;700";
      return `family=${name.replace(/ /g, "+")}:wght@${weights}`;
    })
    .join("&");

  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
