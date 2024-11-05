import { gql } from '@apollo/client';

export const SYNC_PLATFORM_DATA = gql`
  mutation SyncPlatformData($platformId: ID!) {
    syncPlatformData(platformId: $platformId) {
      success
      message
      data
    }
  }
`;

export const CANCEL_SYNC = gql`
  mutation CancelSync($syncId: ID!) {
    cancelSync(syncId: $syncId) {
      success
      message
    }
  }
`;

export const UPDATE_PLATFORM_CONFIG = gql`
  mutation UpdatePlatformConfig($platformId: ID!, $config: PlatformConfigInput!) {
    updatePlatformConfig(platformId: $platformId, config: $config) {
      id
      config
    }
  }
`;