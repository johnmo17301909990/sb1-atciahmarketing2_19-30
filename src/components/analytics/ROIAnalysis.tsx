import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const channelROIData = [
  { channel: '搜索广告', 投入: 50000, 收入: 150000, ROI: 3 },
  { channel: '社交广告', 投入: 80000, 收入: 280000, ROI: 3.5 },
  { channel: 'KOL合作', 投入: 100000, 收入: 420000, ROI: 4.2 },
  { channel: '内容营销', 投入: 30000, 收入: 135000, ROI: 4.5 },
  { channel: '电商推广', 投入: 70000, 收入: 245000, ROI: 3.5 },
];

const trendData = [
  { month: '1月', ROI: 3.2, 投入: 280000, 收入: 896000 },
  { month: '2月', ROI: 3.5, 投入: 300000, 收入: 1050000 },
  { month: '3月', ROI: 3.8, 投入: 320000, 收入: 1216000 },
  { month: '4月', ROI: 3.6, 投入: 350000, 收入: 1260000 },
  { month: '5月', ROI: 4.0, 投入: 380000, 收入: 1520000 },
  { month: '6月', ROI: 4.2, 投入: 400000, 收入: 1680000 },
];

interface Props {
  dateRange: string;
}

export function ROIAnalysis({ dateRange }: Props) {
  const totalInvestment = channelROIData.reduce((sum, item) => sum + item.投入, 0);
  const totalRevenue = channelROIData.reduce((sum, item) => sum + item.收入, 0);
  const averageROI = totalRevenue / totalInvestment;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">总投入</h4>
          <p className="text-3xl font-bold text-blue-600">
            ¥{totalInvestment.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">较上月增长 12.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">总收入</h4>
          <p className="text-3xl font-bold text-green-600">
            ¥{totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">较上月增长 15.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均ROI</h4>
          <p className="text-3xl font-bold text-purple-600">
            {averageROI.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">较上月提升 0.3</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">各渠道ROI分析</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelROIData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="ROI" name="ROI" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="投入" name="投入(元)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">ROI趋势分析</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="ROI" name="ROI" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="收入" name="收入(元)" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}