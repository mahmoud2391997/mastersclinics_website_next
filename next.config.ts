import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.salla.sa',
      'storage.googleapis.com',
      'www.ss.mastersclinics.com', // ✅ Add this
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.salla.sa',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optional: if you need to use unoptimized images
    // unoptimized: true
  },
  reactStrictMode: true,
};

export default nextConfig;
