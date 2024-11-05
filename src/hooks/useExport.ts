import { useState, useCallback } from 'react';
import { ExportService } from '../services/exportService';
import { ExportFormat, ExportOptions, ExportData } from '../types/export';

export function useExport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportData = useCallback(async (
    data: ExportData,
    format: ExportFormat,
    options: ExportOptions = {}
  ) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ExportService.exportData(data, format, options);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Export failed');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    exportData,
    loading,
    error,
  };
}