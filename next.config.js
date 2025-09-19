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
      process.env.NODE_ENV === "production"
        ? require.resolve("./cacheHandler.develop.mjs")
        : undefined,
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
      console.warn("⚠️ No BLOG_BOX_URL or BLOG_BOX_ID provided, no rewrites applied.");
      return [];
    },
};

module.exports = nextConfig;
