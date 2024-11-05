import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  platformId: string;
}

export function RuleChanges({ platformId }: Props) {
  // Mock data
  const changes = [
    {
      id: '1',
      type: 'add',
      category: '商品信息',
      title: '新增商品标题规范',
      description: '规范商品标题的长度、格式和关键信息要求',
      date: '2024-01-10',
      affectedProducts: 1200,
      conversionImpact: '+2.5%',
      metrics: [
        { date: '2024-01-10', conversion: 3.2 },
        { date: '2024-01-11', conversion: 3.5 },
        { date: '2024-01-12', conversion: 3.8 },
        { date: '2024-01-13', conversion: 4.2 },
        { date: '2024-01-14', conversion: 4.5 }
      ]
    },
    {
      id: '2',
      type: 'update',
      category: '商品图片',
      title: '更新主图要求',
      description: '提高商品主图的清晰度和质量要求',
      date: '2024-01-18',
      oldValue: '图片尺寸不小于800x800px',
      newValue: '图片尺寸不小于1200x1200px',
      affectedProducts: 850,
      conversionImpact: '+1.8%',
      metrics: [
        { date: '2024-01-18', conversion: 4.0 },
        { date: '2024-01-19', conversion: 4.2 },
        { date: '2024-01-20', conversion: 4.5 },
        { date: '2024-01-21', conversion: 4.8 },
        { date: '2024-01-22', conversion: 5.0 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* 规则变更统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">本月变更数</h4>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-500">较上月增加 3 条</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">重要变更</h4>
          <p className="text-3xl font-bold text-red-600">5</p>
          <p className="text-sm text-gray-500">需优先处理</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">平均处理时间</h4>
          <p className="text-3xl font-bold text-green-600">2.5天</p>
          <p className="text-sm text-gray-500">较上月缩短 0.5 天</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-semibold text-lg mb-2">合规率</h4>
          <p className="text-3xl font-bold text-purple-600">96.5%</p>
          <p className="text-sm text-gray-500">较上月提升 2.3%</p>
        </div>
      </div>

      {/* 规则变更时间线 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">规则变更时间线</h3>
          <div className="space-y-8">
            {changes.map((change, index) => (
              <div key={change.id} className="relative">
                {index !== changes.length - 1 && (
                  <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-gray-200" />
                )}
                <div className="relative flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    change.type === 'add' 
                      ? 'bg-green-100'
                      : change.type === 'update'
                      ? 'bg-blue-100'
                      : 'bg-red-100'
                  }`}>
                    <span className={`text-sm font-medium ${
                      change.type === 'add'
                        ? 'text-green-600'
                        : change.type === 'update'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}>
                      {change.type === 'add' ? '新' :
                       change.type === 'update' ? '改' : '删'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{change.title}</h4>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 mt-1">
                          {change.category}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(change.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{change.description}</p>
                    {change.type === 'update' && (
                      <div className="mt-4 space-y-2">
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">变更前</span>
                          <span className="text-sm text-gray-600">{change.oldValue}</span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">变更后</span>
                          <span className="text-sm text-gray-600">{change.newValue}</span>
                        </div>
                      </div>
                    )}
                    <div className="mt-4">
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={change.metrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="conversion" name="转化率" stroke="#8884d8" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <span className="text-sm text-gray-500">影响商品：{change.affectedProducts}</span>
                      <span className="text-sm text-gray-500">预计转化影响：{change.conversionImpact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}