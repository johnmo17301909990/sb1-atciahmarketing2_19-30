import { faker } from '@faker-js/faker';

export function generateMockData(days: number, scale: 'small' | 'medium' | 'large') {
  const scaleFactor = scale === 'small' ? 1 : scale === 'medium' ? 10 : 100;
  
  return {
    tmall: generateTmallData(days, scaleFactor),
    jd: generateJDData(days, scaleFactor)
  };
}

function generateTmallData(days: number, scaleFactor: number) {
  const data = {
    traffic: Array.from({ length: days }, (_, i) => ({
      date: faker.date.recent(days - i).toISOString().split('T')[0],
      visits: faker.number.int({ min: 1000, max: 5000 }) * scaleFactor,
      uniqueVisitors: faker.number.int({ min: 800, max: 4000 }) * scaleFactor,
      bounceRate: faker.number.float({ min: 20, max: 40, precision: 0.1 })
    })),
    sales: Array.from({ length: days }, (_, i) => ({
      date: faker.date.recent(days - i).toISOString().split('T')[0],
      revenue: faker.number.int({ min: 10000, max: 50000 }) * scaleFactor,
      orders: faker.number.int({ min: 100, max: 500 }) * scaleFactor,
      averageOrderValue: faker.number.float({ min: 100, max: 300, precision: 0.01 })
    }))
  };

  return data;
}

function generateJDData(days: number, scaleFactor: number) {
  const data = {
    traffic: Array.from({ length: days }, (_, i) => ({
      date: faker.date.recent(days - i).toISOString().split('T')[0],
      visits: faker.number.int({ min: 1200, max: 6000 }) * scaleFactor,
      uniqueVisitors: faker.number.int({ min: 1000, max: 5000 }) * scaleFactor,
      bounceRate: faker.number.float({ min: 18, max: 35, precision: 0.1 })
    })),
    sales: Array.from({ length: days }, (_, i) => ({
      date: faker.date.recent(days - i).toISOString().split('T')[0],
      revenue: faker.number.int({ min: 12000, max: 60000 }) * scaleFactor,
      orders: faker.number.int({ min: 120, max: 600 }) * scaleFactor,
      averageOrderValue: faker.number.float({ min: 120, max: 350, precision: 0.01 })
    }))
  };

  return data;
}