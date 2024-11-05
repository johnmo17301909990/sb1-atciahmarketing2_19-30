// ... 保留之前的代码 ...

// 添加新的API方法
export const jdApi = {
  // ... 保留之前的getComparison方法 ...

  getTrafficAnalytics: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalVisits: 458632,
        bounceRate: 32.5,
        averageTime: '5:32',
        conversionRate: 4.8,
        // ... 其他流量数据
      });
    }
    return api.get('/analytics/jd/traffic', { params: { dateRange } });
  },

  getSalesAnalytics: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalSales: 210000,
        totalOrders: 1035,
        averageOrderValue: 203,
        conversionRate: 4.8,
        // ... 其他销售数据
      });
    }
    return api.get('/analytics/jd/sales', { params: { dateRange } });
  },

  getProductAnalytics: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalProducts: 586,
        salesRate: 82.5,
        averageRating: 4.8,
        // ... 其他商品数据
      });
    }
    return api.get('/analytics/jd/products', { params: { dateRange } });
  },

  getReviewAnalytics: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalReviews: 3586,
        positiveRate: 97.8,
        responseRate: 99.2,
        averageRating: 4.9,
        // ... 其他评价数据
      });
    }
    return api.get('/analytics/jd/reviews', { params: { dateRange } });
  },

  getReturnAnalytics: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalReturns: 248,
        returnRate: 2.8,
        processingTime: 1.2,
        refundAmount: 35826,
        // ... 其他退货数据
      });
    }
    return api.get('/analytics/jd/returns', { params: { dateRange } });
  },

  getPromotionAnalytics: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalInvestment: 335000,
        totalSales: 1850000,
        averageROI: 5.5,
        newCustomerRate: 42.5,
        // ... 其他促销数据
      });
    }
    return api.get('/analytics/jd/promotions', { params: { dateRange } });
  },

  getUserPortrait: (dateRange: string) => {
    if (process.env.NODE_ENV === 'development') {
      return mockApiCall({
        totalUsers: 186523,
        averageOrderValue: 3286,
        repurchaseRate: 42.5,
        plusMemberRate: 58.2,
        // ... 其他用户画像数据
      });
    }
    return api.get('/analytics/jd/user-portrait', { params: { dateRange } });
  }
};