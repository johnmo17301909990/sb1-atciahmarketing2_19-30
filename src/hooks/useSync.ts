import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useSync(platformId: string) {
  const [status, setStatus] = useState<'idle' | 'syncing' | 'error' | 'success'>('idle');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchSyncStatus = async () => {
      const { data, error } = await supabase
        .from('platforms')
        .select('sync_status, last_sync')
        .eq('id', platformId)
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        setStatus(data.sync_status as any);
        setLastSync(data.last_sync);
      }
    };

    fetchSyncStatus();
  }, [platformId]);

  const startSync = useCallback(async () => {
    try {
      setStatus('syncing');
      setError(null);
      setProgress(0);

      // 更新同步状态
      await supabase
        .from('platforms')
        .update({ sync_status: 'syncing' })
        .eq('id', platformId);

      // 模拟同步过程
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(i);
      }

      // 更新同步完成状态
      await supabase
        .from('platforms')
        .update({
          sync_status: 'success',
          last_sync: new Date().toISOString()
        })
        .eq('id', platformId);

      setStatus('success');
      setLastSync(new Date().toISOString());
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : '同步失败');
    }
  }, [platformId]);

  const cancelSync = useCallback(async () => {
    try {
      await supabase
        .from('platforms')
        .update({ sync_status: 'idle' })
        .eq('id', platformId);

      setStatus('idle');
      setProgress(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : '取消同步失败');
    }
  }, [platformId]);

  return {
    status,
    lastSync,
    error,
    progress,
    startSync,
    cancelSync,
  };
}