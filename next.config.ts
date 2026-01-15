import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['powerworks.local'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'assets*.lottiefiles.com',
      },
      {
        protocol: 'https',
        hostname: 'lottie.host',
      },
    ],
  },
};

export default nextConfig;
