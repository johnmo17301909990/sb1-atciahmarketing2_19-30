import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, ClockIcon } from '@heroicons/react/24/outline';
import { ExportSchedule } from '../../types/export';
import { useExportSchedules } from '../../hooks/useExportSchedules';
import { useExportTemplates } from '../../hooks/useExportTemplates';

export function ExportScheduleManager() {
  const { schedules, createSchedule, updateSchedule, deleteSchedule } = useExportSchedules();
  const { templates } = useExportTemplates();
  const [editingSchedule, setEditingSchedule] = useState<ExportSchedule | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchedule) {
      if (editingSchedule.id) {
        await updateSchedule(editingSchedule);
      } else {
        await createSchedule(editingSchedule);
      }
      setEditingSchedule(null);
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">定时导出管理</h2>
        <button
          onClick={() => {
            setEditingSchedule({
              id: '',
              name: '',
              templateId: '',
              frequency: 'daily',
              time: '00:00',
              timezone: 'Asia/Shanghai',
              recipients: [],
              enabled: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          新建定时任务
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <li key={schedule.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900">{schedule.name}</h3>
                  {schedule.description && (
                    <p className="mt-1 text-sm text-gray-500">{schedule.description}</p>
                  )}
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span className="mr-4">
                      {schedule.frequency} at {schedule.time} ({schedule.timezone})
                    </span>
                    <span>
                      {schedule.recipients.length} recipient{schedule.recipients.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setEditingSchedule(schedule);
                      setShowForm(true);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showForm && editingSchedule && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium mb-4">
              {editingSchedule.id ? '编辑定时任务' : '新建定时任务'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">任务名称</label>
                <input
                  type="text"
                  value={editingSchedule.name}
                  onChange={(e) =>
                    setEditingSchedule({ ...editingSchedule, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">导出模板</label>
                <select
                  value={editingSchedule.templateId}
                  onChange={(e) =>
                    setEditingSchedule({ ...editingSchedule, templateId: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">选择模板</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">频率</label>
                <select
                  value={editingSchedule.frequency}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      frequency: e.target.value as 'daily' | 'weekly' | 'monthly'
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">每天</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">时间</label>
                <input
                  type="time"
                  value={editingSchedule.time}
                  onChange={(e) =>
                    setEditingSchedule({ ...editingSchedule, time: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">收件人</label>
                <input
                  type="text"
                  value={editingSchedule.recipients.join(', ')}
                  onChange={(e) =>
                    setEditingSchedule({
                      ...editingSchedule,
                      recipients: e.target.value.split(',').map((email) => email.trim())
                    })
                  }
                  placeholder="多个邮箱用逗号分隔"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSchedule(null);
                    setShowForm(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}