export interface Video {
  id: string;
  title: string;
  description: string;
  src: string;
  poster?: string;
  category: "process" | "timelapse" | "festival" | "documentary";
  duration?: string;
  featured: boolean;
}

export const videos: Video[] = [
  {
    id: "protect-your-peace",
    title: "Protect Your Peace - Arvada Mural Festival",
    description:
      "Behind the scenes of creating the 'Protect Your Peace' mural at the Olde Town Arvada Street Art Chronicles festival.",
    src: "/videos/protect-your-peace-arvada.mp4",
    poster: "/images/murals/protect-your-peace.jpg",
    category: "festival",
    duration: "1:00",
    featured: true,
  },
  {
    id: "ocean-conservation",
    title: "Ocean Conservation Art",
    description:
      "Exploring how art can raise awareness for ocean conservation and inspire action to protect our marine ecosystems.",
    src: "/videos/ocean-conservation.mp4",
    poster: "/images/murals/ursula-brewery.jpg",
    category: "documentary",
    duration: "1:04",
    featured: true,
  },
  {
    id: "upfest-bristol",
    title: "Upfest: Bristol's Favorite Mural Festival",
    description:
      "Experience Europe's largest street art and graffiti festival in Bristol, UK, featuring incredible murals from artists around the world.",
    src: "/videos/upfest-bristol.mp4",
    category: "festival",
    duration: "0:43",
    featured: true,
  },
  {
    id: "spray-paint-experiment",
    title: "Spray Paint Experimentation",
    description:
      "Experimenting with spray paint can control and camera techniques to capture the mural creation process.",
    src: "/videos/spray-paint-experiment.mp4",
    category: "process",
    duration: "0:42",
    featured: false,
  },
  {
    id: "sugar-skull-nurses",
    title: "Sugar Skull Mural for Nurses Week",
    description:
      "Creating a sugar skull mural with cross syringes to honor healthcare workers during Nurses Week, combining artistic expression with appreciation for frontline heroes.",
    src: "/videos/sugar-skull-nurses-week.mp4",
    category: "timelapse",
    duration: "3:16",
    featured: true,
  },
  {
    id: "outside-denver",
    title: "Outside of Denver",
    description:
      "A glimpse into mural work and artistic exploration in the greater Denver area.",
    src: "/videos/outside-denver.mp4",
    category: "documentary",
    duration: "1:05",
    featured: false,
  },
];

export const getFeaturedVideos = () => videos.filter((v) => v.featured);
export const getVideosByCategory = (category: Video["category"]) =>
  videos.filter((v) => v.category === category);
