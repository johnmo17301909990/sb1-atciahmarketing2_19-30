import { useState, useEffect } from 'react';

// Mock data for development
const mockRealtimeData = {
  currentOnline: 3800,
  onlineGrowth: 12.5,
  todayRevenue: 68000,
  revenueGrowth: 15.8,
  todayOrders: 285,
  ordersGrowth: 13.2,
  timeSeriesData: [
    { time: '10:00', onlineUsers: 3500, revenue: 62000, orders: 265 },
    { time: '10:05', onlineUsers: 3600, revenue: 64000, orders: 270 },
    { time: '10:10', onlineUsers: 3700, revenue: 66000, orders: 275 },
    { time: '10:15', onlineUsers: 3750, revenue: 67000, orders: 280 },
    { time: '10:20', onlineUsers: 3800, revenue: 68000, orders: 285 }
  ],
  alerts: [
    {
      type: 'warning',
      message: '爆款商品库存预警：SKU78901 库存不足20件'
    },
    {
      type: 'info',
      message: '流量高峰：当前UV较昨日同期增长125%'
    },
    {
      type: 'info',
      message: '多多视频带货转化率突增：较历史均值提升52%'
    }
  ]
};

export function usePDDRealtime(platformId: string) {
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