import api from './api';
import { Platform } from '../types/platform';

export const platformService = {
  // 获取平台列表
  getPlatforms: () => {
    return api.get<Platform[]>('/platforms');
  },

  // 获取平台详情
  getPlatformById: (id: string) => {
    return api.get<Platform>(`/platforms/${id}`);
  },

  // 获取平台数据概览
  getPlatformOverview: (id: string, dateRange: string) => {
    return api.get(`/platforms/${id}/overview`, { params: { dateRange } });
  },

  // 获取平台实时数据
  getPlatformRealtime: (id: string) => {
    return api.get(`/platforms/${id}/realtime`);
  }
};