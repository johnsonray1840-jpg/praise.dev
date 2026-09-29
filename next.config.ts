import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  serverExternalPackages: [
    "mongoose",
    "socket.io",
    "express",
    "jsonwebtoken",
    "resend",
    "openai",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development" ? false : true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;
