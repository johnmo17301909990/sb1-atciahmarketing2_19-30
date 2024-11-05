import { useMutation } from '@apollo/client';
import { SYNC_PLATFORM_DATA, CANCEL_SYNC } from '../graphql/mutations';

export function usePlatformSync() {
  const [startSync, { loading: syncLoading }] = useMutation(SYNC_PLATFORM_DATA);
  const [cancelSync, { loading: cancelLoading }] = useMutation(CANCEL_SYNC);

  const syncPlatform = async (platformId: string) => {
    try {
      const { data } = await startSync({
        variables: { platformId },
      });
      return data.syncPlatformData;
    } catch (error) {
      throw new Error('Failed to start sync: ' + error.message);
    }
  };

  const cancelPlatformSync = async (syncId: string) => {
    try {
      const { data } = await cancelSync({
        variables: { syncId },
      });
      return data.cancelSync;
    } catch (error) {
      throw new Error('Failed to cancel sync: ' + error.message);
    }
  };

  return {
    syncPlatform,
    cancelPlatformSync,
    loading: syncLoading || cancelLoading,
  };
}