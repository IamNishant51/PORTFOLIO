import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ── Console removal in production ──────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Image optimisation ─────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // ImageKit CDN — profile photo, project images, skill logos
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      // UI Avatars — generated fallback avatars for GitHub projects
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  compress: true,
  poweredByHeader: false,

  // ── Bundle optimisation ────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ["gsap", "lucide-react"],
  },

  // ── Turbopack (Next.js 16+) ────────────────────────────────────────────
  turbopack: {},

  // ── HTTP Security Headers ──────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Enable browser XSS filtering (legacy browsers)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict browser APIs (camera, mic, geolocation not needed on a portfolio)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // DNS prefetch control
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
