import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const returnTrendData = [
  { date: '1月1日', 退货量: 25, 退货率: 2.5 },
  { date: '1月2日', 退货量: 28, 退货率: 2.8 },
  { date: '1月3日', 退货量: 22, 退货率: 2.2 },
  { date: '1月4日', 退货量: 30, 退货率: 3.0 },
  { date: '1月5日', 退货量: 24, 退货率: 2.4 },
  { date: '1月6日', 退货量: 26, 退货率: 2.6 },
  { date: '1月7日', 退货量: 23, 退货率: 2.3 },
];

const returnReasonData = [
  { name: '尺码不合适', value: 35 },
  { name: '质量问题', value: 25 },
  { name: '与描述不符', value: 20 },
  { name: '款式不喜欢', value: 15 },
  { name: '其他原因', value: 5 },
];

const qualityIssueData = [
  { category: '材质问题', count: 45 },
  { category: '做工瑕疵', count: 38 },
  { category: '色差问题', count: 32 },
  { category: '配件损坏', count: 25 },
  { category: '包装破损', count: 18 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

interface Props {
  dateRange: string;
}

export function TmallReturnAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">退货总量</h4>
          <p className="text-3xl font-bold text-blue-600">178</p>
          <p className="text-sm text-gray-500">较上月减少 8.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均退货率</h4>
          <p className="text-3xl font-bold text-green-600">2.5%</p>
          <p className="text-sm text-gray-500">较上月降低 0.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">退货处理时长</h4>
          <p className="text-3xl font-bold text-purple-600">1.8天</p>
          <p className="text-sm text-gray-500">较上月缩短 0.2天</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">退款金额</h4>
          <p className="text-3xl font-bold text-orange-600">¥25,836</p>
          <p className="text-sm text-gray-500">较上月减少 5.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">退货趋势分析</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={returnTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="退货量" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="退货率" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">退货原因分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={returnReasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {returnReasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">质量问题分类</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qualityIssueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="问题数量" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">问题商品分析</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">退货量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">退货率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">主要原因</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品A</td>
                <td className="px-6 py-4 whitespace-nowrap">32</td>
                <td className="px-6 py-4 whitespace-nowrap">4.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">尺码偏大</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">需处理</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品B</td>
                <td className="px-6 py-4 whitespace-nowrap">28</td>
                <td className="px-6 py-4 whitespace-nowrap">3.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">材质问题</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">处理中</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品C</td>
                <td className="px-6 py-4 whitespace-nowrap">25</td>
                <td className="px-6 py-4 whitespace-nowrap">3.2%</td>
                <td className="px-6 py-4 whitespace-nowrap">色差问题</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">已解决</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}