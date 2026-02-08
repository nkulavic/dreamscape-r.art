"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uuidv7 } from "uuidv7";
import { Plus } from "lucide-react";
import type { Exhibition, Festival, Publication } from "@/db/dal";

// ── Types ──────────────────────────────────────────────

type Tab = "exhibitions" | "festivals" | "publications";

const EXHIBITION_TYPES = ["solo", "collaborative", "group"] as const;
const PUBLICATION_TYPES = [
  "tv",
  "magazine",
  "newspaper",
  "online",
  "museum",
] as const;

// ── Component ──────────────────────────────────────────

export default function ExperienceClient({
  exhibitions: initialExhibitions,
  festivals: initialFestivals,
  publications: initialPublications,
}: {
  exhibitions: Exhibition[];
  festivals: Festival[];
  publications: Publication[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("exhibitions");

  const [exhibitions, setExhibitions] = useState(initialExhibitions);
  const [festivals, setFestivals] = useState(initialFestivals);
  const [publications, setPublications] = useState(initialPublications);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Exhibition form
  const [exTitle, setExTitle] = useState("");
  const [exVenue, setExVenue] = useState("");
  const [exLocation, setExLocation] = useState("");
  const [exYear, setExYear] = useState(new Date().getFullYear());
  const [exType, setExType] = useState<(typeof EXHIBITION_TYPES)[number]>("solo");

  // Festival form
  const [festName, setFestName] = useState("");
  const [festLocation, setFestLocation] = useState("");
  const [festYear, setFestYear] = useState(new Date().getFullYear());
  const [festInternational, setFestInternational] = useState(false);

  // Publication form
  const [pubOutlet, setPubOutlet] = useState("");
  const [pubTitle, setPubTitle] = useState("");
  const [pubLocation, setPubLocation] = useState("");
  const [pubYear, setPubYear] = useState(new Date().getFullYear());
  const [pubType, setPubType] = useState<(typeof PUBLICATION_TYPES)[number]>("online");
  const [pubUrl, setPubUrl] = useState("");

  const [saving, setSaving] = useState(false);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "exhibitions", label: "Exhibitions", count: exhibitions.length },
    { key: "festivals", label: "Festivals", count: festivals.length },
    { key: "publications", label: "Publications", count: publications.length },
  ];

  function resetForm() {
    setShowForm(false);
    setEditingId(null);
    setExTitle("");
    setExVenue("");
    setExLocation("");
    setExYear(new Date().getFullYear());
    setExType("solo");
    setFestName("");
    setFestLocation("");
    setFestYear(new Date().getFullYear());
    setFestInternational(false);
    setPubOutlet("");
    setPubTitle("");
    setPubLocation("");
    setPubYear(new Date().getFullYear());
    setPubType("online");
    setPubUrl("");
  }

  function handleAdd() {
    resetForm();
    setShowForm(true);
  }

  function handleEditExhibition(ex: Exhibition) {
    resetForm();
    setEditingId(ex.id);
    setExTitle(ex.title);
    setExVenue(ex.venue);
    setExLocation(ex.location);
    setExYear(ex.year);
    setExType(ex.type);
    setShowForm(true);
  }

  function handleEditFestival(fest: Festival) {
    resetForm();
    setEditingId(fest.id);
    setFestName(fest.name);
    setFestLocation(fest.location);
    setFestYear(fest.year);
    setFestInternational(fest.international);
    setShowForm(true);
  }

  function handleEditPublication(pub: Publication) {
    resetForm();
    setEditingId(pub.id);
    setPubOutlet(pub.outlet);
    setPubTitle(pub.title ?? "");
    setPubLocation(pub.location ?? "");
    setPubYear(pub.year);
    setPubType(pub.type);
    setPubUrl(pub.url ?? "");
    setShowForm(true);
  }

  async function handleDelete(id: string, entityType: string, label: string) {
    if (!window.confirm(`Are you sure you want to delete "${label}"?`)) return;

    const res = await fetch(`/api/admin/experience/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entityType }),
    });

    if (res.ok) {
      if (entityType === "exhibition") {
        setExhibitions((prev) => prev.filter((e) => e.id !== id));
      } else if (entityType === "festival") {
        setFestivals((prev) => prev.filter((f) => f.id !== id));
      } else {
        setPublications((prev) => prev.filter((p) => p.id !== id));
      }
      router.refresh();
    } else {
      alert("Failed to delete.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    let payload: Record<string, unknown> = {};

    if (activeTab === "exhibitions") {
      payload = {
        entityType: "exhibition",
        id: editingId || uuidv7(),
        title: exTitle,
        venue: exVenue,
        location: exLocation,
        year: exYear,
        type: exType,
      };
    } else if (activeTab === "festivals") {
      payload = {
        entityType: "festival",
        id: editingId || uuidv7(),
        name: festName,
        location: festLocation,
        year: festYear,
        international: festInternational,
      };
    } else {
      payload = {
        entityType: "publication",
        id: editingId || uuidv7(),
        outlet: pubOutlet,
        title: pubTitle || null,
        location: pubLocation || null,
        year: pubYear,
        type: pubType,
        url: pubUrl || null,
      };
    }

    try {
      const url = editingId
        ? `/api/admin/experience/${editingId}`
        : "/api/admin/experience";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        resetForm();
        // Reload the page to re-fetch server data
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              resetForm();
            }}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add{" "}
          {activeTab === "exhibitions"
            ? "Exhibition"
            : activeTab === "festivals"
              ? "Festival"
              : "Publication"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            {editingId ? "Edit" : "Add"}{" "}
            {activeTab === "exhibitions"
              ? "Exhibition"
              : activeTab === "festivals"
                ? "Festival"
                : "Publication"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "exhibitions" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={exTitle}
                      onChange={(e) => setExTitle(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Venue *
                    </label>
                    <input
                      type="text"
                      required
                      value={exVenue}
                      onChange={(e) => setExVenue(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={exLocation}
                      onChange={(e) => setExLocation(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={exYear}
                      onChange={(e) => setExYear(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type *
                    </label>
                    <select
                      required
                      value={exType}
                      onChange={(e) =>
                        setExType(
                          e.target.value as (typeof EXHIBITION_TYPES)[number]
                        )
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    >
                      {EXHIBITION_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === "festivals" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={festName}
                      onChange={(e) => setFestName(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={festLocation}
                      onChange={(e) => setFestLocation(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={festYear}
                      onChange={(e) => setFestYear(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={festInternational}
                        onChange={(e) =>
                          setFestInternational(e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        International
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeTab === "publications" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Outlet *
                    </label>
                    <input
                      type="text"
                      required
                      value={pubOutlet}
                      onChange={(e) => setPubOutlet(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={pubTitle}
                      onChange={(e) => setPubTitle(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={pubLocation}
                      onChange={(e) => setPubLocation(e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year *
                    </label>
                    <input
                      type="number"
                      required
                      value={pubYear}
                      onChange={(e) => setPubYear(parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type *
                    </label>
                    <select
                      required
                      value={pubType}
                      onChange={(e) =>
                        setPubType(
                          e.target.value as (typeof PUBLICATION_TYPES)[number]
                        )
                      }
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    >
                      {PUBLICATION_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    URL
                  </label>
                  <input
                    type="url"
                    value={pubUrl}
                    onChange={(e) => setPubUrl(e.target.value)}
                    placeholder="https://..."
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tables */}
      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-sm">
        {activeTab === "exhibitions" && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {exhibitions.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No exhibitions yet.
                  </td>
                </tr>
              )}
              {exhibitions.map((ex) => (
                <tr key={ex.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {ex.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {ex.venue}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {ex.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {ex.year}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize text-gray-600">
                    {ex.type}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEditExhibition(ex)}
                        className="font-medium text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(ex.id, "exhibition", ex.title)
                        }
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "festivals" && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  International
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {festivals.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No festivals yet.
                  </td>
                </tr>
              )}
              {festivals.map((fest) => (
                <tr key={fest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {fest.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {fest.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {fest.year}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {fest.international ? (
                      <span className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEditFestival(fest)}
                        className="font-medium text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(fest.id, "festival", fest.name)
                        }
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "publications" && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Outlet
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {publications.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No publications yet.
                  </td>
                </tr>
              )}
              {publications.map((pub) => (
                <tr key={pub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {pub.outlet}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {pub.title || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {pub.year}
                  </td>
                  <td className="px-6 py-4 text-sm capitalize text-gray-600">
                    {pub.type}
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => handleEditPublication(pub)}
                        className="font-medium text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(pub.id, "publication", pub.outlet)
                        }
                        className="font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
