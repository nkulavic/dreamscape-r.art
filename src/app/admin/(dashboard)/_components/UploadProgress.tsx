"use client";

/** Determinate progress bar shown while a file uploads to Vercel Blob. */
export default function UploadProgress({
  percentage,
  label = "Uploading",
}: {
  percentage: number | null;
  label?: string;
}) {
  if (percentage === null) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span className="tabular-nums">{percentage}%</span>
      </div>
      <div
        className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-gray-900 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
