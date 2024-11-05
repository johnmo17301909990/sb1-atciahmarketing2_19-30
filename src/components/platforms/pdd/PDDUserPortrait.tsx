import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { MetricCard } from '../../common/charts/MetricCard';
import { DistributionChart } from '../../common/charts/DistributionChart';
import { RankingChart } from '../../common/charts/RankingChart';
import { ComparisonTable } from '../../common/charts/ComparisonTable';
import { UsersIcon, CurrencyYenIcon, ArrowPathIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { formatters } from '../../../utils/formatters';

const ageData = [
  { name: '18-24岁', value: 25 },
  { name: '25-34岁', value: 42 },
  { name: '35-44岁', value: 20 },
  { name: '45-54岁', value: 10 },
  { name: '55岁以上', value: 3 },
];

const genderData = [
  { name: '女性', value: 65 },
  { name: '男性', value: 35 },
];

const cityTierData = [
  { name: '三线及以下', value: 45, growth: 15.2 },
  { name: '二线城市', value: 28, growth: 8.5 },
  { name: '新一线', value: 18, growth: 5.2 },
  { name: '一线城市', value: 9, growth: 2.8 },
];

const consumptionData = [
  { level: '低价格敏感', value: 42, avgSpend: '10-30元', growth: 12.5 },
  { level: '中等价格敏感', value: 35, avgSpend: '30-50元', growth: 8.2 },
  { level: '高价值追求', value: 23, avgSpend: '50元以上', growth: 5.5 },
];

const behaviorData = [
  { type: '浏览商品', avgTime: '8.5分钟', frequency: '4.2次/天' },
  { type: '加购商品', avgTime: '2.5分钟', frequency: '1.8次/天' },
  { type: '下单支付', avgTime: '3.2分钟', frequency: '0.8次/天' },
  { type: '评价互动', avgTime: '1.5分钟', frequency: '0.5次/天' },
];

const COLORS = ['#F97316', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];
const GENDER_COLORS = ['#F97316', '#3B82F6'];

interface Props {
  dateRange: string;
}

export function PDDUserPortrait({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      {/* 关键指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="用户总数"
          value={286523}
          change={25.8}
          formatter={formatters.number}
          valueColor="text-orange-600"
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="客单价"
          value={25.8}
          change={12.5}
          formatter={formatters.currency}
          valueColor="text-green-600"
          icon={<CurrencyYenIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="复购率"
          value={42.5}
          change={5.2}
          formatter={(value) => `${value}%`}
          valueColor="text-blue-600"
          icon={<ArrowPathIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="会员占比"
          value={68.5}
          change={8.2}
          formatter={(value) => `${value}%`}
          valueColor="text-purple-600"
          icon={<UserGroupIcon className="w-6 h-6" />}
        />
      </div>

      {/* 用户分布 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">年龄分布</h3>
          <DistributionChart
            data={ageData}
            colors={COLORS}
            height={300}
            tooltipFormatter={(value) => `${value}%`}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">性别分布</h3>
          <DistributionChart
            data={genderData}
            colors={GENDER_COLORS}
            height={300}
            tooltipFormatter={(value) => `${value}%`}
          />
        </div>
      </div>

      {/* 城市和消费分布 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">城市层级分布</h3>
          <RankingChart
            data={cityTierData}
            metrics={[
              { key: 'value', name: '占比(%)', color: '#F97316' },
              { key: 'growth', name: '增长率(%)', color: '#22C55E' }
            ]}
            xAxisKey="name"
            height={300}
            layout="vertical"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">消费能力分布</h3>
          <RankingChart
            data={consumptionData}
            metrics={[
              { key: 'value', name: '占比(%)', color: '#22C55E' },
              { key: 'growth', name: '增长率(%)', color: '#F97316' }
            ]}
            xAxisKey="level"
            height={300}
            layout="vertical"
          />
        </div>
      </div>

      {/* 用户行为分析 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">用户行为分析</h3>
        <ComparisonTable
          data={behaviorData}
          columns={[
            { key: 'type', title: '行为类型' },
            { key: 'avgTime', title: '平均时长' },
            { key: 'frequency', title: '平均频次' }
          ]}
          rowKey="type"
        />
      </div>

      {/* 用户特征标签 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">用户特征标签</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold mb-2">消费习惯</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm mr-2">价格敏感</span>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm mr-2">促销偏好</span>
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">团购达人</span>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold mb-2">生活方式</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2">精打细算</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-2">实惠优先</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">性价比控</span>
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">购物特征</h4>
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">多多果园</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">秒杀狂魔</span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">拼单高手</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}