import { gql } from '@apollo/client';

export const GET_JD_ANALYTICS = gql`
  query GetJDAnalytics($platformId: ID!, $type: String!, $dateRange: String!) {
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

export const GET_JD_REALTIME = gql`
  query GetJDRealtime($platformId: ID!) {
    realtimeData(platformId: $platformId) {
      id
      platformId
      data
      timestamp
    }
  }
`;