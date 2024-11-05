import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  lastSync: string;
  icon: string;
}

const dataSources: DataSource[] = [
  {
    id: '1',
    name: '天猫旗舰店',
    type: '电商平台',
    status: 'connected',
    lastSync: '2024-01-20 15:30',
    icon: '🛍️'
  },
  {
    id: '2',
    name: '微博官方账号',
    type: '社交媒体',
    status: 'connected',
    lastSync: '2024-01-20 14:45',
    icon: '🔄'
  },
  {
    id: '3',
    name: '抖音企业号',
    type: '短视频平台',
    status: 'connected',
    lastSync: '2024-01-20 16:00',
    icon: '📱'
  },
  {
    id: '4',
    name: '小红书账号',
    type: '社交电商',
    status: 'disconnected',
    lastSync: '2024-01-19 12:30',
    icon: '📖'
  }
];

const platformCategories = [
  {
    name: '电商平台',
    platforms: ['天猫', '京东', '拼多多', '抖音商城']
  },
  {
    name: '社交媒体',
    platforms: ['微博', '微信', 'LinkedIn', 'Twitter']
  },
  {
    name: '短视频平台',
    platforms: ['抖音', '快手', 'B站', '视频号']
  },
  {
    name: '社交电商',
    platforms: ['小红书', '得物', '微信小程序']
  }
];

export function DataSources() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">数据源管理</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <PlusIcon className="h-5 w-5 mr-2" />
          添加数据源
        </button>
      </div>

      {/* 已连接的数据源 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">已连接的数据源</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSources.map((source) => (
            <div key={source.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{source.icon}</span>
                  <div>
                    <h4 className="font-semibold">{source.name}</h4>
                    <p className="text-sm text-gray-500">{source.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  source.status === 'connected' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {source.status === 'connected' ? '已连接' : '未连接'}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                最后同步: {source.lastSync}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 可接入的平台 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">可接入的平台</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow p-4">
              <h4 className="font-semibold mb-3">{category.name}</h4>
              <div className="grid grid-cols-2 gap-2">
                {category.platforms.map((platform) => (
                  <button
                    key={platform}
                    className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}