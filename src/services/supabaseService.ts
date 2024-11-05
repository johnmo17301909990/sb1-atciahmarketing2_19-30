import { supabase } from '../lib/supabase';
import { Platform, AnalyticsData } from '../types/platform';

export const supabaseService = {
  // 平台管理
  async getPlatforms() {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Platform[];
  },

  async getPlatformById(id: string) {
    const { data, error } = await supabase
      .from('platforms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Platform;
  },

  // 数据分析
  async getAnalytics(platformId: string, type: string, dateRange: string) {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('platform_id', platformId)
      .eq('type', type)
      .eq('date_range', dateRange)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data as AnalyticsData;
  },

  async saveAnalytics(platformId: string, type: string, dateRange: string, data: any) {
    const { error } = await supabase
      .from('analytics')
      .insert([
        {
          platform_id: platformId,
          type,
          date_range: dateRange,
          data
        }
      ]);

    if (error) throw error;
  },

  // 实时数据
  async getRealTimeData(platformId: string) {
    const { data, error } = await supabase
      .from('realtime_data')
      .select('*')
      .eq('platform_id', platformId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  },

  // 数据同步状态
  async updateSyncStatus(platformId: string, status: string) {
    const { error } = await supabase
      .from('platforms')
      .update({ last_sync: new Date(), sync_status: status })
      .eq('id', platformId);

    if (error) throw error;
  }
};