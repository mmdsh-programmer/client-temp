import { LRUCache } from "lru-cache";

const memoryCache = new LRUCache({ max: 500 });

console.log(
  JSON.stringify({
    type: "memory-cache",
    action: "init",
    event: "memory_cache_creation",
    message: "Memory cache initialized for development mode",
  })
);

export const getClient = async () => {
  if (!global.redisClientPromise) {
    global.redisClientPromise = (async () => {
      console.log(
        JSON.stringify({
          type: "memory-cache",
          action: "success",
          event: "memory_cache_ready",
          message: "Memory cache client is ready and set on global (development mode)",
        })
      );
      return {
        isReady: true,
        get: async (key) => {
          const value = memoryCache.get(key);
          console.log(
            JSON.stringify({
              type: "memory-cache",
              action: "get",
              key,
              found: value !== undefined,
            })
          );
          return value;
        },
        set: async (key, value, opts) => {
          memoryCache.set(key, value);
          console.log(
            JSON.stringify({
              type: "memory-cache",
              action: "set",
              key,
              opts,
            })
          );
          return true;
        },
        del: async (key) => {
          const deleted = memoryCache.delete(key);
          console.log(
            JSON.stringify({
              type: "memory-cache",
              action: "del",
              key,
              deleted,
            })
          );
          return deleted;
        },
      };
    })();
  } else {
    console.log(
      JSON.stringify({
        type: "memory-cache",
        action: "reuse",
        event: "memory_cache_reuse",
        message: "Reusing existing memory cache client (development mode)",
      })
    );
  }
  return global.redisClientPromise;
};