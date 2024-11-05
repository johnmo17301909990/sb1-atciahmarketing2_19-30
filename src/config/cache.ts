import { CacheConfig } from '../types/cache';

export const cacheConfig: CacheConfig = {
  prefix: 'dmp',
  ttl: 3600,
  compression: true,
  strategy: 'redis'
};