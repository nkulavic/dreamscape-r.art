import { NextRequest, NextResponse } from "next/server";
import {
  getAllMurals,
  getFeaturedMurals,
  getMuralsByCategory,
} from "@/db/dal";
import type { Mural } from "@/db/dal";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as Mural["category"] | null;
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    let murals: Mural[];

    if (featured === "true") {
      murals = await getFeaturedMurals();
    } else if (
      category &&
      ["commercial", "community", "education", "international"].includes(
        category
      )
    ) {
      murals = await getMuralsByCategory(category);
    } else {
      murals = await getAllMurals();
    }

    if (limit) {
      const n = parseInt(limit, 10);
      if (!isNaN(n) && n > 0) {
        murals = murals.slice(0, n);
      }
    }

    return NextResponse.json(
      { count: murals.length, murals },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching murals:", error);
    return NextResponse.json(
      { error: "Failed to fetch murals" },
      { status: 500 }
    );
  }
}
