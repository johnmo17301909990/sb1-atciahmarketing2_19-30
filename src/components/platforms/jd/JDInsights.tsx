import React from 'react';
import { ChartBarIcon, ShoppingBagIcon, UserGroupIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Insight {
  id: string;
  type: 'success' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  impact: string;
  suggestion: string;
  icon: React.ElementType;
}

const insights: Insight[] = [
  {
    id: '1',
    type: 'success',
    category: '自营表现',
    title: '自营3C数码品类增长显著',
    description: '过去30天内，自营3C数码品类销售额较上月提升32.5%',
    impact: '提升了整体GMV和品类市场份额',
    suggestion: '建议加大3C数码品类的营销投入和库存储备',
    icon: ChartBarIcon
  },
  {
    id: '2',
    type: 'warning',
    category: '商品分析',
    title: '高端家电库存积压',
    description: '高端家电品类库存周转率低于行业平均20%',
    impact: '影响资金周转和仓储成本',
    suggestion: '建议适当调整定价策略，开展促销活动',
    icon: ShoppingBagIcon
  },
  {
    id: '3',
    type: 'info',
    category: 'Plus会员',
    title: 'Plus会员转化率提升',
    description: 'Plus会员购买转化率较普通用户高出2.8倍',
    impact: '提升了整体销售业绩和用户粘性',
    suggestion: '建议加大Plus会员权益宣传和促销力度',
    icon: UserGroupIcon
  },
  {
    id: '4',
    type: 'success',
    category: '物流配送',
    title: '京东物流时效领先',
    description: '自营订单平均配送时效较行业平均提升35%',
    impact: '提升了用户满意度和复购率',
    suggestion: '建议持续优化物流网络，扩大优势',
    icon: BoltIcon
  },
  {
    id: '5',
    type: 'warning',
    category: '竞品分析',
    title: '竞品价格优势扩大',
    description: '重点竞品近期大促，价差达到18%',
    impact: '可能影响短期销售和市场份额',
    suggestion: '建议调整价格策略，强化自营品质和服务优势',
    icon: ExclamationTriangleIcon
  }
];

interface Props {
  dateRange: string;
}

export function JDInsights({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
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