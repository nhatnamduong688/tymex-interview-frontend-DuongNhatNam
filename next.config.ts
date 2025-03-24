import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['robohash.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
