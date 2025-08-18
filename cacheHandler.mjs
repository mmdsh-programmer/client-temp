import { createClient, createCluster } from "redis";

let redisClient = null;
let cluster = null;

// Simple in-memory cache fallback (no external dependencies)
const createLruHandler = async () => {
  const memoryCache = new Map();
  const maxSize = 500;
  
  return {
    async get(key) {
      const item = memoryCache.get(key);
      if (item && item.expiry > Date.now()) {
        // Move to end (LRU behavior)
        memoryCache.delete(key);
        memoryCache.set(key, item);
        return item.value;
      }
      if (item) {
        memoryCache.delete(key);
      }
      return null;
    },
    async set(key, value, options = {}) {
      const ttl = options.ttl || 1000 * 60 * 60 * 24; // Default 24 hours
      
      // Implement LRU eviction
      if (memoryCache.size >= maxSize && !memoryCache.has(key)) {
        const firstKey = memoryCache.keys().next().value;
        memoryCache.delete(firstKey);
      }
      
      memoryCache.set(key, {
        value,
        expiry: Date.now() + ttl
      });
    },
    async delete(key) {
      return memoryCache.delete(key);
    },
    async clear() {
      memoryCache.clear();
    },
  };
};

// Redis Client for Development
const getDevelopmentClient = async () => {
  try {
    if (redisClient && redisClient.isReady) {
      return redisClient;
    }

    console.log("Starting Redis connection (Development)");
    redisClient = createClient({
      url: `redis://${process.env.REDIS_NODE}`,
      socket: {
        reconnectStrategy: () => {
          return false;
        },
      },
    });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    redisClient.on("connect", () => {
      console.log("Redis Client Connected (Development)");
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error("Redis connection error (Development):", error);
    return null;
  }
};

// Redis Cluster for Production
const getProductionClient = async () => {
  try {
    if (cluster && cluster.isReady) {
      return cluster;
    }

    const rootNodes = process.env.REDIS_NODE.split(",").map((item) => {
      return { url: `redis://${item}` };
    });

    cluster = createCluster({
      rootNodes,
      defaults: {
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASS,
        socket: {
          reconnectStrategy: () => {
            cluster.isReady = false;
            return false;
          },
        },
      },
    });

    cluster.on("error", (e) => {
      console.log("Redis Cluster Error (Production)");
      throw e;
    });

    if (cluster) {
      try {
        console.info("Connecting Redis cluster...");
        await cluster.connect();
        cluster.isReady = true;
        console.info("Redis cluster connected.");
      } catch (error) {
        console.warn("Failed to connect Redis cluster:", error);
        cluster.isReady = false;

        console.warn("Disconnecting the Redis cluster...");
        try {
          await cluster.disconnect();
          console.info("Redis cluster disconnected.");
        } catch (disconnectError) {
          console.warn("Failed to quit the Redis cluster after failing to connect.");
        }
      }
    }

    return cluster;
  } catch (error) {
    console.error("Redis connection error (Production):", error);
    return null;
  }
};

// Redis Handler for single client
const createRedisHandler = (client) => {
  return {
    async get(key) {
      try {
        const value = await client.get(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error("Redis get error:", error);
        return null;
      }
    },
    async set(key, value, options = {}) {
      try {
        const ttl = options.ttl || 1000 * 60 * 60 * 24; // Default 24 hours
        const serializedValue = JSON.stringify(value);
        await client.setEx(key, Math.floor(ttl / 1000), serializedValue);
      } catch (error) {
        console.error("Redis set error:", error);
      }
    },
    async delete(key) {
      try {
        return await client.del(key);
      } catch (error) {
        console.error("Redis delete error:", error);
        return 0;
      }
    },
    async clear() {
      try {
        // Note: This is a simplified clear - in production you might want to use SCAN
        const keys = await client.keys("*");
        if (keys.length > 0) {
          await client.del(keys);
        }
      } catch (error) {
        console.error("Redis clear error:", error);
      }
    },
  };
};

// Main cache handler
export const CacheHandler = {
  async onCreation() {
    let handler = null;
    let client = null;

    if (process.env.NODE_ENV === "development") {
      // Development: Use single Redis client
      client = await getDevelopmentClient();
      if (client?.isReady) {
        handler = createRedisHandler(client);
        console.log("Using Redis client handler (Development)");
      } else {
        handler = await createLruHandler();
        console.warn("Falling back to LRU handler (Development) - Redis not available");
      }
    } else {
      // Production: Use Redis cluster
      client = await getProductionClient();
      if (client?.isReady) {
        handler = createRedisHandler(client);
        console.log("Using Redis cluster handler (Production)");
      } else {
        handler = await createLruHandler();
        console.warn("Falling back to LRU handler (Production) - Redis cluster not available");
      }
    }

    return {
      handlers: [handler],
    };
  },
};

// Legacy support for existing code
CacheHandler.onCreation = CacheHandler.onCreation;

export default CacheHandler; 