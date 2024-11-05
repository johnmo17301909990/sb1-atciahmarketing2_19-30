import { format, subDays, startOfDay, endOfDay } from 'date-fns';

export const getDateRange = (range: string) => {
  const now = new Date();
  const days = parseInt(range);
  
  return {
    start: startOfDay(subDays(now, days)),
    end: endOfDay(now)
  };
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};