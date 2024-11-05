import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  value: number;
  change?: number;
  formatter?: (value: number) => string;
  valueColor?: string;
}

export function MetricCard({
  title,
  value,
  change,
  formatter = (val) => String(val),
  valueColor = 'text-gray-900'
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className={`text-3xl font-bold ${valueColor}`}>
        {formatter(value)}
      </p>
      {typeof change !== 'undefined' && (
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          {change > 0 ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
          )}
          较上期{change > 0 ? '增长' : '下降'} {Math.abs(change)}%
        </p>
      )}
    </div>
  );
}