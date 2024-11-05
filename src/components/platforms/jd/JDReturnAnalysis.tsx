import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const returnTrendData = [
  { date: '1月1日', 退货量: 35, 退货率: 2.8 },
  { date: '1月2日', 退货量: 38, 退货率: 3.0 },
  { date: '1月3日', 退货量: 32, 退货率: 2.5 },
  { date: '1月4日', 退货量: 40, 退货率: 3.2 },
  { date: '1月5日', 退货量: 34, 退货率: 2.7 },
  { date: '1月6日', 退货量: 36, 退货率: 2.9 },
  { date: '1月7日', 退货量: 33, 退货率: 2.6 },
];

const returnReasonData = [
  { name: '尺码不合适', value: 32 },
  { name: '质量问题', value: 28 },
  { name: '与描述不符', value: 22 },
  { name: '款式不喜欢', value: 13 },
  { name: '其他原因', value: 5 },
];

const qualityIssueData = [
  { category: '材质问题', count: 52 },
  { category: '做工瑕疵', count: 45 },
  { category: '色差问题', count: 38 },
  { category: '配件损坏', count: 28 },
  { category: '包装破损', count: 20 },
];

const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

interface Props {
  dateRange: string;
}

export function JDReturnAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">退货总量</h4>
          <p className="text-3xl font-bold text-red-600">248</p>
          <p className="text-sm text-gray-500">较上月减少 12.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均退货率</h4>
          <p className="text-3xl font-bold text-green-600">2.8%</p>
          <p className="text-sm text-gray-500">较上月降低 0.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">退货处理时长</h4>
          <p className="text-3xl font-bold text-blue-600">1.2天</p>
          <p className="text-sm text-gray-500">较上月缩短 0.3天</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">退款金额</h4>
          <p className="text-3xl font-bold text-purple-600">¥35,826</p>
          <p className="text-sm text-gray-500">较上月减少 8.2%</p>
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
              <Line yAxisId="left" type="monotone" dataKey="退货量" stroke="#FF4D4F" />
              <Line yAxisId="right" type="monotone" dataKey="退货率" stroke="#52C41A" />
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
                <Bar dataKey="count" name="问题数量" fill="#FF4D4F" />
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
                <td className="px-6 py-4 whitespace-nowrap">42</td>
                <td className="px-6 py-4 whitespace-nowrap">5.2%</td>
                <td className="px-6 py-4 whitespace-nowrap">尺码偏大</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">需处理</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品B</td>
                <td className="px-6 py-4 whitespace-nowrap">35</td>
                <td className="px-6 py-4 whitespace-nowrap">4.2%</td>
                <td className="px-6 py-4 whitespace-nowrap">材质问题</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">处理中</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品C</td>
                <td className="px-6 py-4 whitespace-nowrap">28</td>
                <td className="px-6 py-4 whitespace-nowrap">3.5%</td>
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