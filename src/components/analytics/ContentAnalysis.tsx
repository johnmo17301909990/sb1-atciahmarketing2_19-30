import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const contentPerformanceData = [
  { title: '618大促攻略', views: 15000, engagement: 85, conversion: 12 },
  { title: '新品上市预告', views: 12000, engagement: 92, conversion: 15 },
  { title: '用户评测视频', views: 9800, engagement: 78, conversion: 8 },
  { title: '品牌故事', views: 8500, engagement: 95, conversion: 5 },
  { title: '使用教程', views: 7200, engagement: 88, conversion: 10 },
];

const contentTrendData = [
  { date: '1月', articles: 25, videos: 15, lives: 5 },
  { date: '2月', articles: 28, videos: 18, lives: 6 },
  { date: '3月', articles: 32, videos: 22, lives: 8 },
  { date: '4月', articles: 30, videos: 25, lives: 10 },
  { date: '5月', articles: 35, videos: 28, lives: 12 },
  { date: '6月', articles: 40, videos: 32, lives: 15 },
];

interface Props {
  dateRange: string;
}

export function ContentAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">内容效果排行</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={contentPerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="title" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" name="浏览量" fill="#8884d8" />
              <Bar dataKey="engagement" name="互动率" fill="#82ca9d" />
              <Bar dataKey="conversion" name="转化率" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">内容发布趋势</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={contentTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="articles" name="图文" stroke="#8884d8" />
              <Line type="monotone" dataKey="videos" name="视频" stroke="#82ca9d" />
              <Line type="monotone" dataKey="lives" name="直播" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均互动率</h4>
          <p className="text-3xl font-bold text-blue-600">87.6%</p>
          <p className="text-sm text-gray-500">较上月提升 5.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">内容转化率</h4>
          <p className="text-3xl font-bold text-green-600">10.2%</p>
          <p className="text-sm text-gray-500">较上月提升 1.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">内容投放ROI</h4>
          <p className="text-3xl font-bold text-purple-600">3.5</p>
          <p className="text-sm text-gray-500">较上月提升 0.3</p>
        </div>
      </div>
    </div>
  );
}