import { TmallData, TransformedTmallData } from '../types/tmall';

export function transformTmallData(data: TmallData): TransformedTmallData {
  return {
    traffic: transformTmallTraffic(data.traffic),
    sales: transformTmallSales(data.sales),
    products: transformTmallProducts(data.products),
    reviews: transformTmallReviews(data.reviews),
    returns: transformTmallReturns(data.returns),
    promotions: transformTmallPromotions(data.promotions),
    userPortrait: transformTmallUserPortrait(data.userPortrait)
  };
}

function transformTmallTraffic(data: any) {
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