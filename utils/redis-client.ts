import { createClient } from "redis";

let client: any = null;


const getDevelopmentClient = async () => {
  try {
    if (client && client.isReady) {
      return client;
    }
    
    console.log("Starting Redis connection (Development)");
    client = createClient({
      url: `redis://${process.env.REDIS_NODE}`,
      socket: {
        reconnectStrategy: () => {
          return false;
        },
      },
    });

    client.on("error", (err: any) => {
      console.error("Redis Client Error:", err);
    });
    
    client.on("connect", () => {
      console.log("Redis Client Connected (Development)");
    });
    
    await client.connect();
    return client;
  } catch (error) {
    console.error("Redis connection error (Development):", error);
    return null;
  }
};

const getProductionClient = async () => {
  try {
    if (client && client.isReady) {
      return client;
    }

    // For production, use single Redis instance for now
    // If you need cluster support, you'll need to use a different approach
    client = createClient({
      url: `redis://${process.env.REDIS_NODE}`,
      username: process.env.REDIS_USER,
      password: process.env.REDIS_PASS,
      socket: {
        reconnectStrategy: () => {
          client.isReady = false;
          return false;
        },
      },
    });

    client.on("error", (e: any) => {
      console.log("Redis Error (Production)");
      throw e;
    });

    if (client) {
      try {
        console.info("Connecting Redis cluster...");
        await client.connect();
        client.isReady = true;
        console.info("Redis cluster connected.");
      } catch (error) {
        console.warn("Failed to connect Redis cluster:", error);
        client.isReady = false;
        
        console.warn("Disconnecting the Redis cluster...");
        try {
          await client.disconnect();
          console.info("Redis cluster disconnected.");
        } catch (disconnectError) {
          console.warn("Failed to quit the Redis cluster after failing to connect.");
        }
      }
    }

    return client;
  } catch (error) {
    console.error("Redis connection error (Production):", error);
    return null;
  }
};

export const generateCachePageTag = async (tag: string[], revalidate = 24 * 3600) => {
  try {
    await fetch(`${process.env.BACKEND_URL}`, {
      next: {
        tags: tag,
        revalidate,
      },
    });
  } catch (error) {
    console.error("Error generating cache page tag:", error);
  }
}; 

export const getRedisClient = async () => {
  if (process.env.NODE_ENV === "development") {
    return await getDevelopmentClient();
  }
  return await getProductionClient();
};