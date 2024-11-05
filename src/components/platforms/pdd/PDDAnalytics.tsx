import React from 'react';
import { Tab } from '@headlessui/react';
import { PDDDataSync } from './PDDDataSync';
import { PDDRealTimeMonitor } from './PDDRealTimeMonitor';
import { PDDInsights } from './PDDInsights';
import { PDDSalesAnalysis } from './PDDSalesAnalysis';
import { PDDProductAnalysis } from './PDDProductAnalysis';
import { PDDReviewAnalysis } from './PDDReviewAnalysis';
import { PDDReturnAnalysis } from './PDDReturnAnalysis';
import { PDDPromotionAnalysis } from './PDDPromotionAnalysis';
import { PDDUserPortrait } from './PDDUserPortrait';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { ErrorMessage } from '../../common/ErrorMessage';
import { ExportButton } from '../../common/ExportButton';
import { usePDDAnalytics } from '../../../hooks/usePDDAnalytics';

interface Props {
  dateRange: string;
}

export function PDDAnalytics({ dateRange }: Props) {
  const { data, loading, error } = usePDDAnalytics(dateRange);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const exportData = {
    title: '拼多多平台数据分析报表',
    columns: {
      date: '日期',
      revenue: '销售额',
      orders: '订单数',
      conversion: '转化率',
      avgOrderValue: '客单价'
    },
    rows: data?.salesData?.daily || []
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 flex-1">
          <div className="flex">
            <div className="flex-shrink-0">🎯</div>
            <div className="ml-3">
              <p className="text-sm text-orange-700">拼多多平台数据分析</p>
            </div>
          </div>
        </div>
        <div className="ml-4">
          <ExportButton
            data={exportData}
            options={{
              fileName: `拼多多数据分析_${dateRange}`,
              title: '拼多多平台数据分析报表'
            }}
          />
        </div>
      </div>

      <PDDDataSync platformId="pdd" />
      <PDDRealTimeMonitor dateRange={dateRange} />
      <PDDInsights dateRange={dateRange} />

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-orange-900/20 p-1 mb-6 overflow-x-auto">
          {[
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
                  ? 'bg-white shadow text-orange-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-orange-600'
                }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel><PDDSalesAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><PDDProductAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><PDDReviewAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><PDDReturnAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><PDDPromotionAnalysis dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><PDDUserPortrait dateRange={dateRange} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}