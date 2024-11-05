import { createClient } from 'redis';

const redisClient = createClient({
  url: import.meta.env.VITE_REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        return new Error('Max reconnection attempts reached');
      }
      return Math.min(retries * 100, 3000);
    },
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('reconnecting', () => console.log('Redis Client Reconnecting'));

export async function initRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export { redisClient };