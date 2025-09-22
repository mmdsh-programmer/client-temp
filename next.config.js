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
  cacheMaxMemorySize: 0,
  cacheHandler:
    process.env.NODE_ENV === "production" ? require.resolve("./cacheHandler.mjs") : undefined,
  webpack: (config, { isServer }) => {
    const newConfig = { ...config };
    newConfig.resolve.alias.canvas = false;
    newConfig.resolve.alias.net = false;
    newConfig.resolve.alias.tls = false;
    newConfig.resolve.alias.crypto = false;
    if (!isServer) {
      newConfig.resolve.fallback = {
        fs: false,
      };
    }
    return newConfig;
  },
  turbopack: {
    resolveAlias: {
      // For modules that are aliased to `false` in Webpack
      canvas: {
        browser: "./empty.js",
      },
      net: {
        browser: "./empty.js",
      },
      tls: {
        browser: "./empty.js",
      },
      crypto: {
        browser: "./empty.js",
      },
      fs: {
        browser: "./empty.js",
      },
    },
  },
  async rewrites() {
    if (process.env.BLOG_BOX_URL && process.env.BLOG_BOX_ID) {
      return [
        {
          source: "/blog/:path*",
          destination: `${process.env.BLOG_BOX_URL}/blog/${process.env.BLOG_BOX_ID}/:path*`,
        },
      ];
    }
    console.warn("⚠️ No BLOG_BOX_URL or BLOG_BOX_ID provided, no rewrites applied.");
    return [];
  },
};

module.exports = nextConfig;
