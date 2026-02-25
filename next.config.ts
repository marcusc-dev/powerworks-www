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
      {
        protocol: 'https',
        hostname: 'files.powerworksgarage.com',
      },
      {
        protocol: 'https',
        hostname: 'powerworks.b-cdn.net',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/fleet',
        destination: '/fleet-service-dubai',
        permanent: true,
      },
      {
        source: '/book',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://api.openweathermap.org https://api.openai.com wss:",
              "frame-src 'self' https://www.google.com https://www.youtube.com",
              "media-src 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
