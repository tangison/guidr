import type { NextConfig } from "next";

const isVercel = !!process.env.VERCEL;

// Security headers applied to every route. CSP allows the inline styles
// Next.js and GSAP inject; scripts stay self-hosted only.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

// Fingerprinted / rarely-changing public assets get a one year
// immutable cache. HTML and API routes keep Vercel's defaults.
const IMMUTABLE_CACHE = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  // Standalone output is for the sandbox / self-hosted runtime. Vercel
  // builds with its own serverless runtime and must not use standalone.
  ...(isVercel ? {} : { output: "standalone" as const }),
  async redirects() {
    return [
      { source: "/legal/terms", destination: "/terms", permanent: true },
      { source: "/legal/privacy", destination: "/privacy-policy", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/(.*)", headers: SECURITY_HEADERS },
      { source: "/images/:path*", headers: IMMUTABLE_CACHE },
      { source: "/brand/:path*", headers: IMMUTABLE_CACHE },
      { source: "/og.jpg", headers: IMMUTABLE_CACHE },
      { source: "/favicon.ico", headers: IMMUTABLE_CACHE },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
