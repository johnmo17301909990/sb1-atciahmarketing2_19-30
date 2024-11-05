import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const trafficData = [
  { date: '1月1日', 总访问量: 2400, 新用户: 1200, 回访用户: 1200 },
  { date: '1月2日', 总访问量: 1398, 新用户: 800, 回访用户: 598 },
  { date: '1月3日', 总访问量: 9800, 新用户: 5800, 回访用户: 4000 },
  { date: '1月4日', 总访问量: 3908, 新用户: 2000, 回访用户: 1908 },
  { date: '1月5日', 总访问量: 4800, 新用户: 2800, 回访用户: 2000 },
  { date: '1月6日', 总访问量: 3800, 新用户: 2400, 回访用户: 1400 },
  { date: '1月7日', 总访问量: 4300, 新用户: 2600, 回访用户: 1700 },
];

const sourceData = [
  { name: '直接访问', value: 4000 },
  { name: '搜索引擎', value: 3000 },
  { name: '社交媒体', value: 2000 },
  { name: '外部链接', value: 1500 },
  { name: '邮件营销', value: 1000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface Props {
  dateRange: string;
}

export function TrafficAnalysis({ dateRange }: Props) {
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
              <Area type="monotone" dataKey="新用户" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="回访用户" stackId="2" stroke="#ffc658" fill="#ffc658" />
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
              <p className="text-gray-600 mb-2">跳出率</p>
              <p className="text-2xl font-bold text-blue-600">35.8%</p>
              <p className="text-sm text-gray-500">较上月降低 2.3%</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">平均访问时长</p>
              <p className="text-2xl font-bold text-green-600">4:35</p>
              <p className="text-sm text-gray-500">较上月增加 45秒</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">人均页面浏览</p>
              <p className="text-2xl font-bold text-purple-600">3.8</p>
              <p className="text-sm text-gray-500">较上月增加 0.5</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">新用户占比</p>
              <p className="text-2xl font-bold text-orange-600">45.2%</p>
              <p className="text-sm text-gray-500">较上月增加 3.1%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}