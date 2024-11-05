import api from './api';

export const analyticsService = {
  // 流量分析
  getTrafficAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/traffic`, { params: { dateRange } });
  },

  // 销售分析
  getSalesAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/sales`, { params: { dateRange } });
  },

  // 商品分析
  getProductAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/products`, { params: { dateRange } });
  },

  // 用户画像分析
  getUserPortrait: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/user-portrait`, { params: { dateRange } });
  },

  // 评价分析
  getReviewAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/reviews`, { params: { dateRange } });
  },

  // 退货分析
  getReturnAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/returns`, { params: { dateRange } });
  },

  // 促销分析
  getPromotionAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/promotions`, { params: { dateRange } });
  },

  // 竞品分析
  getCompetitorAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/competitors`, { params: { dateRange } });
  },

  // ROI分析
  getROIAnalytics: (platformId: string, dateRange: string) => {
    return api.get(`/analytics/${platformId}/roi`, { params: { dateRange } });
  }
};