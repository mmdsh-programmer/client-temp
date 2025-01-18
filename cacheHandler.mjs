/* eslint-disable dot-notation */
/* eslint-disable import/extensions */

import { CacheHandler } from "@neshca/cache-handler";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { createCluster } from "redis";
import createClusterHandler from "@neshca/cache-handler/experimental-redis-cluster";

let cluster;
export const getClient = async () => {
  try {
    if (cluster && cluster["isReady"]) {
      return cluster;
    }

    const rootNodes = process.env.REDIS_PORT.split(",").map((item) => {
      return { url: `redis://${process.env.REDIS_NODE}:${item}` };
    });
    cluster = createCluster({
      rootNodes,
      defaults: {
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASS,
        socket: {
          reconnectStrategy: () => {
            cluster["isReady"] = false;
            return false;
          },
        },
      },
    });

    // Redis won't work without error handling.
    cluster.on("error", (e) => {
      console.log("Redis Error");
      throw e;
    });

    if (cluster) {
      try {
        console.info("Connecting Redis cluster...");

        // Wait for the cluster to connect.
        // Caveat: This will block the server from starting until the cluster is connected.
        // And there is no timeout. Make your own timeout if needed.
        await cluster.connect();
        cluster["isReady"] = true;
        console.info("Redis cluster connected.");
      } catch (error) {
        console.warn("Failed to connect Redis cluster:", error);
        cluster["isReady"] = false;

        console.warn("Disconnecting the Redis cluster...");
        // Try to disconnect the cluster to stop it from reconnecting.
        cluster
          .disconnect()
          .then(() => {
            console.info("Redis cluster disconnected.");
          })
          .catch(() => {
            console.warn(
              "Failed to quit the Redis cluster after failing to connect."
            );
          });
      }
    }

    return cluster;
  } catch (error) {
    console.log({
      type: "getClient",
      error: JSON.stringify(error),
    });
    return null;
  }
};
/* from https://caching-tools.github.io/next-shared-cache/redis */
CacheHandler.onCreation(async () => {
  // use redis cluster during build could cause issue https://github.com/caching-tools/next-shared-cache/issues/284#issuecomment-1919145094
  if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
    try {
      // Create a Redis cluster.
      cluster = await getClient();
    } catch (error) {
      console.warn("Failed to create Redis cluster:", error);
    }
  }

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let redisHandler = null;

  if (cluster) {
    redisHandler = createClusterHandler({
      keyPrefix: "cls:",
      timeoutMs: 1000,
      cluster,
    });
  }

  return {
    handlers: [redisHandler],
  };
});

export default CacheHandler;
