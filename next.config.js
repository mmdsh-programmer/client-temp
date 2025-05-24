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
    return [
      {
        source: "/blog/:path*",
        destination:
          `${process.env.BLOG_BOX_URL}/blog/vukwckXC_MPm28GUid63GRFXe40Ui_O_2tGlcK0vmU8_/:path*`,
      },
    ];
  },
  cacheHandler:
    process.env.NODE_ENV === "production"
      ? require.resolve("./cacheHandler.mjs")
      : undefined,
  cacheMaxMemorySize: 0, // disable default in-memory caching
};

module.exports = nextConfig;
