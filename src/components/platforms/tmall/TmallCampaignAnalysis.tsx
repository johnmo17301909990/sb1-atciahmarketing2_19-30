import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const campaignData = [
  { name: '双11预售', 投入: 50000, 销售额: 250000, ROI: 5 },
  { name: '年货节', 投入: 30000, 销售额: 180000, ROI: 6 },
  { name: '38女王节', 投入: 25000, 销售额: 150000, ROI: 6 },
  { name: '618大促', 投入: 45000, 销售额: 220000, ROI: 4.9 },
  { name: '品牌日', 投入: 20000, 销售额: 100000, ROI: 5 },
];

const channelData = [
  { name: '直通车', value: 35 },
  { name: '钻展', value: 25 },
  { name: '超级推荐', value: 20 },
  { name: '直播', value: 15 },
  { name: '其他', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface Props {
  dateRange: string;
}

export function TmallCampaignAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">活动投入</h4>
          <p className="text-3xl font-bold text-blue-600">¥170,000</p>
          <p className="text-sm text-gray-500">较上期增长 15.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">活动销售额</h4>
          <p className="text-3xl font-bold text-green-600">¥900,000</p>
          <p className="text-sm text-gray-500">较上期增长 22.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均ROI</h4>
          <p className="text-3xl font-bold text-purple-600">5.3</p>
          <p className="text-sm text-gray-500">较上期提升 0.4</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">新客占比</h4>
          <p className="text-3xl font-bold text-orange-600">35.8%</p>
          <p className="text-sm text-gray-500">较上期提升 5.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">活动效果对比</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="投入" name="投入(元)" fill="#8884d8" />
              <Bar yAxisId="left" dataKey="销售额" name="销售额(元)" fill="#82ca9d" />
              <Bar yAxisId="right" dataKey="ROI" name="ROI" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">推广渠道分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">活动效果指标</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">活动转化率</span>
              <span className="text-lg font-semibold">8.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">客单价</span>
              <span className="text-lg font-semibold">¥285</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">复购率</span>
              <span className="text-lg font-semibold">32.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">活动商品动销率</span>
              <span className="text-lg font-semibold">85.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}