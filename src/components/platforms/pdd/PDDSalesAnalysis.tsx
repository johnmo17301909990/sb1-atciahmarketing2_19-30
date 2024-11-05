import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricCard } from '../../common/charts/MetricCard';
import { TrendChart } from '../../common/charts/TrendChart';
import { FilterPanel } from '../../common/FilterPanel';
import { ExportButton } from '../../common/ExportButton';
import { useFilters } from '../../../hooks/useFilters';
import { formatters } from '../../../utils/formatters';

interface Props {
  dateRange: string;
}

export function PDDSalesAnalysis({ dateRange }: Props) {
  const { selectedFilters, handleFilterChange } = useFilters();

  const filters = [
    {
      id: 'category',
      label: '商品类目',
      options: [
        { label: '全部类目', value: 'all' },
        { label: '百货', value: 'general' },
        { label: '服饰', value: 'clothing' },
        { label: '食品', value: 'food' },
        { label: '美妆', value: 'beauty' },
      ],
    },
    {
      id: 'priceRange',
      label: '价格区间',
      options: [
        { label: '全部价格', value: 'all' },
        { label: '0-20元', value: '0-20' },
        { label: '20-50元', value: '20-50' },
        { label: '50元以上', value: '50+' },
      ],
    },
  ];

  const salesData = [
    { date: '1月1日', 销售额: 28000, 订单数: 1580, 客单价: 17.7 },
    { date: '1月2日', 销售额: 32000, 订单数: 1780, 客单价: 18.0 },
    { date: '1月3日', 销售额: 30000, 订单数: 1650, 客单价: 18.2 },
    { date: '1月4日', 销售额: 35000, 订单数: 1920, 客单价: 18.2 },
    { date: '1月5日', 销售额: 38000, 订单数: 2100, 客单价: 18.1 },
  ];

  const exportData = {
    title: '拼多多销售分析数据',
    columns: {
      date: '日期',
      sales: '销售额',
      orders: '订单数',
      avgOrderValue: '客单价'
    },
    rows: salesData
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">销售分析</h3>
        <ExportButton
          data={exportData}
          options={{
            fileName: `拼多多销售分析_${dateRange}`,
            title: '拼多多销售分析报表'
          }}
        />
      </div>

      <FilterPanel 
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="总销售额"
          value={163000}
          change={25.8}
          formatter={formatters.currency}
          valueColor="text-orange-600"
        />
        <MetricCard
          title="总订单数"
          value={9030}
          change={22.3}
          formatter={formatters.number}
          valueColor="text-green-600"
        />
        <MetricCard
          title="平均客单价"
          value={18.1}
          change={2.8}
          formatter={formatters.currency}
          valueColor="text-purple-600"
        />
        <MetricCard
          title="支付转化率"
          value={8.5}
          change={1.2}
          formatter={(value) => `${value}%`}
          valueColor="text-blue-600"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">销售趋势分析</h3>
        <TrendChart
          data={salesData}
          metrics={[
            { key: '销售额', name: '销售额', color: '#F97316' },
            { key: '订单数', name: '订单数', color: '#22C55E' }
          ]}
          xAxisKey="date"
          height={400}
          tooltipFormatter={formatters.currency}
        />
      </div>
    </div>
  );
}