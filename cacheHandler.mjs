// eslint-disable-next-line unicorn/filename-case

import { CacheHandler } from "@neshca/cache-handler";
import { createCluster } from "redis";
import createClusterHandler from "@neshca/cache-handler/experimental-redis-cluster";
import createLruHandler from "@neshca/cache-handler/local-lru";

let cluster = null;
export const getRedisClient = async () => {
  try {
    if (cluster && cluster.isOpen) {
      return cluster;
    }
    console.log("Starting Redis connection");
    // client = createClient({
    //   url: "redis://172.19.24.169:6379",
    //   socket: {
    //     reconnectStrategy: (retries) => {
    //       return Math.min(retries * 50, 2000);
    //     },
    //   },
    // });

    cluster  = createCluster({
      rootNodes: [
        { url: "redis://10.248.34.142:6379" },
        { url: "redis://10.248.34.142:6380" },
        { url: "redis://10.248.34.142:6381" },
        { url: "redis://10.248.34.142:6382" },
        { url: "redis://10.248.34.142:6383" },
        { url: "redis://10.248.34.142:6384" },
      ],
      defaults: {
        username: "clasorclient",
        password: "YYhi16j",
        socket: {
          reconnectStrategy: (retries) => {
            console.log("Retry redis connection", retries);
            return 1000;
          },
        },
      },
    });

    cluster.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
    await cluster.connect();
    console.log("Redis connected");
    return cluster;
  } catch (error) {
    console.error(error);
    return null;
  }
};

CacheHandler.onCreation(async () => {
  const redisClient = await getRedisClient();

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (redisClient?.isOpen) {
    // Create the `redis-stack` Handler if the client is available and connected.
    handler = await createClusterHandler({
      client: redisClient,
      keyPrefix: "sample_prefix:", // Do not use a dynamic and unique prefix for each Next.js build because it will create unique cache data for each instance of Next.js, and the cache will not be shared.
      timeoutMs: 1000,
    });
  } else {
    // Fallback to LRU handler if Redis client is not available.
    // The application will still work, but the cache will be in memory only and not shared.
    handler = createLruHandler();
    console.warn(
      "Falling back to LRU handler because Redis client is not available."
    );
  }

  return {
    handlers: [handler],
  };
});

// eslint-disable-next-line no-restricted-exports
export { CacheHandler as default } from "@neshca/cache-handler";
