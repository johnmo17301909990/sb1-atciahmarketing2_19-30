import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';
import { formatters } from '../../../utils/formatters';

interface Props {
  data: any[];
  metrics: Array<{
    key: string;
    name: string;
    color: string;
    yAxisId?: string;
  }>;
  xAxisKey: string;
  height?: number;
  tooltipFormatter?: (value: any) => string;
  showComparison?: boolean;
  comparisonRange?: {
    start: string;
    end: string;
  };
}

export function ComparisonChart({
  data,
  metrics,
  xAxisKey,
  height = 400,
  tooltipFormatter = formatters.number,
  showComparison = false,
  comparisonRange
}: Props) {
  const [hoveredDate, setHoveredDate] = React.useState<string | null>(null);

  const handleMouseMove = (props: any) => {
    if (props?.activeLabel) {
      setHoveredDate(props.activeLabel);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            formatter={tooltipFormatter}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              padding: '12px'
            }}
            labelStyle={{ fontWeight: 'bold', marginBottom: '8px' }}
          />
          <Legend 
            verticalAlign="top"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingBottom: '20px'
            }}
          />
          
          {showComparison && comparisonRange && (
            <ReferenceArea
              x1={comparisonRange.start}
              x2={comparisonRange.end}
              fill="#F3F4F6"
              fillOpacity={0.3}
            />
          )}

          {metrics.map((metric) => (
            <Line
              key={metric.key}
              type="monotone"
              dataKey={metric.key}
              name={metric.name}
              stroke={metric.color}
              strokeWidth={2}
              yAxisId={metric.yAxisId || "left"}
              dot={{ r: 4, fill: metric.color }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              animationDuration={1000}
              animationBegin={200}
            />
          ))}

          {hoveredDate && (
            <ReferenceArea
              x1={hoveredDate}
              x2={hoveredDate}
              fill="#000"
              fillOpacity={0.05}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}