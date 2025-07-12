import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.salla.sa',
      'storage.googleapis.com',
      'www.ss.mastersclinics.com' // ✅ added
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
      {
        protocol: 'https',
        hostname: 'www.ss.mastersclinics.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optional
    // unoptimized: true
  },
  reactStrictMode: true,
};

export default nextConfig;
