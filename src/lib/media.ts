/**
 * Convert a Vercel Blob URL to a proxied URL using our custom domain
 */
export function blobToProxyUrl(blobUrl: string): string {
  if (!blobUrl) return "";

  // If it's already a proxy URL, return as-is
  if (blobUrl.startsWith("/media/") || !blobUrl.includes("blob.vercel-storage.com")) {
    return blobUrl;
  }

  // Extract the path from blob URL
  // From: https://bsqnxi6k4ykinw5k.public.blob.vercel-storage.com/murals/image.jpg
  // To: /media/murals/image.jpg
  const match = blobUrl.match(/\.public\.blob\.vercel-storage\.com\/(.+)$/);
  if (match) {
    return `/media/${match[1]}`;
  }

  return blobUrl;
}

/**
 * Convert a proxy URL back to a Vercel Blob URL (for internal use)
 */
export function proxyToBlobUrl(proxyUrl: string): string {
  if (!proxyUrl || !proxyUrl.startsWith("/media/")) {
    return proxyUrl;
  }

  const blobStoreId = process.env.BLOB_STORE_ID || process.env.NEXT_PUBLIC_BLOB_STORE_ID;
  if (!blobStoreId) {
    console.warn("BLOB_STORE_ID not configured");
    return proxyUrl;
  }

  // From: /media/murals/image.jpg
  // To: https://bsqnxi6k4ykinw5k.public.blob.vercel-storage.com/murals/image.jpg
  const path = proxyUrl.replace(/^\/media\//, "");
  return `https://${blobStoreId}.public.blob.vercel-storage.com/${path}`;
}
