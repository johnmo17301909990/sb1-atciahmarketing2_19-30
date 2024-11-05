import React, { createContext, useContext, useState } from 'react';

interface AnalyticsContextType {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [selectedPlatform, setSelectedPlatform] = useState('tmall');
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <AnalyticsContext.Provider
      value={{
        selectedPlatform,
        setSelectedPlatform,
        dateRange,
        setDateRange,
        loading,
        setLoading,
        error,
        setError
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
}