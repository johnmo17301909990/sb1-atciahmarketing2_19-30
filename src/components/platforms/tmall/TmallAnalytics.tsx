import React from 'react';
import { Tab } from '@headlessui/react';
import { TmallDataSync } from './TmallDataSync';
import { TmallRealTimeMonitor } from './TmallRealTimeMonitor';
import { TmallInsights } from './TmallInsights';
import { TmallSalesAnalysis } from './TmallSalesAnalysis';
import { TmallProductAnalysis } from './TmallProductAnalysis';
import { TmallTrafficAnalysis } from './TmallTrafficAnalysis';
import { TmallReviewAnalysis } from './TmallReviewAnalysis';
import { TmallReturnAnalysis } from './TmallReturnAnalysis';
import { TmallPromotionAnalysis } from './TmallPromotionAnalysis';
import { TmallUserPortrait } from './TmallUserPortrait';
import { TmallLiveStreamAnalysis } from './TmallLiveStreamAnalysis';
import { TmallAlertSystem } from './TmallAlertSystem';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { ExportButton } from '../../common/ExportButton';

interface Props {
  dateRange: string;
}

export function TmallAnalytics({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 flex-1">
          <div className="flex">
            <div className="flex-shrink-0">🛍️</div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">天猫平台数据分析</p>
            </div>
          </div>
        </div>
        <div className="ml-4">
          <ExportButton
            data={{
              title: '天猫平台数据分析报表',
              columns: {
                date: '日期',
                sales: '销售额',
                orders: '订单数',
                conversion: '转化率'
              },
              rows: []
            }}
            options={{
              fileName: `天猫数据分析_${dateRange}`,
              title: '天猫平台数据分析报表'
            }}
          />
        </div>
      </div>

      <TmallDataSync platformId="tmall" />
      <TmallRealTimeMonitor dateRange={dateRange} />
      <TmallInsights dateRange={dateRange} />
      <TmallAlertSystem />

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {[
            '销售分析',
            '商品分析',
            '流量分析',
            '评价分析',
            '退货分析',
            '促销分析',
            '用户画像',
            '直播分析'
          ].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 whitespace-nowrap
                ${selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-blue-600'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel><TmallSalesAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallProductAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallTrafficAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallReviewAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallReturnAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallPromotionAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallUserPortrait dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><TmallLiveStreamAnalysis dateRange={dateRange} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}