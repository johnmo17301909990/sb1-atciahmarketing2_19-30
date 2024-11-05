export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const formatCurrency = (value: number): string => {
  return `¥${value.toLocaleString()}`;
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};