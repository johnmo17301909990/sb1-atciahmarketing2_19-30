import { useCallback } from 'react';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CacheConfig } from '../types/cache';

interface ConfigState {
  cacheConfig: CacheConfig;
  updateCacheConfig: (config: Partial<CacheConfig>) => void;
}

const useConfigStore = create<ConfigState>()(
  devtools(
    persist(
      (set) => ({
        cacheConfig: {
          prefix: 'dmp',
          ttl: 3600,
          compression: true,
          strategy: 'redis'
        },
        updateCacheConfig: (config) =>
          set((state) => ({
            cacheConfig: {
              ...state.cacheConfig,
              ...config
            }
          }))
      }),
      {
        name: 'config-store'
      }
    )
  )
);

export function useConfig() {
  const { cacheConfig, updateCacheConfig } = useConfigStore();

  const setCacheConfig = useCallback((config: Partial<CacheConfig>) => {
    updateCacheConfig(config);
  }, [updateCacheConfig]);

  return {
    cacheConfig,
    setCacheConfig
  };
}