import type { NextConfig } from "next";

const isVercel = !!process.env.VERCEL;

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
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
