import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const productPerformanceData = [
  { name: '商品A', 销量: 1200, 销售额: 25000, 转化率: 8.5 },
  { name: '商品B', 销量: 980, 销售额: 19600, 转化率: 7.2 },
  { name: '商品C', 销量: 850, 销售额: 17000, 转化率: 6.8 },
  { name: '商品D', 销量: 750, 销售额: 15000, 转化率: 6.2 },
  { name: '商品E', 销量: 680, 销售额: 13600, 转化率: 5.8 },
];

const categoryData = [
  { name: '类目A', value: 4000 },
  { name: '类目B', value: 3000 },
  { name: '类目C', value: 2000 },
  { name: '类目D', value: 1500 },
  { name: '类目E', value: 1000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface Props {
  dateRange: string;
}

export function TmallProductAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商品总数</h4>
          <p className="text-3xl font-bold text-blue-600">386</p>
          <p className="text-sm text-gray-500">在架商品数量</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商品动销率</h4>
          <p className="text-3xl font-bold text-green-600">76.8%</p>
          <p className="text-sm text-gray-500">较上月提升 2.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均商品评分</h4>
          <p className="text-3xl font-bold text-purple-600">4.8</p>
          <p className="text-sm text-gray-500">较上月提升 0.1</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">商品销售排行</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="销量" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="转化率" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">类目销售分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">商品指标</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">商品上新率</span>
              <span className="text-lg font-semibold">12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">商品好评率</span>
              <span className="text-lg font-semibold">96.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">商品复购率</span>
              <span className="text-lg font-semibold">35.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">商品库存周转率</span>
              <span className="text-lg font-semibold">4.2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}