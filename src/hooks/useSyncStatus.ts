import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSyncStatus(platformId: string) {
  const [status, setStatus] = useState<string | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('platforms')
          .select('sync_status, last_sync')
          .eq('id', platformId)
          .single();

        if (error) throw error;

        if (mounted) {
          setStatus(data.sync_status);
          setLastSync(data.last_sync);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch sync status'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // 订阅实时更新
    const subscription = supabase
      .channel(`platform_status:${platformId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'platforms',
          filter: `id=eq.${platformId}`
        },
        (payload) => {
          if (mounted) {
            setStatus(payload.new.sync_status);
            setLastSync(payload.new.last_sync);
          }
        }
      )
      .subscribe();

    fetchStatus();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [platformId]);

  return { status, lastSync, loading, error };
}