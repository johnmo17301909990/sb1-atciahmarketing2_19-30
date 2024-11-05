import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Rule } from '../types/rules';

export function useRules(platformId: string) {
  const [data, setData] = useState<{
    rules: Rule[];
    totalCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        
        // 获取规则列表
        const { data: rules, error: rulesError, count } = await supabase
          .from('platform_rules')
          .select('*', { count: 'exact' })
          .eq('platform_id', platformId)
          .order('updated_at', { ascending: false });

        if (rulesError) throw rulesError;

        setData({
          rules: rules as Rule[],
          totalCount: count || 0
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch rules'));
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [platformId]);

  return { data, loading, error };
}