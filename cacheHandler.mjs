/* eslint-disable no-restricted-exports */

import { CacheHandler } from "@neshca/cache-handler";
import createClusterHandler from "@neshca/cache-handler/experimental-redis-cluster";
import { createCluster } from "redis";

async function connectToRedis(){
    console.info("Attempting to connect to Redis cluster...");

    const rootNodes = process.env.REDIS_NODE.split(",").map((item) => {return {
        url: `redis://${item}`,
    };});

    if (rootNodes.length === 0) {
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
        console.error("Redis Cluster Background Error:", err);
    });
    
    newClient.on("connect", () => {
        console.info("Redis client is connecting...");
    });

    newClient.on("ready", () => {
        console.info("Redis client is ready.");
    });

    newClient.on("end", () => {
        console.warn("Redis client connection has ended.");
        // Setting the promise to null will allow for a fresh connection attempt on next request.
        global.redisClientPromise = null;
    });

    newClient.on("cluster down", () => {
        console.error("Redis Cluster is down");
    });
    
    newClient.on("node error", (err, node) => {
        console.error("Redis Node Error", node.options, err);
    });

    try {
        // ✅ Correct Connection Logic: Directly await the connect() call.
        await newClient.connect();
        console.info("✅ Redis cluster connected successfully.");
        return newClient;
    } catch (error) {
        console.error("❌ Failed to connect Redis cluster:", error);
        // Cleanly disconnect and reject the promise if connection fails.
        await newClient.disconnect().catch(console.error);
        // Re-throw the error to ensure calling functions know about the failure.
        throw error;
    }
}

export function getClient() {
    if(process.env.NEXT_PHASE === "phase-production-build"){
        return null;
    }
    // If the promise already exists, return it to reuse the connection/connection attempt.
    if (global.redisClientPromise) {
        return global.redisClientPromise;
    }

    // Otherwise, create a new connection promise and store it for future calls.
    global.redisClientPromise = connectToRedis();

    return global.redisClientPromise;
}

// This hook from `@neshca/cache-handler` is the ideal place to initialize the client.
CacheHandler.onCreation(async () => {
    console.info("CacheHandler.onCreation hook triggered.");
    
    try {
        // Get the client. This will either create a new connection or return the existing one.
        const cluster = await getClient();

        const redisHandler = createClusterHandler({
            keyPrefix: "cls:",
            timeoutMs: 1000,
            cluster,
        });

        return {
            handlers: [redisHandler],
        };
    } catch (error) {
        console.warn("Failed to create Redis cluster handler for CacheHandler. No Redis cache will be used.", error);
        // Return with no handlers if the Redis connection fails.
        return {
            handlers: [],
        };
    }
});

export { CacheHandler as default } from "@neshca/cache-handler";