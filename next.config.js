/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  webpack: (config, { isServer }) => {
    const newConfig = { ...config };
    if (!isServer) {
      newConfig.resolve.fallback = {
        fs: false,
      };
    }
    return newConfig;
  },
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cacheHandler.mjs")
      : undefined,
  cacheMaxMemorySize: 0, // disable default in-memory caching
};

module.exports = nextConfig;
