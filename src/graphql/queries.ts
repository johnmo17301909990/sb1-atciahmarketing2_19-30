import { gql } from '@apollo/client';

export const GET_JD_ANALYTICS = gql`
  query GetJDAnalytics($dateRange: String!) {
    jdAnalytics(dateRange: $dateRange) {
      salesData {
        date
        revenue
        orders
        conversion
      }
      comparisonData {
        selfOperated {
          revenue
          orders
          avgOrderValue
          conversion
        }
        marketplace {
          revenue
          orders
          avgOrderValue
          conversion
        }
      }
      categoryPerformance {
        category
        revenue
        orders
        growth
      }
    }
  }
`;

export const GET_JD_COMPARISON = gql`
  query GetJDComparison($dateRange: String!) {
    jdComparison(dateRange: $dateRange) {
      selfOperated {
        dailyMetrics {
          date
          revenue
          orders
          conversion
        }
        topCategories {
          name
          revenue
          orders
          growth
        }
      }
      marketplace {
        dailyMetrics {
          date
          revenue
          orders
          conversion
        }
        topCategories {
          name
          revenue
          orders
          growth
        }
      }
    }
  }
`;