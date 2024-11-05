import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { date: '1月1日', 销售额: 35000, 订单数: 180, 客单价: 194 },
  { date: '1月2日', 销售额: 42000, 订单数: 210, 客单价: 200 },
  { date: '1月3日', 销售额: 38000, 订单数: 185, 客单价: 205 },
  { date: '1月4日', 销售额: 45000, 订单数: 220, 客单价: 204 },
  { date: '1月5日', 销售额: 50000, 订单数: 240, 客单价: 208 },
];

const categoryData = [
  { name: '3C数码', 销售额: 150000, 同比增长: 15 },
  { name: '家电', 销售额: 120000, 同比增长: 12 },
  { name: '服饰', 销售额: 90000, 同比增长: 8 },
  { name: '美妆', 销售额: 80000, 同比增长: 10 },
  { name: '食品', 销售额: 70000, 同比增长: 5 },
];

interface Props {
  dateRange: string;
}

export function JDSalesAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">总销售额</h4>
          <p className="text-3xl font-bold text-red-600">¥210,000</p>
          <p className="text-sm text-gray-500">较上月增长 18.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">总订单数</h4>
          <p className="text-3xl font-bold text-green-600">1,035</p>
          <p className="text-sm text-gray-500">较上月增长 15.2%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均客单价</h4>
          <p className="text-3xl font-bold text-blue-600">¥203</p>
          <p className="text-sm text-gray-500">较上月增长 2.8%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">支付转化率</h4>
          <p className="text-3xl font-bold text-purple-600">4.8%</p>
          <p className="text-sm text-gray-500">较上月提升 0.5%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">销售趋势分析</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="销售额" stroke="#FF4D4F" />
              <Line yAxisId="right" type="monotone" dataKey="订单数" stroke="#52C41A" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">品类销售分析</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="销售额" name="销售额" fill="#FF4D4F" />
              <Bar yAxisId="right" dataKey="同比增长" name="同比增长(%)" fill="#52C41A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">销售转化漏斗</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">浏览商品</span>
              <span className="text-lg font-semibold">21,580</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">加入购物车</span>
              <span className="text-lg font-semibold">3,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">生成订单</span>
              <span className="text-lg font-semibold">1,035</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">完成支付</span>
              <span className="text-lg font-semibold">985</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">支付方式分布</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">京东白条</span>
              <span className="text-lg font-semibold">35.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">微信支付</span>
              <span className="text-lg font-semibold">28.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">支付宝</span>
              <span className="text-lg font-semibold">25.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">其他方式</span>
              <span className="text-lg font-semibold">10.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}