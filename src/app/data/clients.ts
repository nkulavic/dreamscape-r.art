export interface Client {
  id: string;
  name: string;
  logo?: string;
  projectSize?: string;
  featured: boolean;
  category: "corporate" | "education" | "nonprofit" | "restaurant" | "community";
}

export const clients: Client[] = [
  // Major Corporate
  {
    id: "molson-coors",
    name: "Molson Coors",
    projectSize: "7,500 sq ft",
    featured: true,
    category: "corporate",
    logo: "https://logo.clearbit.com/molsoncoors.com"
  },
  {
    id: "walmart",
    name: "Walmart / Now Mural Arts",
    featured: true,
    category: "corporate",
    logo: "https://logo.clearbit.com/walmart.com"
  },
  {
    id: "downtown-denver",
    name: "Downtown Denver Partnership",
    featured: true,
    category: "corporate",
    logo: "https://logo.clearbit.com/downtowndenver.com"
  },

  // Education
  {
    id: "monte-vista-schools",
    name: "Monte Vista School District",
    projectSize: "1,000+ sq ft",
    featured: true,
    category: "education"
  },
  {
    id: "kelikolani",
    name: "Ke'elikolani Middle School",
    featured: true,
    category: "education"
  },
  { id: "hayden-high", name: "Hayden High School", featured: false, category: "education" },

  // Nonprofits
  {
    id: "girl-scouts",
    name: "Girl Scouts of America",
    featured: true,
    category: "nonprofit",
    logo: "https://logo.clearbit.com/girlscouts.org"
  },
  {
    id: "boys-girls-club",
    name: "Boys & Girls Club",
    featured: true,
    category: "nonprofit",
    logo: "https://logo.clearbit.com/bgca.org"
  },
  { id: "counting-coral", name: "Counting Coral 501(c)(3)", featured: false, category: "nonprofit" },
  { id: "family-success", name: "Family Success Center", projectSize: "1,000+ sq ft", featured: false, category: "nonprofit" },
  { id: "weighout", name: "WeighOut Ministries", projectSize: "500 sq ft", featured: false, category: "nonprofit" },

  // Restaurants & Breweries
  { id: "good-times", name: "Good Times Burgers / Zhoo", projectSize: "1,800+ sq ft", featured: false, category: "restaurant" },
  { id: "ursula", name: "Ursula Brewing", featured: false, category: "restaurant" },
  { id: "shangri-la", name: "Shangri-La East Restaurant", featured: false, category: "restaurant" },
  { id: "surfside", name: "Surfside Burger Bar", projectSize: "1,320 sq ft", featured: false, category: "restaurant" },
  {
    id: "margaritaville",
    name: "Margaritaville Honolulu",
    featured: true,
    category: "restaurant",
    logo: "https://logo.clearbit.com/margaritaville.com"
  },

  // Community & Arts
  { id: "knobhill", name: "KnobHill Urban Arts District", featured: false, category: "community" },
  { id: "alameda-corridor", name: "Alameda Connects / City of Lakewood", featured: false, category: "community" },
  { id: "503w", name: "503 West", featured: false, category: "community" },
  { id: "colorado-craft", name: "Colorado Craft", featured: false, category: "community" },
  { id: "lee-spirits", name: "Lee Spirits", featured: false, category: "corporate" },
  { id: "johnson-ortho", name: "Johnson Orthodontics", featured: false, category: "corporate" },
  { id: "birdseed", name: "The Birdseed Collective", featured: false, category: "community" },
  { id: "crane-games", name: "Crane Games", featured: false, category: "corporate" },
  { id: "novacane", name: "Novacane SugarCane Juice + Acai", featured: false, category: "restaurant" },
  { id: "ultra-flat", name: "Ultra Flat Black Gallery", featured: false, category: "community" },
  { id: "anomalink", name: "Anomalink", featured: false, category: "corporate" },
];

export const getFeaturedClients = () => clients.filter((client) => client.featured);

export const getClientsByCategory = (category: Client["category"]) =>
  clients.filter((client) => client.category === category);
