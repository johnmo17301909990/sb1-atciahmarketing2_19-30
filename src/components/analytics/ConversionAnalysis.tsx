import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sankey, Layer } from 'recharts';

const conversionTrendData = [
  { date: '1月1日', 浏览量: 5000, 加购率: 35, 下单率: 15, 支付率: 12 },
  { date: '1月2日', 浏览量: 4800, 加购率: 38, 下单率: 18, 支付率: 15 },
  { date: '1月3日', 浏览量: 5200, 加购率: 40, 下单率: 20, 支付率: 16 },
  { date: '1月4日', 浏览量: 5500, 加购率: 42, 下单率: 22, 支付率: 18 },
  { date: '1月5日', 浏览量: 6000, 加购率: 45, 下单率: 25, 支付率: 20 },
  { date: '1月6日', 浏览量: 6200, 加购率: 43, 下单率: 23, 支付率: 19 },
  { date: '1月7日', 浏览量: 6500, 加购率: 44, 下单率: 24, 支付率: 20 },
];

interface Props {
  dateRange: string;
}

export function ConversionAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">转化漏斗分析</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={conversionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="浏览量" name="浏览量" stroke="#8884d8" fill="#8884d8" />
              <Area yAxisId="right" type="monotone" dataKey="加购率" name="加购率(%)" stroke="#82ca9d" fill="#82ca9d" />
              <Area yAxisId="right" type="monotone" dataKey="下单率" name="下单率(%)" stroke="#ffc658" fill="#ffc658" />
              <Area yAxisId="right" type="monotone" dataKey="支付率" name="支付率(%)" stroke="#ff8042" fill="#ff8042" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">访问-加购转化率</h4>
          <p className="text-3xl font-bold text-blue-600">42.5%</p>
          <p className="text-sm text-gray-500">较上月提升 2.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">加购-下单转化率</h4>
          <p className="text-3xl font-bold text-green-600">55.3%</p>
          <p className="text-sm text-gray-500">较上月提升 3.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">下单-支付转化率</h4>
          <p className="text-3xl font-bold text-purple-600">82.8%</p>
          <p className="text-sm text-gray-500">较上月提升 1.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">整体转化率</h4>
          <p className="text-3xl font-bold text-orange-600">19.4%</p>
          <p className="text-sm text-gray-500">较上月提升 1.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">转化趋势分析</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="加购率" name="加购率(%)" stroke="#8884d8" />
              <Line type="monotone" dataKey="下单率" name="下单率(%)" stroke="#82ca9d" />
              <Line type="monotone" dataKey="支付率" name="支付率(%)" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}