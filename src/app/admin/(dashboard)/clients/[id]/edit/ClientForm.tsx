"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uuidv7 } from "uuidv7";
import { toast } from "sonner";
import { X } from "lucide-react";
import { uploadMedia } from "@/lib/upload-client";
import { UPLOAD_LIMITS, uploadHint } from "@/lib/upload";
import UploadProgress from "@/app/admin/(dashboard)/_components/UploadProgress";

interface ClientData {
  id: string;
  name: string;
  logoUrl: string | null;
  projectSize: string | null;
  featured: boolean;
  category: string;
}

const CATEGORIES = ["corporate", "education", "nonprofit", "restaurant", "community"];

export default function ClientForm({ client }: { client?: ClientData }) {
  const router = useRouter();
  const isEditing = !!client;

  const [name, setName] = useState(client?.name ?? "");
  const [category, setCategory] = useState(client?.category ?? "corporate");
  const [projectSize, setProjectSize] = useState(client?.projectSize ?? "");
  const [featured, setFeatured] = useState(client?.featured ?? false);
  const [logoUrl, setLogoUrl] = useState(client?.logoUrl ?? "");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const uploading = uploadProgress !== null;

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadProgress(0);
    try {
      const url = await uploadMedia(file, {
        folder: "logos",
        kind: "image",
        onProgress: setUploadProgress,
      });
      setLogoUrl(url);
      toast.success("Logo uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploadProgress(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: isEditing ? client.id : uuidv7(),
      name,
      category,
      projectSize: projectSize || null,
      featured,
      logoUrl: logoUrl || null,
    };

    try {
      const url = isEditing
        ? `/api/admin/clients/${client.id}`
        : "/api/admin/clients";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/clients");
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save client.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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

      {/* Project Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Project Size
        </label>
        <input
          type="text"
          value={projectSize}
          onChange={(e) => setProjectSize(e.target.value)}
          placeholder="e.g., Large, Medium, Small"
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

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <input
          type="file"
          accept={UPLOAD_LIMITS.image.accept}
          onChange={handleLogoUpload}
          disabled={uploading}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />
        <p className="mt-1 text-xs text-gray-500">
          {logoUrl ? "Pick a file to replace the current logo. " : ""}
          {uploadHint("image")}
        </p>
        <UploadProgress percentage={uploadProgress} label="Uploading logo" />
        {logoUrl && (
          <div className="mt-2 flex items-start gap-3">
            <img
              src={logoUrl}
              alt="Logo preview"
              className="h-16 w-auto rounded border border-gray-200 object-contain"
            />
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => setLogoUrl("")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5" />
                Remove logo
              </button>
              <p className="mt-1 break-all text-xs text-gray-400">{logoUrl}</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Update Client" : "Create Client"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/clients")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
