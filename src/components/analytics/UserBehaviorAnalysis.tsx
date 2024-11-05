import React from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const userBehaviorData = [
  { time: '00:00', users: 1200, sessions: 1500, duration: 180 },
  { time: '03:00', users: 800, sessions: 1000, duration: 195 },
  { time: '06:00', users: 1500, sessions: 1800, duration: 210 },
  { time: '09:00', users: 3500, sessions: 4200, duration: 240 },
  { time: '12:00', users: 4200, sessions: 5000, duration: 225 },
  { time: '15:00', users: 3800, sessions: 4600, duration: 230 },
  { time: '18:00', users: 4500, sessions: 5400, duration: 220 },
  { time: '21:00', users: 2800, sessions: 3400, duration: 200 },
];

const deviceData = [
  { device: '手机', users: 6500 },
  { device: '平板', users: 1200 },
  { device: '桌面', users: 2300 },
];

interface Props {
  dateRange: string;
}

export function UserBehaviorAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">用户活跃度分析</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userBehaviorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" name="活跃用户" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Area type="monotone" dataKey="sessions" name="会话数" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">平均会话时长</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userBehaviorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="duration" name="平均时长(秒)" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">设备分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" name="用户数" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}