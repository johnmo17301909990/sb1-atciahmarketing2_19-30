import React from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Props {
  data: Array<{
    subject: string;
    [key: string]: number | string;
  }>;
  metrics: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  height?: number;
  tooltipFormatter?: (value: any) => string;
}

export function RadarChart({
  data,
  metrics,
  height = 400,
  tooltipFormatter = (value) => `${value}`
}: Props) {
  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%">
          <PolarGrid gridType="circle" />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          
          {metrics.map((metric) => (
            <Radar
              key={metric.key}
              name={metric.name}
              dataKey={metric.key}
              stroke={metric.color}
              fill={metric.color}
              fillOpacity={0.3}
              data={data}
            />
          ))}
          
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}