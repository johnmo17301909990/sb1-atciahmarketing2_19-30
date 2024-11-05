import { useQuery } from '@apollo/client';
import { GET_PLATFORM_ANALYTICS } from '../graphql/queries';
import { useAnalyticsStore } from '../stores/analyticsStore';

export function useAnalyticsQuery(type: string) {
  const { selectedPlatform, dateRange } = useAnalyticsStore();

  return useQuery(GET_PLATFORM_ANALYTICS, {
    variables: {
      platformId: selectedPlatform,
      dateRange,
      type,
    },
    skip: !selectedPlatform,
  });
}