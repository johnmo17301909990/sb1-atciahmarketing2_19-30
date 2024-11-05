export interface Platform {
  id: string;
  name: string;
  type: 'tmall' | 'jd';
  status: 'active' | 'inactive';
  icon: string;
  lastSync: string;
}

export interface PlatformOverview {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface TrafficData {
  totalVisits: number;
  bounceRate: number;
  averageTime: string;
  conversionRate: number;
  trafficTrend: Array<{
    date: string;
    totalVisits: number;
    naturalTraffic: number;
    paidTraffic: number;
    internalTraffic: number;
  }>;
  trafficSource: Array<{
    name: string;
    value: number;
  }>;
}

export interface SalesData {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  salesTrend: Array<{
    date: string;
    sales: number;
    orders: number;
    averageValue: number;
  }>;
  categoryData: Array<{
    name: string;
    sales: number;
    growth: number;
  }>;
}

// 其他数据类型定义...