import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const ageData = [
  { name: '18-24岁', value: 15 },
  { name: '25-34岁', value: 35 },
  { name: '35-44岁', value: 25 },
  { name: '45-54岁', value: 15 },
  { name: '55岁以上', value: 10 },
];

const genderData = [
  { name: '女性', value: 65 },
  { name: '男性', value: 35 },
];

const cityTierData = [
  { name: '一线城市', value: 35 },
  { name: '新一线', value: 25 },
  { name: '二线城市', value: 20 },
  { name: '三线城市', value: 15 },
  { name: '其他', value: 5 },
];

const consumptionData = [
  { level: '高端用户', value: 20, avgSpend: '5000以上' },
  { level: '中高端用户', value: 30, avgSpend: '3000-5000' },
  { level: '中端用户', value: 35, avgSpend: '1000-3000' },
  { level: '普通用户', value: 15, avgSpend: '1000以下' },
];

const interestData = [
  { category: '美妆个护', value: 35 },
  { category: '服装配饰', value: 25 },
  { category: '数码电器', value: 20 },
  { category: '家居生活', value: 15 },
  { category: '其他', value: 5 },
];

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
const GENDER_COLORS = ['#FF6B6B', '#4ECDC4'];

interface Props {
  dateRange: string;
}

export function TmallUserPortrait({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">客户总数</h4>
          <p className="text-3xl font-bold text-blue-600">125,836</p>
          <p className="text-sm text-gray-500">较上月增长 12.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">客单价</h4>
          <p className="text-3xl font-bold text-green-600">¥2,586</p>
          <p className="text-sm text-gray-500">较上月增长 8.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">复购率</h4>
          <p className="text-3xl font-bold text-purple-600">35.8%</p>
          <p className="text-sm text-gray-500">较上月提升 2.1%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">会员占比</h4>
          <p className="text-3xl font-bold text-orange-600">68.5%</p>
          <p className="text-sm text-gray-500">较上月提升 3.2%</p>
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
                <Bar dataKey="value" name="占比(%)" fill="#8884d8" />
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
                <Bar dataKey="value" name="占比(%)" fill="#82ca9d" />
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
              <Bar dataKey="value" name="兴趣占比(%)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">用户特征标签</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">消费习惯</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">品质追求型</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">理性消费</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">促销敏感</span>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">生活方式</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2">都市白领</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2">精致生活</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">追求品质</span>
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold mb-2">兴趣爱好</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm mr-2">时尚达人</span>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm mr-2">美妆控</span>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">数码发烧友</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}