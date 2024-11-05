import React from 'react';
import { Tab } from '@headlessui/react';
import { RuleLibrary } from './RuleLibrary';
import { RuleChanges } from './RuleChanges';
import { RuleImpactAnalysis } from './RuleImpactAnalysis';
import { OperationGuide } from './OperationGuide';
import { RuleComparison } from './RuleComparison';
import { EcommerceRules } from './EcommerceRules';
import { useAnalyticsContext } from '../../context/AnalyticsContext';

export function PlatformRules() {
  const { selectedPlatform, setSelectedPlatform, dateRange } = useAnalyticsContext();

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold">平台规则管理</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-4 py-2 border rounded-md bg-white shadow-sm"
          >
            <option value="tmall">天猫</option>
            <option value="jd">京东</option>
            <option value="pdd">拼多多</option>
            <option value="douyin">抖音</option>
            <option value="kuaishou">快手</option>
          </select>
        </div>
      </div>

      {/* 平台特定提示 */}
      <div className={`mb-6 p-4 rounded-lg border-l-4 ${
        selectedPlatform === 'tmall' 
          ? 'bg-blue-50 border-blue-400'
          : selectedPlatform === 'jd'
          ? 'bg-red-50 border-red-400'
          : selectedPlatform === 'pdd'
          ? 'bg-orange-50 border-orange-400'
          : selectedPlatform === 'douyin'
          ? 'bg-gray-50 border-gray-400'
          : 'bg-purple-50 border-purple-400'
      }`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {selectedPlatform === 'tmall' && '🛍️'}
            {selectedPlatform === 'jd' && '🏪'}
            {selectedPlatform === 'pdd' && '🎯'}
            {selectedPlatform === 'douyin' && '📱'}
            {selectedPlatform === 'kuaishou' && '📹'}
          </div>
          <div className="ml-3">
            <p className={`text-sm ${
              selectedPlatform === 'tmall' 
                ? 'text-blue-700'
                : selectedPlatform === 'jd'
                ? 'text-red-700'
                : selectedPlatform === 'pdd'
                ? 'text-orange-700'
                : selectedPlatform === 'douyin'
                ? 'text-gray-700'
                : 'text-purple-700'
            }`}>
              {selectedPlatform === 'tmall' && '天猫平台规则管理'}
              {selectedPlatform === 'jd' && '京东平台规则管理'}
              {selectedPlatform === 'pdd' && '拼多多平台规则管理'}
              {selectedPlatform === 'douyin' && '抖音平台规则管理'}
              {selectedPlatform === 'kuaishou' && '快手平台规则管理'}
            </p>
          </div>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {[
            '规则库',
            '规则变更',
            '影响分析',
            '运营指导',
            '规则对比',
            '电商规范'
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
          <Tab.Panel><RuleLibrary platformId={selectedPlatform} /></Tab.Panel>
          <Tab.Panel><RuleChanges platformId={selectedPlatform} /></Tab.Panel>
          <Tab.Panel><RuleImpactAnalysis platformId={selectedPlatform} dateRange={dateRange} /></Tab.Panel>
          <Tab.Panel><OperationGuide platformId={selectedPlatform} /></Tab.Panel>
          <Tab.Panel><RuleComparison platformId={selectedPlatform} /></Tab.Panel>
          <Tab.Panel><EcommerceRules platformId={selectedPlatform} /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}