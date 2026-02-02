export interface Mural {
  id: string;
  slug: string;
  title: string;
  location: {
    venue: string;
    city: string;
    state?: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
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
  video?: string; // Path to video file (e.g., "/videos/mural-name.mp4")
  client?: string;
  featured: boolean;
}

export const murals: Mural[] = [
  {
    id: "protect-your-peace",
    slug: "protect-your-peace",
    title: "Protect Your Peace",
    location: {
      venue: "Olde Town Arvada Mural Festival",
      city: "Arvada",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.8028, lng: -105.0875 },
    },
    year: 2023,
    description: "A stunning ocean-themed mural featuring a woman with flowing wave hair, underwater elements, and vibrant marine life. This piece celebrates ocean conservation while encouraging viewers to find inner peace.",
    category: "community",
    tags: ["ocean", "conservation", "mental health", "festival", "peace", "marine life"],
    artistNote: "This piece holds a special place in my heart. The ocean has always been a source of peace and inspiration for me. I wanted to create something that would remind people to protect both our oceans and their own inner peace.",
    inspiration: "The mental health conversations happening in our communities combined with my passion for ocean conservation inspired me. The woman's wave hair symbolizes how we're all connected to nature.",
    process: "Created during the Olde Town Arvada Mural Festival, this piece came together over an intense weekend of painting. The community's support and enthusiasm fueled every brushstroke.",
    images: {
      hero: "/images/murals/protect-your-peace.jpg",
      thumbnail: "/images/murals/protect-your-peace.jpg",
      gallery: [],
    },
    video: "/videos/protect-your-peace-arvada.mp4",
    featured: true,
  },
  {
    id: "underwater-haven",
    slug: "underwater-haven",
    title: "Underwater Haven",
    location: {
      venue: "Ursula Brewery",
      city: "Aurora",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.7294, lng: -104.8319 },
    },
    year: 2022,
    description: "A vibrant ocean conservation piece featuring a coral reef ecosystem with jellyfish and sea life that transformed the brewery's tasting room into an underwater paradise.",
    dimensions: { size: "1,200", unit: "sq ft" },
    category: "commercial",
    tags: ["ocean", "conservation", "marine life", "brewery", "coral", "jellyfish"],
    artistNote: "Working with Ursula Brewing allowed me to merge my passion for ocean conservation with my art. Every detail represents the interconnectedness of marine ecosystems.",
    inspiration: "I was inspired by my travels to coastal regions and witnessing both the beauty and fragility of ocean life. The underwater world became a symbol of the mystery and wonder beneath the waves.",
    process: "The mural took three weeks to complete, using a combination of aerosol and acrylic paints. I worked directly with the brewery owners to incorporate their brand's ocean theme while adding my own artistic interpretation.",
    impact: "The mural has become a destination piece for the brewery, with visitors specifically coming to see the artwork. It's sparked countless conversations about ocean conservation.",
    images: {
      hero: "/images/murals/ursula-brewery.jpg",
      thumbnail: "/images/murals/ursula-brewery.jpg",
      gallery: [],
    },
    video: "/videos/ocean-conservation.mp4",
    client: "Ursula Brewery",
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
      coordinates: { lat: 21.3069, lng: -157.8583 },
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
      hero: "/images/murals/hawaii-navigate-current.jpg",
      thumbnail: "/images/murals/hawaii-navigate-current.jpg",
      gallery: [],
    },
    client: "Ke'elikolani Middle School",
    featured: true,
  },
  {
    id: "molson-coors",
    slug: "molson-coors",
    title: "Coors Factory Mural",
    location: {
      venue: "Molson Coors Beverage Company",
      city: "Golden",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.7555, lng: -105.2211 },
    },
    year: 2023,
    description: "A massive mural at the iconic Coors Factory featuring the classic Coors branding with golden wheat, Rocky Mountain landscapes, and hop vines celebrating Colorado's brewing heritage.",
    dimensions: { size: "7,500", unit: "sq ft" },
    category: "commercial",
    tags: ["collaboration", "brewery", "corporate", "large-scale", "golden", "colorado"],
    artistNote: "Collaborating on a project of this scale at such an iconic location was an incredible experience. The Coors Factory is a Colorado landmark, and contributing to its visual identity was an honor.",
    inspiration: "The Coors Factory's history and Colorado's craft beer culture inspired themes of heritage, craftsmanship, and the natural beauty of the Rocky Mountains.",
    process: "This was a true collaborative effort. Communication and mutual respect made the project successful, despite the massive scale.",
    images: {
      hero: "/images/murals/molson-coors-brewery.jpg",
      thumbnail: "/images/murals/molson-coors-brewery.jpg",
      gallery: ["/images/murals/molson-coors-trailer.jpg"],
    },
    client: "Molson Coors Beverage Company",
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
      coordinates: { lat: 40.4914, lng: -107.2573 },
    },
    year: 2023,
    description: "A powerful tiger mural in the school gymnasium featuring the Hayden Tigers mascot surrounded by tropical foliage, embodying strength, focus, and determination for student athletes.",
    category: "education",
    tags: ["school", "sports", "tiger", "athletics", "strength", "mascot"],
    artistNote: "School mascots carry so much meaning for students. I wanted to capture not just the tiger's physical power, but the mental fortitude it represents. Every student who walks into that gym sees a reminder of their own inner strength.",
    inspiration: "Meeting with coaches and athletes helped me understand what the tiger meant to their community. It's not just a mascot—it's a symbol of their collective identity and aspirations.",
    images: {
      hero: "/images/murals/hayden-tiger.jpg",
      thumbnail: "/images/murals/hayden-tiger.jpg",
      gallery: [],
    },
    client: "Hayden High School",
    featured: false,
  },
  {
    id: "rocky-road-trips",
    slug: "rocky-road-trips",
    title: "Welcome to Colorful Colorado",
    location: {
      venue: "Good Times Burgers",
      city: "Aurora",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.7294, lng: -104.8319 },
    },
    year: 2025,
    description: "A nostalgic Colorado-themed mural featuring a vintage VW bus, majestic mountain landscapes, soaring eagles, and the iconic 'Welcome to Colorful Colorado' sign, celebrating road trip culture and local pride.",
    dimensions: { size: "1,800+", unit: "sq ft" },
    category: "commercial",
    tags: ["colorado", "vintage", "vw bus", "mountains", "nostalgia", "restaurant"],
    artistNote: "There's something magical about the American road trip, especially through Colorado's stunning landscapes. This mural captures that sense of adventure and freedom that comes with hitting the open road.",
    inspiration: "Classic Americana and Colorado's natural beauty came together in this piece. The VW bus represents a simpler time and the spirit of exploration.",
    process: "This was part of a larger project with Good Times Burgers, creating murals across multiple locations. Each piece has unique elements while maintaining a cohesive Colorado theme.",
    images: {
      hero: "/images/murals/colorful-colorado-vw.jpg",
      thumbnail: "/images/murals/colorful-colorado-vw.jpg",
      gallery: [],
    },
    client: "Good Times Burgers / Zhoo",
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
      coordinates: { lat: 38.8339, lng: -104.8214 },
    },
    year: 2022,
    description: "A serene Buddha mural blending Eastern aesthetics with contemporary street art style, featuring lotus flowers, a bonsai tree, and peaceful imagery creating a tranquil atmosphere for diners.",
    category: "commercial",
    tags: ["restaurant", "asian", "zen", "peaceful", "dining", "buddha"],
    artistNote: "Creating a sense of tranquility in a restaurant setting was a wonderful challenge. The goal was to transport diners to a place of calm while they enjoyed their meal.",
    inspiration: "The restaurant's Asian-fusion concept inspired me to blend traditional Eastern motifs with my contemporary style. The Buddha represents inner peace and mindfulness.",
    images: {
      hero: "/images/murals/zen-shangri-la.jpg",
      thumbnail: "/images/murals/zen-shangri-la.jpg",
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
      venue: "La Rumba",
      city: "Denver",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.7392, lng: -104.9903 },
    },
    year: 2022,
    description: "A vibrant celebration of Latin culture featuring a beautiful woman with flowing blue hair adorned with roses, alongside a colorful chameleon, bringing color and movement to Denver's streets.",
    category: "community",
    tags: ["latin", "culture", "celebration", "denver", "portrait", "flowers"],
    artistNote: "Dance is a universal language of joy. This mural captures the energy and passion of Latin music and movement that's so integral to Denver's cultural fabric.",
    inspiration: "The vibrant Latin community in Denver and their rich cultural traditions inspired every color choice and flowing line in this piece.",
    images: {
      hero: "/images/murals/la-rumba-denver.jpg",
      thumbnail: "/images/murals/la-rumba-denver.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "spread-love-colorado",
    slug: "spread-love-colorado",
    title: "Spread Love - It's the Colorado Way",
    location: {
      venue: "",
      city: "Colorado",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.5501, lng: -105.7821 },
    },
    year: 2022,
    description: "A bright, uplifting mural with bold typography encouraging positivity and kindness, featuring Colorado mountain imagery, vibrant flowers, and the inspiring message 'Spread Love - It's the Colorado Way'.",
    category: "community",
    tags: ["love", "positivity", "community", "colorado", "typography", "mountains"],
    artistNote: "Sometimes the simplest messages are the most powerful. 'Spread Love' is both an invitation and a call to action—a reminder that kindness ripples outward.",
    inspiration: "Colorado's community spirit and the desire for more positive public messaging inspired this straightforward but impactful piece.",
    images: {
      hero: "/images/murals/spread-love-colorado.jpg",
      thumbnail: "/images/murals/spread-love-colorado.jpg",
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
      coordinates: { lat: 43.6576, lng: -71.5001 },
    },
    year: 2022,
    description: "A coastal-themed dual facade mural featuring bold 'SURFSIDE' lettering, ocean waves, starfish, and tiki elements, bringing beach vibes to a multi-tiered dining establishment in New Hampshire.",
    dimensions: { size: "1,320", unit: "sq ft" },
    category: "commercial",
    tags: ["beach", "coastal", "restaurant", "new hampshire", "surfing", "tiki"],
    artistNote: "Bringing beach culture to New Hampshire was a fun creative challenge. Even far from the ocean, people crave that laid-back coastal atmosphere.",
    inspiration: "The restaurant's surf theme and the New Hampshire lakes region's summer culture merged in this design.",
    images: {
      hero: "/images/murals/surfside.jpg",
      thumbnail: "/images/murals/surfside.jpg",
      gallery: ["/images/murals/surfside-angle.jpg"],
    },
    client: "Surfside Burger Bar",
    featured: false,
  },
  {
    id: "colfax-canvas",
    slug: "colfax-canvas",
    title: "Colfax Canvas",
    location: {
      venue: "Colfax Canvas Mural Festival",
      city: "Aurora",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.7294, lng: -104.8319 },
    },
    year: 2024,
    description: "A massive collaborative mural featuring Texas-inspired imagery including longhorn skulls, an eagle, desert flowers, cacti, and vibrant flora, created during the Colfax Canvas Mural Festival.",
    category: "community",
    tags: ["festival", "colfax", "aurora", "eagle", "flowers", "southwest"],
    artistNote: "Duality is something I think about often—life and death, desert and bloom, the seen and unseen parts of nature. This mural invites viewers to contemplate these contrasts.",
    inspiration: "The historic Colfax corridor deserved a piece that honored both its gritty character and natural beauty. The eagle represents vision and freedom.",
    images: {
      hero: "/images/murals/colfax-canvas.jpg",
      thumbnail: "/images/murals/colfax-canvas.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "lion-heart",
    slug: "lion-heart",
    title: "Lion Heart",
    location: {
      venue: "Private Residence",
      city: "Colorado",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.5501, lng: -105.7821 },
    },
    year: 2023,
    description: "A stunning residential garage door mural featuring a majestic lion portrait with flowing mane in warm orange and coral tones against a vibrant red and teal background.",
    category: "commercial",
    tags: ["lion", "residential", "portrait", "garage", "animal"],
    artistNote: "Lions represent courage and strength. This homeowner wanted a daily reminder of their own inner lion, and I was honored to bring that vision to life on their garage door.",
    inspiration: "The power and majesty of lions, combined with the homeowner's personal journey, inspired this bold piece.",
    images: {
      hero: "/images/murals/lion-garage.jpg",
      thumbnail: "/images/murals/lion-garage.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "siempre-estuvimos-aqui",
    slug: "siempre-estuvimos-aqui",
    title: "Siempre Estuvimos Aquí",
    location: {
      venue: "Siempre Estuvimos Aquí Festival",
      city: "Puerto Caldas",
      state: "",
      country: "Colombia",
      coordinates: { lat: 4.8333, lng: -75.9333 },
    },
    year: 2023,
    description: "An international mural created during the 'Siempre Estuvimos Aquí' festival in Colombia, featuring a powerful portrait of a woman with a blue radiant crown/halo, celebrating Afro-Colombian heritage and resilience.",
    category: "international",
    tags: ["colombia", "international", "festival", "afro-colombian", "portrait", "culture"],
    artistNote: "Painting in Colombia was transformative. Despite language barriers, art proved to be a universal communicator. The community's warmth and the importance of honoring Afro-Colombian heritage made this piece deeply meaningful.",
    inspiration: "The strength and beauty of Afro-Colombian women and the festival's theme of 'We Were Always Here' inspired this tribute to resilience and presence.",
    images: {
      hero: "/images/murals/colombia-woman.jpg",
      thumbnail: "/images/murals/colombia-woman.jpg",
      gallery: [],
    },
    featured: true,
  },
  {
    id: "all-stars-ink",
    slug: "all-stars-ink",
    title: "All Stars Ink Cosmic",
    location: {
      venue: "All Stars Ink",
      city: "Colorado",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.5501, lng: -105.7821 },
    },
    year: 2022,
    description: "A cosmic space-themed mural featuring DNA helixes, exploding stars, and galaxy imagery spanning multiple buildings at a tattoo studio, creating an otherworldly atmosphere.",
    category: "commercial",
    tags: ["space", "cosmic", "galaxy", "tattoo", "dna", "stars"],
    artistNote: "The cosmos and tattooing both deal with permanence and the infinite. This piece connects the micro (DNA) with the macro (galaxies), reminding us that we're all made of stardust.",
    inspiration: "The tattoo studio's creative energy and the mystery of space came together in this cosmic exploration.",
    images: {
      hero: "/images/murals/all-stars-ink.jpg",
      thumbnail: "/images/murals/all-stars-ink.jpg",
      gallery: [],
    },
    client: "All Stars Ink",
    featured: false,
  },
  {
    id: "galaxy-dreams",
    slug: "galaxy-dreams",
    title: "Galaxy Dreams",
    location: {
      venue: "Private Residence",
      city: "Colorado",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.5501, lng: -105.7821 },
    },
    year: 2022,
    description: "A breathtaking residential mural featuring a colorful nebula with stars, creating an immersive space experience that transforms a room into a window to the cosmos.",
    category: "commercial",
    tags: ["space", "galaxy", "nebula", "residential", "stars", "cosmic"],
    artistNote: "Imagine falling asleep under the stars every night. This mural brings the wonder of the cosmos into everyday life, turning a simple room into a portal to infinite possibilities.",
    inspiration: "The homeowner's love of astronomy and desire to feel connected to something larger than themselves inspired this cosmic creation.",
    images: {
      hero: "/images/murals/galaxy-nebula.jpg",
      thumbnail: "/images/murals/galaxy-nebula.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "octopus-bar",
    slug: "octopus-bar",
    title: "Deep Blue",
    location: {
      venue: "",
      city: "Colorado",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.5501, lng: -105.7821 },
    },
    year: 2022,
    description: "A mesmerizing octopus mural behind a bar, featuring iridescent tentacles swirling through deep blue waters, creating an immersive underwater atmosphere for patrons.",
    category: "commercial",
    tags: ["octopus", "bar", "underwater", "ocean", "marine life"],
    artistNote: "Octopuses are incredibly intelligent and adaptable creatures. Their fluid movement and mysterious nature made them perfect for a space where people come to unwind and let their minds wander.",
    inspiration: "The octopus's elegance and the bar's desire for something truly unique came together in this deep-sea creation.",
    images: {
      hero: "/images/murals/octopus-bar.jpg",
      thumbnail: "/images/murals/octopus-bar.jpg",
      gallery: [],
    },
    featured: false,
  },
  {
    id: "psychedelic-summer",
    slug: "psychedelic-summer",
    title: "Psychedelic Summer",
    location: {
      venue: "",
      city: "Colorado",
      state: "CO",
      country: "USA",
      coordinates: { lat: 39.5501, lng: -105.7821 },
    },
    year: 2023,
    description: "A vibrant, colorful portrait of a woman with flowing psychedelic hair, octopus tentacles, and retro sunglasses, capturing the free spirit of summer and creativity.",
    category: "community",
    tags: ["psychedelic", "portrait", "colorful", "summer", "retro"],
    artistNote: "Summer is a state of mind. This mural captures that feeling of freedom, creativity, and letting your true colors show.",
    inspiration: "The 60s and 70s psychedelic art movement combined with contemporary street art aesthetics to create this celebration of self-expression.",
    images: {
      hero: "/images/murals/psychedelic-woman.jpg",
      thumbnail: "/images/murals/psychedelic-woman.jpg",
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
