import React from 'react';
import { useSyncStatus } from '../hooks/useSyncStatus';
import { format } from 'date-fns';

interface Props {
  platformId: string;
  onSync: () => void;
}

export function SyncStatus({ platformId, onSync }: Props) {
  const { status, lastSync, loading, error } = useSyncStatus(platformId);

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        <span>加载中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">
        获取同步状态失败
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">同步状态:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === 'completed' 
              ? 'bg-green-100 text-green-800'
              : status === 'syncing'
              ? 'bg-blue-100 text-blue-800'
              : status === 'failed'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {status === 'completed' ? '已完成' :
             status === 'syncing' ? '同步中' :
             status === 'failed' ? '失败' : '未同步'}
          </span>
        </div>
        {lastSync && (
          <div className="text-sm text-gray-500">
            上次同步: {format(new Date(lastSync), 'yyyy-MM-dd HH:mm:ss')}
          </div>
        )}
      </div>
      <button
        onClick={onSync}
        disabled={status === 'syncing'}
        className={`px-4 py-2 rounded-md text-white ${
          status === 'syncing'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {status === 'syncing' ? '同步中...' : '立即同步'}
      </button>
    </div>
  );
}