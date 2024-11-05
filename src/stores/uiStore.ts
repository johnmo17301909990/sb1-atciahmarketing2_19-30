import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  currentView: string;
  theme: 'light' | 'dark' | 'system';
  loading: {
    [key: string]: boolean;
  };
  errors: {
    [key: string]: string | null;
  };
  setSidebarOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  clearErrors: () => void;
}

export const useUIStore = create<UIState>()(
  devtools((set) => ({
    sidebarOpen: true,
    currentView: 'dashboard',
    theme: 'system',
    loading: {},
    errors: {},

    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    setCurrentView: (view) => set({ currentView: view }),
    setTheme: (theme) => set({ theme }),
    
    setLoading: (key, loading) =>
      set((state) => ({
        loading: {
          ...state.loading,
          [key]: loading,
        },
      })),
    
    setError: (key, error) =>
      set((state) => ({
        errors: {
          ...state.errors,
          [key]: error,
        },
      })),
    
    clearErrors: () => set({ errors: {} }),
  }))
);