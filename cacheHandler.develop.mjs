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
    if (process.env.NEXT_PHASE === "phase-production-build") {
      console.log(
        JSON.stringify({
          type: "redis",
          phase: "production-build",
          message: "Skipping Redis connection during build",
        }),
      );
      return null;
    }
    if (global.isPending) {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "waiting",
          message: "Waiting for pending Redis connection",
        }),
      );
      await waitForResolve();
      return getClient();
    }
    if (global.redisClientPromise && global.redisClientPromise.isReady) {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "reuse",
          message: "Reusing existing Redis connection",
        }),
      );
      return global.redisClientPromise;
    }
    global.isPending = true;
    console.log(
      JSON.stringify({
        type: "redis",
        action: "start",
        message: "Starting Redis connection",
        url: `redis://${process.env.REDIS_NODE}`,
      }),
    );
    global.redisClientPromise = createClient({
      url: `redis://${process.env.REDIS_NODE}`,
      socket: {
        reconnectStrategy: (times) => {
          return Math.min(times * 100, 2000);
        },
      },
    });

    // Redis won't work without error handling.
    global.redisClientPromise.on("error", (err) => {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "error",
          event: "client_error",
          error: err.message,
          stack: err.stack,
        }),
      );
    });
    global.redisClientPromise.on("connect", () => {
      global.isPending = false;
      console.log(
        JSON.stringify({
          type: "redis",
          action: "success",
          event: "connected",
          message: "Redis Client Connected",
        }),
      );
    });
    // Add these cluster-specific event handlers
    global.redisClientPromise.on("nodeError", (err, node) => {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "error",
          event: "node_error",
          node,
          error: err.message,
        }),
      );
    });
    global.redisClientPromise.on("cluster down", () => {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "error",
          event: "cluster_down",
          message: "Redis Cluster is down",
        }),
      );
    });
    global.redisClientPromise.on("node error", () => {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "error",
          event: "node_error_fallback",
          message: "Redis Cluster is down",
        }),
      );
    });

    await global.redisClientPromise.connect();
    console.log(
      JSON.stringify({
        type: "redis",
        action: "success",
        event: "connection_established",
        message: "Redis connection established successfully",
      }),
    );
    return global.redisClientPromise;
  } catch (error) {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "connection_failed",
        error: error.message,
        stack: error.stack,
      }),
    );
    return null;
  }
};

CacheHandler.onCreation(async () => {
  console.log(
    JSON.stringify({
      type: "redis",
      action: "init",
      event: "cache_handler_creation",
      message: "Initializing CacheHandler",
    }),
  );
  const redisClient = await getClient();

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let handler;

  if (redisClient?.isReady) {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "init",
        event: "redis_handler_creation",
        message: "Creating Redis handler",
      }),
    );
    // Create the `redis-stack` Handler if the client is available and connected.
    handler = await createRedisHandler({
      client: redisClient,
      keyPrefix: "cls:", // Do not use a dynamic and unique prefix for each Next.js build because it will create unique cache data for each instance of Next.js, and the cache will not be shared.
      timeoutMs: 3000,
    });
    console.log(
      JSON.stringify({
        type: "redis",
        action: "success",
        event: "redis_handler_created",
        message: "Redis handler created successfully",
      }),
    );
  } else {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "fallback",
        event: "lru_handler_creation",
        message: "Redis not available, falling back to LRU handler",
      }),
    );
    // Fallback to LRU handler if Redis client is not available.
    // The application will still work, but the cache will be in memory only and not shared.
    handler = createLruHandler();
    console.log(
      JSON.stringify({
        type: "redis",
        action: "warning",
        event: "lru_handler_created",
        message: "LRU handler created (cache will be in-memory only)",
      }),
    );
  }

  console.log(
    JSON.stringify({
      type: "redis",
      action: "success",
      event: "cache_handler_ready",
      handlers: handler ? ["redis"] : ["lru"],
    }),
  );
  return {
    handlers: [handler],
  };
});

export { CacheHandler as default } from "@neshca/cache-handler";
