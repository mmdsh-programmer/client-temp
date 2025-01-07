/* eslint-disable import/extensions */

import { CacheHandler } from "@neshca/cache-handler";
import { PHASE_PRODUCTION_BUILD } from "next/constants.js";
import { createCluster } from "redis";
import createClusterHandler from "@neshca/cache-handler/experimental-redis-cluster";

let cluster;
export const getRedisClient = async () => {
  return cluster;
};
/* from https://caching-tools.github.io/next-shared-cache/redis */
CacheHandler.onCreation(async () => {
  // use redis cluster during build could cause issue https://github.com/caching-tools/next-shared-cache/issues/284#issuecomment-1919145094
  if (PHASE_PRODUCTION_BUILD !== process.env.NEXT_PHASE) {
    try {
      // Create a Redis cluster.
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


      // Redis won't work without error handling.
      cluster.on("error", (e) => {
        console.log("Redis Error");
        throw e;
      });


    } catch (error) {
      console.warn("Failed to create Redis cluster:", error);
    }
  }

  if (cluster) {
    try {
      console.info("Connecting Redis cluster...");

      // Wait for the cluster to connect.
      // Caveat: This will block the server from starting until the cluster is connected.
      // And there is no timeout. Make your own timeout if needed.
      await cluster.connect();
      cluster.isReady = true;
      console.info("Redis cluster connected.");
    } catch (error) {
      console.warn("Failed to connect Redis cluster:", error);
      cluster.isReady = false;

      console.warn("Disconnecting the Redis cluster...");
      // Try to disconnect the cluster to stop it from reconnecting.
      cluster
        .disconnect()
        .then(() => {
          console.info("Redis cluster disconnected.");
        })
        .catch(() => {
          console.warn(
            "Failed to quit the Redis cluster after failing to connect.",
          );
        });
    }
  }

  /** @type {import("@neshca/cache-handler").Handler | null} */
  let redisHandler = null;

  if (cluster) {
    redisHandler = createClusterHandler(
    {keyPrefix:"cls:", timeoutMs: 1000, cluster});
  }


  return {
    handlers: [redisHandler],
  };
});

export default CacheHandler;