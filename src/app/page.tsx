import { getFeaturedMurals, getFeaturedClients, getFeaturedVideos } from "@/db/dal";
import Home from "./HomeClient";

export default async function HomePage() {
  const [murals, clients, videos] = await Promise.all([
    getFeaturedMurals(),
    getFeaturedClients(),
    getFeaturedVideos(),
  ]);

  return (
    <Home
      featuredMurals={murals.slice(0, 3)}
      featuredClients={clients}
      featuredVideos={videos.slice(0, 3)}
    />
  );
}
