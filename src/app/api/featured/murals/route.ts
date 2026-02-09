import { NextResponse } from "next/server";
import { getFeaturedMurals } from "@/db/dal";

// Fisher-Yates shuffle algorithm
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  try {
    const murals = await getFeaturedMurals();
    const randomMurals = shuffle(murals).slice(0, 3);

    return NextResponse.json(randomMurals);
  } catch (error) {
    console.error("Error fetching random featured murals:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured murals" },
      { status: 500 }
    );
  }
}
