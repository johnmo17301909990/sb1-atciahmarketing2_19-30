import { AnalyticsData, TransformedAnalytics } from '../types/analytics';

export function transformAnalyticsData(data: AnalyticsData): TransformedAnalytics {
  return {
    overview: transformOverview(data.overview),
    trends: transformTrends(data.trends),
    comparisons: transformComparisons(data.comparisons),
    details: transformDetails(data.details)
  };
}

function transformOverview(overview: any) {
  return {
    totalSales: Number(overview.totalSales),
    totalOrders: Number(overview.totalOrders),
    averageOrderValue: Number(overview.averageOrderValue),
    conversionRate: Number(overview.conversionRate),
    growth: {
      sales: Number(overview.salesGrowth),
      orders: Number(overview.ordersGrowth),
      aov: Number(overview.aovGrowth)
    }
  };
}

function transformTrends(trends: any[]) {
  return trends.map(trend => ({
    date: new Date(trend.date),
    value: Number(trend.value),
    previousValue: Number(trend.previousValue),
    growth: Number(trend.growth)
  }));
}

function transformComparisons(comparisons: any) {
  return {
    platforms: comparisons.platforms.map((platform: any) => ({
      name: platform.name,
      value: Number(platform.value),
      share: Number(platform.share)
    })),
    categories: comparisons.categories.map((category: any) => ({
      name: category.name,
      value: Number(category.value),
      growth: Number(category.growth)
    }))
  };
}

function transformDetails(details: any) {
  return {
    products: details.products.map((product: any) => ({
      id: product.id,
      name: product.name,
      sales: Number(product.sales),
      orders: Number(product.orders),
      price: Number(product.price)
    })),
    channels: details.channels.map((channel: any) => ({
      id: channel.id,
      name: channel.name,
      traffic: Number(channel.traffic),
      conversion: Number(channel.conversion)
    }))
  };
}