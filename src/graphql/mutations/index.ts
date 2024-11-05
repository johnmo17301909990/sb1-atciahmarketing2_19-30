import { gql } from '@apollo/client';

// 数据同步
export const SYNC_PLATFORM_DATA = gql`
  mutation SyncPlatformData($platformId: ID!) {
    syncPlatformData(platformId: $platformId) {
      success
      message
      data
    }
  }
`;

// 取消同步
export const CANCEL_SYNC = gql`
  mutation CancelSync($syncId: ID!) {
    cancelSync(syncId: $syncId) {
      success
      message
    }
  }
`;

// 更新平台配置
export const UPDATE_PLATFORM_CONFIG = gql`
  mutation UpdatePlatformConfig($platformId: ID!, $config: PlatformConfigInput!) {
    updatePlatformConfig(platformId: $platformId, config: $config) {
      id
      config
    }
  }
`;