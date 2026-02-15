import { NextRequest, NextResponse } from "next/server";
import { getMuralBySlug } from "@/db/dal";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const mural = await getMuralBySlug(slug);

    if (!mural) {
      return NextResponse.json(
        { error: "Mural not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mural, {
      headers: {
        "Cache-Control":
          "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching mural:", error);
    return NextResponse.json(
      { error: "Failed to fetch mural" },
      { status: 500 }
    );
  }
}
