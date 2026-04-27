import redis from "./redis";

/**
 * Redis-backed rate limiter for public tool stability.
 * Falls back to allowing the request if Redis is unavailable.
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
) {
  const key = `ratelimit:${identifier}`;
  
  try {
    // Gracefully pass if Redis is down
    if (redis.status !== "ready") {
      return { success: true, remaining: 1, reset: Date.now() };
    }

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
      reset: Date.now() + windowMs,
    };
  } catch (error) {
    // Fallback to allow request if Redis fails
    return { success: true, remaining: 1, reset: Date.now() };
  }
}
