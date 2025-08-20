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

export const generateCachePageTag = async (tag: string[], revalidate = 24 * 3600) => {
  await fetch(`${process.env.BACKEND_URL}`, {
    next: {
      tags: tag,
      revalidate,
    },
  });
};
