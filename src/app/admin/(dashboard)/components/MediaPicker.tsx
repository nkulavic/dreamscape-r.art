"use client";

import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, X, Check } from "lucide-react";
import { toast } from "sonner";

interface MediaPickerProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  folder?: string; // Optional folder filter (e.g., "murals", "logos")
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
  accept = "image/*",
  label = "Choose Media",
  folder,
}: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [existingFiles, setExistingFiles] = useState<Record<string, BlobFile[]>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(value || null);
  const [activeTab, setActiveTab] = useState<"existing" | "upload">("existing");

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
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setSelectedFile(data.url);
      onChange(data.url);
      toast.success("File uploaded successfully");
      setIsOpen(false);

      // Refresh existing files
      fetchExistingFiles();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  }

  function handleSelectExisting(url: string) {
    setSelectedFile(url);
    onChange(url);
    setIsOpen(false);
    toast.success("Image selected");
  }

  return (
    <>
      {/* Trigger Button */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ImageIcon className="h-4 w-4" />
          {label}
        </button>

        {/* Preview */}
        {value && (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
            <img src={value} alt="Selected" className="w-full h-full object-cover" />
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
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 px-6">
              <button
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
                            <button
                              key={file.url}
                              onClick={() => handleSelectExisting(file.url)}
                              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                                selectedFile === file.url
                                  ? "border-blue-500 ring-2 ring-blue-200"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <img
                                src={file.url}
                                alt={file.pathname}
                                className="w-full h-full object-cover"
                              />
                              {selectedFile === file.url && (
                                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                  <div className="bg-blue-500 rounded-full p-1">
                                    <Check className="h-4 w-4 text-white" />
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {accept === "image/*" ? "Images only" : "Any file type"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept={accept}
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                  {uploading && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                      Uploading...
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
