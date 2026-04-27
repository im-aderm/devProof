import redis from "./redis";

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    // If redis status is not 'ready', don't even try to get data
    if (redis.status !== "ready") return null;
    
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    // Fail silently to memory/no-cache
    return null;
  }
}

export async function setCachedData(key: string, data: any, ttlSeconds: number = 3600) {
  try {
    if (redis.status !== "ready") return;
    
    await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);
  } catch (error) {
    // Fail silently
  }
}
