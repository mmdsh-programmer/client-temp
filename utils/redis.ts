import { getClient as clusterClient } from "../cacheHandler.mjs";
import { getClient as createClientDevelop } from "../cacheHandler.develop.mjs";

export const getRedisClient = async () => {
   if (process.env.NODE_ENV === "development") {
    const redisClient = await createClientDevelop();
    return redisClient;
   }
    const redisClient = await clusterClient();
   return redisClient;
};

export const generateCachePageTag = async (tag: string[]) => {
   await fetch(`${process.env.BACKEND_URL}/v1`, {
      next: {
        tags: tag,
      },
    });
};
