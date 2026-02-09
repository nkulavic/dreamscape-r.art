import { getFeaturedMurals, getFeaturedClients, getFeaturedVideos } from "@/db/dal";
import Home from "./HomeClient";

// Fisher-Yates shuffle algorithm for randomizing arrays
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function HomePage() {
  const [murals, clients, videos] = await Promise.all([
    getFeaturedMurals(),
    getFeaturedClients(),
    getFeaturedVideos(),
  ]);

  // Randomize featured content and show 3 random items
  const randomMurals = shuffle(murals).slice(0, 3);
  const randomVideos = shuffle(videos).slice(0, 3);

  return (
    <Home
      featuredMurals={randomMurals}
      featuredClients={clients}
      featuredVideos={randomVideos}
    />
  );
}
