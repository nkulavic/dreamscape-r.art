"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { RotateCcw, RotateCw, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  filenameFromUrl,
  outputTypeFor,
  renderEditedImage,
  type CropArea,
} from "@/lib/image-edit";

interface ImageEditorProps {
  /** Image to edit — the original is left untouched. */
  src: string;
  /** Receives the edited file; the caller uploads it and swaps in the new URL. */
  onSave: (file: File) => Promise<void> | void;
  onClose: () => void;
  /** Ratio pre-selected when the editor opens, e.g. 4/3 for mural thumbnails. */
  defaultAspect?: number;
}

const ASPECTS: { label: string; value: number | undefined; hint?: string }[] = [
  { label: "Free", value: undefined },
  { label: "4:3", value: 4 / 3, hint: "Portfolio grid" },
  { label: "1:1", value: 1, hint: "Logos, social" },
  { label: "16:9", value: 16 / 9, hint: "Wide / hero" },
  { label: "3:4", value: 3 / 4, hint: "Portrait" },
];

const WIDTHS: { label: string; value: number | undefined }[] = [
  { label: "Original", value: undefined },
  { label: "2400px", value: 2400 },
  { label: "1600px", value: 1600 },
  { label: "1200px", value: 1200 },
  { label: "800px", value: 800 },
];

export default function ImageEditor({
  src,
  onSave,
  onClose,
  defaultAspect = 4 / 3,
}: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(defaultAspect);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(2400);
  const [croppedArea, setCroppedArea] = useState<CropArea | null>(null);
  const [saving, setSaving] = useState(false);

  const onCropComplete = useCallback((_: CropArea, areaPixels: CropArea) => {
    setCroppedArea(areaPixels);
  }, []);

  function reset() {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspect(defaultAspect);
  }

  async function handleSave() {
    if (!croppedArea) return;

    setSaving(true);
    try {
      const file = await renderEditedImage({
        src,
        crop: croppedArea,
        rotation,
        maxWidth,
        filename: filenameFromUrl(src),
        mimeType: outputTypeFor(src),
      });
      await onSave(file);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Couldn't save the edited image."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit image</h2>
            <p className="text-xs text-gray-500">
              Saves as a new file — the original stays in your library.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close editor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative h-72 w-full bg-gray-900 sm:h-96">
          <Cropper
            image={src}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            restrictPosition={false}
          />
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {/* Aspect ratio */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Shape
            </p>
            <div className="flex flex-wrap gap-2">
              {ASPECTS.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setAspect(option.value)}
                  title={option.hint}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    aspect === option.value
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom + rotation */}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Zoom
              </span>
              <input
                type="range"
                min={1}
                max={4}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="mt-2 w-full accent-gray-900"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Straighten ({Math.round(rotation)}°)
              </span>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRotation((r) => r - 90)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  aria-label="Rotate left"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <input
                  type="range"
                  min={-180}
                  max={180}
                  step={1}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setRotation((r) => r + 90)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  aria-label="Rotate right"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>
            </label>
          </div>

          {/* Output size */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Save at most
            </p>
            <div className="flex flex-wrap gap-2">
              {WIDTHS.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setMaxWidth(option.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    maxWidth === option.value
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Smaller files load faster. 1600px is plenty for the portfolio grid.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-gray-200 p-5">
          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline"
          >
            Reset
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !croppedArea}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Save as new image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
