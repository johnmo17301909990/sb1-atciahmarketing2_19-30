import React from 'react';
import { MetricCard } from '../../common/charts/MetricCard';
import { TrendChart } from '../../common/charts/TrendChart';
import { ComparisonChart } from '../../common/charts/ComparisonChart';
import { formatters } from '../../../utils/formatters';

interface Props {
  dateRange: string;
}

export function TmallSalesAnalysis({ dateRange }: Props) {
  const salesData = [
    { date: '1月1日', 销售额: 150000, 订单数: 680, 转化率: 4.8 },
    { date: '1月2日', 销售额: 165000, 订单数: 720, 转化率: 5.1 },
    { date: '1月3日', 销售额: 158000, 订单数: 700, 转化率: 4.9 },
    { date: '1月4日', 销售额: 172000, 订单数: 750, 转化率: 5.2 },
    { date: '1月5日', 销售额: 168000, 订单数: 730, 转化率: 5.0 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="总销售额"
          value={160000}
          change={15.8}
          formatter={formatters.currency}
          valueColor="text-blue-600"
        />
        <MetricCard
          title="总订单数"
          value={740}
          change={12.3}
          formatter={formatters.number}
          valueColor="text-green-600"
        />
        <MetricCard
          title="平均客单价"
          value={216}
          change={3.2}
          formatter={formatters.currency}
          valueColor="text-purple-600"
        />
        <MetricCard
          title="支付转化率"
          value={6.8}
          change={0.5}
          formatter={(value) => `${value}%`}
          valueColor="text-orange-600"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">销售趋势分析</h3>
        <TrendChart
          data={salesData}
          metrics={[
            { key: '销售额', name: '销售额', color: '#1890FF' },
            { key: '订单数', name: '订单数', color: '#52C41A' }
          ]}
          xAxisKey="date"
          height={400}
          tooltipFormatter={formatters.currency}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">同比环比分析</h3>
        <ComparisonChart
          data={salesData}
          metrics={[
            { key: '销售额', name: '销售额', color: '#1890FF' },
            { key: '转化率', name: '转化率', color: '#52C41A' }
          ]}
          xAxisKey="date"
          height={300}
          showComparison={true}
          comparisonRange={{
            start: '1月1日',
            end: '1月3日'
          }}
        />
      </div>
    </div>
  );
}