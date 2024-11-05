import { useState, useCallback } from 'react';

export function useFilters(initialFilters: Record<string, string[]> = {}) {
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const handleFilterChange = useCallback((groupId: string, values: string[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [groupId]: values,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
  }, []);

  return {
    selectedFilters,
    handleFilterChange,
    clearFilters,
  };
}