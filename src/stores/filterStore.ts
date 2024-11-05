import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterState {
  filters: {
    [key: string]: {
      [key: string]: any;
    };
  };
  activePreset: string | null;
  savedPresets: {
    [key: string]: {
      name: string;
      filters: {
        [key: string]: any;
      };
    };
  };
  setFilter: (viewId: string, key: string, value: any) => void;
  removeFilter: (viewId: string, key: string) => void;
  clearFilters: (viewId: string) => void;
  savePreset: (name: string, filters: { [key: string]: any }) => void;
  loadPreset: (presetId: string) => void;
  deletePreset: (presetId: string) => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      (set) => ({
        filters: {},
        activePreset: null,
        savedPresets: {},

        setFilter: (viewId, key, value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [viewId]: {
                ...state.filters[viewId],
                [key]: value,
              },
            },
          })),

        removeFilter: (viewId, key) =>
          set((state) => {
            const viewFilters = { ...state.filters[viewId] };
            delete viewFilters[key];
            return {
              filters: {
                ...state.filters,
                [viewId]: viewFilters,
              },
            };
          }),

        clearFilters: (viewId) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [viewId]: {},
            },
            activePreset: null,
          })),

        savePreset: (name, filters) =>
          set((state) => ({
            savedPresets: {
              ...state.savedPresets,
              [Date.now().toString()]: {
                name,
                filters,
              },
            },
          })),

        loadPreset: (presetId) =>
          set((state) => ({
            filters: {
              ...state.filters,
              current: state.savedPresets[presetId].filters,
            },
            activePreset: presetId,
          })),

        deletePreset: (presetId) =>
          set((state) => {
            const presets = { ...state.savedPresets };
            delete presets[presetId];
            return {
              savedPresets: presets,
              activePreset: state.activePreset === presetId ? null : state.activePreset,
            };
          }),
      }),
      {
        name: 'filter-store',
      }
    )
  )
);