"use client";

import { useState } from "react";

interface SettingsFormProps {
  settings: Record<string, string>;
}

const BASIC_FIELDS = [
  { key: "artistName", label: "Artist Name" },
  { key: "siteName", label: "Site Name" },
  { key: "title", label: "Title / Tagline" },
];

const CONTACT_FIELDS = [
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
];

const SOCIAL_FIELDS = [
  { key: "social.instagram", label: "Instagram" },
  { key: "social.facebook", label: "Facebook" },
  { key: "social.tiktok", label: "TikTok" },
  { key: "social.youtube", label: "YouTube" },
  { key: "social.linkedin", label: "LinkedIn" },
  { key: "social.pinterest", label: "Pinterest" },
];

const SEO_FIELDS = [
  { key: "seo.defaultTitle", label: "Default Site Title" },
  { key: "seo.defaultDescription", label: "Default Meta Description", multiline: true },
  { key: "seo.defaultKeywords", label: "Default Keywords (comma-separated)" },
  { key: "seo.ogImage", label: "Default OG Image URL" },
  { key: "seo.twitterHandle", label: "Twitter Handle (e.g., @dreamscape_r)" },
];

export default function SettingsForm({ settings }: SettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>({ ...settings });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const allKeys = [...BASIC_FIELDS, ...CONTACT_FIELDS, ...SOCIAL_FIELDS, ...SEO_FIELDS].map(
      (f) => f.key
    );

    const settingsPayload = allKeys
      .filter((key) => values[key] !== undefined && values[key] !== "")
      .map((key) => ({
        key,
        value: values[key] || "",
      }));

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: settingsPayload }),
      });

      if (res.ok) {
        setSaved(true);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save settings.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  function renderField(field: { key: string; label: string; multiline?: boolean }) {
    return (
      <div key={field.key}>
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>
        {field.multiline ? (
          <textarea
            value={values[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
        ) : (
          <input
            type="text"
            value={values[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {/* Basic */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic</h2>
        <div className="space-y-4">{BASIC_FIELDS.map(renderField)}</div>
      </div>

      {/* Contact */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact</h2>
        <div className="space-y-4">{CONTACT_FIELDS.map(renderField)}</div>
      </div>

      {/* Social */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Social</h2>
        <div className="grid grid-cols-2 gap-4">
          {SOCIAL_FIELDS.map(renderField)}
        </div>
      </div>

      {/* SEO */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">SEO (Search Engine Optimization)</h2>
        <p className="mb-4 text-sm text-gray-600">
          Default SEO settings for the site. Individual content pages may override these with their own metadata.
        </p>
        <div className="space-y-4">
          {SEO_FIELDS.map(renderField)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
        {saved && (
          <p className="text-sm font-medium text-green-600">
            Settings saved successfully.
          </p>
        )}
      </div>
    </form>
  );
}
