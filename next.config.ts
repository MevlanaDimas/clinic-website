import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Compiler & Performance Optimizations */
  reactCompiler: true,
  compress: true,
  productionBrowserSourceMaps: false,

  /* Headers for Security & Performance */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /* Security Headers */
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.clerk.accounts.dev https://challenge.cloudflare.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://challenge.cloudflare.com; font-src 'self' https:; connect-src 'self' https: wss:; frame-src 'self' https://*.clerk.accounts.dev https://www.google.com; child-src 'self' https://*.clerk.accounts.dev"
          },
          /* Performance Headers */
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
          },
          {
            key: "X-UA-Compatible",
            value: "IE=edge"
          }
        ]
      },
      /* Static Assets Caching */
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      /* API Route Caching */
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, max-age=0, must-revalidate"
          }
        ]
      }
    ];
  },

  /* Image Optimization */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: `/${process.env.GCS_BUCKET_NAME}/**`
      },
      {
        protocol: "https",
        hostname: "img.clerk.com"
      }
    ],
    unoptimized: process.env.SKIP_IMAGE_OPTIMIZATION === "true",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"]
  },

  /* Runtime Configuration */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
};

export default nextConfig;
