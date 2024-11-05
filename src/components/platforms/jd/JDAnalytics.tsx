import React from 'react';
import { Tab } from '@headlessui/react';
import { JDComparison } from './JDComparison';
import { JDSalesAnalysis } from './JDSalesAnalysis';
import { JDProductAnalysis } from './JDProductAnalysis';
import { JDReviewAnalysis } from './JDReviewAnalysis';
import { JDReturnAnalysis } from './JDReturnAnalysis';
import { JDPromotionAnalysis } from './JDPromotionAnalysis';
import { JDUserPortrait } from './JDUserPortrait';
import { JDRealTimeMonitor } from './JDRealTimeMonitor';
import { JDInsights } from './JDInsights';
import { JDDataSync } from './JDDataSync';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { ExportButton } from '../../common/ExportButton';
import { useJDAnalytics } from '../../../hooks/useJDAnalytics';

interface Props {
  dateRange: string;
}

export function JDAnalytics({ dateRange }: Props) {
  const { data, loading, error } = useJDAnalytics(dateRange);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const exportData = {
    title: '京东平台数据分析报表',
    columns: {
      date: '日期',
      revenue: '销售额',
      orders: '订单数',
      conversion: '转化率'
    },
    rows: data?.salesData?.daily || []
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 flex-1">
          <div className="flex">
            <div className="flex-shrink-0">🏪</div>
            <div className="ml-3">
              <p className="text-sm text-red-700">京东平台数据分析</p>
            </div>
          </div>
        </div>
        <div className="ml-4">
          <ExportButton
            data={exportData}
            options={{
              fileName: `京东数据分析_${dateRange}`,
              title: '京东平台数据分析报表'
            }}
          />
        </div>
      </div>

      <JDDataSync platformId="jd" />
      <JDRealTimeMonitor dateRange={dateRange} />
      <JDInsights dateRange={dateRange} />

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-red-900/20 p-1 mb-6 overflow-x-auto">
          {[
            '自营vs商家',
            '销售分析',
            '商品分析',
            '评价分析',
            '退货分析',
            '促销分析',
            '用户画像'
          ].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 whitespace-nowrap
                ${selected
                  ? 'bg-white shadow text-red-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-red-600'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel><JDComparison dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><JDSalesAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><JDProductAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><JDReviewAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><JDReturnAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><JDPromotionAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><JDUserPortrait dateRange={dateRange} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}