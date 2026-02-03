import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable static export to prevent SSR issues with browser-only code
  output: 'standalone',
};

export default nextConfig;
