import { useState, useEffect } from 'react';

// Mock data for development
const mockPDDData = {
  salesData: {
    daily: [
      { date: '2024-01-14', revenue: 180000, orders: 850, conversion: 5.8 },
      { date: '2024-01-15', revenue: 195000, orders: 920, conversion: 6.1 },
      { date: '2024-01-16', revenue: 188000, orders: 880, conversion: 5.9 },
      { date: '2024-01-17', revenue: 205000, orders: 950, conversion: 6.2 },
      { date: '2024-01-18', revenue: 198000, orders: 920, conversion: 6.0 },
      { date: '2024-01-19', revenue: 215000, orders: 980, conversion: 6.4 },
      { date: '2024-01-20', revenue: 225000, orders: 1020, conversion: 6.5 }
    ]
  },
  categoryData: [
    { name: '百货', revenue: 380000, orders: 1800, growth: 25.2 },
    { name: '服饰', revenue: 320000, orders: 1500, growth: 22.5 },
    { name: '食品', revenue: 280000, orders: 1300, growth: 18.8 },
    { name: '美妆', revenue: 220000, orders: 1050, growth: 15.5 }
  ],
  promotionData: {
    current: {
      investment: 350000,
      revenue: 2340000,
      roi: 6.7,
      newCustomerRate: 45.8
    },
    campaigns: [
      { name: '百亿补贴', investment: 120000, revenue: 850000, roi: 7.1 },
      { name: '限时秒杀', investment: 85000, revenue: 580000, roi: 6.8 },
      { name: '品牌清仓', investment: 65000, revenue: 420000, roi: 6.5 },
      { name: '新品首发', investment: 45000, revenue: 280000, roi: 6.2 },
      { name: '主题活动', investment: 35000, revenue: 210000, roi: 6.0 }
    ]
  }
};

export function usePDDAnalytics(dateRange: string) {
  const [data, setData] = useState(mockPDDData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockPDDData);
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