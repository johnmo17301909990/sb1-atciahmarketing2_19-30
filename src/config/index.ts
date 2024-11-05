import { CacheConfig } from '../types/cache';

export const defaultConfig = {
  cache: {
    prefix: 'dmp',
    ttl: 3600,
    compression: true,
    strategy: 'redis'
  } as CacheConfig,
  
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 30000
  },
  
  analytics: {
    defaultDateRange: '30d',
    refreshInterval: 300000 // 5 minutes
  }
};