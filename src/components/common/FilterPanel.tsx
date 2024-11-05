import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface Props {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
}

export function FilterPanel({ filters, selectedFilters, onFilterChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {filters.map((group) => (
          <div key={group.id} className="relative">
            <select
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedFilters[group.id]?.[0] || ''}
              onChange={(e) => onFilterChange(group.id, [e.target.value])}
            >
              <option value="">{group.label}</option>
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
}