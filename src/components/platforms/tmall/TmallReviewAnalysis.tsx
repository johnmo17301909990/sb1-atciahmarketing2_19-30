import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const reviewTrendData = [
  { date: '1月1日', 评价数: 150, 好评率: 98, 差评率: 2 },
  { date: '1月2日', 评价数: 180, 好评率: 97, 差评率: 3 },
  { date: '1月3日', 评价数: 160, 好评率: 96, 差评率: 4 },
  { date: '1月4日', 评价数: 200, 好评率: 98, 差评率: 2 },
  { date: '1月5日', 评价数: 220, 好评率: 97, 差评率: 3 },
];

const sentimentData = [
  { name: '非常满意', value: 68 },
  { name: '满意', value: 22 },
  { name: '一般', value: 7 },
  { name: '不满意', value: 2 },
  { name: '非常不满意', value: 1 },
];

const COLORS = ['#52C41A', '#95DE64', '#FFD666', '#FF7A45', '#FF4D4F'];

const keywordData = [
  { keyword: '质量好', 频次: 286, 情感: 'positive' },
  { keyword: '物流快', 频次: 245, 情感: 'positive' },
  { keyword: '价格实惠', 频次: 198, 情感: 'positive' },
  { keyword: '服务态度好', 频次: 176, 情感: 'positive' },
  { keyword: '包装完好', 频次: 156, 情感: 'positive' },
];

interface Props {
  dateRange: string;
}

export function TmallReviewAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">总评价数</h4>
          <p className="text-3xl font-bold text-blue-600">3,586</p>
          <p className="text-sm text-gray-500">较上月增长 18.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">好评率</h4>
          <p className="text-3xl font-bold text-green-600">97.8%</p>
          <p className="text-sm text-gray-500">较上月提升 0.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">评价回复率</h4>
          <p className="text-3xl font-bold text-purple-600">99.2%</p>
          <p className="text-sm text-gray-500">较上月提升 1.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均评分</h4>
          <p className="text-3xl font-bold text-orange-600">4.9</p>
          <p className="text-sm text-gray-500">较上月提升 0.1</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">评价趋势分析</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reviewTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="评价数" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="好评率" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="差评率" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">评价情感分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">热门评价关键词</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={keywordData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="keyword" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="频次" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">评价分类分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <h4 className="font-medium text-gray-600">商品相关</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">商品质量</span>
                <span className="text-lg font-semibold">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">性价比</span>
                <span className="text-lg font-semibold">96.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">商品描述</span>
                <span className="text-lg font-semibold">97.8%</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-medium text-gray-600">物流相关</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">配送速度</span>
                <span className="text-lg font-semibold">99.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">包装完整</span>
                <span className="text-lg font-semibold">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">快递服务</span>
                <span className="text-lg font-semibold">97.5%</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-medium text-gray-600">服务相关</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">客服态度</span>
                <span className="text-lg font-semibold">98.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">售后处理</span>
                <span className="text-lg font-semibold">96.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">问题解决</span>
                <span className="text-lg font-semibold">95.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}