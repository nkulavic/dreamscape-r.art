import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Commission a Mural",
  description:
    "Get in touch with muralist Rachel Dinda to discuss your next mural project. Free consultations for commercial, community, and educational mural commissions.",
  keywords: [
    "contact muralist",
    "mural quote",
    "hire muralist",
    "mural consultation",
    "commission mural art",
    "Rachel Dinda contact",
    "DREAMSCAPER contact",
    "Denver muralist contact",
  ],
  openGraph: {
    title: "Contact DREAMSCAPER | Commission a Mural",
    description:
      "Ready to transform your space? Get a free consultation for your mural project.",
    type: "website",
    url: "https://dreamscaper.art/contact",
    images: [
      {
        url: "/images/murals/zen-shangri-la.jpg",
        width: 1200,
        height: 630,
        alt: "Contact DREAMSCAPER — Rachel Dinda muralist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact DREAMSCAPER | Commission a Mural",
    description:
      "Ready to transform your space? Get a free consultation for your mural project.",
    images: ["/images/murals/zen-shangri-la.jpg"],
  },
  alternates: {
    canonical: "https://dreamscaper.art/contact",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a mural cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pricing depends on size, complexity, location, and timeline. Small murals typically start around $2,000, while large commercial projects can range from $10,000-$50,000+. I provide custom quotes after understanding your project.",
      },
    },
    {
      "@type": "Question",
      name: "Do you travel for projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! While I'm based in Denver, Colorado, I'm available for projects nationwide and internationally. Travel costs are typically included in the project quote.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a mural take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timeline varies by project size and complexity. A small indoor mural might take 2-3 days, while large outdoor murals can take 2-4 weeks. The design phase typically adds 1-2 weeks before painting begins.",
      },
    },
    {
      "@type": "Question",
      name: "What about weather and outdoor murals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I use high-quality exterior paints designed for outdoor use and apply UV-protective sealants. For painting, I work around weather conditions to ensure optimal application and longevity.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
