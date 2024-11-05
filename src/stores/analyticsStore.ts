import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AnalyticsState {
  selectedPlatform: string;
  dateRange: string;
  filters: {
    [key: string]: any;
  };
  setSelectedPlatform: (platform: string) => void;
  setDateRange: (range: string) => void;
  setFilter: (key: string, value: any) => void;
  resetFilters: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  devtools(
    persist(
      (set) => ({
        selectedPlatform: 'tmall',
        dateRange: '30d',
        filters: {},
        
        setSelectedPlatform: (platform) => 
          set({ selectedPlatform: platform }),
        
        setDateRange: (range) => 
          set({ dateRange: range }),
        
        setFilter: (key, value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [key]: value,
            },
          })),
        
        resetFilters: () =>
          set({ filters: {} }),
      }),
      {
        name: 'analytics-store',
      }
    )
  )
);