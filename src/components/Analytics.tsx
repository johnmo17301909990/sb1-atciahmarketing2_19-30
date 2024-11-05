import React from 'react';
import { TmallAnalytics } from './platforms/tmall/TmallAnalytics';
import { JDAnalytics } from './platforms/jd/JDAnalytics';
import { PDDAnalytics } from './platforms/pdd/PDDAnalytics';

export function Analytics() {
  const [platform, setPlatform] = React.useState('tmall');
  const [dateRange, setDateRange] = React.useState('30d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold">数据分析</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option value="tmall">天猫</option>
            <option value="jd">京东</option>
            <option value="pdd">拼多多</option>
          </select>
          
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
            <option value="1y">最近一年</option>
          </select>
        </div>
      </div>

      {platform === 'tmall' && <TmallAnalytics dateRange={dateRange} />}
      {platform === 'jd' && <JDAnalytics dateRange={dateRange} />}
      {platform === 'pdd' && <PDDAnalytics dateRange={dateRange} />}
    </div>
  );
}