export interface Mural {
  id: string;
  slug: string;
  title: string;
  location: {
    venue: string;
    city: string;
    state?: string;
    country: string;
  };
  year: number;
  description: string;
  dimensions?: {
    size: string;
    unit: string;
  };
  category: "commercial" | "community" | "education" | "international";
  tags: string[];
  // Storytelling fields
  artistNote: string;
  inspiration: string;
  process?: string;
  impact?: string;
  images: {
    hero: string;
    thumbnail: string;
    gallery: string[];
  };
  client?: string;
  featured: boolean;
}

export const murals: Mural[] = [
  {
    id: "underwater-haven",
    slug: "underwater-haven",
    title: "Underwater Haven",
    location: {
      venue: "Ursula Brewing",
      city: "Aurora",
      state: "CO",
      country: "USA",
    },
    year: 2022,
    description: "A vibrant ocean conservation piece featuring a 12-foot octopus, jellyfish, and coral reef ecosystem that transformed the brewery's tasting room into an underwater paradise.",
    dimensions: { size: "1,200", unit: "sq ft" },
    category: "commercial",
    tags: ["ocean", "conservation", "marine life", "brewery", "octopus", "jellyfish"],
    artistNote: "This piece holds a special place in my heart. Working with Ursula Brewing allowed me to merge my passion for ocean conservation with my art. Every tentacle of that octopus represents the interconnectedness of marine ecosystems.",
    inspiration: "I was inspired by my travels to coastal regions and witnessing both the beauty and fragility of ocean life. The octopus became a symbol of intelligence and adaptability, qualities I wanted to bring into the space.",
    process: "The mural took three weeks to complete, using a combination of aerosol and acrylic paints. I worked directly with the brewery owners to incorporate their brand's ocean theme while adding my own artistic interpretation.",
    impact: "The mural has become a destination piece for the brewery, with visitors specifically coming to see the artwork. It's sparked countless conversations about ocean conservation.",
    images: {
      hero: "/images/murals/underwater-haven-hero.jpg",
      thumbnail: "/images/murals/underwater-haven-thumb.jpg",
      gallery: [],
    },
    client: "Ursula Brewing",
    featured: true,
  },
  {
    id: "you-can-navigate-any-current",
    slug: "you-can-navigate-any-current",
    title: "You Can Navigate Any Current",
    location: {
      venue: "Ke'elikolani Middle School",
      city: "Honolulu",
      state: "HI",
      country: "USA",
    },
    year: 2023,
    description: "An empowering mural featuring a woman with flowing turquoise hair emerging from ocean waves, alongside a whale and tropical flowers, inspiring students to persevere through life's challenges.",
    category: "education",
    tags: ["empowerment", "ocean", "youth", "hawaii", "whale", "tropical"],
    artistNote: "Creating art for young people is incredibly fulfilling. This mural was designed to remind students that they have the strength to navigate whatever challenges come their way, just like the ocean's creatures adapt to changing currents.",
    inspiration: "Hawaii's connection to the ocean and the resilience of its youth inspired this piece. The woman represents inner strength and the whale symbolizes guidance and wisdom.",
    process: "I collaborated with teachers and students to understand what messages would resonate most. The turquoise color palette was chosen to reflect Hawaii's waters and create a calming yet energizing atmosphere.",
    impact: "Students have adopted the phrase 'navigate any current' as a school motto. Teachers report that the mural has become a gathering spot for positive conversations.",
    images: {
      hero: "/images/murals/navigate-current-hero.jpg",
      thumbnail: "/images/murals/navigate-current-thumb.jpg",
      gallery: [],
    },
    client: "Ke'elikolani Middle School",
    featured: true,
  },
  {
    id: "protect-your-peace",
    slug: "protect-your-peace",
    title: "Protect Your Peace",
    location: {
      venue: "Olde Town Arvada Mural Festival",
      city: "Arvada",
      state: "CO",
      country: "USA",
    },
    year: 2024,
    description: "A contemplative piece focused on mental wellness, featuring imagery that encourages viewers to prioritize their inner peace and mental health in today's fast-paced world.",
    category: "community",
    tags: ["mental health", "wellness", "community", "festival", "peace"],
    artistNote: "In a world that constantly demands our attention, I wanted to create a visual reminder to pause and protect our mental wellbeing. This piece is a love letter to everyone fighting invisible battles.",
    inspiration: "The mental health conversations happening in our communities inspired me. I wanted to contribute to destigmatizing these discussions through public art.",
    process: "Created during the Olde Town Arvada Mural Festival, this piece came together over an intense weekend of painting. The community's support and enthusiasm fueled every brushstroke.",
    images: {
      hero: "/images/murals/protect-peace-hero.jpg",
      thumbnail: "/images/murals/protect-peace-thumb.jpg",
      gallery: [],
    },
    featured: true,
  },
  {
    id: "rising-with-the-sea",
    slug: "rising-with-the-sea",
    title: "Rising With the Sea",
    location: {
      venue: "",
      city: "Portland",
      state: "OR",
      country: "USA",
    },
    year: 2024,
    description: "A striking portrait featuring a woman with blue skin and goggles emerging from ocean elements, symbolizing humanity's relationship with rising sea levels and environmental change.",
    category: "community",
    tags: ["ocean", "climate", "environmental", "portrait", "conservation"],
    artistNote: "Climate change is the defining issue of our time. This piece visualizes our connection to the ocean and the urgent need to protect it. The goggles represent seeing clearly into our environmental future.",
    inspiration: "Conversations with marine scientists and my own observations of changing coastlines drove this piece. I wanted to create something that was both beautiful and thought-provoking.",
    images: {
      hero: "/images/murals/rising-sea-hero.jpg",
      thumbnail: "/images/murals/rising-sea-thumb.jpg",
      gallery: [],
    },
    featured: true,
  },
  {
    id: "tiger-stance",
    slug: "tiger-stance",
    title: "Tiger Stance",
    location: {
      venue: "Hayden High School",
      city: "Hayden",
      state: "CO",
      country: "USA",
    },
    year: 2023,
    description: "A powerful tiger mural in the school gymnasium that embodies strength, focus, and determination for student athletes and the broader school community.",
    category: "education",
    tags: ["school", "sports", "tiger", "athletics", "strength"],
    artistNote: "School mascots carry so much meaning for students. I wanted to capture not just the tiger's physical power, but the mental fortitude it represents. Every student who walks into that gym sees a reminder of their own inner strength.",
    inspiration: "Meeting with coaches and athletes helped me understand what the tiger meant to their community. It's not just a mascot—it's a symbol of their collective identity and aspirations.",
    images: {
      hero: "/images/murals/tiger-stance-hero.jpg",
      thumbnail: "/images/murals/tiger-stance-thumb.jpg",
      gallery: [],
    },
    client: "Hayden High School",
    featured: false,
  },
  {
    id: "rocky-road-trips",
    slug: "rocky-road-trips",
    title: "Rocky Road Trips",
    location: {
      venue: "Good Times Burgers",
      city: "Aurora",
      state: "CO",
      country: "USA",
    },
    year: 2025,
    description: "A nostalgic Colorado-themed mural featuring a vintage VW bus, mountain landscapes, and the 'Welcome to Colorful Colorado' sign, celebrating road trip culture and local pride.",
    dimensions: { size: "1,800+", unit: "sq ft" },
    category: "commercial",
    tags: ["colorado", "vintage", "vw bus", "mountains", "nostalgia", "restaurant"],
    artistNote: "There's something magical about the American road trip, especially through Colorado's stunning landscapes. This mural captures that sense of adventure and freedom that comes with hitting the open road.",
    inspiration: "Classic Americana and Colorado's natural beauty came together in this piece. The VW bus represents a simpler time and the spirit of exploration.",
    process: "This was part of a larger project with Good Times Burgers, creating six murals across three locations. Each piece has unique elements while maintaining a cohesive Colorado theme.",
    images: {
      hero: "/images/murals/rocky-road-hero.jpg",
      thumbnail: "/images/murals/rocky-road-thumb.jpg",
      gallery: [],
    },
    client: "Good Times Burgers / Zhoo",
    featured: false,
  },
  {
    id: "duality",
    slug: "duality",
    title: "Duality",
    location: {
      venue: "Vintage Theater",
      city: "Aurora",
      state: "CO",
      country: "USA",
    },
    year: 2024,
    description: "A thought-provoking piece exploring the dual nature of human experience, created during the Colfax Canvas Mural Festival on Aurora's historic theater.",
    category: "community",
    tags: ["theater", "festival", "duality", "philosophy", "colfax"],
    artistNote: "Duality is something I think about often—light and dark, joy and sorrow, the seen and unseen parts of ourselves. This mural invites viewers to contemplate their own complexities.",
    inspiration: "The historic Vintage Theater deserved a piece that honored its role in presenting the full spectrum of human stories. Theater, like life, embraces duality.",
    images: {
      hero: "/images/murals/duality-hero.jpg",
      thumbnail: "/images/murals/duality-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "fire-starter",
    slug: "fire-starter",
    title: "Fire Starter",
    location: {
      venue: "Knobhill Urban Arts District",
      city: "Colorado Springs",
      state: "CO",
      country: "USA",
    },
    year: 2023,
    description: "A bold 40-foot semi-trailer transformation raising awareness for the positive impact of large-scale public art in Colorado Springs.",
    category: "community",
    tags: ["semi-trailer", "mobile", "public art", "advocacy"],
    artistNote: "Transforming a semi-trailer into rolling art was an exciting challenge. This mobile mural travels throughout the region, bringing the conversation about public art to communities that might not otherwise experience it.",
    inspiration: "I wanted to demonstrate that art belongs everywhere, not just in galleries. A moving canvas brings art to the people.",
    images: {
      hero: "/images/murals/fire-starter-hero.jpg",
      thumbnail: "/images/murals/fire-starter-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "power-within",
    slug: "power-within",
    title: "Power Within",
    location: {
      venue: "",
      city: "Colorado Springs",
      state: "CO",
      country: "USA",
    },
    year: 2023,
    description: "An empowering mural celebrating inner strength and personal power, designed to inspire viewers to recognize their own potential.",
    category: "community",
    tags: ["empowerment", "strength", "community", "inspirational"],
    artistNote: "We all have reservoirs of strength we don't even know exist until we need them. This mural is a visual reminder of that untapped power within each of us.",
    inspiration: "Conversations with community members about overcoming challenges inspired this piece. Everyone has a story of resilience.",
    images: {
      hero: "/images/murals/power-within-hero.jpg",
      thumbnail: "/images/murals/power-within-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "zen",
    slug: "zen",
    title: "Zen",
    location: {
      venue: "Shangri-La East Restaurant",
      city: "Colorado Springs",
      state: "CO",
      country: "USA",
    },
    year: 2022,
    description: "A serene mural blending Eastern aesthetics with contemporary street art style, creating a peaceful atmosphere for diners.",
    category: "commercial",
    tags: ["restaurant", "asian", "zen", "peaceful", "dining"],
    artistNote: "Creating a sense of tranquility in a restaurant setting was a wonderful challenge. The goal was to transport diners to a place of calm while they enjoyed their meal.",
    inspiration: "The restaurant's Asian-fusion concept inspired me to blend traditional Eastern motifs with my contemporary style.",
    images: {
      hero: "/images/murals/zen-hero.jpg",
      thumbnail: "/images/murals/zen-thumb.jpg",
      gallery: [],
    },
    client: "Shangri-La East Restaurant",
    featured: false,
  },
  {
    id: "la-rumba",
    slug: "la-rumba",
    title: "La Rumba",
    location: {
      venue: "",
      city: "Denver",
      state: "CO",
      country: "USA",
    },
    year: 2022,
    description: "A vibrant celebration of Latin culture and the energy of dance, bringing color and movement to Denver's streets.",
    category: "community",
    tags: ["latin", "dance", "culture", "celebration", "denver"],
    artistNote: "Dance is a universal language of joy. This mural captures the energy and passion of Latin music and movement that's so integral to Denver's cultural fabric.",
    inspiration: "The vibrant Latin community in Denver and their rich cultural traditions inspired every color choice and flowing line in this piece.",
    images: {
      hero: "/images/murals/la-rumba-hero.jpg",
      thumbnail: "/images/murals/la-rumba-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "one-love",
    slug: "one-love",
    title: "One Love",
    location: {
      venue: "RiNo Arts District",
      city: "Denver",
      state: "CO",
      country: "USA",
    },
    year: 2022,
    description: "A message of unity and love in Denver's renowned RiNo Arts District, celebrating the power of togetherness.",
    category: "community",
    tags: ["unity", "love", "rino", "denver", "community"],
    artistNote: "In times when division feels overwhelming, 'One Love' is a simple but powerful reminder that we're all connected. Love is the thread that binds us.",
    inspiration: "RiNo's spirit of creativity and community inspired this call for unity. The district represents what's possible when artists and neighbors come together.",
    images: {
      hero: "/images/murals/one-love-hero.jpg",
      thumbnail: "/images/murals/one-love-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "spread-love",
    slug: "spread-love",
    title: "Spread Love",
    location: {
      venue: "503W",
      city: "Colorado Springs",
      state: "CO",
      country: "USA",
    },
    year: 2022,
    description: "A bright, uplifting mural encouraging positivity and kindness in the Colorado Springs community.",
    category: "community",
    tags: ["love", "positivity", "community", "colorado springs"],
    artistNote: "Sometimes the simplest messages are the most powerful. 'Spread Love' is both an invitation and a call to action—a reminder that kindness ripples outward.",
    inspiration: "The community's desire for more positive public messaging inspired this straightforward but impactful piece.",
    images: {
      hero: "/images/murals/spread-love-hero.jpg",
      thumbnail: "/images/murals/spread-love-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "surfside-burger-bar",
    slug: "surfside-burger-bar",
    title: "Surfside Burger Bar",
    location: {
      venue: "Surfside Burger Bar",
      city: "Meredith",
      state: "NH",
      country: "USA",
    },
    year: 2022,
    description: "A coastal-themed dual facade mural bringing beach vibes to a multi-tiered dining establishment in New Hampshire.",
    dimensions: { size: "1,320", unit: "sq ft" },
    category: "commercial",
    tags: ["beach", "coastal", "restaurant", "new hampshire", "surfing"],
    artistNote: "Bringing beach culture to New Hampshire was a fun creative challenge. Even far from the ocean, people crave that laid-back coastal atmosphere.",
    inspiration: "The restaurant's surf theme and the New Hampshire lakes region's summer culture merged in this design.",
    images: {
      hero: "/images/murals/surfside-hero.jpg",
      thumbnail: "/images/murals/surfside-thumb.jpg",
      gallery: [],
    },
    client: "Surfside Burger Bar",
    featured: false,
  },
  {
    id: "molson-coors",
    slug: "molson-coors",
    title: "Coors Factory Collaboration",
    location: {
      venue: "Molson Coors Beverage Company",
      city: "Golden",
      state: "CO",
      country: "USA",
    },
    year: 2023,
    description: "A massive 7,500 square foot collaborative mural at the iconic Coors Factory, created with four other artists.",
    dimensions: { size: "7,500", unit: "sq ft" },
    category: "commercial",
    tags: ["collaboration", "brewery", "corporate", "large-scale", "golden"],
    artistNote: "Collaborating with four talented artists on a project of this scale was an incredible experience. Each artist brought their unique perspective, creating a piece that's greater than the sum of its parts.",
    inspiration: "The Coors Factory's history and Colorado's craft beer culture inspired themes of heritage, craftsmanship, and community.",
    process: "This was a true collaborative effort, with each artist taking sections while maintaining visual cohesion. Communication and mutual respect made the project successful.",
    images: {
      hero: "/images/murals/molson-coors-hero.jpg",
      thumbnail: "/images/murals/molson-coors-thumb.jpg",
      gallery: [],
    },
    client: "Molson Coors Beverage Company",
    featured: false,
  },
  {
    id: "colorful-playground-germany",
    slug: "colorful-playground-germany",
    title: "Colorful Playground",
    location: {
      venue: "FreiLuftKunst Main Spessart e. V.",
      city: "Hainburg",
      state: "",
      country: "Germany",
    },
    year: 2024,
    description: "A vibrant 600 square foot mural in Germany, bringing color and joy to a community playground space.",
    dimensions: { size: "600", unit: "sq ft" },
    category: "international",
    tags: ["germany", "international", "playground", "children", "community"],
    artistNote: "Painting in Germany was a dream come true. Despite the language barrier, art proved to be a universal communicator. Seeing children's faces light up made every moment worthwhile.",
    inspiration: "The playful spirit of childhood and the German community's warmth inspired bright, energetic imagery.",
    images: {
      hero: "/images/murals/germany-playground-hero.jpg",
      thumbnail: "/images/murals/germany-playground-thumb.jpg",
      gallery: [],
    },
    featured: false,
  },
];

export const getFeaturedMurals = () => murals.filter((mural) => mural.featured);

export const getMuralsByCategory = (category: Mural["category"]) =>
  murals.filter((mural) => mural.category === category);

export const getMuralBySlug = (slug: string) =>
  murals.find((mural) => mural.slug === slug);
