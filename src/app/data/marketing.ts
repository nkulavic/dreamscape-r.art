// Central marketing content — process, investment, contract flow, audiences, story

export type AudienceKey = "commercial" | "education" | "community";

export interface ProcessStep {
  name: string;
  timeline: string;
  description: string;
  deliverables: string[];
  clientAction?: string;
}

export interface InvestmentTier {
  name: string;
  sizeRange: string;
  includes: string[];
  example: string;
}

export interface ContractStep {
  name: string;
  description: string;
}

export interface AudienceConfig {
  key: AudienceKey;
  label: string;
  heroTagline: string;
  heroSubtext: string;
  coverImage: string;
  valueProp: string;
  benefits: string[];
  featuredMuralIds: string[];
  featuredClientIds: string[];
  cta: string;
  pricingNote?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  audiences: AudienceKey[];
}

// ─── Process Timeline ───────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    name: "Discovery Call",
    timeline: "Day 1",
    description:
      "We discuss your vision, space, timeline, and goals. Whether it's brand identity, a community message, or personal expression — we start by listening.",
    deliverables: ["Project overview", "Initial direction"],
    clientAction: "Share your vision and inspiration",
  },
  {
    name: "Site Visit",
    timeline: "Week 1",
    description:
      "I visit the space in person (or review photos/measurements for remote projects) to assess the wall surface, lighting, and environment.",
    deliverables: ["Wall assessment", "Measurements", "Photo documentation"],
    clientAction: "Provide site access",
  },
  {
    name: "Concept Development",
    timeline: "Weeks 1–2",
    description:
      "Based on our conversation and site visit, I develop initial concepts — rough sketches and color palettes that capture the direction.",
    deliverables: ["2–3 concept sketches", "Color palette options"],
    clientAction: "Review and give feedback",
  },
  {
    name: "Design Refinement",
    timeline: "Weeks 2–3",
    description:
      "Your chosen concept is refined into a detailed digital mockup. You'll see exactly how the mural will look on your wall before any paint is applied.",
    deliverables: ["Detailed digital mockup", "Wall-overlay rendering"],
    clientAction: "Approve final design",
  },
  {
    name: "Contract & Scheduling",
    timeline: "Week 3",
    description:
      "Once the design is approved we finalize the agreement, schedule the painting dates, and coordinate any access or logistics needed.",
    deliverables: ["Project agreement", "Paint schedule", "Materials list"],
    clientAction: "Sign agreement and deposit",
  },
  {
    name: "Painting",
    timeline: "Varies by size",
    description:
      "Using professional-grade materials, the mural comes to life on-site. OSHA-certified for safe operation on any scale. Progress updates provided throughout.",
    deliverables: ["Progress photo updates", "On-site painting"],
    clientAction: "Enjoy the transformation",
  },
  {
    name: "Reveal & Handoff",
    timeline: "Final day",
    description:
      "Your completed mural is unveiled. High-resolution photography documents the finished work, and you receive a care guide to keep it looking great for years.",
    deliverables: [
      "High-res photography",
      "Mural care guide",
      "Social media assets",
    ],
    clientAction: "Share your new mural with the world",
  },
];

// ─── Investment Tiers ───────────────────────────────────────────────

export const investmentTiers: InvestmentTier[] = [
  {
    name: "Small",
    sizeRange: "Under 100 sq ft",
    includes: [
      "Custom design",
      "Professional-grade paint & materials",
      "Protective sealant",
      "High-res photo documentation",
    ],
    example: "Accent walls, logo murals, interior features",
  },
  {
    name: "Medium",
    sizeRange: "100 – 500 sq ft",
    includes: [
      "Everything in Small",
      "Digital mockup on your wall",
      "Mural care guide",
      "Progress updates",
    ],
    example: "Restaurant interiors, school hallways, retail feature walls",
  },
  {
    name: "Large",
    sizeRange: "500 – 2,000 sq ft",
    includes: [
      "Everything in Medium",
      "Multiple concept options",
      "Community / stakeholder input session",
      "Social media content package",
    ],
    example: "Building exteriors, community murals, gymnasium walls",
  },
  {
    name: "Enterprise",
    sizeRange: "2,000+ sq ft",
    includes: [
      "Everything in Large",
      "Project management & phased timeline",
      "Lift operation (OSHA certified)",
      "Travel coordination",
    ],
    example: "Factory murals, campus-wide projects, multi-wall installations",
  },
];

// ─── Contract / Getting Started Flow ────────────────────────────────

export const contractSteps: ContractStep[] = [
  {
    name: "Inquiry",
    description:
      "Reach out via email or the website form with a brief description of your project and space.",
  },
  {
    name: "Free Consultation",
    description:
      "We'll set up a call or in-person meeting to discuss your vision, timeline, and budget range.",
  },
  {
    name: "Proposal",
    description:
      "You'll receive a detailed proposal including design approach, timeline, and investment for your project.",
  },
  {
    name: "Agreement & Deposit",
    description:
      "Once approved, we sign a project agreement and a 50% deposit reserves your dates on the calendar.",
  },
  {
    name: "Kick-off",
    description:
      "Design work begins immediately. The remaining balance is due upon completion of the mural.",
  },
];

// ─── What's Included ────────────────────────────────────────────────

export const whatsIncluded = [
  "Custom design tailored to your space",
  "Professional-grade paints & materials",
  "Protective UV-resistant sealant",
  "High-resolution photo documentation",
  "Mural care & maintenance guide",
  "Full liability insurance coverage",
];

// ─── Story Blocks ───────────────────────────────────────────────────

export const storyBlocks = {
  origin:
    "Rachel Dinda is a Denver-based professional muralist with over a decade of experience transforming walls into vibrant works of art across the United States and internationally.",
  philosophy:
    "Every mural begins with a conversation. Rachel's community-first approach ensures each piece reflects the people, culture, and purpose of the space it inhabits.",
  nursingConnection:
    "With a background in nursing (RN, BSN), Rachel brings deep empathy and community awareness to her practice — understanding that art in shared spaces has the power to heal, inspire, and connect.",
  differentiators: [
    "10+ years of professional mural experience",
    "OSHA Lift Certified for safe, large-scale work",
    "Fully insured with comprehensive liability coverage",
    "International experience across 4 countries",
    "Collaborative process with community input",
    "Nursing background brings unique empathy to public art",
  ],
  pullQuote:
    "Art has the power to transform not just walls, but the communities around them. Every mural is a conversation between the space, the people, and the story waiting to be told.",
};

// ─── Audience Configurations ────────────────────────────────────────

export const audienceConfigs: Record<AudienceKey, AudienceConfig> = {
  commercial: {
    key: "commercial",
    label: "Commercial",
    heroTagline: "Art That Drives Business",
    heroSubtext:
      "Custom murals that attract customers, define your brand, and create Instagram-worthy moments.",
    coverImage: "/images/murals/molson-coors-brewery.jpg",
    valueProp:
      "A custom mural is one of the highest-impact investments a business can make — creating a destination, building brand identity, and giving customers a reason to share your space.",
    benefits: [
      "Increase foot traffic with a destination-worthy feature",
      "Build memorable brand identity",
      "Create shareable social media moments",
      "Transform any commercial space into an experience",
    ],
    featuredMuralIds: [
      "molson-coors",
      "underwater-haven",
      "surfside-burger-bar",
      "rocky-road-trips",
      "zen",
    ],
    featuredClientIds: [
      "molson-coors",
      "walmart",
      "margaritaville",
      "good-times",
      "ursula",
      "surfside",
      "shangri-la",
    ],
    cta: "Schedule a Free Consultation",
  },
  education: {
    key: "education",
    label: "Education",
    heroTagline: "Inspire the Next Generation",
    heroSubtext:
      "Murals that motivate students, celebrate school spirit, and create inspiring learning environments.",
    coverImage: "/images/murals/hawaii-navigate-current.jpg",
    valueProp:
      "Research shows that vibrant learning environments improve student engagement and well-being. A school mural becomes a lasting source of pride and inspiration for the entire community.",
    benefits: [
      "Boost student motivation and school spirit",
      "Create inspiring learning environments",
      "Celebrate school identity and values",
      "Build community pride and engagement",
    ],
    featuredMuralIds: [
      "you-can-navigate-any-current",
      "tiger-stance",
    ],
    featuredClientIds: [
      "monte-vista-schools",
      "kelikolani",
      "hayden-high",
    ],
    cta: "Let's Talk About Your School",
    pricingNote:
      "We work with schools and districts on grant-friendly project structures and phased timelines that accommodate academic calendars.",
  },
  community: {
    key: "community",
    label: "Community / Nonprofit",
    heroTagline: "Art That Brings People Together",
    heroSubtext:
      "Public art that celebrates culture, strengthens neighborhoods, and creates lasting community pride.",
    coverImage: "/images/murals/protect-your-peace.jpg",
    valueProp:
      "Public murals transform forgotten walls into neighborhood landmarks. They celebrate cultural heritage, spark conversation, and give communities a sense of ownership and pride.",
    benefits: [
      "Celebrate cultural heritage and identity",
      "Strengthen neighborhood pride and connection",
      "Create public spaces that spark conversation",
      "Build community through collaborative art-making",
    ],
    featuredMuralIds: [
      "protect-your-peace",
      "la-rumba",
      "siempre-estuvimos-aqui",
      "colfax-canvas",
      "spread-love-colorado",
    ],
    featuredClientIds: [
      "girl-scouts",
      "boys-girls-club",
      "counting-coral",
      "knobhill",
      "family-success",
      "alameda-corridor",
    ],
    cta: "Start a Community Conversation",
    pricingNote:
      "We partner with nonprofits and community organizations on grant-compatible proposals and community fundraising structures.",
  },
};

// ─── FAQs ───────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    question: "How long does a mural take?",
    answer:
      "Timeline depends on size and complexity. A small interior mural may take 3–5 days of painting, while a large exterior project can take 2–4 weeks. The full process from first call to completion is typically 4–8 weeks.",
    audiences: ["commercial", "education", "community"],
  },
  {
    question: "Do you travel for projects?",
    answer:
      "Yes! While based in Denver, Colorado, Rachel works nationwide and internationally. Travel logistics are coordinated as part of the project proposal.",
    audiences: ["commercial", "education", "community"],
  },
  {
    question: "How durable are the murals?",
    answer:
      "All exterior murals receive a UV-resistant protective sealant and are built to last 10–15+ years. Interior murals last indefinitely with normal care. A maintenance guide is provided with every project.",
    audiences: ["commercial", "education", "community"],
  },
  {
    question: "Can the community be involved in the process?",
    answer:
      "Absolutely. Community input sessions, student participation days, and collaborative design processes are available and encouraged for public and school projects.",
    audiences: ["education", "community"],
  },
  {
    question: "Do you work with grants and public funding?",
    answer:
      "Yes. Proposals can be structured to meet grant requirements, including itemized budgets, project timelines, and community impact statements.",
    audiences: ["education", "community"],
  },
];

// ─── Helper Functions ───────────────────────────────────────────────

export function getAudienceConfig(key: AudienceKey): AudienceConfig {
  return audienceConfigs[key];
}

export function getProcessSteps(): ProcessStep[] {
  return processSteps;
}

export function getInvestmentTiers(): InvestmentTier[] {
  return investmentTiers;
}

export function getContractSteps(): ContractStep[] {
  return contractSteps;
}

export function getFAQsForAudience(audience: AudienceKey): FAQ[] {
  return faqs.filter((faq) => faq.audiences.includes(audience));
}

export const audienceKeys: AudienceKey[] = [
  "commercial",
  "education",
  "community",
];
