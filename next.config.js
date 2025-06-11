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
    newConfig.resolve.alias.canvas = false;
    if (!isServer) {
      newConfig.resolve.fallback = {
        fs: false,
      };
      newConfig.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        "bufferutil": "commonjs bufferutil",
      });
    }
    return newConfig;
  },
  async rewrites() {
    if(process.env.BLOG_BOX_URL && process.env.BLOG_ID){ 
      return [
        {
          source: "/blog/:path*",
          destination:
            `${process.env.BLOG_BOX_URL}/blog/${process.env.BLOG_ID}/:path*`,
        },
      ];
    }
    return [];
  },
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cacheHandler.develop.mjs")
      : undefined,
  cacheMaxMemorySize: 0, // disable default in-memory caching
};

module.exports = nextConfig;
