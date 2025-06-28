import type { NextConfig } from "next";

const nextConfig: NextConfig = { images: {
    domains: ['cdn.salla.sa'],
    // Optional: if you need to use unoptimized images
    // unoptimized: true
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
