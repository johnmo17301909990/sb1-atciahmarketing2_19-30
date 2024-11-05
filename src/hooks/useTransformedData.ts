import { useCallback } from 'react';
import { useAnalyticsData } from './useAnalyticsData';
import { transformAnalyticsData } from '../transforms/analytics';
import { transformJDData } from '../transforms/jd';
import { transformTmallData } from '../transforms/tmall';

export function useTransformedData(platformId: string) {
  const { fetchAnalytics, invalidateAnalytics } = useAnalyticsData(platformId);

  const fetchTransformedData = useCallback(async (type: string, dateRange: string) => {
    const rawData = await fetchAnalytics(type, dateRange);
    
    switch (type) {
      case 'jd':
        return transformJDData(rawData);
      case 'tmall':
        return transformTmallData(rawData);
      default:
        return transformAnalyticsData(rawData);
    }
  }, [fetchAnalytics]);

  return {
    fetchTransformedData,
    invalidateAnalytics
  };
}