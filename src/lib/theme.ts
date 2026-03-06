export interface SiteTheme {
  // Preset identifier (null if fully custom)
  presetId: string | null;

  // Accent colors
  accentColor: string;
  accentColorLight: string;
  accentColorDark: string;

  // Primary colors (ocean blues)
  primaryDeep: string;
  primary: string;
  primaryLight: string;
  primaryPale: string;

  // Secondary colors (teal)
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // Highlight colors (sunset purple)
  highlight: string;
  highlightLight: string;
  highlightDark: string;

  // Neutrals
  background: string;
  surfaceColor: string;
  textPrimary: string;
  textMuted: string;
  darkColor: string;

  // Font families (Google Font names)
  fontDisplay: string;
  fontHeading: string;
  fontBody: string;

  // Font sizes (rem)
  fontSizeDisplay: string;
  fontSizeH1: string;
  fontSizeH2: string;
  fontSizeH3: string;
  fontSizeH4: string;

  // Button styles
  buttonRadius: string;
  buttonPaddingY: string;
  buttonPaddingX: string;
  buttonFontSize: string;
  buttonTextTransform: string;

  // Card styles
  cardRadius: string;
  cardShadow: string;
  cardHoverLift: string;

  // Section spacing
  sectionSpacing: string;
}

export const DEFAULT_THEME: SiteTheme = {
  presetId: "default",

  accentColor: "#f77f00",
  accentColorLight: "#fcbf49",
  accentColorDark: "#d66800",

  primaryDeep: "#0a2463",
  primary: "#1e6091",
  primaryLight: "#168aad",
  primaryPale: "#b8d4e3",

  secondary: "#2ec4b6",
  secondaryLight: "#5dd9ce",
  secondaryDark: "#3d5a80",

  highlight: "#7209b7",
  highlightLight: "#9d4edd",
  highlightDark: "#560bad",

  background: "#faf8f5",
  surfaceColor: "#ffffff",
  textPrimary: "#1f2937",
  textMuted: "#4b5563",
  darkColor: "#0f172a",

  fontDisplay: "Bebas Neue",
  fontHeading: "Montserrat",
  fontBody: "Inter",

  fontSizeDisplay: "5rem",
  fontSizeH1: "3.5rem",
  fontSizeH2: "2.5rem",
  fontSizeH3: "1.875rem",
  fontSizeH4: "1.5rem",

  buttonRadius: "9999px",
  buttonPaddingY: "1rem",
  buttonPaddingX: "2.5rem",
  buttonFontSize: "0.9rem",
  buttonTextTransform: "uppercase",

  cardRadius: "1.5rem",
  cardShadow: "md",
  cardHoverLift: "8px",

  sectionSpacing: "6rem",
};

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  theme: SiteTheme;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Coral Sunset",
    description: "The original DREAMSCAPER palette — ocean blues with warm coral accents",
    theme: { ...DEFAULT_THEME, presetId: "default" },
  },
  {
    id: "ocean-teal",
    name: "Ocean Teal",
    description: "Cool and calming — teal accents with deep navy tones",
    theme: {
      ...DEFAULT_THEME,
      presetId: "ocean-teal",
      accentColor: "#2ec4b6",
      accentColorLight: "#5dd9ce",
      accentColorDark: "#1a9e92",
      highlight: "#0891b2",
      highlightLight: "#22d3ee",
      highlightDark: "#0e7490",
      fontDisplay: "Oswald",
    },
  },
  {
    id: "sunset-purple",
    name: "Sunset Purple",
    description: "Bold and artistic — rich purples with vibrant energy",
    theme: {
      ...DEFAULT_THEME,
      presetId: "sunset-purple",
      accentColor: "#7209b7",
      accentColorLight: "#9d4edd",
      accentColorDark: "#560bad",
      primaryDeep: "#1a0533",
      primary: "#2d1b4e",
      primaryLight: "#6b21a8",
      primaryPale: "#ddd6fe",
      highlight: "#e63988",
      highlightLight: "#ff6b9d",
      highlightDark: "#c4256e",
      fontDisplay: "Playfair Display",
      fontHeading: "Raleway",
    },
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    description: "Warm and inviting — golden tones with earthy depth",
    theme: {
      ...DEFAULT_THEME,
      presetId: "golden-hour",
      accentColor: "#d4a20a",
      accentColorLight: "#f0c14b",
      accentColorDark: "#b8860b",
      primaryDeep: "#2d1f0e",
      primary: "#78350f",
      primaryLight: "#a16207",
      primaryPale: "#fef3c7",
      secondary: "#92400e",
      secondaryLight: "#d97706",
      secondaryDark: "#451a03",
      highlight: "#dc2626",
      highlightLight: "#f87171",
      highlightDark: "#991b1b",
      background: "#fffbeb",
      fontDisplay: "Abril Fatface",
      fontHeading: "Lato",
    },
  },
  {
    id: "emerald",
    name: "Emerald Forest",
    description: "Natural and grounded — emerald greens with organic warmth",
    theme: {
      ...DEFAULT_THEME,
      presetId: "emerald",
      accentColor: "#10b981",
      accentColorLight: "#34d399",
      accentColorDark: "#059669",
      primaryDeep: "#052e16",
      primary: "#14532d",
      primaryLight: "#15803d",
      primaryPale: "#bbf7d0",
      secondary: "#ca8a04",
      secondaryLight: "#eab308",
      secondaryDark: "#854d0e",
      highlight: "#0d9488",
      highlightLight: "#2dd4bf",
      highlightDark: "#0f766e",
      background: "#f0fdf4",
      fontDisplay: "Josefin Sans",
      fontHeading: "Source Sans 3",
    },
  },
  {
    id: "electric-blue",
    name: "Electric Blue",
    description: "Modern and bold — electric blue with sharp contemporary edges",
    theme: {
      ...DEFAULT_THEME,
      presetId: "electric-blue",
      accentColor: "#2563eb",
      accentColorLight: "#60a5fa",
      accentColorDark: "#1d4ed8",
      primaryDeep: "#0c1226",
      primary: "#1e3a5f",
      primaryLight: "#3b82f6",
      primaryPale: "#bfdbfe",
      secondary: "#06b6d4",
      secondaryLight: "#22d3ee",
      secondaryDark: "#0891b2",
      highlight: "#8b5cf6",
      highlightLight: "#a78bfa",
      highlightDark: "#7c3aed",
      background: "#f8fafc",
      fontDisplay: "Russo One",
      fontHeading: "Poppins",
      buttonRadius: "0.75rem",
    },
  },
  {
    id: "dusty-rose",
    name: "Dusty Rose",
    description: "Elegant and soft — rose tones with sophisticated warmth",
    theme: {
      ...DEFAULT_THEME,
      presetId: "dusty-rose",
      accentColor: "#be185d",
      accentColorLight: "#ec4899",
      accentColorDark: "#9d174d",
      primaryDeep: "#1a0a12",
      primary: "#4a1942",
      primaryLight: "#831843",
      primaryPale: "#fce7f3",
      secondary: "#d946ef",
      secondaryLight: "#e879f9",
      secondaryDark: "#a21caf",
      highlight: "#f43f5e",
      highlightLight: "#fb7185",
      highlightDark: "#e11d48",
      background: "#fdf2f8",
      fontDisplay: "Playfair Display",
      fontHeading: "Cormorant Garamond",
      fontBody: "Nunito",
      buttonRadius: "0.5rem",
    },
  },
  {
    id: "monochrome",
    name: "Monochrome",
    description: "Minimal and clean — black and white with a single bold accent",
    theme: {
      ...DEFAULT_THEME,
      presetId: "monochrome",
      accentColor: "#ef4444",
      accentColorLight: "#f87171",
      accentColorDark: "#dc2626",
      primaryDeep: "#000000",
      primary: "#171717",
      primaryLight: "#404040",
      primaryPale: "#d4d4d4",
      secondary: "#525252",
      secondaryLight: "#737373",
      secondaryDark: "#262626",
      highlight: "#ef4444",
      highlightLight: "#f87171",
      highlightDark: "#dc2626",
      background: "#fafafa",
      fontDisplay: "Anton",
      fontHeading: "Inter",
      fontBody: "Inter",
      buttonRadius: "0",
    },
  },
];

// Shadow presets mapped by intensity key
const SHADOW_MAP: Record<string, string> = {
  none: "none",
  sm: "0 1px 2px 0 rgba(10, 36, 99, 0.05)",
  md: "0 4px 6px -1px rgba(10, 36, 99, 0.1), 0 2px 4px -2px rgba(10, 36, 99, 0.1)",
  lg: "0 10px 15px -3px rgba(10, 36, 99, 0.1), 0 4px 6px -4px rgba(10, 36, 99, 0.1)",
  xl: "0 20px 25px -5px rgba(10, 36, 99, 0.15), 0 8px 10px -6px rgba(10, 36, 99, 0.1)",
};

/**
 * Convert a SiteTheme to CSS custom property overrides for :root
 */
export function themeToCSS(theme: SiteTheme): string {
  const shadow = SHADOW_MAP[theme.cardShadow] || SHADOW_MAP.md;

  return `:root {
  --accent-color: ${theme.accentColor};
  --accent-color-light: ${theme.accentColorLight};
  --accent-color-dark: ${theme.accentColorDark};

  --color-ocean-deep: ${theme.primaryDeep};
  --color-ocean: ${theme.primary};
  --color-ocean-light: ${theme.primaryLight};
  --color-ocean-pale: ${theme.primaryPale};

  --color-teal: ${theme.secondary};
  --color-teal-light: ${theme.secondaryLight};
  --color-teal-dark: ${theme.secondaryDark};

  --color-sunset: ${theme.highlight};
  --color-sunset-light: ${theme.highlightLight};
  --color-sunset-dark: ${theme.highlightDark};

  --color-cream: ${theme.background};
  --color-white: ${theme.surfaceColor};
  --color-gray-800: ${theme.textPrimary};
  --color-gray-600: ${theme.textMuted};
  --color-dark: ${theme.darkColor};

  --font-display: "${theme.fontDisplay}", Impact, sans-serif;
  --font-heading: "${theme.fontHeading}", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: "${theme.fontBody}", -apple-system, BlinkMacSystemFont, sans-serif;

  --font-size-display: ${theme.fontSizeDisplay};
  --font-size-h1: ${theme.fontSizeH1};
  --font-size-h2: ${theme.fontSizeH2};
  --font-size-h3: ${theme.fontSizeH3};
  --font-size-h4: ${theme.fontSizeH4};

  --spacing-section: ${theme.sectionSpacing};

  --theme-button-radius: ${theme.buttonRadius};
  --theme-button-padding-y: ${theme.buttonPaddingY};
  --theme-button-padding-x: ${theme.buttonPaddingX};
  --theme-button-font-size: ${theme.buttonFontSize};
  --theme-button-text-transform: ${theme.buttonTextTransform};

  --theme-card-radius: ${theme.cardRadius};
  --theme-card-shadow: ${shadow};
  --theme-card-hover-lift: ${theme.cardHoverLift};
}`;
}

/**
 * Build Google Fonts <link> hrefs for a theme.
 * Returns array of stylesheet URLs.
 */
export function buildGoogleFontLinks(theme: SiteTheme): string[] {
  const defaultFonts = ["Bebas Neue", "Montserrat", "Inter"];
  const fonts = new Set<string>();

  // Only add fonts that aren't already loaded via next/font
  if (!defaultFonts.includes(theme.fontDisplay)) fonts.add(theme.fontDisplay);
  if (!defaultFonts.includes(theme.fontHeading)) fonts.add(theme.fontHeading);
  if (!defaultFonts.includes(theme.fontBody)) fonts.add(theme.fontBody);

  if (fonts.size === 0) return [];

  const families = Array.from(fonts)
    .map((f) => {
      const encoded = f.replace(/ /g, "+");
      return `family=${encoded}:wght@300;400;500;600;700;800`;
    })
    .join("&");

  return [`https://fonts.googleapis.com/css2?${families}&display=swap`];
}

/**
 * Apply a SiteTheme to the DOM by setting CSS custom properties.
 * Client-side only.
 */
export function applyThemeToDOM(theme: SiteTheme): void {
  const root = document.documentElement;
  const shadow = SHADOW_MAP[theme.cardShadow] || SHADOW_MAP.md;

  root.style.setProperty("--accent-color", theme.accentColor);
  root.style.setProperty("--accent-color-light", theme.accentColorLight);
  root.style.setProperty("--accent-color-dark", theme.accentColorDark);

  root.style.setProperty("--color-ocean-deep", theme.primaryDeep);
  root.style.setProperty("--color-ocean", theme.primary);
  root.style.setProperty("--color-ocean-light", theme.primaryLight);
  root.style.setProperty("--color-ocean-pale", theme.primaryPale);

  root.style.setProperty("--color-teal", theme.secondary);
  root.style.setProperty("--color-teal-light", theme.secondaryLight);
  root.style.setProperty("--color-teal-dark", theme.secondaryDark);

  root.style.setProperty("--color-sunset", theme.highlight);
  root.style.setProperty("--color-sunset-light", theme.highlightLight);
  root.style.setProperty("--color-sunset-dark", theme.highlightDark);

  root.style.setProperty("--color-cream", theme.background);
  root.style.setProperty("--color-white", theme.surfaceColor);
  root.style.setProperty("--color-gray-800", theme.textPrimary);
  root.style.setProperty("--color-gray-600", theme.textMuted);
  root.style.setProperty("--color-dark", theme.darkColor);

  root.style.setProperty("--font-display", `"${theme.fontDisplay}", Impact, sans-serif`);
  root.style.setProperty("--font-heading", `"${theme.fontHeading}", -apple-system, BlinkMacSystemFont, sans-serif`);
  root.style.setProperty("--font-body", `"${theme.fontBody}", -apple-system, BlinkMacSystemFont, sans-serif`);

  root.style.setProperty("--font-size-display", theme.fontSizeDisplay);
  root.style.setProperty("--font-size-h1", theme.fontSizeH1);
  root.style.setProperty("--font-size-h2", theme.fontSizeH2);
  root.style.setProperty("--font-size-h3", theme.fontSizeH3);
  root.style.setProperty("--font-size-h4", theme.fontSizeH4);

  root.style.setProperty("--spacing-section", theme.sectionSpacing);

  root.style.setProperty("--theme-button-radius", theme.buttonRadius);
  root.style.setProperty("--theme-button-padding-y", theme.buttonPaddingY);
  root.style.setProperty("--theme-button-padding-x", theme.buttonPaddingX);
  root.style.setProperty("--theme-button-font-size", theme.buttonFontSize);
  root.style.setProperty("--theme-button-text-transform", theme.buttonTextTransform);

  root.style.setProperty("--theme-card-radius", theme.cardRadius);
  root.style.setProperty("--theme-card-shadow", shadow);
  root.style.setProperty("--theme-card-hover-lift", theme.cardHoverLift);
}

/**
 * HSL helper: lighten a hex color by a percentage
 */
export function lightenColor(hex: string, percent: number): string {
  const { h, s, l } = hexToHSL(hex);
  const newL = Math.min(100, l + percent);
  return hslToHex(h, s, newL);
}

/**
 * HSL helper: darken a hex color by a percentage
 */
export function darkenColor(hex: string, percent: number): string {
  const { h, s, l } = hexToHSL(hex);
  const newL = Math.max(0, l - percent);
  return hslToHex(h, s, newL);
}

/**
 * Generate light and dark variants from a base color
 */
export function generateVariants(base: string): { light: string; dark: string } {
  return {
    light: lightenColor(base, 15),
    dark: darkenColor(base, 12),
  };
}

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);

  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}
