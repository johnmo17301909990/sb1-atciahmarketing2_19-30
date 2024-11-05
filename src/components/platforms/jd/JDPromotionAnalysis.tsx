import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const promotionData = [
  { name: '京东618', 投入: 80000, 销售额: 450000, ROI: 5.6 },
  { name: '双11大促', 投入: 120000, 销售额: 680000, ROI: 5.7 },
  { name: '年货节', 投入: 60000, 销售额: 320000, ROI: 5.3 },
  { name: 'Plus会员日', 投入: 40000, 销售额: 220000, ROI: 5.5 },
  { name: '超级品牌日', 投入: 35000, 销售额: 180000, ROI: 5.1 },
];

const channelData = [
  { name: '京东快车', value: 32 },
  { name: '京东直投', value: 28 },
  { name: '京东海投', value: 20 },
  { name: 'APP推送', value: 12 },
  { name: '其他', value: 8 },
];

const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

interface Props {
  dateRange: string;
}

export function JDPromotionAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">促销投入</h4>
          <p className="text-3xl font-bold text-red-600">¥335,000</p>
          <p className="text-sm text-gray-500">较上期增长 18.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">促销销售额</h4>
          <p className="text-3xl font-bold text-green-600">¥1,850,000</p>
          <p className="text-sm text-gray-500">较上期增长 25.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均ROI</h4>
          <p className="text-3xl font-bold text-blue-600">5.5</p>
          <p className="text-sm text-gray-500">较上期提升 0.3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">新客占比</h4>
          <p className="text-3xl font-bold text-purple-600">42.5%</p>
          <p className="text-sm text-gray-500">较上期提升 5.8%</p>
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
              <Bar yAxisId="left" dataKey="投入" name="投入(元)" fill="#FF4D4F" />
              <Bar yAxisId="left" dataKey="销售额" name="销售额(元)" fill="#52C41A" />
              <Bar yAxisId="right" dataKey="ROI" name="ROI" fill="#1890FF" />
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
              <span className="text-lg font-semibold">12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">客单价</span>
              <span className="text-lg font-semibold">¥385</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">复购率</span>
              <span className="text-lg font-semibold">38.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">活动商品动销率</span>
              <span className="text-lg font-semibold">92.5%</span>
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
                <td className="px-6 py-4 whitespace-nowrap">1,256</td>
                <td className="px-6 py-4 whitespace-nowrap">¥125,600</td>
                <td className="px-6 py-4 whitespace-nowrap">15.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    高
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品B</td>
                <td className="px-6 py-4 whitespace-nowrap">986</td>
                <td className="px-6 py-4 whitespace-nowrap">¥98,600</td>
                <td className="px-6 py-4 whitespace-nowrap">12.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    中
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品C</td>
                <td className="px-6 py-4 whitespace-nowrap">756</td>
                <td className="px-6 py-4 whitespace-nowrap">¥75,600</td>
                <td className="px-6 py-4 whitespace-nowrap">10.2%</td>
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