import React from 'react';
import { BellAlertIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  timestamp: string;
  status: 'active' | 'resolved';
  metric?: string;
  threshold?: string;
  currentValue?: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'critical',
    category: '库存预警',
    message: 'SKU12345 库存不足',
    timestamp: '2024-01-20 15:30',
    status: 'active',
    metric: '库存数量',
    threshold: '20件',
    currentValue: '15件'
  },
  {
    id: '2',
    type: 'warning',
    category: '流量异常',
    message: 'UV突增超过阈值',
    timestamp: '2024-01-20 15:25',
    status: 'active',
    metric: '小时UV',
    threshold: '1000',
    currentValue: '1500'
  },
  {
    id: '3',
    type: 'critical',
    category: '转化率异常',
    message: '支付转化率大幅下降',
    timestamp: '2024-01-20 15:20',
    status: 'active',
    metric: '支付转化率',
    threshold: '3%',
    currentValue: '1.8%'
  },
  {
    id: '4',
    type: 'info',
    category: '客服响应',
    message: '客服响应时间超时',
    timestamp: '2024-01-20 15:15',
    status: 'resolved',
    metric: '平均响应时间',
    threshold: '120s',
    currentValue: '150s'
  }
];

const alertThresholds = [
  {
    category: '库存管理',
    rules: [
      { name: '库存不足预警', threshold: '低于20件' },
      { name: '库存积压预警', threshold: '超过180天未动销' }
    ]
  },
  {
    category: '流量监控',
    rules: [
      { name: 'UV突增预警', threshold: '较前日同期增长50%' },
      { name: 'UV骤降预警', threshold: '较前日同期下降30%' }
    ]
  },
  {
    category: '交易转化',
    rules: [
      { name: '支付转化率异常', threshold: '低于历史平均30%' },
      { name: '退款率异常', threshold: '超过5%' }
    ]
  },
  {
    category: '客户服务',
    rules: [
      { name: '差评预警', threshold: '差评率超过3%' },
      { name: '客服响应超时', threshold: '超过120秒' }
    ]
  }
];

export function TmallAlertSystem() {
  return (
    <div className="space-y-6">
      {/* 预警概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">严重告警</span>
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2">2</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">警告</span>
            <BellAlertIcon className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">1</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">提醒</span>
            <BellAlertIcon className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">1</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">已解决</span>
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">1</p>
        </div>
      </div>

      {/* 活跃预警列表 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">活跃预警</h3>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 rounded-r-lg p-4 ${
                alert.type === 'critical'
                  ? 'border-red-500 bg-red-50'
                  : alert.type === 'warning'
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{alert.category}</h4>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  {alert.metric && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">指标: {alert.metric}</span>
                      <span className="mx-2">|</span>
                      <span className="text-gray-600">阈值: {alert.threshold}</span>
                      <span className="mx-2">|</span>
                      <span className="text-gray-600">当前值: {alert.currentValue}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    alert.status === 'active' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {alert.status === 'active' ? '未处理' : '已解决'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 预警规则配置 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">预警规则配置</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alertThresholds.map((category) => (
            <div key={category.category} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3">{category.category}</h4>
              <div className="space-y-2">
                {category.rules.map((rule) => (
                  <div key={rule.name} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{rule.name}</span>
                    <span className="text-gray-800">{rule.threshold}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}