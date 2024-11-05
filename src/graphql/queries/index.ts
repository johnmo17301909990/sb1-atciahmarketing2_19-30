import { gql } from '@apollo/client';

// 平台通用查询片段
export const PLATFORM_ANALYTICS_FIELDS = gql`
  fragment PlatformAnalyticsFields on PlatformAnalytics {
    id
    platformId
    type
    dateRange
    data
    createdAt
    updatedAt
  }
`;

// 实时数据查询片段
export const REALTIME_DATA_FIELDS = gql`
  fragment RealtimeDataFields on RealtimeData {
    id
    platformId
    currentOnline
    onlineGrowth
    todayRevenue
    revenueGrowth
    todayOrders
    ordersGrowth
    timeSeriesData {
      time
      onlineUsers
      revenue
      orders
    }
    alerts {
      type
      message
    }
  }
`;

// 获取平台分析数据
export const GET_PLATFORM_ANALYTICS = gql`
  query GetPlatformAnalytics($platformId: ID!, $type: String!, $dateRange: String!) {
    analytics(platformId: $platformId, type: $type, dateRange: $dateRange) {
      ...PlatformAnalyticsFields
    }
  }
  ${PLATFORM_ANALYTICS_FIELDS}
`;

// 获取实时数据
export const GET_REALTIME_DATA = gql`
  query GetRealtimeData($platformId: ID!) {
    realtimeData(platformId: $platformId) {
      ...RealtimeDataFields
    }
  }
  ${REALTIME_DATA_FIELDS}
`;