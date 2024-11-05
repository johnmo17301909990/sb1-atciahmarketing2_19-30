import React, { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { ExportService } from '../../services/exportService';
import { ExportFormat, ExportOptions, ExportData } from '../../types/export';

interface BatchExportItem {
  id: string;
  name: string;
  data: ExportData;
  options?: ExportOptions;
}

interface Props {
  items: BatchExportItem[];
  defaultFormat?: ExportFormat;
  formats?: ExportFormat[];
  onExport?: (results: Array<{ id: string; success: boolean }>) => void;
  onError?: (error: Error) => void;
}

export function BatchExportButton({
  items,
  defaultFormat = 'excel',
  formats = ['excel', 'csv', 'pdf', 'json'],
  onExport,
  onError
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleExport = async (format: ExportFormat) => {
    try {
      setLoading(true);
      const results = [];

      for (const item of items) {
        if (selectedItems.has(item.id)) {
          try {
            await ExportService.exportData(
              item.data,
              format,
              {
                fileName: `${item.name}_${new Date().toISOString().split('T')[0]}.${format}`,
                ...item.options
              }
            );
            results.push({ id: item.id, success: true });
          } catch (error) {
            results.push({ id: item.id, success: false });
          }
        }
      }

      onExport?.(results);
    } catch (error) {
      console.error('Batch export failed:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
      setShowFormats(false);
      setSelectedItems(new Set());
    }
  };

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.size === items.length}
              onChange={toggleAll}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">全选</span>
          </div>
          <button
            onClick={() => setShowFormats(!showFormats)}
            disabled={loading || selectedItems.size === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            <DocumentDuplicateIcon className="-ml-1 mr-2 h-5 w-5" />
            {loading ? '导出中...' : '批量导出'}
          </button>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleItem(item.id)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>

        {showFormats && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => handleExport(format)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  导出为 {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}