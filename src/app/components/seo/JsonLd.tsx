import { siteConfig } from "../../data/siteConfig";

const BASE_URL = "https://dreamscaper.art";

// Person schema for Rachel Dinda
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: siteConfig.artistName,
  alternateName: siteConfig.name,
  jobTitle: "Professional Muralist",
  description:
    "Large-scale mural artist with 10+ years experience creating vibrant, community-driven public art across the United States and internationally.",
  url: BASE_URL,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denver",
    addressRegion: "CO",
    addressCountry: "US",
  },
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.youtube,
    siteConfig.social.linkedin,
    siteConfig.social.tiktok,
    siteConfig.social.pinterest,
  ],
  knowsAbout: [
    "Mural Art",
    "Street Art",
    "Public Art",
    "Large Scale Painting",
    "Community Art",
    "Commercial Art",
  ],
};

// LocalBusiness schema for the art business
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: siteConfig.name,
  alternateName: "Dreamscapes by Design",
  description:
    "Professional mural art services for commercial, community, educational, and residential projects. Serving Denver, Colorado and beyond.",
  url: BASE_URL,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denver",
    addressRegion: "CO",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.7392,
    longitude: -104.9903,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "United States",
    },
    {
      "@type": "AdministrativeArea",
      name: "Colorado",
    },
  ],
  priceRange: "$$$$",
  image: `${BASE_URL}/images/murals/protect-your-peace.jpg`,
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.youtube,
    siteConfig.social.linkedin,
  ],
  founder: {
    "@id": `${BASE_URL}/#person`,
  },
  serviceType: [
    "Commercial Murals",
    "Community Art Projects",
    "Educational Institution Murals",
    "Residential Murals",
    "Public Art Installations",
  ],
};

// WebSite schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: `${siteConfig.name} | ${siteConfig.artistName}`,
  url: BASE_URL,
  description:
    "Portfolio website for DREAMSCAPER - Rachel Dinda, professional muralist creating large-scale, community-driven murals.",
  publisher: {
    "@id": `${BASE_URL}/#person`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/portfolio?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// CreativeWork schema for the portfolio
const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/portfolio#collection`,
  name: "Mural Portfolio",
  description:
    "Collection of large-scale murals by Rachel Dinda across commercial, community, educational, and international projects.",
  url: `${BASE_URL}/portfolio`,
  isPartOf: {
    "@id": `${BASE_URL}/#website`,
  },
  about: {
    "@type": "Thing",
    name: "Mural Art",
  },
  creator: {
    "@id": `${BASE_URL}/#person`,
  },
};

// Combine all schemas
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, businessSchema, websiteSchema, portfolioSchema],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  );
}

// Export individual schemas for use in specific pages
export { personSchema, businessSchema, websiteSchema, portfolioSchema };
