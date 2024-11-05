import { supabase } from '../lib/supabase';
import { Platform } from '../types/platform';
import { jdApi } from './api';

interface SyncResult {
  success: boolean;
  message: string;
  data?: any;
}

export const syncService = {
  // 同步平台数据
  async syncPlatformData(platformId: string): Promise<SyncResult> {
    try {
      // 1. 获取平台信息
      const { data: platform, error: platformError } = await supabase
        .from('platforms')
        .select('*')
        .eq('id', platformId)
        .single();

      if (platformError) throw platformError;

      // 2. 更新同步状态为进行中
      await supabase
        .from('platforms')
        .update({ sync_status: 'syncing' })
        .eq('id', platformId);

      // 3. 根据平台类型获取数据
      const syncData = await this.fetchPlatformData(platform);

      // 4. 保存数据到 analytics 表
      const { error: analyticsError } = await supabase
        .from('analytics')
        .insert([
          {
            platform_id: platformId,
            type: 'full_sync',
            date_range: 'last_24h',
            data: syncData
          }
        ]);

      if (analyticsError) throw analyticsError;

      // 5. 更新同步状态和时间
      const { error: updateError } = await supabase
        .from('platforms')
        .update({
          last_sync: new Date().toISOString(),
          sync_status: 'completed'
        })
        .eq('id', platformId);

      if (updateError) throw updateError;

      return {
        success: true,
        message: '数据同步成功',
        data: syncData
      };
    } catch (error) {
      // 更新同步状态为失败
      await supabase
        .from('platforms')
        .update({
          sync_status: 'failed',
          last_sync: new Date().toISOString()
        })
        .eq('id', platformId);

      return {
        success: false,
        message: error instanceof Error ? error.message : '数据同步失败'
      };
    }
  },

  // 根据平台类型获取数据
  private async fetchPlatformData(platform: Platform) {
    switch (platform.type) {
      case 'jd':
        return this.syncJDData(platform);
      case 'tmall':
        return this.syncTmallData(platform);
      default:
        throw new Error('不支持的平台类型');
    }
  },

  // 同步京东数据
  private async syncJDData(platform: Platform) {
    // 这里实现京东API调用逻辑
    const dateRange = '30d';
    const [
      comparison,
      traffic,
      sales,
      products,
      reviews,
      returns,
      promotions,
      userPortrait
    ] = await Promise.all([
      jdApi.getComparison(dateRange),
      jdApi.getTrafficAnalytics(dateRange),
      jdApi.getSalesAnalytics(dateRange),
      jdApi.getProductAnalytics(dateRange),
      jdApi.getReviewAnalytics(dateRange),
      jdApi.getReturnAnalytics(dateRange),
      jdApi.getPromotionAnalytics(dateRange),
      jdApi.getUserPortrait(dateRange)
    ]);

    return {
      comparison,
      traffic,
      sales,
      products,
      reviews,
      returns,
      promotions,
      userPortrait,
      sync_time: new Date().toISOString()
    };
  },

  // 同步天猫数据
  private async syncTmallData(platform: Platform) {
    // 这里实现天猫API调用逻辑
    // 类似京东的实现...
    return {};
  }
};