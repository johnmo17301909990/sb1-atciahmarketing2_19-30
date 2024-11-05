import { useState, useEffect } from 'react';

// Mock data for development
const mockJDData = {
  salesData: {
    daily: [
      { date: '2024-01-14', revenue: 125000, orders: 580, conversion: 4.2 },
      { date: '2024-01-15', revenue: 138000, orders: 620, conversion: 4.5 },
      { date: '2024-01-16', revenue: 142000, orders: 650, conversion: 4.8 },
      { date: '2024-01-17', revenue: 135000, orders: 610, conversion: 4.3 },
      { date: '2024-01-18', revenue: 148000, orders: 680, conversion: 4.9 },
      { date: '2024-01-19', revenue: 156000, orders: 720, conversion: 5.1 },
      { date: '2024-01-20', revenue: 162000, orders: 750, conversion: 5.3 },
    ]
  },
  comparisonData: {
    selfOperated: {
      revenue: 850000,
      orders: 3800,
      avgOrderValue: 223.68,
      conversion: 4.8,
      dailyMetrics: [
        { date: '2024-01-14', revenue: 115000, orders: 520, conversion: 4.5 },
        { date: '2024-01-15', revenue: 125000, orders: 560, conversion: 4.7 },
        { date: '2024-01-16', revenue: 118000, orders: 530, conversion: 4.6 },
        { date: '2024-01-17', revenue: 128000, orders: 580, conversion: 4.8 },
        { date: '2024-01-18', revenue: 122000, orders: 550, conversion: 4.7 },
        { date: '2024-01-19', revenue: 132000, orders: 600, conversion: 4.9 },
        { date: '2024-01-20', revenue: 135000, orders: 620, conversion: 5.0 }
      ],
      topCategories: [
        { name: '3C数码', revenue: 280000, orders: 1200, growth: 15.2 },
        { name: '家电', revenue: 220000, orders: 950, growth: 12.5 },
        { name: '服饰', revenue: 180000, orders: 850, growth: 8.3 },
        { name: '美妆', revenue: 150000, orders: 720, growth: 10.2 }
      ]
    },
    marketplace: {
      revenue: 720000,
      orders: 3200,
      avgOrderValue: 225,
      conversion: 4.2,
      dailyMetrics: [
        { date: '2024-01-14', revenue: 98000, orders: 440, conversion: 4.1 },
        { date: '2024-01-15', revenue: 102000, orders: 460, conversion: 4.2 },
        { date: '2024-01-16', revenue: 105000, orders: 470, conversion: 4.3 },
        { date: '2024-01-17', revenue: 100000, orders: 450, conversion: 4.2 },
        { date: '2024-01-18', revenue: 108000, orders: 480, conversion: 4.4 },
        { date: '2024-01-19', revenue: 112000, orders: 500, conversion: 4.5 },
        { date: '2024-01-20', revenue: 115000, orders: 520, conversion: 4.6 }
      ],
      topCategories: [
        { name: '3C数码', revenue: 240000, orders: 1050, growth: 13.5 },
        { name: '家电', revenue: 190000, orders: 820, growth: 11.2 },
        { name: '服饰', revenue: 160000, orders: 750, growth: 7.8 },
        { name: '美妆', revenue: 130000, orders: 620, growth: 9.5 }
      ]
    }
  }
};

export function useJDAnalytics(dateRange: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockJDData);
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