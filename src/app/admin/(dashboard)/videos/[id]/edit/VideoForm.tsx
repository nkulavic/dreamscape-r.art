"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface VideoData {
  id: string;
  title: string;
  description: string;
  srcUrl: string;
  posterUrl: string | null;
  category: string;
  duration: string | null;
  featured: boolean;
}

const CATEGORIES = ["process", "timelapse", "festival", "documentary"];

export default function VideoForm({ video }: { video?: VideoData }) {
  const router = useRouter();
  const isEditing = !!video;

  const [title, setTitle] = useState(video?.title ?? "");
  const [description, setDescription] = useState(video?.description ?? "");
  const [category, setCategory] = useState(video?.category ?? "process");
  const [duration, setDuration] = useState(video?.duration ?? "");
  const [featured, setFeatured] = useState(video?.featured ?? false);
  const [srcUrl, setSrcUrl] = useState(video?.srcUrl ?? "");
  const [posterUrl, setPosterUrl] = useState(video?.posterUrl ?? "");
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleFileUpload(
    file: File,
    setUrl: (url: string) => void,
    setUploading: (val: boolean) => void
  ) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setUrl(data.url);
      }
    } catch {
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: isEditing ? video.id : crypto.randomUUID(),
      title,
      description,
      category,
      duration: duration || null,
      featured,
      srcUrl,
      posterUrl: posterUrl || null,
    };

    try {
      const url = isEditing
        ? `/api/admin/videos/${video.id}`
        : "/api/admin/videos";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/videos");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save video.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration
        </label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 2:30"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-700">
          Featured
        </label>
      </div>

      {/* Video Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Video File <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, setSrcUrl, setUploadingVideo);
          }}
          disabled={uploadingVideo}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />
        {uploadingVideo && (
          <p className="mt-1 text-sm text-gray-500">Uploading video...</p>
        )}
        {srcUrl && (
          <p className="mt-1 break-all text-xs text-gray-400">{srcUrl}</p>
        )}
      </div>

      {/* Poster Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Poster Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file, setPosterUrl, setUploadingPoster);
          }}
          disabled={uploadingPoster}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />
        {uploadingPoster && (
          <p className="mt-1 text-sm text-gray-500">Uploading poster...</p>
        )}
        {posterUrl && (
          <div className="mt-2">
            <img
              src={posterUrl}
              alt="Poster preview"
              className="h-24 w-auto rounded border border-gray-200 object-cover"
            />
            <p className="mt-1 break-all text-xs text-gray-400">{posterUrl}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={saving || !srcUrl}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Update Video" : "Create Video"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/videos")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
