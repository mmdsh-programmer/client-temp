import { EAction } from "lib/logging";

export const defineIncrementAndExpire = async () => {
  try {
    const redisConnection = await global.redisClient;
    await redisConnection.defineCommand("incrementAndExpire", {
      numberOfKeys: 1,
      lua: `
        local current = redis.call('INCR', KEYS[1])
        if current == 1 then
          redis.call('EXPIRE', KEYS[1], ARGV[1])
        end
        return current
      `,
    });
  } catch (error) {
    console.log(
      JSON.stringify(
        {
          type: EAction.RateLimit,
          status: "defineIncrementAndExpire",
          message: JSON.stringify(error),
        },
        null,
        0,
      ),
    );
  }
};

export const setRateLimit = async (key: string, ttl: number = 100) => {
  const redisConnection = await global.redisClient;
  let currentRequests = 0;
  if(process.env.DEV_MODE === "development"){
    const pipeline = redisConnection.multi();
    pipeline.incr(key);
    // Set expiry only if the key does not already have one ('NX' option)
    // This is efficient as it only runs on the first request in a new window.
    pipeline.expire(key, ttl, "NX");
    
    // Execute the transaction
    const results = await pipeline.exec();

    // ioredis returns an array of [error, value] for each command in the transaction.
    // We only care about the result of the INCR command, which is the first one.
    const incrResult = results?.[0];
    if (incrResult) {
      currentRequests = incrResult as number;
    }
  } else {
    currentRequests = await (redisConnection as unknown as { 
      incrementAndExpire: (key: string, ttlSeconds?: number | null) => Promise<number>;
    }).incrementAndExpire(key, ttl);
  }
  return currentRequests;
};

export const isRateLimited = async (ip: string) => {
  try {
    if (!ip) {
      throw new Error("IP address cannot be null or empty.");
    }
    const redisConnection = await global.redisClient;
    if(process.env.NODE_ENV === "production" && !redisConnection.incrementAndExpire){
     await defineIncrementAndExpire();
    }
    const ttl = +(process.env.RATE_LIMIT_PERIOD_SECONDS ?? 60);
    
    const isWhitelisted = await redisConnection.sendCommand(["SISMEMBER", "white-list-ip", ip]);

    if (isWhitelisted) {
      return false;
    }

    // Check if IP is banned
    const banKey = `rate_limit:ban:${ip}`;
    const isBanned = await redisConnection.exists(banKey);
    if (isBanned) {
      console.log(
        JSON.stringify(
          {
            type: EAction.RateLimit,
            status: "BANNED",
            ip,
            message: "IP is currently banned",
          },
          null,
          0,
        ),
      );
      return true;
    }

    const key = `rate_limit:${ip}`;
    const currentRequests = await setRateLimit(key, ttl);

    if ((currentRequests > +(process.env.MAX_REQUESTS_PER_PERIOD ?? 100)) as unknown as number) {
      // Ban the IP for 5 minutes (300 seconds)
      const banDuration = 300; // 5 minutes in seconds
      await redisConnection.set(banKey, currentRequests, {
        EX: banDuration,
      });
      console.log(
        JSON.stringify(
          {
            action: "isRateLimited",
            status: "EXCEEDED",
            ip,
            currentRequests,
            banDuration,
          },
          null,
          0,
        ),
      );
      return true;
    }

    return false;
  } catch (error) {
    console.log(
      JSON.stringify(
        {
          action: "isRateLimited",
          status: "ERROR",
          message: "An error occurred while checking the rate limit:",
          error: error instanceof Error ? error.message : "Internal server error",
        },
        null,
        0,
      ),
    );
    return false;
  }
};
