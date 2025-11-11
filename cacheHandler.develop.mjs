/* eslint-disable no-restricted-exports */

import { CacheHandler } from "@neshca/cache-handler";
import { createClient } from "redis";
import createLruHandler from "@neshca/cache-handler/local-lru";
import createRedisHandler from "@neshca/cache-handler/redis-stack";


export const waitForResolve = () => {
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(true);
      }, 1000);
   });
};

export const getClient = async () => {
  try {
    if(process.env.NEXT_PHASE === "phase-production-build"){
      return null;
    }
    if(global.isPending){
      await waitForResolve();
      return getClient();
    }
    if (global.client && global.client.isReady) {
      return global.client;
    }
    global.isPending = true;
    console.log("Starting Redis connection");
    global.client = createClient({
      url: `redis://${process.env.REDIS_NODE}`,
      socket: {
        reconnectStrategy: (times) => {
          return Math.min(times * 100, 2000);
        },
      },
    });

    // Redis won't work without error handling.
    global.client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });
    global.client.on("connect", () => {
      global.isPending = false;
      console.log("Redis Client Connected");
    });
    // Add these cluster-specific event handlers
    global.client.on("nodeError", (err, node) => {
      console.error(`Redis Node ${node} Error:`, err);
    });
    global.client.on("cluster down", () => {
      console.error("Redis Cluster is down");
    });
    global.client.on("node error", () => {
      console.error("Redis Cluster is down");
    });
    
    await global.client.connect();
    return global.client;
  } catch (error) {
    console.error(error);
    return null;
  }
};

CacheHandler.onCreation(async () => {
  console.log("onCreation");
  const redisClient = await getClient();

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (redisClient?.isReady) {
    // Create the `redis-stack` Handler if the client is available and connected.
    handler = await createRedisHandler({
      client: redisClient,
      keyPrefix: "dt:", // Do not use a dynamic and unique prefix for each Next.js build because it will create unique cache data for each instance of Next.js, and the cache will not be shared.
      timeoutMs: 3000,
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

export { CacheHandler as default } from "@neshca/cache-handler";

