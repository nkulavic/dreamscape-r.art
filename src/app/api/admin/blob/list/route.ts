import { NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prefix = searchParams.get("prefix") || undefined;

    const { blobs } = await list({
      prefix,
      limit: 1000,
    });

    // Group by folder and sort
    const groupedBlobs = blobs.reduce((acc, blob) => {
      const folder = blob.pathname.split("/")[0] || "root";
      if (!acc[folder]) {
        acc[folder] = [];
      }
      acc[folder].push({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      });
      return acc;
    }, {} as Record<string, any[]>);

    return NextResponse.json({ blobs: groupedBlobs });
  } catch (error) {
    console.error("Error listing blobs:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}
