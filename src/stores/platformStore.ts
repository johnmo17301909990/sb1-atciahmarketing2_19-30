import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Platform } from '../types/platform';

interface PlatformState {
  platforms: Platform[];
  loading: boolean;
  error: Error | null;
  selectedPlatform: Platform | null;
  setSelectedPlatform: (platform: Platform) => void;
  setPlatforms: (platforms: Platform[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export const usePlatformStore = create<PlatformState>()(
  devtools((set) => ({
    platforms: [],
    loading: false,
    error: null,
    selectedPlatform: null,

    setSelectedPlatform: (platform) => 
      set({ selectedPlatform: platform }),

    setPlatforms: (platforms) => 
      set({ platforms }),

    setLoading: (loading) => 
      set({ loading }),

    setError: (error) => 
      set({ error }),
  }))
);