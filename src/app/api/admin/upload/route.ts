import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { auth } from "@/lib/auth";
import { UPLOAD_LIMITS, type UploadKind } from "@/lib/upload";

export const runtime = "nodejs";

/**
 * Issues short-lived tokens for browser-to-blob uploads.
 *
 * The file itself is sent by the browser straight to Vercel Blob, so it never hits
 * this function and is not capped by the 4.5 MB serverless request body limit.
 * Size and content-type limits are baked into the token below, so a tampered client
 * still can't exceed them.
 */
export async function POST(request: Request) {
  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Only the token request comes from the browser; the completion callback is
        // signed by Vercel Blob and verified by handleUpload, so auth belongs here.
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
          throw new Error("Unauthorized");
        }

        const kind = parseUploadKind(clientPayload);
        const limit = UPLOAD_LIMITS[kind];

        return {
          allowedContentTypes: limit.contentTypes,
          maximumSizeInBytes: limit.maxBytes,
          // Keeps re-uploads of the same filename from colliding with existing blobs.
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            userId: session.user.id,
            pathname,
          }),
        };
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("Blob upload error:", message);
    return NextResponse.json(
      { error: message },
      { status: message === "Unauthorized" ? 401 : 400 }
    );
  }
}

function parseUploadKind(clientPayload: string | null): UploadKind {
  if (!clientPayload) return "image";
  try {
    const parsed = JSON.parse(clientPayload) as { kind?: string };
    return parsed.kind === "video" ? "video" : "image";
  } catch {
    return "image";
  }
}
