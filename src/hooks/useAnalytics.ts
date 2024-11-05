import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export function useAnalytics(platformId: string, dateRange: string, type: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;

        switch (type) {
          case 'traffic':
            result = await analyticsService.getTrafficAnalytics(platformId, dateRange);
            break;
          case 'sales':
            result = await analyticsService.getSalesAnalytics(platformId, dateRange);
            break;
          case 'products':
            result = await analyticsService.getProductAnalytics(platformId, dateRange);
            break;
          case 'userPortrait':
            result = await analyticsService.getUserPortrait(platformId, dateRange);
            break;
          case 'reviews':
            result = await analyticsService.getReviewAnalytics(platformId, dateRange);
            break;
          case 'returns':
            result = await analyticsService.getReturnAnalytics(platformId, dateRange);
            break;
          case 'promotions':
            result = await analyticsService.getPromotionAnalytics(platformId, dateRange);
            break;
          case 'competitors':
            result = await analyticsService.getCompetitorAnalytics(platformId, dateRange);
            break;
          case 'roi':
            result = await analyticsService.getROIAnalytics(platformId, dateRange);
            break;
          default:
            throw new Error('Unknown analytics type');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [platformId, dateRange, type]);

  return { data, loading, error };
}