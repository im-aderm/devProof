import IORedis from "ioredis";

const redis = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("REDIS_GET_ERROR", error);
    return null;
  }
}

export async function setCachedData(key: string, data: any, ttlSeconds: number = 3600) {
  try {
    await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);
  } catch (error) {
    console.error("REDIS_SET_ERROR", error);
  }
}
