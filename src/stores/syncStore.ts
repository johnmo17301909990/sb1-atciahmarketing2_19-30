import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SyncState {
  syncStatus: {
    [platformId: string]: {
      status: 'idle' | 'syncing' | 'error' | 'success';
      lastSync: string | null;
      error: string | null;
      progress: number;
    };
  };
  setSyncStatus: (platformId: string, status: 'idle' | 'syncing' | 'error' | 'success') => void;
  setLastSync: (platformId: string, date: string) => void;
  setSyncError: (platformId: string, error: string | null) => void;
  setSyncProgress: (platformId: string, progress: number) => void;
  resetSync: (platformId: string) => void;
}

export const useSyncStore = create<SyncState>()(
  devtools((set) => ({
    syncStatus: {},

    setSyncStatus: (platformId, status) =>
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          [platformId]: {
            ...state.syncStatus[platformId],
            status,
          },
        },
      })),

    setLastSync: (platformId, date) =>
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          [platformId]: {
            ...state.syncStatus[platformId],
            lastSync: date,
          },
        },
      })),

    setSyncError: (platformId, error) =>
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          [platformId]: {
            ...state.syncStatus[platformId],
            error,
            status: error ? 'error' : state.syncStatus[platformId]?.status,
          },
        },
      })),

    setSyncProgress: (platformId, progress) =>
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          [platformId]: {
            ...state.syncStatus[platformId],
            progress,
          },
        },
      })),

    resetSync: (platformId) =>
      set((state) => ({
        syncStatus: {
          ...state.syncStatus,
          [platformId]: {
            status: 'idle',
            lastSync: null,
            error: null,
            progress: 0,
          },
        },
      })),
  }))
);