import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles Next.js hosting natively - no need for static export
  images: {
    // Allow images from external sources during development
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.myportfolio.com',
      },
    ],
  },
};

export default nextConfig;
