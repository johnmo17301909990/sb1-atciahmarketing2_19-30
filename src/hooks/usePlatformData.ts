import { useQuery, useMutation } from '@apollo/client';
import { useCache } from './useCache';
import { GET_PLATFORM_DATA } from '../graphql/queries';
import { SYNC_PLATFORM_DATA } from '../graphql/mutations';

export function usePlatformData(platformId: string) {
  const cache = useCache();
  const cacheKey = `platform:${platformId}:data`;

  const { data, loading, error, refetch } = useQuery(GET_PLATFORM_DATA, {
    variables: { platformId },
    fetchPolicy: 'cache-and-network'
  });

  const [syncData, { loading: syncing }] = useMutation(SYNC_PLATFORM_DATA);

  const syncPlatformData = async () => {
    try {
      const result = await syncData({ variables: { platformId } });
      await cache.set(cacheKey, result.data);
      await refetch();
      return result;
    } catch (error) {
      console.error('Error syncing platform data:', error);
      throw error;
    }
  };

  return {
    data,
    loading,
    error,
    syncing,
    syncPlatformData,
    refetch
  };
}