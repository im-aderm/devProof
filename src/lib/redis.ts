import IORedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

/**
 * Shared Redis instance configured to fail fast.
 * This prevents the application from hanging when Redis is unavailable.
 */
export const redis = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  connectTimeout: 500, // 0.5s timeout for connection
  retryStrategy(times) {
    // Only retry once, then stop
    if (times > 1) return null;
    return 100;
  }
});

// Handle connection errors globally to prevent "Unhandled error event" crashes
redis.on("error", (error) => {
  // Only log once to avoid flooding logs
  if ((error as any).code === "ECONNREFUSED") {
    // We expect this if Redis isn't installed/running
    return;
  }
  console.error("Redis Connection Error:", error);
});

export default redis;
