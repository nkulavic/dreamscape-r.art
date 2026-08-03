/**
 * Shared media upload rules.
 *
 * Uploads go straight from the browser to Vercel Blob (see `src/lib/upload-client.ts`
 * and `/api/admin/upload`), so they are NOT subject to the 4.5 MB request body limit
 * that applies to Vercel serverless functions. The limits below are our own policy
 * limits — they are enforced client-side for a fast error message and again server-side
 * on the upload token, so they cannot be bypassed.
 */

export type UploadKind = "image" | "video";

export interface UploadLimit {
  /** Hard cap for this kind of file. */
  maxBytes: number;
  /** Content types accepted by the blob token. */
  contentTypes: string[];
  /** Value for the file input's `accept` attribute. */
  accept: string;
}

const MB = 1024 * 1024;

export const UPLOAD_LIMITS: Record<UploadKind, UploadLimit> = {
  image: {
    maxBytes: 50 * MB,
    contentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
    accept: "image/jpeg,image/png,image/webp,image/avif,image/gif",
  },
  video: {
    maxBytes: 500 * MB,
    contentTypes: ["video/mp4", "video/webm", "video/quicktime"],
    accept: "video/mp4,video/webm,video/quicktime",
  },
};

/** Files above this size are uploaded in parallel chunks with automatic retries. */
export const MULTIPART_THRESHOLD_BYTES = 10 * MB;

/** Browsers cannot render these, so they are rejected with a helpful message. */
const UNSUPPORTED_IMAGE_TYPES = ["image/heic", "image/heif"];
const UNSUPPORTED_IMAGE_EXTENSIONS = [".heic", ".heif"];

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${Math.round(bytes / 1024)} KB`;
  const mb = bytes / MB;
  if (mb < 1024) return `${mb >= 10 ? Math.round(mb) : mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(1)} GB`;
}

/** Human-readable hint to show under a file input, e.g. "JPG, PNG, WebP, AVIF or GIF — up to 50 MB". */
export function uploadHint(kind: UploadKind): string {
  const { contentTypes, maxBytes } = UPLOAD_LIMITS[kind];
  const labels = contentTypes.map((type) => {
    const subtype = type.split("/")[1];
    if (subtype === "jpeg") return "JPG";
    if (subtype === "quicktime") return "MOV";
    return subtype.toUpperCase();
  });
  const list =
    labels.length > 1
      ? `${labels.slice(0, -1).join(", ")} or ${labels[labels.length - 1]}`
      : labels[0];
  return `${list} — up to ${formatBytes(maxBytes)}`;
}

export function uploadKindForFile(file: { type: string }): UploadKind {
  return file.type.startsWith("video/") ? "video" : "image";
}

/**
 * Returns an error message when the file should be rejected, or `null` when it is fine.
 */
export function validateUploadFile(
  file: { name: string; size: number; type: string },
  kind: UploadKind = uploadKindForFile(file)
): string | null {
  const lowerName = file.name.toLowerCase();

  if (
    kind === "image" &&
    (UNSUPPORTED_IMAGE_TYPES.includes(file.type) ||
      UNSUPPORTED_IMAGE_EXTENSIONS.some((ext) => lowerName.endsWith(ext)))
  ) {
    return "HEIC/HEIF images can't be displayed by web browsers. Export the photo as JPEG or PNG and try again.";
  }

  const limit = UPLOAD_LIMITS[kind];

  if (file.type && !limit.contentTypes.includes(file.type)) {
    return `"${file.name}" is a ${file.type || "unknown"} file. Allowed: ${uploadHint(kind)}.`;
  }

  if (file.size === 0) {
    return `"${file.name}" is empty.`;
  }

  if (file.size > limit.maxBytes) {
    return `"${file.name}" is ${formatBytes(file.size)}. The limit for ${
      kind === "video" ? "videos" : "images"
    } is ${formatBytes(limit.maxBytes)}.`;
  }

  return null;
}

/** Strips path separators and odd characters so blob pathnames stay predictable. */
export function sanitizeUploadFilename(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/\\/g, "/")
    .split("/")
    .pop()!
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+/, "");
  return cleaned || "file";
}

/** Builds the blob pathname, e.g. `murals/sunrise-wall.jpg`. */
export function buildUploadPathname(folder: string, filename: string): string {
  const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
  const cleanName = sanitizeUploadFilename(filename);
  return cleanFolder ? `${cleanFolder}/${cleanName}` : cleanName;
}
