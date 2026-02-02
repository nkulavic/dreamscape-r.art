export interface SiteConfig {
  name: string;
  artistName: string;
  title: string;
  taglines: string[];
  email: string;
  phone?: string;
  location: string;
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
    tiktok: string;
    pinterest: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "DREAMSCAPER",
  artistName: "Rachel Dinda",
  title: "Professional Muralist",
  taglines: [
    "Guided by community, inspired by culture",
    "Transforming spaces with vibrant, large-scale murals",
    "Authentically Inspired",
    "Passionately Crafted",
    "Visually Engaging",
  ],
  email: "R.dreamscapes@gmail.com",
  location: "Denver, Colorado",
  social: {
    instagram: "https://instagram.com/dreamscape_r",
    facebook: "https://facebook.com/Dreamscapesbydesign",
    youtube: "https://youtube.com/channel/UCgOWotYDWnDgVfuFQUw-dOQ",
    linkedin: "https://linkedin.com/in/dreamscapeart",
    tiktok: "https://tiktok.com/@dreamscapes_design",
    pinterest: "https://pinterest.com/Dreamscape_r",
  },
};

export const credentials = {
  osha: "OSHA Lift Certified",
  insured: "Locally Insured",
  experience: "10+ Years Experience",
  education: "RN, BSN",
};

export const services = [
  {
    id: "commercial",
    title: "Commercial Murals",
    description: "Large-scale murals for businesses, restaurants, breweries, and retail spaces that attract customers and create memorable experiences.",
    examples: ["Restaurants", "Breweries", "Retail Stores", "Office Spaces"],
  },
  {
    id: "community",
    title: "Community Projects",
    description: "Public art that brings neighborhoods together, raises awareness for causes, and creates lasting positive impact.",
    examples: ["Public Walls", "Nonprofits", "Community Centers", "Art Districts"],
  },
  {
    id: "education",
    title: "Educational Institutions",
    description: "Inspiring murals for schools and universities that motivate students and celebrate learning.",
    examples: ["K-12 Schools", "Universities", "Libraries", "Youth Centers"],
  },
  {
    id: "residential",
    title: "Residential & Private",
    description: "Custom artwork for homes and private collections that reflect your personal story and style.",
    examples: ["Home Interiors", "Backyard Murals", "Private Commissions"],
  },
];
