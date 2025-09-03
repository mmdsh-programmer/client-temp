/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheHandler } from "../cacheHandler.mjs";

let cacheInstance: any = null;

export const getCacheInstance = async () => {
  if (!cacheInstance) {
    const { handlers } = await CacheHandler.onCreation();
    [cacheInstance] = handlers;
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

export const generateCacheKey = (...parts: string[]) => {
  return parts.join(":");
};

export const cacheWithKey = async (
  keyParts: string[],
  getter: () => Promise<any>,
  options?: { ttl?: number },
) => {
  const key = generateCacheKey(...keyParts);

  let result = await cacheGet(key);

  if (result === null) {
    result = await getter();

    if (result !== null && result !== undefined) {
      await cacheSet(key, result, options);
    }
  }

  return result;
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
  try {
    // eslint-disable-next-line @typescript-eslint/no-shadow, import/no-self-import
    const { getCacheInstance } = await import("./cache");
    const cache = await getCacheInstance();

    return {
      isReady: true,

      get: async (key: string) => {
        const value = await cache.get(key);
        if (value === null) return null;

        if (typeof value === "string") return value;
        return JSON.stringify(value);
      },

      set: async (key: string, value: string, options?: { EX?: number }) => {
        let parsedValue: any;
        try {
          parsedValue = JSON.parse(value);
        } catch {
          parsedValue = value;
        }

        const ttl = options?.EX ? options.EX * 1000 : undefined;
        await cache.set(key, parsedValue, { ttl });
      },

      del: async (key: string) => {
        return await cache.delete(key);
      },

      keys: async (pattern: string) => {
        console.warn("keys() method is not fully implemented in cache wrapper");
        return [];
      },

      ping: async () => {
        if (cache.ping) {
          return await cache.ping();
        }
        return "PONG";
      },

      disconnect: async () => {},
    };
  } catch (error) {
    console.error("Error getting Redis client wrapper:", error);
    return null;
  }
};
