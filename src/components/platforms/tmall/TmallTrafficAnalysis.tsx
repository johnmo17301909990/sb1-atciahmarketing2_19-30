import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const trafficData = [
  { date: '1月1日', 总访问量: 2400, 自然流量: 1200, 付费流量: 800, 店内流量: 400 },
  { date: '1月2日', 总访问量: 1398, 自然流量: 800, 付费流量: 400, 店内流量: 198 },
  { date: '1月3日', 总访问量: 9800, 自然流量: 5800, 付费流量: 3000, 店内流量: 1000 },
  { date: '1月4日', 总访问量: 3908, 自然流量: 2000, 付费流量: 1500, 店内流量: 408 },
  { date: '1月5日', 总访问量: 4800, 自然流量: 2800, 付费流量: 1600, 店内流量: 400 },
];

const sourceData = [
  { name: '搜索自然流量', value: 4000 },
  { name: '直通车', value: 3000 },
  { name: '超级推荐', value: 2000 },
  { name: '店内搜索', value: 1500 },
  { name: '收藏夹', value: 1000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface Props {
  dateRange: string;
}

export function TmallTrafficAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
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
              <Area type="monotone" dataKey="总访问量" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="自然流量" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="付费流量" stackId="2" stroke="#ffc658" fill="#ffc658" />
              <Area type="monotone" dataKey="店内流量" stackId="2" stroke="#ff8042" fill="#ff8042" />
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
          <h3 className="text-lg font-semibold mb-4">关键指标</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">搜索点击率</p>
              <p className="text-2xl font-bold text-blue-600">5.8%</p>
              <p className="text-sm text-gray-500">较上月提升 0.3%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">直通车点击率</p>
              <p className="text-2xl font-bold text-green-600">3.2%</p>
              <p className="text-sm text-gray-500">较上月提升 0.5%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">收藏关注率</p>
              <p className="text-2xl font-bold text-purple-600">2.8%</p>
              <p className="text-sm text-gray-500">较上月增加 0.2%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">平均停留时间</p>
              <p className="text-2xl font-bold text-orange-600">4:35</p>
              <p className="text-sm text-gray-500">较上月增加 15秒</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}