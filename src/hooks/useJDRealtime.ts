import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_JD_REALTIME } from '../graphql/queries/jd';

// Mock data for development
const mockRealtimeData = {
  currentOnline: 2900,
  onlineGrowth: 8.2,
  todayRevenue: 39000,
  revenueGrowth: 12.3,
  todayOrders: 195,
  ordersGrowth: 9.7,
  timeSeriesData: [
    { time: '10:00', onlineUsers: 2500, revenue: 35000, orders: 180 },
    { time: '10:05', onlineUsers: 2650, revenue: 36500, orders: 185 },
    { time: '10:10', onlineUsers: 2800, revenue: 38000, orders: 190 },
    { time: '10:15', onlineUsers: 2750, revenue: 37500, orders: 188 },
    { time: '10:20', onlineUsers: 2900, revenue: 39000, orders: 195 }
  ],
  alerts: [
    {
      type: 'warning',
      message: '自营商品库存预警：SKU23456 库存不足15件'
    },
    {
      type: 'info',
      message: '流量高峰：当前UV较昨日同期增长82%'
    },
    {
      type: 'info',
      message: 'Plus会员活跃度较高：同比增长45%'
    }
  ]
};

export function useJDRealtime(platformId: string) {
  const [data, setData] = useState(mockRealtimeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(mockRealtimeData);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Set up polling
    const interval = setInterval(fetchData, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [platformId]);

  return { data, loading, error };
}