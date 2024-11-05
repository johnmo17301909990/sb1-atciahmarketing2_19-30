export interface AnalyticsData {
  overview: {
    totalSales: string;
    totalOrders: string;
    averageOrderValue: string;
    conversionRate: string;
    salesGrowth: string;
    ordersGrowth: string;
    aovGrowth: string;
  };
  trends: Array<{
    date: string;
    value: string;
    previousValue: string;
    growth: string;
  }>;
  comparisons: {
    platforms: Array<{
      name: string;
      value: string;
      share: string;
    }>;
    categories: Array<{
      name: string;
      value: string;
      growth: string;
    }>;
  };
  details: {
    products: Array<{
      id: string;
      name: string;
      sales: string;
      orders: string;
      price: string;
    }>;
    channels: Array<{
      id: string;
      name: string;
      traffic: string;
      conversion: string;
    }>;
  };
}

export interface TransformedAnalytics {
  overview: {
    totalSales: number;
    totalOrders: number;
    averageOrderValue: number;
    conversionRate: number;
    growth: {
      sales: number;
      orders: number;
      aov: number;
    };
  };
  trends: Array<{
    date: Date;
    value: number;
    previousValue: number;
    growth: number;
  }>;
  comparisons: {
    platforms: Array<{
      name: string;
      value: number;
      share: number;
    }>;
    categories: Array<{
      name: string;
      value: number;
      growth: number;
    }>;
  };
  details: {
    products: Array<{
      id: string;
      name: string;
      sales: number;
      orders: number;
      price: number;
    }>;
    channels: Array<{
      id: string;
      name: string;
      traffic: number;
      conversion: number;
    }>;
  };
}