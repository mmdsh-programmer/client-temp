/* eslint-disable no-restricted-exports */

import { CacheHandler } from "@neshca/cache-handler";
import createClusterHandler from "@neshca/cache-handler/experimental-redis-cluster";
import { createCluster } from "redis";

async function connectToRedis() {
  console.log(
    JSON.stringify({
      type: "redis",
      action: "start",
      event: "cluster_connection_attempt",
      message: "Attempting to connect to Redis cluster",
    }),
  );

  const rootNodes = process.env.REDIS_NODE.split(",").map((item) => {
    return {
      url: `redis://${item}`,
    };
  });

  if (rootNodes.length === 0) {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "config_error",
        message: "REDIS_NODE environment variable is not set or is empty",
      }),
    );
    throw new Error("REDIS_NODE environment variable is not set or is empty.");
  }

  const newClient = createCluster({
    rootNodes,
    defaults: {
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,
    },
    socket: {
      reconnectStrategy: (times) => {
        return Math.min(times * 100, 2000);
      },
    },
  });
  // ✅ Correct Error Handling: Log errors instead of throwing them.
  // An event listener that throws an error will crash the entire Node.js process.
  newClient.on("error", (err) => {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "cluster_background_error",
        error: err.message,
        stack: err.stack,
      }),
    );
  });

  newClient.on("connect", () => {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "progress",
        event: "cluster_connecting",
        message: "Redis client is connecting",
      }),
    );
  });

  newClient.on("ready", () => {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "success",
        event: "cluster_ready",
        message: "Redis client is ready",
      }),
    );
  });

  newClient.on("end", () => {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "warning",
        event: "cluster_connection_ended",
        message: "Redis client connection has ended",
      }),
    );
    // Setting the promise to null will allow for a fresh connection attempt on next request.
    global.redisClient = null;
  });

  newClient.on("cluster down", () => {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "cluster_down",
        message: "Redis Cluster is down",
      }),
    );
  });

  newClient.on("node error", (err, node) => {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "node_error",
        node: node?.options?.url,
        error: err.message,
      }),
    );
  });

  try {
    // ✅ Correct Connection Logic: Directly await the connect() call.
    await newClient.connect();
    console.log(
      JSON.stringify({
        type: "redis",
        action: "success",
        event: "cluster_connected",
        message: "Redis cluster connected successfully",
      }),
    );
    return newClient;
  } catch (error) {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "cluster_connection_failed",
        error: error.message,
        stack: error.stack,
      }),
    );
    // Cleanly disconnect and reject the promise if connection fails.
    await newClient.disconnect().catch((err) => {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "error",
          event: "disconnect_error",
          error: err.message,
        }),
      );
    });
    // Re-throw the error to ensure calling functions know about the failure.
    throw error;
  }
}

export function getClient() {
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
  // If the promise already exists, return it to reuse the connection/connection attempt.
  if (global.redisClient) {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "reuse",
        message: "Reusing existing Redis cluster connection",
      }),
    );
    return global.redisClient;
  }

  console.log(
    JSON.stringify({
      type: "redis",
      action: "init",
      message: "Creating new Redis cluster connection",
    }),
  );
  // Otherwise, create a new connection promise and store it for future calls.
  global.redisClient = connectToRedis();

  return global.redisClient;
}

// This hook from `@neshca/cache-handler` is the ideal place to initialize the client.
CacheHandler.onCreation(async () => {
  console.log(
    JSON.stringify({
      type: "redis",
      action: "init",
      event: "cache_handler_creation",
      message: "CacheHandler.onCreation hook triggered",
    }),
  );

  try {
    // Get the client. This will either create a new connection or return the existing one.
    const cluster = await getClient();

    if (cluster) {
      console.log(
        JSON.stringify({
          type: "redis",
          action: "init",
          event: "cluster_handler_creation",
          message: "Creating Redis cluster handler",
        }),
      );
      const redisHandler = createClusterHandler({
        keyPrefix: "cls:",
        timeoutMs: 1000,
        cluster,
      });
      console.log(
        JSON.stringify({
          type: "redis",
          action: "success",
          event: "cluster_handler_created",
          message: "Redis cluster handler created successfully",
        }),
      );

      return {
        handlers: [redisHandler],
      };
    }

    console.log(
      JSON.stringify({
        type: "redis",
        action: "fallback",
        event: "no_handlers",
        message: "No Redis client available, returning empty handlers",
      }),
    );
    return {
      handlers: [],
    };
  } catch (error) {
    console.log(
      JSON.stringify({
        type: "redis",
        action: "error",
        event: "handler_creation_failed",
        error: error.message,
        stack: error.stack,
      }),
    );
    // Return with no handlers if the Redis connection fails.
    return {
      handlers: [],
    };
  }
});

export { CacheHandler as default } from "@neshca/cache-handler";
