import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TMALL_REALTIME } from '../graphql/queries/tmall';

// Mock data for development
const mockRealtimeData = {
  currentOnline: 3500,
  onlineGrowth: 15.2,
  todayRevenue: 52000,
  revenueGrowth: 18.5,
  todayOrders: 245,
  ordersGrowth: 12.8,
  timeSeriesData: [
    { time: '10:00', onlineUsers: 3200, revenue: 45000, orders: 220 },
    { time: '10:05', onlineUsers: 3300, revenue: 47000, orders: 228 },
    { time: '10:10', onlineUsers: 3400, revenue: 49000, orders: 235 },
    { time: '10:15', onlineUsers: 3450, revenue: 50000, orders: 240 },
    { time: '10:20', onlineUsers: 3500, revenue: 52000, orders: 245 }
  ],
  alerts: [
    {
      type: 'warning',
      message: '爆款商品库存预警：SKU45678 库存不足25件'
    },
    {
      type: 'info',
      message: '流量高峰：当前UV较昨日同期增长108%'
    },
    {
      type: 'info',
      message: '直播间转化率突增：较历史均值提升45%'
    }
  ]
};

export function useTmallRealtime(platformId: string) {
  const [data, setData] = useState(mockRealtimeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
    
    // 实时数据轮询
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, [platformId]);

  return { data, loading, error };
}