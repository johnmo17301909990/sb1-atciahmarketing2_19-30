import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RuleChange } from '../types/rules';

export function useRuleChanges(platformId: string) {
  const [changes, setChanges] = useState<RuleChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);

        const { data, error: changesError } = await supabase
          .from('rule_changes')
          .select('*')
          .eq('platform_id', platformId)
          .order('date', { ascending: false });

        if (changesError) throw changesError;

        setChanges(data as RuleChange[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch rule changes'));
      } finally {
        setLoading(false);
      }
    };

    fetchChanges();
  }, [platformId]);

  return { changes, loading, error };
}