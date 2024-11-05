import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RuleImpactData } from '../types/rules';

export function useRuleImpact(platformId: string, dateRange: string) {
  const [data, setData] = useState<RuleImpactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        setLoading(true);

        const { data: impactData, error: impactError } = await supabase
          .from('rule_impacts')
          .select('*')
          .eq('platform_id', platformId)
          .eq('date_range', dateRange)
          .single();

        if (impactError) throw impactError;

        setData(impactData as RuleImpactData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch impact data'));
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, [platformId, dateRange]);

  return { data, loading, error };
}