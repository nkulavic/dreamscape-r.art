export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  year: number;
  type: "solo" | "collaborative" | "group";
}

export interface Festival {
  id: string;
  name: string;
  location: string;
  year: number;
  international: boolean;
}

export interface Publication {
  id: string;
  outlet: string;
  title?: string;
  location?: string;
  year: number;
  type: "tv" | "magazine" | "newspaper" | "online" | "museum";
  url?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "exhibitzone-infrared",
    title: "Infrared",
    venue: "Exhibitzone",
    location: "Colorado",
    year: 2023,
    type: "solo",
  },
  {
    id: "look-up-gallery",
    title: "From Walls To Canvas",
    venue: "The Look Up Gallery",
    location: "Colorado Springs, CO",
    year: 2023,
    type: "solo",
  },
  {
    id: "allegory-brand",
    title: "Constructed Nature",
    venue: "Allegory The Brand",
    location: "Denver, CO",
    year: 2022,
    type: "collaborative",
  },
];

export const festivals: Festival[] = [
  {
    id: "streetwise-boulder",
    name: "StreetWise Arts",
    location: "Boulder, CO",
    year: 2024,
    international: false,
  },
  {
    id: "colfax-canvas",
    name: "Colfax Canvas Mural Festival",
    location: "Aurora, CO",
    year: 2024,
    international: false,
  },
  {
    id: "arvada-shindig",
    name: "Olde Town Arvada Mural Shindig",
    location: "Arvada, CO",
    year: 2023,
    international: false,
  },
  {
    id: "frasure-mountain",
    name: "Frasure Mountain Mural Festival",
    location: "Frasure, CO",
    year: 2023,
    international: false,
  },
  {
    id: "siempre-colombia",
    name: "Siempre Estuvimos Aqui!",
    location: "Puerto Caldas, Colombia",
    year: 2023,
    international: true,
  },
  {
    id: "upfest-bristol",
    name: "Upfest",
    location: "Bristol, UK",
    year: 2022,
    international: true,
  },
];

export const publications: Publication[] = [
  {
    id: "fox31",
    outlet: "FOX31 KDVR Denver News",
    year: 2024,
    type: "tv",
  },
  {
    id: "krdo",
    outlet: "KRDO News Channel 13",
    title: "October Arts Month Feature",
    year: 2023,
    type: "tv",
  },
  {
    id: "canvas-rebel",
    outlet: "Canvas Rebel",
    year: 2022,
    type: "magazine",
  },
  {
    id: "denver-library",
    outlet: "Denver Public Library",
    title: "Artist Interview",
    year: 2021,
    type: "online",
  },
  {
    id: "shoutout-colorado",
    outlet: "Shoutout Colorado",
    year: 2020,
    type: "magazine",
  },
  {
    id: "voyage-denver",
    outlet: "Voyage Denver Magazine",
    year: 2020,
    type: "magazine",
  },
  {
    id: "museo-presente",
    outlet: "Museo Del Presente",
    location: "Rende, Italy",
    year: 2019,
    type: "museum",
  },
];

export const credentials = {
  certifications: [
    "OSHA Lift Certified",
    "Locally Insured Muralist",
  ],
  education: [
    {
      degree: "BSN",
      field: "Nursing",
      note: "Registered Nurse background brings unique perspective to community-focused art",
    },
  ],
  experience: "10+ years professional mural experience",
  locations: "Nationwide & International projects",
};

export const getInternationalFestivals = () =>
  festivals.filter((festival) => festival.international);

export const getSoloExhibitions = () =>
  exhibitions.filter((exhibition) => exhibition.type === "solo");
