import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const promotionData = [
  { name: '百亿补贴', 投入: 120000, 销售额: 850000, ROI: 7.1 },
  { name: '限时秒杀', 投入: 85000, 销售额: 580000, ROI: 6.8 },
  { name: '品牌清仓', 投入: 65000, 销售额: 420000, ROI: 6.5 },
  { name: '新品首发', 投入: 45000, 销售额: 280000, ROI: 6.2 },
  { name: '主题活动', 投入: 35000, 销售额: 210000, ROI: 6.0 },
];

const channelData = [
  { name: '站内推广', value: 42 },
  { name: '多多视频', value: 28 },
  { name: '直播', value: 18 },
  { name: '外部引流', value: 12 },
];

const COLORS = ['#F97316', '#FF7A45', '#FFA940', '#FFD666'];

interface Props {
  dateRange: string;
}

export function PDDPromotionAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">促销投入</h4>
          <p className="text-3xl font-bold text-orange-600">¥350,000</p>
          <p className="text-sm text-gray-500">较上期增长 22.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">促销销售额</h4>
          <p className="text-3xl font-bold text-green-600">¥2,340,000</p>
          <p className="text-sm text-gray-500">较上期增长 28.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均ROI</h4>
          <p className="text-3xl font-bold text-blue-600">6.7</p>
          <p className="text-sm text-gray-500">较上期提升 0.5</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">新客占比</h4>
          <p className="text-3xl font-bold text-purple-600">45.8%</p>
          <p className="text-sm text-gray-500">较上期提升 8.2%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">活动效果对比</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={promotionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="投入" name="投入(元)" fill="#F97316" />
              <Bar yAxisId="left" dataKey="销售额" name="销售额(元)" fill="#22C55E" />
              <Bar yAxisId="right" dataKey="ROI" name="ROI" fill="#3B82F6" />
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
              <span className="text-lg font-semibold">15.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">客单价</span>
              <span className="text-lg font-semibold">¥25.8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">复购率</span>
              <span className="text-lg font-semibold">42.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">活动商品动销率</span>
              <span className="text-lg font-semibold">95.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">活动商品表现</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商品名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">销量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">销售额</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">转化率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">贡献度</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品A</td>
                <td className="px-6 py-4 whitespace-nowrap">2,586</td>
                <td className="px-6 py-4 whitespace-nowrap">¥58,600</td>
                <td className="px-6 py-4 whitespace-nowrap">18.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    高
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品B</td>
                <td className="px-6 py-4 whitespace-nowrap">1,856</td>
                <td className="px-6 py-4 whitespace-nowrap">¥42,500</td>
                <td className="px-6 py-4 whitespace-nowrap">15.2%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    中
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品C</td>
                <td className="px-6 py-4 whitespace-nowrap">1,258</td>
                <td className="px-6 py-4 whitespace-nowrap">¥28,600</td>
                <td className="px-6 py-4 whitespace-nowrap">12.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    低
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}