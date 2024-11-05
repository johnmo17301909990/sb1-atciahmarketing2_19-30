import { useCallback } from 'react';
import { useCache } from './useCache';
import { analyticsService } from '../services/analyticsService';
import { AnalyticsData } from '../types/analytics';

export function useAnalyticsData(platformId: string) {
  const { getOrFetchData, invalidateCache } = useCache();

  const fetchAnalytics = useCallback(async (
    type: string,
    dateRange: string
  ): Promise<AnalyticsData> => {
    const cacheKey = `analytics:${platformId}:${type}:${dateRange}`;
    
    return getOrFetchData(
      cacheKey,
      () => analyticsService.getAnalytics(platformId, type, dateRange),
      3600 // 1 hour cache
    );
  }, [platformId]);

  const invalidateAnalytics = useCallback(async (
    type?: string,
    dateRange?: string
  ): Promise<void> => {
    const pattern = type && dateRange
      ? `analytics:${platformId}:${type}:${dateRange}`
      : type
      ? `analytics:${platformId}:${type}:*`
      : `analytics:${platformId}:*`;

    await invalidateCache(pattern);
  }, [platformId]);

  return {
    fetchAnalytics,
    invalidateAnalytics
  };
}