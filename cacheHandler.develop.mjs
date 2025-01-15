import { CacheHandler } from "@neshca/cache-handler";
import { createClient } from "redis";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-stack";

let client = null;
export const getClient = async () => {
  try {
    if (client && client.isReady) {
      return client;
    }
    console.log("Starting Redis connection");
    client = createClient({
      url: `redis://${process.env.REDIS_NODE}`,
      socket: {
        reconnectStrategy: () => {
          return false;
        },
      },
    });

    // Redis won't work without error handling.
    client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
    client.on("connect", () => {
      console.log("Redis Client Connected");
    });
    // Add these cluster-specific event handlers
    client.on("nodeError", (err, node) => {
      console.error(`Redis Node ${node} Error:`, err);
    });
    client.on("clusterDown", () => {
      console.error("Redis Cluster is down");
    });
    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
    return null;
  }
};

CacheHandler.onCreation(async () => {
  const redisClient = await getClient();

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (redisClient?.isReady) {
    // Create the `redis-stack` Handler if the client is available and connected.
    handler = await createRedisHandler({
      client: redisClient,
      keyPrefix: "cls:", // Do not use a dynamic and unique prefix for each Next.js build because it will create unique cache data for each instance of Next.js, and the cache will not be shared.
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
