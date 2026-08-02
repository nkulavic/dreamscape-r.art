"use client";

import { upload } from "@vercel/blob/client";
import { blobToProxyUrl } from "./media";
import {
  MULTIPART_THRESHOLD_BYTES,
  buildUploadPathname,
  uploadKindForFile,
  validateUploadFile,
  type UploadKind,
} from "./upload";

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

interface UploadMediaOptions {
  /** Blob folder, e.g. "murals", "logos", "videos". */
  folder: string;
  /** Defaults to image/video detection from the file's MIME type. */
  kind?: UploadKind;
  /** Called with 0–100 as the upload progresses. */
  onProgress?: (percentage: number) => void;
}

/**
 * Uploads a file directly from the browser to Vercel Blob and returns the proxied
 * `/media/...` URL to store in the database.
 *
 * The file never passes through a serverless function, so the 4.5 MB request body
 * limit does not apply — only the policy limits in `src/lib/upload.ts`.
 */
export async function uploadMedia(
  file: File,
  { folder, kind = uploadKindForFile(file), onProgress }: UploadMediaOptions
): Promise<string> {
  const validationError = validateUploadFile(file, kind);
  if (validationError) {
    throw new UploadError(validationError);
  }

  try {
    const result = await upload(buildUploadPathname(folder, file.name), file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
      clientPayload: JSON.stringify({ kind }),
      multipart: file.size > MULTIPART_THRESHOLD_BYTES,
      onUploadProgress: onProgress
        ? ({ percentage }) => onProgress(Math.round(percentage))
        : undefined,
    });

    return blobToProxyUrl(result.url);
  } catch (error) {
    throw new UploadError(uploadErrorMessage(error, file.name));
  }
}

function uploadErrorMessage(error: unknown, filename: string): string {
  const raw = error instanceof Error ? error.message : String(error);

  if (/unauthorized/i.test(raw)) {
    return "Your session expired. Sign in again and retry the upload.";
  }
  if (/content type|not allowed/i.test(raw)) {
    return `"${filename}" has a file type that isn't allowed.`;
  }
  if (/too large|maximum size|exceed/i.test(raw)) {
    return `"${filename}" is larger than the upload limit.`;
  }
  if (/network|fetch failed|load failed/i.test(raw)) {
    return `Upload of "${filename}" was interrupted. Check your connection and try again.`;
  }

  return `Couldn't upload "${filename}". ${raw}`;
}
