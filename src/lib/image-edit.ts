/**
 * Canvas pipeline behind the admin image editor: rotate → crop → resize.
 *
 * Everything runs in the browser and produces a new File, which is uploaded as
 * a separate blob. The original is never modified.
 */

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EditImageOptions {
  /** Source image URL — must be same-origin (our /media/... proxy) or CORS-enabled. */
  src: string;
  /** Crop rectangle in source pixels, as reported by the cropper. */
  crop: CropArea;
  /** Degrees clockwise. */
  rotation?: number;
  /** Cap the output width; taller-than-wide crops scale proportionally. */
  maxWidth?: number;
  /** Name for the produced file, extension is replaced to match the type. */
  filename: string;
  /** PNG keeps transparency (logos); JPEG is much smaller for photos. */
  mimeType?: "image/jpeg" | "image/png" | "image/webp";
  quality?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Couldn't load that image for editing."));
    image.src = src;
  });
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable in this browser.");
  context.imageSmoothingQuality = "high";
  return { canvas, context };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Couldn't render the image.")),
      mimeType,
      quality
    );
  });
}

function withExtension(filename: string, mimeType: string): string {
  const extension =
    mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
  const base = filename.replace(/\.[a-z0-9]+$/i, "") || "image";
  return `${base}-edited.${extension}`;
}

/**
 * Ceiling on the working canvas. A 50 MB phone photo can be 50+ megapixels,
 * and rotating one at full resolution exhausts memory on mobile Safari.
 */
const MAX_WORKING_PIXELS = 24_000_000;

export async function renderEditedImage({
  src,
  crop,
  rotation = 0,
  maxWidth,
  filename,
  mimeType = "image/jpeg",
  quality = 0.92,
}: EditImageOptions): Promise<File> {
  const image = await loadImage(src);

  // Scale the whole working space down for very large sources. Crop
  // coordinates come back in source pixels, so they scale by the same factor.
  const scale = Math.min(
    1,
    Math.sqrt(MAX_WORKING_PIXELS / (image.width * image.height))
  );
  const sourceWidth = image.width * scale;
  const sourceHeight = image.height * scale;

  // Draw the rotated image onto a canvas big enough to hold its bounding box,
  // so the crop rectangle can be read straight out of it.
  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const boxWidth = sourceWidth * cos + sourceHeight * sin;
  const boxHeight = sourceWidth * sin + sourceHeight * cos;

  const rotated = createCanvas(boxWidth, boxHeight);
  rotated.context.translate(boxWidth / 2, boxHeight / 2);
  rotated.context.rotate(radians);
  rotated.context.drawImage(
    image,
    -sourceWidth / 2,
    -sourceHeight / 2,
    sourceWidth,
    sourceHeight
  );

  const area = {
    x: crop.x * scale,
    y: crop.y * scale,
    width: crop.width * scale,
    height: crop.height * scale,
  };

  const cropped = createCanvas(area.width, area.height);
  cropped.context.drawImage(
    rotated.canvas,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    cropped.canvas.width,
    cropped.canvas.height
  );

  let output = cropped.canvas;

  if (maxWidth && output.width > maxWidth) {
    const scale = maxWidth / output.width;
    const resized = createCanvas(maxWidth, output.height * scale);
    resized.context.drawImage(output, 0, 0, resized.canvas.width, resized.canvas.height);
    output = resized.canvas;
  }

  const blob = await canvasToBlob(output, mimeType, quality);
  const name = withExtension(filename, mimeType);

  return new File([blob], name, { type: mimeType });
}

/** Best-guess output type: keep PNG (transparency), otherwise JPEG. */
export function outputTypeFor(url: string): "image/jpeg" | "image/png" {
  return /\.png(\?|$)/i.test(url) ? "image/png" : "image/jpeg";
}

/** Pulls a usable filename out of a blob or proxy URL. */
export function filenameFromUrl(url: string): string {
  try {
    const path = url.split("?")[0];
    return decodeURIComponent(path.split("/").pop() || "image");
  } catch {
    return "image";
  }
}
