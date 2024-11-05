import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const ageData = [
  { name: '18-24岁', value: 18 },
  { name: '25-34岁', value: 38 },
  { name: '35-44岁', value: 25 },
  { name: '45-54岁', value: 12 },
  { name: '55岁以上', value: 7 },
];

const genderData = [
  { name: '女性', value: 58 },
  { name: '男性', value: 42 },
];

const cityTierData = [
  { name: '一线城市', value: 32 },
  { name: '新一线', value: 28 },
  { name: '二线城市', value: 22 },
  { name: '三线城市', value: 13 },
  { name: '其他', value: 5 },
];

const consumptionData = [
  { level: '高端用户', value: 25, avgSpend: '5000以上' },
  { level: '中高端用户', value: 35, avgSpend: '3000-5000' },
  { level: '中端用户', value: 28, avgSpend: '1000-3000' },
  { level: '普通用户', value: 12, avgSpend: '1000以下' },
];

const interestData = [
  { category: '3C数码', value: 32 },
  { category: '服装配饰', value: 28 },
  { category: '家居生活', value: 22 },
  { category: '美妆个护', value: 12 },
  { category: '其他', value: 6 },
];

const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];
const GENDER_COLORS = ['#FF4D4F', '#1890FF'];

interface Props {
  dateRange: string;
}

export function JDUserPortrait({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">用户总数</h4>
          <p className="text-3xl font-bold text-red-600">186,523</p>
          <p className="text-sm text-gray-500">较上月增长 15.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">客单价</h4>
          <p className="text-3xl font-bold text-green-600">¥3,286</p>
          <p className="text-sm text-gray-500">较上月增长 8.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">复购率</h4>
          <p className="text-3xl font-bold text-blue-600">42.5%</p>
          <p className="text-sm text-gray-500">较上月提升 3.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">Plus会员占比</h4>
          <p className="text-3xl font-bold text-purple-600">58.2%</p>
          <p className="text-sm text-gray-500">较上月提升 4.5%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">年龄分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">性别分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">城市层级分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityTierData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="占比(%)" fill="#FF4D4F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">消费能力分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="level" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="占比(%)" fill="#52C41A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">用户兴趣分布</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={interestData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="兴趣占比(%)" fill="#1890FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">用户特征标签</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-semibold mb-2">消费习惯</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm mr-2">品质追求型</span>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm mr-2">理性消费</span>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">促销敏感</span>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">生活方式</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2">都市白领</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2">精致生活</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">科技达人</span>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">会员特征</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">Plus会员</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">高频购物</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">品类偏好广</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}