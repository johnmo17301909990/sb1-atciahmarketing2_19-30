// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// 平台分析数据类型
export interface PlatformAnalytics {
  id: string;
  platformId: string;
  type: string;
  dateRange: string;
  data: any;
  createdAt: string;
  updatedAt: string;
}

// 实时数据类型
export interface RealtimeData {
  id: string;
  platformId: string;
  currentOnline: number;
  onlineGrowth: number;
  todayRevenue: number;
  revenueGrowth: number;
  todayOrders: number;
  ordersGrowth: number;
  timeSeriesData: Array<{
    time: string;
    onlineUsers: number;
    revenue: number;
    orders: number;
  }>;
  alerts: Array<{
    type: 'warning' | 'error' | 'info';
    message: string;
  }>;
}

// 同步状态类型
export interface SyncStatus {
  id: string;
  platformId: string;
  status: 'idle' | 'syncing' | 'error' | 'success';
  progress: number;
  lastSync: string | null;
  error: string | null;
}

// 平台配置类型
export interface PlatformConfig {
  id: string;
  platformId: string;
  apiKey?: string;
  apiSecret?: string;
  settings: Record<string, any>;
}