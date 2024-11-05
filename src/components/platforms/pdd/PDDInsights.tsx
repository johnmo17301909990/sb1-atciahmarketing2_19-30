import React from 'react';
import { ChartBarIcon, ShoppingBagIcon, UserGroupIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
  dateRange: string;
}

export function PDDInsights({ dateRange }: Props) {
  const insights = [
    {
      id: '1',
      type: 'success',
      category: '流量分析',
      title: '多多视频带货效果显著',
      description: '过去30天内，视频带货转化率较上月提升45%',
      impact: '提升了店铺整体曝光度和转化率',
      suggestion: '建议加大视频内容投入，扩大商品展示范围',
      icon: ChartBarIcon
    },
    {
      id: '2',
      type: 'warning',
      category: '商品分析',
      title: '爆款商品库存偏低',
      description: '3个爆款SKU库存水平低于安全库存',
      impact: '可能影响销售转化和用户体验',
      suggestion: '建议及时补充库存，优化库存预警阈值',
      icon: ShoppingBagIcon
    },
    {
      id: '3',
      type: 'info',
      category: '用户分析',
      title: '新客获取成本优化',
      description: '新客获取成本较上月降低18.5%',
      impact: '提升获客效率和营销ROI',
      suggestion: '继续优化推广策略，加强内容营销',
      icon: UserGroupIcon
    },
    {
      id: '4',
      type: 'success',
      category: '转化分析',
      title: '直播间转化率提升',
      description: '直播场次转化率较上月提升3.2%',
      impact: '提升了整体销售业绩和ROI',
      suggestion: '加大优质主播合作力度，扩大直播频次',
      icon: BoltIcon
    },
    {
      id: '5',
      type: 'warning',
      category: '竞品分析',
      title: '竞品价格优势扩大',
      description: '主要竞品近期降价促销，价差达到20%',
      impact: '可能影响短期销售和市场份额',
      suggestion: '适当调整价格策略，突出性价比优势',
      icon: ExclamationTriangleIcon
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">智能分析建议</h3>
          <span className="text-sm text-gray-500">基于近30天数据</span>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${
                insight.type === 'success'
                  ? 'border-green-500'
                  : insight.type === 'warning'
                  ? 'border-yellow-500'
                  : 'border-blue-500'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-2 rounded-lg ${
                  insight.type === 'success'
                    ? 'bg-green-100'
                    : insight.type === 'warning'
                    ? 'bg-yellow-100'
                    : 'bg-blue-100'
                }`}>
                  <insight.icon className={`w-6 h-6 ${
                    insight.type === 'success'
                      ? 'text-green-600'
                      : insight.type === 'warning'
                      ? 'text-yellow-600'
                      : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">{insight.category}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      insight.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : insight.type === 'warning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {insight.type === 'success' ? '正向' : insight.type === 'warning' ? '警示' : '建议'}
                    </span>
                  </div>
                  <h4 className="font-semibold mt-1">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-20">影响：</span>
                      <span className="text-sm text-gray-600">{insight.impact}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-20">建议：</span>
                      <span className="text-sm text-gray-600">{insight.suggestion}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}