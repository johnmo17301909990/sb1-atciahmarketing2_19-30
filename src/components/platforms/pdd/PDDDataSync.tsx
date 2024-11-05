import React from 'react';
import { useSync } from '../../../hooks/useSync';
import { format } from 'date-fns';

interface Props {
  platformId: string;
}

export function PDDDataSync({ platformId }: Props) {
  const { status, lastSync, error, progress, startSync, cancelSync } = useSync(platformId);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">数据同步</h3>
        <div className="flex items-center space-x-2">
          {status === 'syncing' && (
            <button
              onClick={cancelSync}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              取消同步
            </button>
          )}
          <button
            onClick={startSync}
            disabled={status === 'syncing'}
            className={`px-4 py-2 rounded-md text-white transition-all ${
              status === 'syncing'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700'
            }`}
          >
            {status === 'syncing' ? '同步中...' : '立即同步'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">同步状态</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === 'success' 
              ? 'bg-green-100 text-green-800'
              : status === 'syncing'
              ? 'bg-blue-100 text-blue-800'
              : status === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {status === 'success' ? '已完成' :
             status === 'syncing' ? '同步中' :
             status === 'error' ? '失败' : '未同步'}
          </span>
        </div>

        {lastSync && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">上次同步</span>
            <span className="text-sm text-gray-500">
              {format(new Date(lastSync), 'yyyy-MM-dd HH:mm:ss')}
            </span>
          </div>
        )}

        {status === 'syncing' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>同步进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 rounded-full h-2 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}