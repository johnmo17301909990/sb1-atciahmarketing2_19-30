import { gql } from '@apollo/client';

export const GET_TMALL_ANALYTICS = gql`
  query GetTmallAnalytics($platformId: ID!, $type: String!, $dateRange: String!) {
    analytics(platformId: $platformId, type: $type, dateRange: $dateRange) {
      id
      platformId
      type
      dateRange
      data
      createdAt
      updatedAt
    }
  }
`;

export const GET_TMALL_REALTIME = gql`
  query GetTmallRealtime($platformId: ID!) {
    realtimeData(platformId: $platformId) {
      id
      platformId
      data
      timestamp
    }
  }
`;