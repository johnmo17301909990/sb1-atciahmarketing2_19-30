import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const liveStreamData = [
  { time: '10:00', 观看人数: 1500, 互动数: 680, 转化订单: 55 },
  { time: '10:30', 观看人数: 2200, 互动数: 920, 转化订单: 85 },
  { time: '11:00', 观看人数: 2800, 互动数: 1200, 转化订单: 105 },
  { time: '11:30', 观看人数: 3200, 互动数: 1500, 转化订单: 125 },
  { time: '12:00', 观看人数: 3500, 互动数: 1800, 转化订单: 140 },
];

const productPerformanceData = [
  { name: '商品A', 展示次数: 1500, 点击率: 8.5, 转化率: 3.2 },
  { name: '商品B', 展示次数: 1200, 点击率: 7.2, 转化率: 2.8 },
  { name: '商品C', 展示次数: 1000, 点击率: 6.8, 转化率: 2.5 },
  { name: '商品D', 展示次数: 800, 点击率: 6.2, 转化率: 2.3 },
  { name: '商品E', 展示次数: 600, 点击率: 5.8, 转化率: 2.0 },
];

interface Props {
  dateRange: string;
}

export function TmallLiveStreamAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">累计观看</h4>
          <p className="text-3xl font-bold text-blue-600">15,862</p>
          <p className="text-sm text-gray-500">较上场增长 32.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">互动率</h4>
          <p className="text-3xl font-bold text-green-600">58.5%</p>
          <p className="text-sm text-gray-500">较上场提升 8.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">转化率</h4>
          <p className="text-3xl font-bold text-purple-600">5.2%</p>
          <p className="text-sm text-gray-500">较上场提升 1.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">直播GMV</h4>
          <p className="text-3xl font-bold text-orange-600">¥58,962</p>
          <p className="text-sm text-gray-500">较上场增长 45.8%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">直播实时数据</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={liveStreamData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="观看人数" stroke="#8884d8" />
              <Line yAxisId="left" type="monotone" dataKey="互动数" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="转化订单" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">直播商品表现</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="展示次数" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="点击率" fill="#82ca9d" />
              <Bar yAxisId="right" dataKey="转化率" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">直播互动分析</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">点赞数</span>
              <span className="text-lg font-semibold">15,862</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">评论数</span>
              <span className="text-lg font-semibold">3,586</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">分享数</span>
              <span className="text-lg font-semibold">856</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">礼物数</span>
              <span className="text-lg font-semibold">2,586</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">观众画像分析</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">新粉丝占比</span>
              <span className="text-lg font-semibold">52.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">女性用户占比</span>
              <span className="text-lg font-semibold">72.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">25-35岁占比</span>
              <span className="text-lg font-semibold">58.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">一线城市占比</span>
              <span className="text-lg font-semibold">42.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}