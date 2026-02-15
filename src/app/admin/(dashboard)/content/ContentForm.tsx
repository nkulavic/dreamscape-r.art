"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  org: string;
  rating: number;
  text: string;
}

interface ContentFormProps {
  settings: Record<string, string>;
}

const CONTENT_FIELDS = [
  {
    key: "artist_bio",
    label: "Artist Bio",
    description: "Appears in the intro section of the About page.",
    rows: 8,
  },
  {
    key: "artist_statement",
    label: "Artist Statement",
    description: "Appears in the journey section of the About page.",
    rows: 10,
  },
  {
    key: "mission_statement",
    label: "Mission Statement",
    description: "Displayed as a highlight on the About page.",
    rows: 4,
  },
];

export default function ContentForm({ settings }: ContentFormProps) {
  const [values, setValues] = useState<Record<string, string>>({
    ...settings,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Parse testimonials from JSON string
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      return settings.testimonials ? JSON.parse(settings.testimonials) : [];
    } catch {
      return [];
    }
  });

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleTestimonialChange(
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) {
    setTestimonials((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setSaved(false);
  }

  function addTestimonial() {
    setTestimonials((prev) => [
      ...prev,
      { name: "", org: "", rating: 5, text: "" },
    ]);
    setSaved(false);
  }

  function removeTestimonial(index: number) {
    setTestimonials((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const settingsPayload = [
      ...CONTENT_FIELDS.map((f) => ({
        key: f.key,
        value: values[f.key] || "",
      })),
      {
        key: "testimonials",
        value: JSON.stringify(testimonials.filter((t) => t.name && t.text)),
      },
    ];

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
        alert(err.error || "Failed to save content.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {/* Content Fields */}
      {CONTENT_FIELDS.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <p className="mb-2 text-xs text-gray-500">{field.description}</p>
          <textarea
            value={values[field.key] || ""}
            onChange={(e) => handleChange(field.key, e.target.value)}
            rows={field.rows}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-400">
            {(values[field.key] || "").length} characters
          </p>
        </div>
      ))}

      {/* Testimonials */}
      <div>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Testimonials
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Client testimonials displayed on the About page.
        </p>

        <div className="space-y-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Testimonial {i + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeTestimonial(i)}
                  className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) =>
                      handleTestimonialChange(i, "name", e.target.value)
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={t.org}
                    onChange={(e) =>
                      handleTestimonialChange(i, "org", e.target.value)
                    }
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">
                  Rating (1-5)
                </label>
                <select
                  value={t.rating}
                  onChange={(e) =>
                    handleTestimonialChange(
                      i,
                      "rating",
                      parseInt(e.target.value)
                    )
                  }
                  className="mt-1 block w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {"★".repeat(n)}
                      {"☆".repeat(5 - n)} ({n})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600">
                  Testimonial Text
                </label>
                <textarea
                  value={t.text}
                  onChange={(e) =>
                    handleTestimonialChange(i, "text", e.target.value)
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addTestimonial}
          className="mt-4 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-800 cursor-pointer"
        >
          + Add Testimonial
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : "Save Content"}
        </button>
        {saved && (
          <p className="text-sm font-medium text-green-600">
            Content saved successfully.
          </p>
        )}
      </div>
    </form>
  );
}
