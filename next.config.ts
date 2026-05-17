import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
    // PWA settings
  output: 'standalone',
  // Using @serwist/next – see https://github.com/google/serwist/tree/main/packages/next
  // We'll add a simple service worker later in public/sw.js
  // Add any additional next.js config here
};

export default nextConfig;
