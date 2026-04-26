import IORedis from "ioredis";

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");

/**
 * Redis-backed rate limiter for public tool stability.
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
) {
  const key = `ratelimit:${identifier}`;
  
  try {
    const current = await redis.get(key);
    const count = current ? parseInt(current) : 0;

    if (count >= limit) {
      const ttl = await redis.ttl(key);
      return {
        success: false,
        remaining: 0,
        reset: Date.now() + (ttl > 0 ? ttl * 1000 : windowMs),
      };
    }

    const multi = redis.multi();
    multi.incr(key);
    if (!current) {
      multi.pexpire(key, windowMs);
    }
    
    await multi.exec();

    return {
      success: true,
      remaining: limit - (count + 1),
      reset: Date.now() + windowMs, // Approximation for UI
    };
  } catch (error) {
    console.error("RATE_LIMIT_ERROR", error);
    // Fallback to allow request if Redis fails (don't block users)
    return { success: true, remaining: 1, reset: Date.now() };
  }
}
