import { getRedisClient } from "@utils/redis-client";
import { unstable_cache } from "next/cache";

// Custom cache wrapper that works with Next.js 15
export const createCache = <T>(
  fn: () => Promise<T>,
  key: string,
  options: {
    tags?: string[];
    revalidate?: number;
  } = {},
) => {
  return unstable_cache(
    async () => {
      return await fn();
    },
    [key],
    {
      tags: options.tags || [],
      revalidate: options.revalidate || 3600,
    },
  );
};

// Redis cache wrapper
export const createRedisCache = <T>(
  fn: () => Promise<T>,
  key: string,
  options: {
    ttl?: number;
    tags?: string[];
  } = {},
) => {
  return async (): Promise<T> => {
    const redisClient = await getRedisClient();

    if (!redisClient) {
      // Fallback to function execution if Redis is not available
      return await fn();
    }

    try {
      // Try to get from cache
      const cached = await redisClient.get(key);
      if (cached) {
        return JSON.parse(cached);
      }

      // Execute function and cache result
      const result = await fn();
      await redisClient.set(key, JSON.stringify(result), {
        EX: options.ttl || 3600,
      });

      return result;
    } catch (error) {
      console.error("Redis cache error:", error);
      // Fallback to function execution
      return await fn();
    }
  };
};

// Cache invalidation helper
export const invalidateCache = async (tags: string[]) => {
  const redisClient = await getRedisClient();

  if (!redisClient) {
    return;
  }

  try {
    // This is a simplified approach - in a real implementation,
    // you might want to store tag-to-key mappings in Redis
    console.log("Cache invalidation requested for tags:", tags);
  } catch (error) {
    console.error("Cache invalidation error:", error);
  }
};
