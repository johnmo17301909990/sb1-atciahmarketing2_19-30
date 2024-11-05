import { useQuery, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { GET_PLATFORM_ANALYTICS, GET_REALTIME_DATA } from '../graphql/queries';
import { SYNC_PLATFORM_DATA, CANCEL_SYNC } from '../graphql/mutations';
import type { PlatformAnalytics, RealtimeData, ApiResponse } from '../types/api';

export function useApi(platformId: string) {
  // 获取平台分析数据
  const useAnalytics = (type: string, dateRange: string) => {
    return useQuery<{ analytics: PlatformAnalytics }>(GET_PLATFORM_ANALYTICS, {
      variables: { platformId, type, dateRange },
      skip: !platformId,
    });
  };

  // 获取实时数据
  const useRealtime = () => {
    return useQuery<{ realtimeData: RealtimeData }>(GET_REALTIME_DATA, {
      variables: { platformId },
      skip: !platformId,
      pollInterval: 30000, // 30秒轮询一次
    });
  };

  // 同步数据
  const [syncData] = useMutation<{ syncPlatformData: ApiResponse }>(
    SYNC_PLATFORM_DATA
  );

  const syncPlatformData = useCallback(async () => {
    try {
      const { data } = await syncData({
        variables: { platformId },
      });
      return data?.syncPlatformData;
    } catch (error) {
      throw new Error('Failed to sync platform data');
    }
  }, [platformId, syncData]);

  // 取消同步
  const [cancelSync] = useMutation<{ cancelSync: ApiResponse }>(CANCEL_SYNC);

  const cancelPlatformSync = useCallback(async (syncId: string) => {
    try {
      const { data } = await cancelSync({
        variables: { syncId },
      });
      return data?.cancelSync;
    } catch (error) {
      throw new Error('Failed to cancel sync');
    }
  }, [cancelSync]);

  return {
    useAnalytics,
    useRealtime,
    syncPlatformData,
    cancelPlatformSync,
  };
}