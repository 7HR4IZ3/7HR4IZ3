import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      { source: "/lab", destination: "/bench", permanent: true },
      { source: "/showcase/:path*", destination: "/", permanent: false },
      { source: "/demo/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
