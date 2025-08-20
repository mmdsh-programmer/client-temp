import { CacheHandler } from "../cacheHandler.mjs";

let cacheInstance: any = null;

export const getCacheInstance = async () => {
  if (!cacheInstance) {
    const { handlers } = await CacheHandler.onCreation();
    cacheInstance = handlers[0];
  }
  return cacheInstance;
};

export const cacheGet = async (key: string) => {
  const cache = await getCacheInstance();
  return await cache.get(key);
};

export const cacheSet = async (key: string, value: any, options?: { ttl?: number }) => {
  const cache = await getCacheInstance();
  return await cache.set(key, value, options);
};

export const cacheDelete = async (key: string) => {
  const cache = await getCacheInstance();
  return await cache.delete(key);
};

export const cacheClear = async () => {
  const cache = await getCacheInstance();
  return await cache.clear();
};

// Helper function for generating cache keys
export const generateCacheKey = (...parts: string[]) => {
  return parts.join(":");
};

// Helper function for cache with automatic key generation
export const cacheWithKey = async (
  keyParts: string[],
  getter: () => Promise<any>,
  options?: { ttl?: number }
) => {
  const key = generateCacheKey(...keyParts);
  
  // Try to get from cache first
  let result = await cacheGet(key);
  
  if (result === null) {
    // If not in cache, get from source
    result = await getter();
    
    // Store in cache
    if (result !== null && result !== undefined) {
      await cacheSet(key, result, options);
    }
  }
  
  return result;
};

// Next.js cache tag generation (for compatibility with existing code)
export const generateCachePageTag = async (tag: string[], revalidate = 24 * 3600) => {
  try {
    await fetch(`${process.env.BACKEND_URL}/v1`, {
      next: {
        tags: tag,
        revalidate,
      },
    });
  } catch (error) {
    console.error("Error generating cache page tag:", error);
  }
};

// Enhanced Redis client wrapper for backward compatibility
export const getRedisClient = async () => {
  try {
    const { getCacheInstance } = await import("./cache");
    const cache = await getCacheInstance();
    
    // Return a Redis-like interface for backward compatibility
    return {
      isReady: true,
      get: async (key: string) => {
        const value = await cache.get(key);
        return value ? JSON.stringify(value) : null;
      },
      set: async (key: string, value: string, options?: { EX?: number }) => {
        const parsedValue = JSON.parse(value);
        const ttl = options?.EX ? options.EX * 1000 : undefined;
        await cache.set(key, parsedValue, { ttl });
      },
      del: async (key: string) => {
        return await cache.delete(key);
      },
      keys: async (pattern: string) => {
        // This is a simplified implementation
        // In a real Redis implementation, you'd use SCAN
        console.warn("keys() method is not fully implemented in cache wrapper");
        return [];
      },
      disconnect: async () => {
        // No-op for compatibility
      }
    };
  } catch (error) {
    console.error("Error getting Redis client wrapper:", error);
    return null;
  }
}; 