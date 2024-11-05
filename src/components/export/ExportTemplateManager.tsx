import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ExportTemplate } from '../../types/export';
import { useExportTemplates } from '../../hooks/useExportTemplates';

export function ExportTemplateManager() {
  const { templates, createTemplate, updateTemplate, deleteTemplate } = useExportTemplates();
  const [editingTemplate, setEditingTemplate] = useState<ExportTemplate | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTemplate) {
      if (editingTemplate.id) {
        await updateTemplate(editingTemplate);
      } else {
        await createTemplate(editingTemplate);
      }
      setEditingTemplate(null);
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">导出模板管理</h2>
        <button
          onClick={() => {
            setEditingTemplate({
              id: '',
              name: '',
              format: 'excel',
              options: {},
              columns: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          新建模板
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {templates.map((template) => (
            <li key={template.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  {template.description && (
                    <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                  )}
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span className="mr-4">格式: {template.format.toUpperCase()}</span>
                    <span>列数: {template.columns.length}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setEditingTemplate(template);
                      setShowForm(true);
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
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

      {showForm && editingTemplate && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-medium mb-4">
              {editingTemplate.id ? '编辑模板' : '新建模板'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">模板名称</label>
                <input
                  type="text"
                  value={editingTemplate.name}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">描述</label>
                <textarea
                  value={editingTemplate.description || ''}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTemplate(null);
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