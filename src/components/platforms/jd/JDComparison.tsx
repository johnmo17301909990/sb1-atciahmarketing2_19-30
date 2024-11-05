import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { useJDComparison } from '../../../hooks/useJDComparison';
import { formatters } from '../../../utils/formatters';

interface Props {
  dateRange: string;
}

export function JDComparison({ dateRange }: Props) {
  const { data, loading, error } = useJDComparison(dateRange);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="加载数据失败" />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* 概览指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">自营GMV占比</h4>
          <p className="text-3xl font-bold text-red-600">54.2%</p>
          <p className="text-sm text-gray-500">较上月提升 2.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商家GMV占比</h4>
          <p className="text-3xl font-bold text-blue-600">45.8%</p>
          <p className="text-sm text-gray-500">较上月下降 2.3%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">自营转化率</h4>
          <p className="text-3xl font-bold text-green-600">4.8%</p>
          <p className="text-sm text-gray-500">较上月提升 0.5%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">商家转化率</h4>
          <p className="text-3xl font-bold text-purple-600">4.2%</p>
          <p className="text-sm text-gray-500">较上月提升 0.3%</p>
        </div>
      </div>

      {/* 销售趋势对比 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">销售趋势对比</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                data={data.selfOperated.dailyMetrics}
                type="monotone"
                dataKey="revenue"
                name="自营收入"
                stroke="#DC2626"
              />
              <Line
                yAxisId="right"
                data={data.marketplace.dailyMetrics}
                type="monotone"
                dataKey="revenue"
                name="商家收入"
                stroke="#2563EB"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 品类表现对比 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">自营品类表现</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.selfOperated.topCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="收入"
                  fill="#DC2626"
                />
                <Bar
                  yAxisId="right"
                  dataKey="growth"
                  name="增长率"
                  fill="#059669"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">商家品类表现</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.marketplace.topCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="收入"
                  fill="#2563EB"
                />
                <Bar
                  yAxisId="right"
                  dataKey="growth"
                  name="增长率"
                  fill="#059669"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 详细指标对比 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">详细指标对比</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">指标</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">自营</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">商家</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">差异</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">客单价</td>
                <td className="px-6 py-4 whitespace-nowrap">¥223.68</td>
                <td className="px-6 py-4 whitespace-nowrap">¥225.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-red-600">-0.59%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">转化率</td>
                <td className="px-6 py-4 whitespace-nowrap">4.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">4.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600">+0.6%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">复购率</td>
                <td className="px-6 py-4 whitespace-nowrap">35.2%</td>
                <td className="px-6 py-4 whitespace-nowrap">28.5%</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600">+6.7%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">退货率</td>
                <td className="px-6 py-4 whitespace-nowrap">2.5%</td>
                <td className="px-6 py-4 whitespace-nowrap">3.2%</td>
                <td className="px-6 py-4 whitespace-nowrap text-green-600">-0.7%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}