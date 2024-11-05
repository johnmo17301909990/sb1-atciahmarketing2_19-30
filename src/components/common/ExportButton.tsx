import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { ExportService } from '../../services/exportService';
import { ExportFormat, ExportOptions, ExportData } from '../../types/export';

interface Props {
  data: ExportData;
  defaultFormat?: ExportFormat;
  formats?: ExportFormat[];
  options?: ExportOptions;
  onExport?: (format: ExportFormat) => void;
  onError?: (error: Error) => void;
}

export function ExportButton({
  data,
  defaultFormat = 'excel',
  formats = ['excel', 'csv', 'pdf', 'json'],
  options = {},
  onExport,
  onError
}: Props) {
  const [loading, setLoading] = useState(false);
  const [showFormats, setShowFormats] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    try {
      setLoading(true);
      await ExportService.exportData(data, format, options);
      onExport?.(format);
    } catch (error) {
      console.error('Export failed:', error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
      setShowFormats(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFormats(!showFormats)}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
        {loading ? '导出中...' : '导出数据'}
      </button>

      {showFormats && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
  );
}