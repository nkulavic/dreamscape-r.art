"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uuidv7 } from "uuidv7";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Loader2, Upload, X } from "lucide-react";
import AIGenerateButton from "./AIGenerateButton";
import AIGenerateAllButton from "./AIGenerateAllButton";
import MediaPicker from "../components/MediaPicker";

// Raw DB row shape used by the admin form (not the DAL's transformed Mural type)
export interface MuralRow {
  id: string;
  slug: string;
  title: string;
  venue: string;
  city: string;
  state: string | null;
  country: string;
  lat: number | null;
  lng: number | null;
  year: number;
  description: string;
  dimensionSize: string | null;
  dimensionUnit: string | null;
  category: "commercial" | "community" | "education" | "international";
  tags: string[];
  artistNote: string;
  inspiration: string;
  process: string | null;
  impact: string | null;
  heroUrl: string;
  thumbnailUrl: string;
  galleryUrls: string[];
  videoUrl: string | null;
  clientId: string | null;
  clientDisplayName: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  status: "draft" | "published" | "archived";
  featured: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export default function MuralForm({ mural }: { mural?: MuralRow }) {
  const router = useRouter();
  const isEdit = Boolean(mural);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState(mural?.title ?? "");
  const [slug, setSlug] = useState(mural?.slug ?? "");
  const [venue, setVenue] = useState(mural?.venue ?? "");
  const [city, setCity] = useState(mural?.city ?? "");
  const [state, setState] = useState(mural?.state ?? "");
  const [country, setCountry] = useState(mural?.country ?? "");
  const [lat, setLat] = useState(mural?.lat?.toString() ?? "");
  const [lng, setLng] = useState(mural?.lng?.toString() ?? "");
  const [year, setYear] = useState(
    mural?.year?.toString() ?? new Date().getFullYear().toString()
  );
  const [description, setDescription] = useState(mural?.description ?? "");
  const [dimensionSize, setDimensionSize] = useState(
    mural?.dimensionSize ?? ""
  );
  const [dimensionUnit, setDimensionUnit] = useState(
    mural?.dimensionUnit ?? ""
  );
  const [category, setCategory] = useState<string>(
    mural?.category ?? "commercial"
  );
  const [tagsStr, setTagsStr] = useState(mural?.tags?.join(", ") ?? "");
  const [artistNote, setArtistNote] = useState(mural?.artistNote ?? "");
  const [inspiration, setInspiration] = useState(mural?.inspiration ?? "");
  const [process, setProcess] = useState(mural?.process ?? "");
  const [impact, setImpact] = useState(mural?.impact ?? "");
  const [heroUrl, setHeroUrl] = useState(mural?.heroUrl ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(mural?.thumbnailUrl ?? "");
  const [galleryUrls, setGalleryUrls] = useState<string[]>(
    mural?.galleryUrls ?? []
  );
  const [videoUrl, setVideoUrl] = useState(mural?.videoUrl ?? "");
  const [clientDisplayName, setClientDisplayName] = useState(
    mural?.clientDisplayName ?? ""
  );
  const [seoTitle, setSeoTitle] = useState(mural?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(mural?.seoDescription ?? "");
  const [seoKeywords, setSeoKeywords] = useState(mural?.seoKeywords ?? "");
  const [status, setStatus] = useState<string>(mural?.status ?? "draft");
  const [featured, setFeatured] = useState(mural?.featured ?? false);

  // Auto-generate slug from title (only in create mode)
  useEffect(() => {
    if (!isEdit) {
      setSlug(slugify(title));
    }
  }, [title, isEdit]);

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  }

  async function handleHeroUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      setHeroUrl(url);
      // Also set thumbnail to same image if not already set
      if (!thumbnailUrl) setThumbnailUrl(url);
    } catch {
      setError("Failed to upload hero image");
    } finally {
      setUploading(false);
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const urls = await Promise.all(
        Array.from(files).map((f) => uploadFile(f))
      );
      setGalleryUrls((prev) => [...prev, ...urls]);
    } catch {
      setError("Failed to upload gallery images");
    } finally {
      setUploading(false);
    }
  }

  function removeGalleryImage(index: number) {
    setGalleryUrls((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const body: Record<string, unknown> = {
      slug,
      title,
      venue,
      city,
      state: state || null,
      country,
      lat: lat ? parseFloat(lat) : null,
      lng: lng ? parseFloat(lng) : null,
      year: parseInt(year, 10),
      description,
      dimensionSize: dimensionSize || null,
      dimensionUnit: dimensionUnit || null,
      category,
      tags,
      artistNote,
      inspiration,
      process: process || null,
      impact: impact || null,
      heroUrl,
      thumbnailUrl: thumbnailUrl || heroUrl,
      galleryUrls,
      videoUrl: videoUrl || null,
      clientDisplayName: clientDisplayName || null,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      seoKeywords: seoKeywords || null,
      status,
      featured,
    };

    if (!isEdit) {
      body.id = uuidv7();
    }

    try {
      const url = isEdit
        ? `/api/admin/murals/${mural!.id}`
        : "/api/admin/murals";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save mural");
      }

      router.push("/admin/murals");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ── Basic Info ──────────────────────────────────── */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg text-gray-900">
          Basic Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Title *</Label>
              <AIGenerateButton
                type="title"
                context={{
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                  existingContent: title,
                }}
                onGenerated={(content) => {
                  if (Array.isArray(content) && content.length > 0) {
                    setTitle(content[0]);
                  }
                }}
                disabled={!venue || !city}
              />
            </div>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Mural title"
              className="mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="mural-slug"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description *</Label>
              <AIGenerateButton
                type="description"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                }}
                onGenerated={(content) => {
                  if (typeof content === "string") {
                    setDescription(content);
                  }
                }}
                disabled={!title || !venue}
              />
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe the mural..."
              className="mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <AIGenerateButton
                type="keywords"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                }}
                onGenerated={(content) => {
                  if (Array.isArray(content)) {
                    setTagsStr(content.join(", "));
                  }
                }}
                disabled={!title}
              />
            </div>
            <Input
              id="tags"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="mural, outdoor, abstract"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="featured">Featured Mural</Label>
          </div>
        </div>
      </section>

      {/* ── Location ────────────────────────────────────── */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg text-gray-900">Location</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="venue">Venue *</Label>
            <Input
              id="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
              placeholder="Building or venue name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Dimensions & Client ─────────────────────────── */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg text-gray-900">
          Dimensions & Client
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="dimensionSize">Dimension Size</Label>
            <Input
              id="dimensionSize"
              value={dimensionSize}
              onChange={(e) => setDimensionSize(e.target.value)}
              placeholder='e.g. 20x40'
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dimensionUnit">Dimension Unit</Label>
            <Input
              id="dimensionUnit"
              value={dimensionUnit}
              onChange={(e) => setDimensionUnit(e.target.value)}
              placeholder="e.g. feet"
              className="mt-1"
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="clientDisplayName">Client Display Name</Label>
            <Input
              id="clientDisplayName"
              value={clientDisplayName}
              onChange={(e) => setClientDisplayName(e.target.value)}
              placeholder="Client name shown on site"
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* ── Artist Details ──────────────────────────────── */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-gray-900">
            Artist Details
          </h2>
          <AIGenerateAllButton
            context={{
              title,
              venue,
              city,
              country,
              year: year ? parseInt(year) : undefined,
              category,
            }}
            onGenerated={(results) => {
              if (results.description) setDescription(results.description);
              if (results.artistNote) setArtistNote(results.artistNote);
              if (results.inspiration) setInspiration(results.inspiration);
              if (results.process) setProcess(results.process);
              if (results.impact) setImpact(results.impact);
              if (results.keywords) setTagsStr(results.keywords.join(", "));
            }}
            disabled={!title || !venue}
          />
        </div>
        <div className="grid gap-4">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="artistNote">Artist Note *</Label>
              <AIGenerateButton
                type="artistNote"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                }}
                onGenerated={(content) => {
                  if (typeof content === "string") {
                    setArtistNote(content);
                  }
                }}
                disabled={!title || !venue}
              />
            </div>
            <Textarea
              id="artistNote"
              value={artistNote}
              onChange={(e) => setArtistNote(e.target.value)}
              required
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="inspiration">Inspiration *</Label>
              <AIGenerateButton
                type="inspiration"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                }}
                onGenerated={(content) => {
                  if (typeof content === "string") {
                    setInspiration(content);
                  }
                }}
                disabled={!title || !venue}
              />
            </div>
            <Textarea
              id="inspiration"
              value={inspiration}
              onChange={(e) => setInspiration(e.target.value)}
              required
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="process">Process</Label>
              <AIGenerateButton
                type="process"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                }}
                onGenerated={(content) => {
                  if (typeof content === "string") {
                    setProcess(content);
                  }
                }}
                disabled={!title || !venue}
              />
            </div>
            <Textarea
              id="process"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="impact">Impact</Label>
              <AIGenerateButton
                type="impact"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: year ? parseInt(year) : undefined,
                  category,
                }}
                onGenerated={(content) => {
                  if (typeof content === "string") {
                    setImpact(content);
                  }
                }}
                disabled={!title || !venue}
              />
            </div>
            <Textarea
              id="impact"
              value={impact}
              onChange={(e) => setImpact(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* ── Media ───────────────────────────────────────── */}
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-display text-lg text-gray-900">Media</h2>
        <div className="grid gap-6">
          {/* Hero Image */}
          <div>
            <Label>Hero Image *</Label>
            <div className="mt-2">
              <MediaPicker
                value={heroUrl}
                onChange={(url) => {
                  setHeroUrl(url);
                  // Auto-set thumbnail if not already set
                  if (!thumbnailUrl) setThumbnailUrl(url);
                }}
                label="Choose Hero Image"
                folder="murals"
              />
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <Label>Thumbnail Image</Label>
            <p className="text-xs text-gray-500 mb-2">
              Defaults to hero image if not set
            </p>
            <div className="mt-2">
              <MediaPicker
                value={thumbnailUrl}
                onChange={setThumbnailUrl}
                label="Choose Thumbnail"
                folder="murals"
              />
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <Label>Gallery Images</Label>
            {galleryUrls.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-3 mb-4">
                {galleryUrls.map((url, i) => (
                  <div
                    key={i}
                    className="group relative h-24 w-32 overflow-hidden rounded-lg border"
                  >
                    <Image
                      src={url}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2">
              <MediaPicker
                value=""
                onChange={(url) => setGalleryUrls([...galleryUrls, url])}
                label="Add Gallery Image"
                folder="murals"
              />
            </div>
          </div>

          {/* Video URL */}
          <div>
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://..."
              className="mt-1"
            />
          </div>
        </div>
      </section>

      {/* ── SEO Optimization ────────────────────────────────────── */}
      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="font-display text-lg text-gray-900">
            SEO Optimization
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Customize how this mural appears in search engines. Leave blank to use auto-generated values from title, description, and tags.
          </p>
        </div>

        <div className="space-y-4">
          {/* SEO Title */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="seoTitle">
                Meta Title <span className="text-xs text-gray-500">(optional - max 60 chars)</span>
              </Label>
              <AIGenerateButton
                type="title"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: parseInt(year, 10),
                  category,
                  existingContent: seoTitle || title,
                }}
                onGenerated={(content) => {
                  if (Array.isArray(content) && content.length > 0) {
                    setSeoTitle(content[0]);
                  } else if (typeof content === "string") {
                    setSeoTitle(content);
                  }
                }}
              />
            </div>
            <Input
              id="seoTitle"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={`Auto: ${title ? `${title} | DREAMSCAPER` : "Generated from title"}`}
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">
              {seoTitle.length}/60 characters
              {!seoTitle && " (using auto-generated)"}
            </p>
          </div>

          {/* SEO Description */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="seoDescription">
                Meta Description <span className="text-xs text-gray-500">(optional - max 160 chars)</span>
              </Label>
              <AIGenerateButton
                type="description"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  year: parseInt(year, 10),
                  category,
                  existingContent: seoDescription || description,
                }}
                onGenerated={(content) => {
                  if (typeof content === "string") {
                    setSeoDescription(content);
                  }
                }}
              />
            </div>
            <Textarea
              id="seoDescription"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder={description ? `Auto: ${description.substring(0, 60)}...` : "Generated from description"}
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {seoDescription.length}/160 characters
              {!seoDescription && " (using auto-generated)"}
            </p>
          </div>

          {/* SEO Keywords */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="seoKeywords">
                SEO Keywords <span className="text-xs text-gray-500">(optional - comma-separated)</span>
              </Label>
              <AIGenerateButton
                type="keywords"
                context={{
                  title,
                  venue,
                  city,
                  country,
                  category,
                  existingContent: seoKeywords || tagsStr,
                }}
                onGenerated={(content) => {
                  if (Array.isArray(content)) {
                    setSeoKeywords(content.join(", "));
                  } else if (typeof content === "string") {
                    setSeoKeywords(content);
                  }
                }}
              />
            </div>
            <Textarea
              id="seoKeywords"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder={tagsStr ? `Auto: ${tagsStr}, ${category} mural, ${city}...` : "Generated from tags and location"}
              rows={2}
            />
            {!seoKeywords && (
              <p className="text-xs text-gray-500 mt-1">
                Using auto-generated keywords from tags and location
              </p>
            )}
          </div>
        </div>

        {/* Search Preview */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <Label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Google Search Preview</Label>
          <div className="p-4 bg-gray-50 rounded border border-gray-200">
            <p className="text-blue-600 text-lg hover:underline cursor-pointer">
              {seoTitle || (title ? `${title} | DREAMSCAPER` : "Untitled Mural | DREAMSCAPER")}
            </p>
            <p className="text-green-700 text-xs mt-1">
              https://dreamscaper.art/portfolio/{slug || 'mural-slug'}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {seoDescription || description || "No description provided"}
            </p>
          </div>
        </div>
      </section>

      {/* ── Actions ─────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving || uploading}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving..." : isEdit ? "Update Mural" : "Create Mural"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/murals")}
        >
          Cancel
        </Button>
        {uploading && (
          <span className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Uploading...
          </span>
        )}
      </div>
    </form>
  );
}
