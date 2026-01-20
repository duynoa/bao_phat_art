import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['localhost', 'baophatart.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baophatart.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;
