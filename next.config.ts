import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` on script-src is required for Next's inline hydration
 * bootstrap and for the JSON-LD <script type="application/ld+json"> blocks.
 * Tightening this to a nonce-based policy needs middleware, which would make
 * every route dynamic — not worth trading away static rendering for a fully
 * static marketing site with no user input. Revisit if the waitlist gains a
 * real backend.
 *
 * Vercel Analytics and Speed Insights both serve their scripts from the same
 * origin (/_vercel/...), so 'self' covers them. Only the vitals beacon needs
 * a connect-src entry.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Trailing-slash consistency matters for canonicals: pearmo.com/privacy and
  // pearmo.com/privacy/ must not both be indexable.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Avatar PNGs are the heaviest assets on the page (16 files, 230-380 KB
    // each). These widths cover every size they're rendered at.
    imageSizes: [26, 40, 64, 84, 128, 256],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        // Fingerprint-free static assets: long cache, they're content-stable.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
