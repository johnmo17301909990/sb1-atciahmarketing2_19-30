import { useCallback } from 'react';
import { CacheService } from '../services/cacheService';

const cacheService = new CacheService();

export function useCache() {
  const get = useCallback(async (key: string) => {
    return await cacheService.get(key);
  }, []);

  const set = useCallback(async (key: string, value: any, ttl?: number) => {
    await cacheService.set(key, value, ttl);
  }, []);

  const remove = useCallback(async (key: string) => {
    await cacheService.delete(key);
  }, []);

  const clear = useCallback(async () => {
    await cacheService.clear();
  }, []);

  return {
    get,
    set,
    remove,
    clear
  };
}