import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const channelPerformanceData = [
  { channel: '微信小程序', 访问量: 15000, 转化率: 4.5, 客单价: 258 },
  { channel: '天猫旗舰店', 访问量: 12000, 转化率: 3.8, 客单价: 320 },
  { channel: '抖音小店', 访问量: 9800, 转化率: 3.2, 客单价: 180 },
  { channel: '京东旗舰店', 访问量: 8500, 转化率: 3.5, 客单价: 290 },
  { channel: '快手小店', 访问量: 6200, 转化率: 2.8, 客单价: 150 },
];

const channelTrendData = [
  { month: '1月', 微信小程序: 12000, 天猫: 10000, 抖音: 8000, 京东: 7000 },
  { month: '2月', 微信小程序: 13000, 天猫: 11000, 抖音: 8500, 京东: 7500 },
  { month: '3月', 微信小程序: 14000, 天猫: 11500, 抖音: 9000, 京东: 8000 },
  { month: '4月', 微信小程序: 15000, 天猫: 12000, 抖音: 9800, 京东: 8500 },
  { month: '5月', 微信小程序: 16000, 天猫: 12500, 抖音: 10500, 京东: 9000 },
  { month: '6月', 微信小程序: 17000, 天猫: 13000, 抖音: 11000, 京东: 9500 },
];

interface Props {
  dateRange: string;
}

export function ChannelAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">渠道业绩对比</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="访问量" name="访问量" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="转化率" name="转化率(%)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">渠道趋势分析</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={channelTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="微信小程序" stroke="#8884d8" />
              <Line type="monotone" dataKey="天猫" stroke="#82ca9d" />
              <Line type="monotone" dataKey="抖音" stroke="#ffc658" />
              <Line type="monotone" dataKey="京东" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {channelPerformanceData.slice(0, 4).map((channel) => (
          <div key={channel.channel} className="bg-white rounded-lg shadow p-4">
            <h4 className="font-semibold text-lg mb-2">{channel.channel}</h4>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">访问量</p>
                <p className="text-xl font-bold text-blue-600">{channel.访问量.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">转化率</p>
                <p className="text-xl font-bold text-green-600">{channel.转化率}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">客单价</p>
                <p className="text-xl font-bold text-purple-600">¥{channel.客单价}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}