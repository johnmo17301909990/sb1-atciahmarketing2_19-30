import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const trafficData = [
  { date: '1月1日', 总访问量: 3500, 自然流量: 2000, 付费流量: 1000, 站内流量: 500 },
  { date: '1月2日', 总访问量: 3800, 自然流量: 2200, 付费流量: 1100, 站内流量: 500 },
  { date: '1月3日', 总访问量: 4200, 自然流量: 2400, 付费流量: 1300, 站内流量: 500 },
  { date: '1月4日', 总访问量: 3900, 自然流量: 2300, 付费流量: 1100, 站内流量: 500 },
  { date: '1月5日', 总访问量: 4500, 自然流量: 2600, 付费流量: 1400, 站内流量: 500 },
];

const sourceData = [
  { name: '搜索自然流量', value: 45 },
  { name: '京东快车', value: 25 },
  { name: '京东直投', value: 15 },
  { name: '站内推荐', value: 10 },
  { name: '其他来源', value: 5 },
];

const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

interface Props {
  dateRange: string;
}

export function JDTrafficAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">总访问量</h4>
          <p className="text-3xl font-bold text-red-600">458,632</p>
          <p className="text-sm text-gray-500">较上月增长 15.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">跳出率</h4>
          <p className="text-3xl font-bold text-green-600">32.5%</p>
          <p className="text-sm text-gray-500">较上月降低 2.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均访问时长</h4>
          <p className="text-3xl font-bold text-blue-600">5:32</p>
          <p className="text-sm text-gray-500">较上月增加 45秒</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">转化率</h4>
          <p className="text-3xl font-bold text-purple-600">4.8%</p>
          <p className="text-sm text-gray-500">较上月提升 0.5%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">流量趋势</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="总访问量" stackId="1" stroke="#FF4D4F" fill="#FF4D4F" fillOpacity={0.3} />
              <Area type="monotone" dataKey="自然流量" stackId="2" stroke="#FF7A45" fill="#FF7A45" fillOpacity={0.3} />
              <Area type="monotone" dataKey="付费流量" stackId="2" stroke="#FFA940" fill="#FFA940" fillOpacity={0.3} />
              <Area type="monotone" dataKey="站内流量" stackId="2" stroke="#FFD666" fill="#FFD666" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">流量来源分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">流量质量指标</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">人均浏览页面</span>
              <span className="text-lg font-semibold">4.8页</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">搜索点击率</span>
              <span className="text-lg font-semibold">6.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">收藏关注率</span>
              <span className="text-lg font-semibold">3.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">加购率</span>
              <span className="text-lg font-semibold">8.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}