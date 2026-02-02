import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import ThemeSelector from "./components/ui/ThemeSelector";

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
  title: "DREAMSCAPER | Rachel Dinda - Professional Muralist",
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
  ],
  authors: [{ name: "Rachel Dinda" }],
  openGraph: {
    title: "DREAMSCAPER | Rachel Dinda - Professional Muralist",
    description:
      "Transforming spaces with vibrant, community-driven murals. 10+ years experience, international recognition. Commission your next mural project.",
    type: "website",
    locale: "en_US",
    siteName: "DREAMSCAPER",
  },
  twitter: {
    card: "summary_large_image",
    title: "DREAMSCAPER | Rachel Dinda - Professional Muralist",
    description:
      "Transforming spaces with vibrant, community-driven murals. Commission your next mural project.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${inter.variable} antialiased bg-white text-gray-800`}
      >
        {children}
        <ThemeSelector />
      </body>
    </html>
  );
}
