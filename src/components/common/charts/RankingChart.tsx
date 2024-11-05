import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatters } from '../../../utils/formatters';

interface Props {
  data: any[];
  metrics: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  xAxisKey: string;
  height?: number;
  tooltipFormatter?: (value: any) => string;
  layout?: 'horizontal' | 'vertical';
}

export function RankingChart({
  data,
  metrics,
  xAxisKey,
  height = 400,
  tooltipFormatter = formatters.number,
  layout = 'horizontal'
}: Props) {
  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          layout={layout}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey={xAxisKey} />
              <YAxis />
            </>
          ) : (
            <>
              <XAxis type="number" />
              <YAxis dataKey={xAxisKey} type="category" width={120} />
            </>
          )}
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
          {metrics.map((metric) => (
            <Bar
              key={metric.key}
              dataKey={metric.key}
              name={metric.name}
              fill={metric.color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}