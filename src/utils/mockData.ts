// 生成模拟数据的工具函数
export function generateMockData() {
  // 生成随机数据的辅助函数
  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // 生成日期序列
  const generateDateSeries = (days: number) => {
    const dates = [];
    const today = new Date();
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // 生成趋势数据
  const generateTrendData = (days: number) => {
    return generateDateSeries(days).map(date => ({
      date,
      value: randomNumber(1000, 5000),
      growth: randomNumber(-10, 20)
    }));
  };

  // 生成分布数据
  const generateDistributionData = (categories: string[]) => {
    return categories.map(category => ({
      name: category,
      value: randomNumber(10, 100)
    }));
  };

  return {
    randomNumber,
    generateDateSeries,
    generateTrendData,
    generateDistributionData
  };
}