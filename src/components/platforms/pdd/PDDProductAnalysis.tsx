import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FilterPanel } from '../../common/FilterPanel';
import { ExportButton } from '../../common/ExportButton';
import { useFilters } from '../../../hooks/useFilters';
import { formatters } from '../../../utils/formatters';

interface Props {
  dateRange: string;
}

export function PDDProductAnalysis({ dateRange }: Props) {
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
      id: 'status',
      label: '商品状态',
      options: [
        { label: '全部状态', value: 'all' },
        { label: '在售', value: 'active' },
        { label: '售罄', value: 'soldout' },
        { label: '下架', value: 'inactive' },
      ],
    },
  ];

  const productData = [
    { name: '商品A', 销量: 2500, 销售额: 45000, 转化率: 12.5 },
    { name: '商品B', 销量: 2100, 销售额: 38000, 转化率: 11.2 },
    { name: '商品C', 销量: 1800, 销售额: 32000, 转化率: 10.8 },
    { name: '商品D', 销量: 1500, 销售额: 27000, 转化率: 9.2 },
    { name: '商品E', 销量: 1200, 销售额: 21000, 转化率: 8.8 },
  ];

  const exportData = {
    title: '拼多多商品分析数据',
    columns: {
      name: '商品名称',
      sales: '销量',
      revenue: '销售额',
      conversion: '转化率'
    },
    rows: productData
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">商品分析</h3>
        <ExportButton
          data={exportData}
          options={{
            fileName: `拼多多商品分析_${dateRange}`,
            title: '拼多多商品分析报表'
          }}
        />
      </div>

      <FilterPanel 
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商品总数</h4>
          <p className="text-3xl font-bold text-orange-600">856</p>
          <p className="text-sm text-gray-500">在架商品数量</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商品动销率</h4>
          <p className="text-3xl font-bold text-green-600">85.2%</p>
          <p className="text-sm text-gray-500">较上月提升 3.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均商品评分</h4>
          <p className="text-3xl font-bold text-blue-600">4.6</p>
          <p className="text-sm text-gray-500">较上月提升 0.2</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">商品销售排行</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="销量" fill="#F97316" />
              <Bar yAxisId="right" dataKey="转化率" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}