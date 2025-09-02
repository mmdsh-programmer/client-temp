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
      bodySizeLimit: "10mb",
    },
  },
  webpack: (config, { isServer }) => {
    const newConfig = { ...config };
    newConfig.resolve.alias.canvas = false;
    if (!isServer) {
      newConfig.resolve.fallback = {
        fs: false,
      };
    }
    return newConfig;
  },
  async rewrites() {
    if(process.env.BLOG_BOX_URL && process.env.BLOG_BOX_ID){ 
      return [
        {
          source: "/blog/:path*",
          destination:
            `${process.env.BLOG_BOX_URL}/blog/${process.env.BLOG_BOX_ID}/:path*`,
        },
      ];
    }
    return [];
  },
  // experimental: {
  //   cacheHandler: "./cacheHandler.mjs",
  // },
};

module.exports = nextConfig;
