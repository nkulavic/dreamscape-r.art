"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import {
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Save,
  Undo2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import {
  type SiteTheme,
  DEFAULT_THEME,
  THEME_PRESETS,
  applyThemeToDOM,
  generateVariants,
} from "@/lib/theme";
import { FONT_OPTIONS, buildPreviewFontURL, type FontOption } from "@/lib/google-fonts";

// ─── Color Picker Field ─────────────────────────────────────

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="flex items-center gap-3" ref={ref}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="h-9 w-9 rounded-lg border-2 border-gray-200 shadow-sm transition-all hover:scale-105"
          style={{ backgroundColor: value }}
          title={`Pick color for ${label}`}
        />
        {open && (
          <div className="absolute left-0 top-11 z-50 rounded-xl bg-white p-3 shadow-xl border border-gray-200">
            <HexColorPicker color={value} onChange={onChange} />
          </div>
        )}
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-500">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v) || v === "") onChange(v);
          }}
          className="mt-0.5 w-full rounded-md border border-gray-200 px-2 py-1 text-sm font-mono text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          maxLength={7}
        />
      </div>
    </div>
  );
}

// ─── Color Group with auto-variant generation ────────────────

function ColorGroup({
  label,
  baseKey,
  lightKey,
  darkKey,
  theme,
  onChange,
}: {
  label: string;
  baseKey: keyof SiteTheme;
  lightKey: keyof SiteTheme;
  darkKey: keyof SiteTheme;
  theme: SiteTheme;
  onChange: (updates: Partial<SiteTheme>) => void;
}) {
  const handleAutoGenerate = () => {
    const base = theme[baseKey] as string;
    if (!base || !base.startsWith("#")) return;
    const variants = generateVariants(base);
    onChange({ [lightKey]: variants.light, [darkKey]: variants.dark });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700">{label}</h4>
        <button
          type="button"
          onClick={handleAutoGenerate}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
          title="Auto-generate light/dark variants"
        >
          <Sparkles className="h-3 w-3" />
          Auto
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <ColorField
          label="Base"
          value={theme[baseKey] as string}
          onChange={(v) => onChange({ [baseKey]: v })}
        />
        <ColorField
          label="Light"
          value={theme[lightKey] as string}
          onChange={(v) => onChange({ [lightKey]: v })}
        />
        <ColorField
          label="Dark"
          value={theme[darkKey] as string}
          onChange={(v) => onChange({ [darkKey]: v })}
        />
      </div>
    </div>
  );
}

// ─── Font Selector ───────────────────────────────────────────

function FontSelector({
  label,
  value,
  category,
  onChange,
}: {
  label: string;
  value: string;
  category: FontOption["category"];
  onChange: (font: string) => void;
}) {
  // Show all fonts but put the matching category first
  const sorted = [
    ...FONT_OPTIONS.filter((f) => f.category === category),
    ...FONT_OPTIONS.filter((f) => f.category !== category),
  ];

  // Deduplicate
  const seen = new Set<string>();
  const fonts = sorted.filter((f) => {
    if (seen.has(f.name)) return false;
    seen.add(f.name);
    return true;
  });

  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        style={{ fontFamily: `"${value}", sans-serif` }}
      >
        {fonts.map((f) => (
          <option key={f.name} value={f.name}>
            {f.name} {f.category !== category ? `(${f.category})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Slider Field ────────────────────────────────────────────

function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: string) => void;
}) {
  const numVal = parseFloat(value) || min;

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500">{label}</label>
        <span className="text-xs font-mono text-gray-400">
          {numVal}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={numVal}
        onChange={(e) => onChange(`${e.target.value}${unit}`)}
        className="mt-1 w-full accent-blue-600"
      />
    </div>
  );
}

// ─── Collapsible Section ─────────────────────────────────────

function Section({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {open ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && <div className="border-t border-gray-100 px-5 py-5 space-y-5">{children}</div>}
    </div>
  );
}

// ─── Live Preview Panel ──────────────────────────────────────

function LivePreview({ theme }: { theme: SiteTheme }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm"
      style={{
        fontFamily: `"${theme.fontBody}", -apple-system, sans-serif`,
      }}
    >
      {/* Mini Hero */}
      <div
        className="relative px-6 py-10 text-center text-white"
        style={{ backgroundColor: theme.primaryDeep }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primaryDeep} 0%, ${theme.primary} 100%)`,
            opacity: 0.9,
          }}
        />
        <div className="relative z-10">
          <h2
            className="mb-2 text-3xl font-bold tracking-wide"
            style={{
              fontFamily: `"${theme.fontDisplay}", Impact, sans-serif`,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            DREAMSCAPER
          </h2>
          <p
            className="mb-4 text-sm opacity-80"
            style={{ fontFamily: `"${theme.fontHeading}", sans-serif` }}
          >
            Rachel Dinda &bull; Professional Muralist
          </p>
          <div className="flex justify-center gap-3">
            <span
              className="inline-block text-xs text-white"
              style={{
                backgroundColor: theme.accentColor,
                padding: `${parseFloat(theme.buttonPaddingY) * 0.5}rem ${parseFloat(theme.buttonPaddingX) * 0.5}rem`,
                borderRadius: theme.buttonRadius,
                fontFamily: `"${theme.fontHeading}", sans-serif`,
                fontWeight: 600,
                textTransform: theme.buttonTextTransform as "uppercase" | "capitalize" | "none",
                fontSize: theme.buttonFontSize,
              }}
            >
              View Portfolio
            </span>
            <span
              className="inline-block text-xs"
              style={{
                padding: `${parseFloat(theme.buttonPaddingY) * 0.5}rem ${parseFloat(theme.buttonPaddingX) * 0.5}rem`,
                borderRadius: theme.buttonRadius,
                border: "2px solid white",
                color: "white",
                fontFamily: `"${theme.fontHeading}", sans-serif`,
                fontWeight: 600,
                textTransform: theme.buttonTextTransform as "uppercase" | "capitalize" | "none",
                fontSize: theme.buttonFontSize,
              }}
            >
              Commission
            </span>
          </div>
        </div>
      </div>

      {/* Sample Section */}
      <div className="p-5" style={{ backgroundColor: theme.surfaceColor }}>
        <p
          className="mb-1 text-xs font-semibold tracking-widest"
          style={{
            color: theme.accentColor,
            fontFamily: `"${theme.fontHeading}", sans-serif`,
            textTransform: "uppercase",
          }}
        >
          Featured Work
        </p>
        <h3
          className="mb-2 text-lg font-bold"
          style={{
            color: theme.textPrimary,
            fontFamily: `"${theme.fontHeading}", sans-serif`,
          }}
        >
          Transforming Spaces
        </h3>
        <p className="mb-4 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
          Large-scale murals that tell stories and connect communities through vibrant visual art.
        </p>

        {/* Mini Cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Community Mural", color: theme.secondary },
            { title: "Commercial Art", color: theme.highlight },
          ].map((item) => (
            <div
              key={item.title}
              className="overflow-hidden"
              style={{
                backgroundColor: theme.surfaceColor,
                borderRadius: theme.cardRadius,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <div className="h-14" style={{ backgroundColor: item.color }} />
              <div className="p-2">
                <p
                  className="text-xs font-semibold"
                  style={{
                    color: theme.textPrimary,
                    fontFamily: `"${theme.fontHeading}", sans-serif`,
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Outline Button */}
        <div className="mt-4 text-center">
          <span
            className="inline-block text-xs"
            style={{
              padding: `${parseFloat(theme.buttonPaddingY) * 0.4}rem ${parseFloat(theme.buttonPaddingX) * 0.4}rem`,
              borderRadius: theme.buttonRadius,
              border: `2px solid ${theme.accentColor}`,
              color: theme.accentColor,
              fontFamily: `"${theme.fontHeading}", sans-serif`,
              fontWeight: 600,
              textTransform: theme.buttonTextTransform as "uppercase" | "capitalize" | "none",
              fontSize: theme.buttonFontSize,
            }}
          >
            View All Work
          </span>
        </div>
      </div>

      {/* Dark Footer Preview */}
      <div
        className="px-5 py-4 text-center text-xs text-white/60"
        style={{ backgroundColor: theme.darkColor }}
      >
        <span
          style={{
            fontFamily: `"${theme.fontDisplay}", Impact, sans-serif`,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "white",
            fontSize: "1rem",
          }}
        >
          DREAMSCAPER
        </span>
      </div>
    </div>
  );
}

// ─── Main ThemeEditor Component ──────────────────────────────

export default function ThemeEditor({
  initialTheme,
}: {
  initialTheme: SiteTheme;
}) {
  const [theme, setTheme] = useState<SiteTheme>(initialTheme);
  const [history, setHistory] = useState<SiteTheme[]>([]);
  const [saving, setSaving] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());

  // Load preview fonts dynamically
  useEffect(() => {
    const fontsToLoad = [theme.fontDisplay, theme.fontHeading, theme.fontBody].filter(
      (f) => !loadedFonts.has(f)
    );

    if (fontsToLoad.length === 0) return;

    const url = buildPreviewFontURL(fontsToLoad);
    if (!url) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);

    setLoadedFonts((prev) => {
      const next = new Set(prev);
      fontsToLoad.forEach((f) => next.add(f));
      return next;
    });
  }, [theme.fontDisplay, theme.fontHeading, theme.fontBody, loadedFonts]);

  const updateTheme = useCallback(
    (updates: Partial<SiteTheme>) => {
      setHistory((prev) => [...prev.slice(-20), theme]);
      setTheme((prev) => {
        const next = { ...prev, ...updates, presetId: null };
        applyThemeToDOM(next);
        return next;
      });
    },
    [theme]
  );

  const applyPreset = useCallback((preset: typeof THEME_PRESETS[number]) => {
    setHistory((prev) => [...prev.slice(-20), theme]);
    const next = { ...preset.theme };
    setTheme(next);
    applyThemeToDOM(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setTheme(prev);
    applyThemeToDOM(prev);
  }, [history]);

  const handleReset = useCallback(() => {
    setHistory((prev) => [...prev.slice(-20), theme]);
    setTheme(DEFAULT_THEME);
    applyThemeToDOM(DEFAULT_THEME);
  }, [theme]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "site_theme", value: JSON.stringify(theme) }),
      });

      if (!res.ok) throw new Error("Failed to save theme");
      toast.success("Theme saved! Changes will appear on the live site.");
    } catch {
      toast.error("Failed to save theme. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const activePreset = THEME_PRESETS.find((p) => p.id === theme.presetId);

  return (
    <div className="flex gap-8">
      {/* Left Column — Controls */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Preset Palettes */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-bold text-gray-800">Preset Palettes</h3>
          <div className="grid grid-cols-2 gap-3">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`rounded-xl border-2 p-3 text-left transition-all hover:shadow-md ${
                  theme.presetId === preset.id
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="mb-2 flex gap-1">
                  {[
                    preset.theme.accentColor,
                    preset.theme.primaryDeep,
                    preset.theme.secondary,
                    preset.theme.highlight,
                  ].map((color, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold text-gray-800">{preset.name}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{preset.description}</p>
              </button>
            ))}
          </div>
          {!activePreset && (
            <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              Custom theme — not matching any preset
            </div>
          )}
        </div>

        {/* Colors */}
        <Section title="Colors" defaultOpen>
          <ColorGroup
            label="Accent (Coral)"
            baseKey="accentColor"
            lightKey="accentColorLight"
            darkKey="accentColorDark"
            theme={theme}
            onChange={updateTheme}
          />
          <ColorGroup
            label="Primary (Ocean)"
            baseKey="primary"
            lightKey="primaryLight"
            darkKey="primaryDeep"
            theme={theme}
            onChange={updateTheme}
          />
          <ColorField
            label="Primary Pale"
            value={theme.primaryPale}
            onChange={(v) => updateTheme({ primaryPale: v })}
          />
          <ColorGroup
            label="Secondary (Teal)"
            baseKey="secondary"
            lightKey="secondaryLight"
            darkKey="secondaryDark"
            theme={theme}
            onChange={updateTheme}
          />
          <ColorGroup
            label="Highlight (Purple)"
            baseKey="highlight"
            lightKey="highlightLight"
            darkKey="highlightDark"
            theme={theme}
            onChange={updateTheme}
          />
          <div className="border-t border-gray-100 pt-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">Neutrals</h4>
            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label="Background"
                value={theme.background}
                onChange={(v) => updateTheme({ background: v })}
              />
              <ColorField
                label="Surface (Cards)"
                value={theme.surfaceColor}
                onChange={(v) => updateTheme({ surfaceColor: v })}
              />
              <ColorField
                label="Text Primary"
                value={theme.textPrimary}
                onChange={(v) => updateTheme({ textPrimary: v })}
              />
              <ColorField
                label="Text Muted"
                value={theme.textMuted}
                onChange={(v) => updateTheme({ textMuted: v })}
              />
              <ColorField
                label="Dark (Footer)"
                value={theme.darkColor}
                onChange={(v) => updateTheme({ darkColor: v })}
              />
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography">
          <div className="grid grid-cols-1 gap-4">
            <FontSelector
              label="Display Font (Hero Titles)"
              value={theme.fontDisplay}
              category="display"
              onChange={(v) => updateTheme({ fontDisplay: v })}
            />
            <FontSelector
              label="Heading Font (Section Titles)"
              value={theme.fontHeading}
              category="heading"
              onChange={(v) => updateTheme({ fontHeading: v })}
            />
            <FontSelector
              label="Body Font (Paragraphs)"
              value={theme.fontBody}
              category="body"
              onChange={(v) => updateTheme({ fontBody: v })}
            />
          </div>
          <div className="border-t border-gray-100 pt-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">Font Sizes</h4>
            <div className="space-y-3">
              <SliderField
                label="Display"
                value={theme.fontSizeDisplay}
                min={2.5}
                max={7}
                step={0.25}
                unit="rem"
                onChange={(v) => updateTheme({ fontSizeDisplay: v })}
              />
              <SliderField
                label="H1"
                value={theme.fontSizeH1}
                min={2}
                max={5}
                step={0.25}
                unit="rem"
                onChange={(v) => updateTheme({ fontSizeH1: v })}
              />
              <SliderField
                label="H2"
                value={theme.fontSizeH2}
                min={1.5}
                max={4}
                step={0.25}
                unit="rem"
                onChange={(v) => updateTheme({ fontSizeH2: v })}
              />
              <SliderField
                label="H3"
                value={theme.fontSizeH3}
                min={1.25}
                max={3}
                step={0.125}
                unit="rem"
                onChange={(v) => updateTheme({ fontSizeH3: v })}
              />
              <SliderField
                label="H4"
                value={theme.fontSizeH4}
                min={1}
                max={2.5}
                step={0.125}
                unit="rem"
                onChange={(v) => updateTheme({ fontSizeH4: v })}
              />
            </div>
          </div>
          {/* Font Preview */}
          <div className="rounded-lg bg-gray-50 p-4 mt-2">
            <p className="mb-1 text-xs text-gray-400">Preview</p>
            <p
              className="text-2xl font-bold tracking-wide"
              style={{
                fontFamily: `"${theme.fontDisplay}", Impact, sans-serif`,
                textTransform: "uppercase",
              }}
            >
              DREAMSCAPER
            </p>
            <p
              className="text-base font-semibold"
              style={{ fontFamily: `"${theme.fontHeading}", sans-serif` }}
            >
              Rachel Dinda &bull; Professional Muralist
            </p>
            <p
              className="mt-1 text-sm text-gray-600"
              style={{ fontFamily: `"${theme.fontBody}", sans-serif` }}
            >
              Transforming spaces with vibrant, community-driven murals across the US and
              internationally.
            </p>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">Border Radius</label>
              <div className="flex gap-2">
                {[
                  { label: "Sharp", value: "0" },
                  { label: "Rounded", value: "0.75rem" },
                  { label: "Pill", value: "9999px" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => updateTheme({ buttonRadius: opt.value })}
                    className={`flex-1 rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all ${
                      theme.buttonRadius === opt.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {/* Custom slider for in-between values */}
              {!["0", "0.75rem", "9999px"].includes(theme.buttonRadius) && (
                <SliderField
                  label="Custom Radius"
                  value={theme.buttonRadius}
                  min={0}
                  max={3}
                  step={0.125}
                  unit="rem"
                  onChange={(v) => updateTheme({ buttonRadius: v })}
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SliderField
                label="Vertical Padding"
                value={theme.buttonPaddingY}
                min={0.5}
                max={1.5}
                step={0.125}
                unit="rem"
                onChange={(v) => updateTheme({ buttonPaddingY: v })}
              />
              <SliderField
                label="Horizontal Padding"
                value={theme.buttonPaddingX}
                min={1}
                max={4}
                step={0.25}
                unit="rem"
                onChange={(v) => updateTheme({ buttonPaddingX: v })}
              />
            </div>
            <SliderField
              label="Font Size"
              value={theme.buttonFontSize}
              min={0.7}
              max={1.2}
              step={0.05}
              unit="rem"
              onChange={(v) => updateTheme({ buttonFontSize: v })}
            />
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-500">
                Text Transform
              </label>
              <div className="flex gap-2">
                {["uppercase", "capitalize", "none"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateTheme({ buttonTextTransform: opt })}
                    className={`flex-1 rounded-lg border-2 px-3 py-2 text-xs font-medium transition-all ${
                      theme.buttonTextTransform === opt
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {/* Button Preview */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-3 text-xs text-gray-400">Preview</p>
              <div className="flex flex-wrap gap-3">
                <span
                  className="inline-block cursor-default text-white"
                  style={{
                    backgroundColor: theme.accentColor,
                    padding: `${theme.buttonPaddingY} ${theme.buttonPaddingX}`,
                    borderRadius: theme.buttonRadius,
                    fontFamily: `"${theme.fontHeading}", sans-serif`,
                    fontWeight: 600,
                    fontSize: theme.buttonFontSize,
                    textTransform: theme.buttonTextTransform as "uppercase" | "capitalize" | "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  Primary
                </span>
                <span
                  className="inline-block cursor-default"
                  style={{
                    padding: `${theme.buttonPaddingY} ${theme.buttonPaddingX}`,
                    borderRadius: theme.buttonRadius,
                    border: `2px solid ${theme.primaryDeep}`,
                    color: theme.primaryDeep,
                    fontFamily: `"${theme.fontHeading}", sans-serif`,
                    fontWeight: 600,
                    fontSize: theme.buttonFontSize,
                    textTransform: theme.buttonTextTransform as "uppercase" | "capitalize" | "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  Secondary
                </span>
                <span
                  className="inline-block cursor-default"
                  style={{
                    padding: `${theme.buttonPaddingY} ${theme.buttonPaddingX}`,
                    borderRadius: theme.buttonRadius,
                    border: `2px solid ${theme.accentColor}`,
                    color: theme.accentColor,
                    fontFamily: `"${theme.fontHeading}", sans-serif`,
                    fontWeight: 600,
                    fontSize: theme.buttonFontSize,
                    textTransform: theme.buttonTextTransform as "uppercase" | "capitalize" | "none",
                    letterSpacing: "0.05em",
                  }}
                >
                  Outline
                </span>
              </div>
            </div>
          </div>
        </Section>

        {/* Cards & Layout */}
        <Section title="Cards & Layout">
          <SliderField
            label="Card Border Radius"
            value={theme.cardRadius}
            min={0}
            max={3}
            step={0.25}
            unit="rem"
            onChange={(v) => updateTheme({ cardRadius: v })}
          />
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-500">Card Shadow</label>
            <div className="flex gap-2">
              {[
                { label: "None", value: "none" },
                { label: "Subtle", value: "sm" },
                { label: "Medium", value: "md" },
                { label: "Strong", value: "lg" },
                { label: "Heavy", value: "xl" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => updateTheme({ cardShadow: opt.value })}
                  className={`flex-1 rounded-lg border-2 px-2 py-2 text-xs font-medium transition-all ${
                    theme.cardShadow === opt.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <SliderField
            label="Card Hover Lift"
            value={theme.cardHoverLift}
            min={0}
            max={16}
            step={2}
            unit="px"
            onChange={(v) => updateTheme({ cardHoverLift: v })}
          />
          <SliderField
            label="Section Spacing"
            value={theme.sectionSpacing}
            min={3}
            max={10}
            step={0.5}
            unit="rem"
            onChange={(v) => updateTheme({ sectionSpacing: v })}
          />
        </Section>
      </div>

      {/* Right Column — Preview + Actions */}
      <div className="w-80 shrink-0">
        <div className="sticky top-6 space-y-4">
          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Theme"}
            </button>
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-30"
              title="Undo"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-gray-200 p-2.5 text-gray-600 transition-colors hover:bg-gray-50"
              title="Reset to default"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Preview on Site */}
          <a
            href="/?themePreview=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            <ExternalLink className="h-4 w-4" />
            Preview on Site
          </a>

          {/* Live Preview */}
          <LivePreview theme={theme} />
        </div>
      </div>
    </div>
  );
}
