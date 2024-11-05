import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { usePDDRealtime } from '../../../hooks/usePDDRealtime';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { formatters } from '../../../utils/formatters';

interface Props {
  dateRange: string;
}

export function PDDRealTimeMonitor({ dateRange }: Props) {
  const { data, loading, error } = usePDDRealtime('pdd');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="加载实时数据失败" />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">实时监控</h3>
          <span className="text-sm text-green-600">● 实时更新中</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">当前在线</span>
              <span className="text-xs text-green-600">↑ {data.onlineGrowth}%</span>
            </div>
            <p className="text-2xl font-bold text-orange-600 mt-2">{formatters.number(data.currentOnline)}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">今日交易额</span>
              <span className="text-xs text-green-600">↑ {data.revenueGrowth}%</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">{formatters.currency(data.todayRevenue)}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">今日订单数</span>
              <span className="text-xs text-green-600">↑ {data.ordersGrowth}%</span>
            </div>
            <p className="text-2xl font-bold text-purple-600 mt-2">{data.todayOrders}</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="onlineUsers" name="在线人数" stroke="#F97316" />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="实时交易额" stroke="#10B981" />
              <Line yAxisId="right" type="monotone" dataKey="orders" name="实时订单" stroke="#8B5CF6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">实时异常监控</h4>
          <div className="space-y-2">
            {data.alerts.map((alert, index) => (
              <div key={index} className="flex items-center text-sm">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-400' 
                    : alert.type === 'error'
                    ? 'bg-red-400'
                    : 'bg-blue-400'
                }`}></span>
                <span className="text-gray-600">{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}