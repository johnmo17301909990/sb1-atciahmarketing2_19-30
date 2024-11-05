import { JDData, TransformedJDData } from '../types/jd';

export function transformJDData(data: JDData): TransformedJDData {
  return {
    comparison: transformJDComparison(data.comparison),
    traffic: transformJDTraffic(data.traffic),
    sales: transformJDSales(data.sales),
    products: transformJDProducts(data.products),
    reviews: transformJDReviews(data.reviews),
    returns: transformJDReturns(data.returns),
    promotions: transformJDPromotions(data.promotions),
    userPortrait: transformJDUserPortrait(data.userPortrait)
  };
}

function transformJDComparison(data: any) {
  return {
    selfOperated: {
      gmvShare: Number(data.selfOperated.gmvShare),
      conversionRate: Number(data.selfOperated.conversionRate),
      averageOrderValue: Number(data.selfOperated.averageOrderValue),
      repurchaseRate: Number(data.selfOperated.repurchaseRate)
    },
    marketplace: {
      gmvShare: Number(data.marketplace.gmvShare),
      conversionRate: Number(data.marketplace.conversionRate),
      averageOrderValue: Number(data.marketplace.averageOrderValue),
      repurchaseRate: Number(data.marketplace.repurchaseRate)
    },
    trends: data.trends.map((trend: any) => ({
      date: new Date(trend.date),
      selfOperatedShare: Number(trend.selfOperatedShare),
      marketplaceShare: Number(trend.marketplaceShare)
    }))
  };
}

function transformJDTraffic(data: any) {
  return {
    overview: {
      totalVisits: Number(data.totalVisits),
      uniqueVisitors: Number(data.uniqueVisitors),
      bounceRate: Number(data.bounceRate),
      averageTime: Number(data.averageTime)
    },
    sources: data.sources.map((source: any) => ({
      name: source.name,
      visits: Number(source.visits),
      share: Number(source.share),
      conversion: Number(source.conversion)
    })),
    trends: data.trends.map((trend: any) => ({
      date: new Date(trend.date),
      visits: Number(trend.visits),
      visitors: Number(trend.visitors)
    }))
  };
}

// ... 其他转换函数的实现 ...