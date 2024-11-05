import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const productPerformanceData = [
  { name: '商品A', 销量: 1500, 销售额: 35000, 转化率: 8.5 },
  { name: '商品B', 销量: 1200, 销售额: 28000, 转化率: 7.2 },
  { name: '商品C', 销量: 1000, 销售额: 25000, 转化率: 6.8 },
  { name: '商品D', 销量: 800, 销售额: 20000, 转化率: 6.2 },
  { name: '商品E', 销量: 600, 销售额: 15000, 转化率: 5.8 },
];

const categoryData = [
  { name: '3C数码', value: 35 },
  { name: '家电', value: 25 },
  { name: '服饰', value: 20 },
  { name: '美妆', value: 15 },
  { name: '食品', value: 5 },
];

const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

interface Props {
  dateRange: string;
}

export function JDProductAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商品总数</h4>
          <p className="text-3xl font-bold text-red-600">586</p>
          <p className="text-sm text-gray-500">在架商品数量</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商品动销率</h4>
          <p className="text-3xl font-bold text-green-600">82.5%</p>
          <p className="text-sm text-gray-500">较上月提升 3.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均商品评分</h4>
          <p className="text-3xl font-bold text-blue-600">4.8</p>
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
              <Bar yAxisId="left" dataKey="销量" fill="#FF4D4F" />
              <Bar yAxisId="right" dataKey="转化率" fill="#52C41A" />
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
              <span className="text-lg font-semibold">15.2%</span>
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

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">商品库存预警</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">当前库存</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">安全库存</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预计售罄时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品A</td>
                <td className="px-6 py-4 whitespace-nowrap">15</td>
                <td className="px-6 py-4 whitespace-nowrap">50</td>
                <td className="px-6 py-4 whitespace-nowrap">3天</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    库存紧张
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品B</td>
                <td className="px-6 py-4 whitespace-nowrap">85</td>
                <td className="px-6 py-4 whitespace-nowrap">100</td>
                <td className="px-6 py-4 whitespace-nowrap">7天</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    需补货
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品C</td>
                <td className="px-6 py-4 whitespace-nowrap">200</td>
                <td className="px-6 py-4 whitespace-nowrap">150</td>
                <td className="px-6 py-4 whitespace-nowrap">15天</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    库存充足
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}