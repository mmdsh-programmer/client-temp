// Re-export from the new Redis client implementation
// Legacy exports for backward compatibility
export { generateCachePageTag, getRedisClient } from "./cache";

// New cache handler exports
export * from "./cache";
