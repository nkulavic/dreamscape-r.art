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
  // Add caching headers for static assets
  async headers() {
    return [
      {
        // Cache images for 1 year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache videos for 1 year
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
