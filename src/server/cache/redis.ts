import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function initRedis() {
  await redisClient.connect();
}

export async function cacheData(key: string, data: any, ttl: number = 3600) {
  await redisClient.set(key, JSON.stringify(data), {
    EX: ttl
  });
}

export async function getCachedData(key: string) {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
}

export async function invalidateCache(pattern: string) {
  const keys = await redisClient.keys(pattern);
  if (keys.length > 0) {
    await redisClient.del(keys);
  }
}

export { redisClient };