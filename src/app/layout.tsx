import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import ThemeSelector from "./components/ui/ThemeSelector";
import JsonLd from "./components/seo/JsonLd";

const BASE_URL = "https://dreamscaper.art";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DREAMSCAPER | Rachel Dinda - Professional Muralist",
    template: "%s | DREAMSCAPER",
  },
  description:
    "Large-scale mural art by Rachel Dinda. Transforming spaces with vibrant, community-driven murals across the US and internationally. Commission your next mural project.",
  keywords: [
    "muralist",
    "mural artist",
    "large scale art",
    "street art",
    "public art",
    "commercial murals",
    "community art",
    "Denver muralist",
    "Colorado muralist",
    "Rachel Dinda",
    "DREAMSCAPER",
    "wall murals",
    "building murals",
    "outdoor art",
    "urban art",
    "mural commission",
  ],
  authors: [{ name: "Rachel Dinda", url: BASE_URL }],
  creator: "Rachel Dinda",
  publisher: "DREAMSCAPER",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Individual pages set their own canonical via alternates.canonical
  // Do NOT set a root canonical here — it would override child page canonicals
  openGraph: {
    title: "DREAMSCAPER | Rachel Dinda - Professional Muralist",
    description:
      "Transforming spaces with vibrant, community-driven murals. 10+ years experience, international recognition. Commission your next mural project.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "DREAMSCAPER",
    images: [
      {
        url: "/images/murals/protect-your-peace.jpg",
        width: 1200,
        height: 630,
        alt: "DREAMSCAPER - Rachel Dinda Mural Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DREAMSCAPER | Rachel Dinda - Professional Muralist",
    description:
      "Transforming spaces with vibrant, community-driven murals. Commission your next mural project.",
    images: ["/images/murals/protect-your-peace.jpg"],
    creator: "@dreamscape_r",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have the verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "Art & Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver" />
        <meta name="geo.position" content="39.7392;-104.9903" />
        <meta name="ICBM" content="39.7392, -104.9903" />
      </head>
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${inter.variable} antialiased bg-white text-gray-800`}
      >
        {children}
        <ThemeSelector />
      </body>
    </html>
  );
}
