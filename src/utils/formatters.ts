export const formatters = {
  number: (value: number | null | undefined): string => {
    if (typeof value !== 'number' || isNaN(value)) return '0';
    return new Intl.NumberFormat('zh-CN').format(value);
  },

  currency: (value: number | null | undefined): string => {
    if (typeof value !== 'number' || isNaN(value)) return '¥0';
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },

  percentage: (value: number | null | undefined): string => {
    if (typeof value !== 'number' || isNaN(value)) return '0%';
    return new Intl.NumberFormat('zh-CN', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  },

  decimal: (value: number | null | undefined, precision: number = 2): string => {
    if (typeof value !== 'number' || isNaN(value)) return '0';
    return value.toFixed(precision);
  }
};