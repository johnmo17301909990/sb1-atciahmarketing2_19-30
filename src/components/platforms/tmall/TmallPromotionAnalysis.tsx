import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const promotionData = [
  { name: '双11预售', 投入: 80000, 销售额: 450000, ROI: 5.6 },
  { name: '双12大促', 投入: 60000, 销售额: 320000, ROI: 5.3 },
  { name: '年货节', 投入: 50000, 销售额: 280000, ROI: 5.6 },
  { name: '38女王节', 投入: 40000, 销售额: 220000, ROI: 5.5 },
  { name: '618大促', 投入: 70000, 销售额: 380000, ROI: 5.4 },
];

const channelData = [
  { name: '直通车', value: 35 },
  { name: '钻展', value: 25 },
  { name: '超级推荐', value: 20 },
  { name: '直播', value: 12 },
  { name: '其他', value: 8 },
];

const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

interface Props {
  dateRange: string;
}

export function TmallPromotionAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">促销投入</h4>
          <p className="text-3xl font-bold text-blue-600">¥300,000</p>
          <p className="text-sm text-gray-500">较上期增长 15.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">促销销售额</h4>
          <p className="text-3xl font-bold text-green-600">¥1,650,000</p>
          <p className="text-sm text-gray-500">较上期增长 22.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均ROI</h4>
          <p className="text-3xl font-bold text-purple-600">5.5</p>
          <p className="text-sm text-gray-500">较上期提升 0.3</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">新客占比</h4>
          <p className="text-3xl font-bold text-orange-600">38.5%</p>
          <p className="text-sm text-gray-500">较上期提升 5.2%</p>
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
              <span className="text-lg font-semibold">10.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">客单价</span>
              <span className="text-lg font-semibold">¥325</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">复购率</span>
              <span className="text-lg font-semibold">35.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">活动商品动销率</span>
              <span className="text-lg font-semibold">88.5%</span>
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
                <td className="px-6 py-4 whitespace-nowrap">1,586</td>
                <td className="px-6 py-4 whitespace-nowrap">¥158,600</td>
                <td className="px-6 py-4 whitespace-nowrap">12.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    高
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品B</td>
                <td className="px-6 py-4 whitespace-nowrap">1,258</td>
                <td className="px-6 py-4 whitespace-nowrap">¥125,800</td>
                <td className="px-6 py-4 whitespace-nowrap">10.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    中
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">商品C</td>
                <td className="px-6 py-4 whitespace-nowrap">986</td>
                <td className="px-6 py-4 whitespace-nowrap">¥98,600</td>
                <td className="px-6 py-4 whitespace-nowrap">9.2%</td>
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