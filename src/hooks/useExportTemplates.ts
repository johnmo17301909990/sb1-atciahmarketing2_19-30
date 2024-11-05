import { useState, useCallback } from 'react';
import { ExportTemplate } from '../types/export';
import { supabase } from '../lib/supabase';

export function useExportTemplates() {
  const [templates, setTemplates] = useState<ExportTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('export_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch templates'));
    } finally {
      setLoading(false);
    }
  }, []);

  const createTemplate = useCallback(async (template: Omit<ExportTemplate, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('export_templates')
        .insert([template])
        .select()
        .single();

      if (error) throw error;
      setTemplates((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create template');
    }
  }, []);

  const updateTemplate = useCallback(async (template: ExportTemplate) => {
    try {
      const { data, error } = await supabase
        .from('export_templates')
        .update(template)
        .eq('id', template.id)
        .select()
        .single();

      if (error) throw error;
      setTemplates((prev) =>
        prev.map((t) => (t.id === template.id ? data : t))
      );
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update template');
    }
  }, []);

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('export_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete template');
    }
  }, []);

  return {
    templates,
    loading,
    error,
    fetchTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
}