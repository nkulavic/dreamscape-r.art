"use client";

import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, X, Check, Trash2, Replace } from "lucide-react";
import { toast } from "sonner";
import { uploadMedia } from "@/lib/upload-client";
import { UPLOAD_LIMITS, formatBytes, uploadHint, type UploadKind } from "@/lib/upload";

interface MediaPickerProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  /** Blob folder used both to filter the library and to store new uploads. */
  folder?: string;
  /** Images (default) or videos — determines the size limit and accepted types. */
  kind?: UploadKind;
  /** Allow selecting several files at once; `onChange` fires once per upload. */
  multiple?: boolean;
}

interface BlobFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

export default function MediaPicker({
  value,
  onChange,
  label = "Choose Media",
  folder,
  kind = "image",
  multiple = false,
}: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [existingFiles, setExistingFiles] = useState<Record<string, BlobFile[]>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ label: string; percentage: number } | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(value || null);
  const [activeTab, setActiveTab] = useState<"existing" | "upload">("existing");
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  // Keep the preview in step when the parent form clears or replaces the value.
  useEffect(() => {
    setSelectedFile(value || null);
  }, [value]);

  // Fetch existing files when modal opens
  useEffect(() => {
    if (isOpen && Object.keys(existingFiles).length === 0) {
      fetchExistingFiles();
    }
  }, [isOpen]);

  async function fetchExistingFiles() {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blob/list${folder ? `?prefix=${folder}` : ""}`);
      if (response.ok) {
        const data = await response.json();
        setExistingFiles(data.blobs);
      }
    } catch (error) {
      console.error("Failed to fetch existing files:", error);
      toast.error("Failed to load existing files");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    // Let the same file be picked again after an error.
    e.target.value = "";
    if (files.length === 0) return;

    setUploading(true);
    let uploadedCount = 0;
    let lastUrl: string | null = null;

    try {
      for (const [index, file] of files.entries()) {
        const counter = files.length > 1 ? ` (${index + 1}/${files.length})` : "";
        setProgress({ label: `${file.name}${counter}`, percentage: 0 });

        try {
          const url = await uploadMedia(file, {
            folder: folder ?? "uploads",
            kind,
            onProgress: (percentage) =>
              setProgress({ label: `${file.name}${counter}`, percentage }),
          });
          lastUrl = url;
          uploadedCount += 1;
          onChange(url);
        } catch (error) {
          console.error("Upload error:", error);
          toast.error(
            error instanceof Error ? error.message : `Failed to upload ${file.name}`
          );
        }
      }

      if (uploadedCount > 0) {
        if (lastUrl) setSelectedFile(lastUrl);
        toast.success(
          uploadedCount === 1 ? "File uploaded" : `${uploadedCount} files uploaded`
        );
        setIsOpen(false);
        fetchExistingFiles();
      }
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  function handleSelectExisting(url: string) {
    setSelectedFile(url);
    onChange(url);
    setIsOpen(false);
    toast.success("Image selected");
  }

  function handleClear() {
    setSelectedFile(null);
    onChange("");
  }

  /** Permanently removes a file from blob storage, once nothing points at it. */
  async function handleDeleteFromLibrary(url: string, pathname: string) {
    if (!window.confirm(`Permanently delete "${pathname}" from your media library?`)) {
      return;
    }

    setDeletingUrl(url);
    try {
      let response = await sendDelete(url, false);

      if (response.status === 409) {
        const data = (await response.json()) as {
          usages?: { type: string; label: string }[];
        };
        const list = (data.usages ?? [])
          .map((usage) => `${usage.type}: ${usage.label}`)
          .join("\n");
        const proceed = window.confirm(
          `This file is still used by:\n\n${list}\n\nDeleting it will leave those entries with a broken image. Delete anyway?`
        );
        if (!proceed) return;
        response = await sendDelete(url, true);
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to delete the file");
      }

      // Drop it from the grid without a round trip.
      setExistingFiles((prev) =>
        Object.fromEntries(
          Object.entries(prev)
            .map(([name, files]) => [name, files.filter((file) => file.url !== url)])
            .filter(([, files]) => (files as BlobFile[]).length > 0)
        )
      );
      if (selectedFile === url) handleClear();
      toast.success("File deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete the file");
    } finally {
      setDeletingUrl(null);
    }
  }

  function sendDelete(url: string, force: boolean) {
    return fetch("/api/admin/blob/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, force }),
    });
  }

  return (
    <>
      {/* Trigger + current selection */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {value ? <Replace className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
            {value ? "Replace" : label}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          )}
        </div>

        {/* Preview */}
        {value && (
          <div className="group relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
            <img src={value} alt="Selected" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={handleClear}
              title="Remove this image"
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Select Media</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              <button
                type="button"
                onClick={() => setActiveTab("existing")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "existing"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Choose Existing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "upload"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Upload New
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "existing" ? (
                <div className="space-y-6">
                  {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading files...</div>
                  ) : Object.keys(existingFiles).length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No files uploaded yet. Upload your first file!
                    </div>
                  ) : (
                    Object.entries(existingFiles).map(([folderName, files]) => (
                      <div key={folderName}>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 capitalize">
                          {folderName}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {files.map((file) => (
                            <div
                              key={file.url}
                              className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                                selectedFile === file.url
                                  ? "border-blue-500 ring-2 ring-blue-200"
                                  : "border-gray-200 hover:border-gray-300"
                              } ${deletingUrl === file.url ? "opacity-50" : ""}`}
                            >
                              <button
                                type="button"
                                title={`${file.pathname} — ${formatBytes(file.size)}`}
                                onClick={() => handleSelectExisting(file.url)}
                                disabled={deletingUrl === file.url}
                                className="h-full w-full"
                              >
                                <img
                                  src={file.url}
                                  alt={file.pathname}
                                  className="h-full w-full object-cover"
                                />
                                {selectedFile === file.url && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/20">
                                    <div className="rounded-full bg-blue-500 p-1">
                                      <Check className="h-4 w-4 text-white" />
                                    </div>
                                  </div>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteFromLibrary(file.url, file.pathname)
                                }
                                disabled={deletingUrl === file.url}
                                title={`Delete ${file.pathname} from the library`}
                                className="absolute right-1 top-1 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 focus-visible:opacity-100 group-hover:opacity-100 disabled:opacity-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <label
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 transition-colors ${
                      uploading
                        ? "cursor-not-allowed opacity-60"
                        : "cursor-pointer hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                        {multiple ? " one or more files" : ""} or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">{uploadHint(kind)}</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept={UPLOAD_LIMITS[kind].accept}
                      multiple={multiple}
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                  {progress && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="truncate pr-3">{progress.label}</span>
                        <span className="tabular-nums">{progress.percentage}%</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gray-900 transition-all duration-200"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
