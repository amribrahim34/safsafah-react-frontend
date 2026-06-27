import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ hostname: '**' }],
    // The Next image optimizer (/_next/image) is uncached in dev, so a page full
    // of ProductCards fires dozens of on-demand fetch+resize jobs at once and the
    // dev server stalls (images fail to load and block the page). Bypass it in dev
    // so images are served straight from their origin; production keeps optimization.
    unoptimized: process.env.NODE_ENV === 'development',
  },
  allowedDevOrigins: ['127.0.0.1'],
  experimental: {
    optimizeCss: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") return [];
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
