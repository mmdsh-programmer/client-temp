import { getClient as clusterClient } from "../cacheHandler.mjs";
import { getClient as clusterClientDevelop } from "../cacheHandler.develop.mjs";

export const getRedisClient = async () => {
   if (process.env.NODE_ENV === "development") {
    const redisClient = await clusterClientDevelop();
    return redisClient;
   }
    const redisClient = await clusterClient();
   return redisClient;
};

