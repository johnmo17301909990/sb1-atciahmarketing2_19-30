import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { supabaseService } from '../services/supabaseService';

export function useRealtimeData(platformId: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const initialData = await supabaseService.getRealTimeData(platformId);
        if (mounted) {
          setData(initialData);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch realtime data'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // 订阅实时更新
    const subscription = supabase
      .channel(`realtime_data:${platformId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'realtime_data',
          filter: `platform_id=eq.${platformId}`
        },
        (payload) => {
          if (mounted) {
            setData(payload.new);
          }
        }
      )
      .subscribe();

    fetchInitialData();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [platformId]);

  return { data, loading, error };
}