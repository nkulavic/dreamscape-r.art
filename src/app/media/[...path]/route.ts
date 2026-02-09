import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const filePath = path.join("/");

    // Construct the Vercel Blob URL
    const blobUrl = `https://${process.env.BLOB_STORE_ID}.public.blob.vercel-storage.com/${filePath}`;

    // Fetch from Vercel Blob
    const response = await fetch(blobUrl);

    if (!response.ok) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Get the file content
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();

    // Determine content type
    const contentType = response.headers.get("content-type") || "application/octet-stream";

    // Return with caching headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // 1 year cache
        "CDN-Cache-Control": "public, max-age=31536000, immutable",
        "Vercel-CDN-Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Media proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
