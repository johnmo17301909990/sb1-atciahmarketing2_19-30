import { useState, useCallback } from 'react';
import { ExportSchedule } from '../types/export';
import { supabase } from '../lib/supabase';

export function useExportSchedules() {
  const [schedules, setSchedules] = useState<ExportSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('export_schedules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchedules(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch schedules'));
    } finally {
      setLoading(false);
    }
  }, []);

  const createSchedule = useCallback(async (schedule: Omit<ExportSchedule, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('export_schedules')
        .insert([schedule])
        .select()
        .single();

      if (error) throw error;
      setSchedules((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create schedule');
    }
  }, []);

  const updateSchedule = useCallback(async (schedule: ExportSchedule) => {
    try {
      const { data, error } = await supabase
        .from('export_schedules')
        .update(schedule)
        .eq('id', schedule.id)
        .select()
        .single();

      if (error) throw error;
      setSchedules((prev) =>
        prev.map((s) => (s.id === schedule.id ? data : s))
      );
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update schedule');
    }
  }, []);

  const deleteSchedule = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('export_schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete schedule');
    }
  }, []);

  return {
    schedules,
    loading,
    error,
    fetchSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
}