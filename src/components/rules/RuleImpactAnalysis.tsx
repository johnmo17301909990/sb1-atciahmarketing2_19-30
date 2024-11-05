import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props {
  platformId: string;
  dateRange: string;
}

export function RuleImpactAnalysis({ platformId, dateRange }: Props) {
  // Mock data
  const data = {
    affectedProducts: 2580,
    productPercentage: 35.8,
    conversionChange: 2.5,
    trafficImpact: 1.8,
    complianceRate: 95.5,
    complianceImprovement: 3.2,
    trends: [
      { date: '2024-01-01', conversion: 4.2, traffic: 100, compliance: 92 },
      { date: '2024-01-02', conversion: 4.5, traffic: 105, compliance: 93 },
      { date: '2024-01-03', conversion: 4.8, traffic: 108, compliance: 94 },
      { date: '2024-01-04', conversion: 4.6, traffic: 102, compliance: 95 },
      { date: '2024-01-05', conversion: 4.9, traffic: 110, compliance: 96 }
    ],
    categoryImpacts: [
      { category: '3C数码', affectedProducts: 580, impactScore: 85 },
      { category: '服装', affectedProducts: 420, impactScore: 75 },
      { category: '美妆', affectedProducts: 380, impactScore: 82 },
      { category: '食品', affectedProducts: 320, impactScore: 78 }
    ],
    ruleTypeImpacts: [
      { type: '商品信息', value: 35 },
      { type: '价格展示', value: 25 },
      { type: '促销规则', value: 20 },
      { type: '物流规则', value: 15 },
      { type: '其他规则', value: 5 }
    ],
    riskAnalysis: [
      {
        type: '商品信息',
        violationCount: 158,
        violationRate: 3.2,
        severity: 'high',
        suggestion: '及时更新商品信息，确保合规'
      },
      {
        type: '价格展示',
        violationCount: 86,
        violationRate: 1.8,
        severity: 'medium',
        suggestion: '检查价格显示是否符合要求'
      }
    ]
  };

  const COLORS = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

  return (
    <div className="space-y-6">
      {/* 影响概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">受影响商品数</h4>
          <p className="text-3xl font-bold text-blue-600">{data.affectedProducts}</p>
          <p className="text-sm text-gray-500">占总商品{data.productPercentage}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">转化率变化</h4>
          <p className="text-3xl font-bold text-green-600">{data.conversionChange}%</p>
          <p className="text-sm text-gray-500">较规则变更前</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">流量影响</h4>
          <p className="text-3xl font-bold text-purple-600">{data.trafficImpact}%</p>
          <p className="text-sm text-gray-500">较规则变更前</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">合规率</h4>
          <p className="text-3xl font-bold text-orange-600">{data.complianceRate}%</p>
          <p className="text-sm text-gray-500">较上月提升{data.complianceImprovement}%</p>
        </div>
      </div>

      {/* 趋势分析 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">规则影响趋势</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="conversion" name="转化率" stroke="#8884d8" />
              <Line type="monotone" dataKey="traffic" name="流量" stroke="#82ca9d" />
              <Line type="monotone" dataKey="compliance" name="合规率" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 类目影响分析 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">类目影响分析</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.categoryImpacts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="affectedProducts" name="受影响商品数" fill="#8884d8" />
                <Bar dataKey="impactScore" name="影响程度" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 规则类型影响分布 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">规则类型影响分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.ruleTypeImpacts}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.ruleTypeImpacts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 违规风险分析 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">违规风险分析</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">规则类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">违规商品数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">违规率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">处罚等级</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">建议</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.riskAnalysis.map((risk) => (
                <tr key={risk.type}>
                  <td className="px-6 py-4 whitespace-nowrap">{risk.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{risk.violationCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{risk.violationRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      risk.severity === 'high'
                        ? 'bg-red-100 text-red-800'
                        : risk.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {risk.severity === 'high' ? '严重' :
                       risk.severity === 'medium' ? '中等' : '轻微'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{risk.suggestion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}