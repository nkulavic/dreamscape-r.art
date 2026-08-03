import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { getSeoDefaults, getSiteTheme, getSocialLinks } from "@/db/dal";
import { siteConfig } from "./data/siteConfig";
import { themeToCSS, buildGoogleFontLinks } from "@/lib/theme";
import JsonLd from "./components/seo/JsonLd";
import { SocialLinksProvider } from "./components/SocialLinksProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

/**
 * Built from the admin's SEO settings, with the values in `getSeoDefaults()`
 * as fallbacks. Child pages still override title/description/canonical.
 */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoDefaults();

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: seo.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.artistName, url: BASE_URL }],
    creator: siteConfig.artistName,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    // Individual pages set their own canonical via alternates.canonical
    // Do NOT set a root canonical here — it would override child page canonicals
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "en_US",
      url: BASE_URL,
      siteName: siteConfig.name,
      images: [
        {
          url: seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${siteConfig.artistName} Mural Art`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
      creator: seo.twitterHandle,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, socialLinks] = await Promise.all([
    getSiteTheme(),
    getSocialLinks(),
  ]);
  const fontLinks = theme ? buildGoogleFontLinks(theme) : null;
  const themeCSS = theme ? themeToCSS(theme) : null;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd social={socialLinks} />
        <meta name="geo.region" content="US-CO" />
        <meta name="geo.placename" content="Denver" />
        <meta name="geo.position" content="39.7392;-104.9903" />
        <meta name="ICBM" content="39.7392, -104.9903" />
        {fontLinks?.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {themeCSS && (
          <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
        )}
      </head>
      <body
        className={`${bebasNeue.variable} ${montserrat.variable} ${inter.variable} antialiased bg-white text-gray-800`}
      >
        <SocialLinksProvider value={socialLinks}>{children}</SocialLinksProvider>
        {/*
          Dormant until Web Analytics / Speed Insights are switched on for the
          project in Vercel — nothing is collected or billed before that.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
