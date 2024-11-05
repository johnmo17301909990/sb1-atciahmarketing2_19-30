import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatters } from '../../../utils/formatters';

interface Props {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  height?: number;
  tooltipFormatter?: (value: any) => string;
  showPercentage?: boolean;
}

export function DistributionChart({
  data,
  colors,
  height = 300,
  tooltipFormatter = formatters.number,
  showPercentage = true
}: Props) {
  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, percent }) => 
              showPercentage ? `${name} ${(percent * 100).toFixed(0)}%` : name
            }
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={tooltipFormatter}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}