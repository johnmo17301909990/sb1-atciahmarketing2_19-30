import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TMALL_ANALYTICS } from '../graphql/queries/tmall';

// Mock data for development
const mockTmallData = {
  salesData: {
    daily: [
      { date: '2024-01-14', revenue: 150000, orders: 680, conversion: 4.8 },
      { date: '2024-01-15', revenue: 165000, orders: 720, conversion: 5.1 },
      { date: '2024-01-16', revenue: 158000, orders: 700, conversion: 4.9 },
      { date: '2024-01-17', revenue: 172000, orders: 750, conversion: 5.2 },
      { date: '2024-01-18', revenue: 168000, orders: 730, conversion: 5.0 },
      { date: '2024-01-19', revenue: 180000, orders: 780, conversion: 5.4 },
      { date: '2024-01-20', revenue: 185000, orders: 800, conversion: 5.5 }
    ]
  },
  categoryData: [
    { name: '美妆个护', revenue: 280000, orders: 1200, growth: 15.2 },
    { name: '服装配饰', revenue: 250000, orders: 1100, growth: 12.5 },
    { name: '数码电器', revenue: 220000, orders: 950, growth: 10.8 },
    { name: '食品饮料', revenue: 180000, orders: 850, growth: 8.5 }
  ],
  promotionData: {
    current: {
      investment: 300000,
      revenue: 1650000,
      roi: 5.5,
      newCustomerRate: 38.5
    },
    campaigns: [
      { name: '双11预售', investment: 80000, revenue: 450000, roi: 5.6 },
      { name: '双12大促', investment: 60000, revenue: 320000, roi: 5.3 },
      { name: '年货节', investment: 50000, revenue: 280000, roi: 5.6 },
      { name: '38女王节', investment: 40000, revenue: 220000, roi: 5.5 },
      { name: '618大促', investment: 70000, revenue: 380000, roi: 5.4 }
    ]
  }
};

export function useTmallAnalytics(dateRange: string) {
  const [data, setData] = useState(mockTmallData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockTmallData);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  return { data, loading, error };
}