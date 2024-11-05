import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface Props {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  tooltipFormatter?: (value: number) => string;
}

export function FunnelChart({
  data,
  height = 400,
  tooltipFormatter = (value) => `${value}`
}: Props) {
  const maxValue = Math.max(...data.map(d => d.value));
  const defaultColors = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFD666', '#95DE64'];

  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <div className="relative w-full h-full flex flex-col justify-between">
          {data.map((item, index) => {
            const width = (item.value / maxValue) * 100;
            const marginLeft = (100 - width) / 2;
            
            return (
              <div
                key={index}
                className="relative flex items-center group"
                style={{ height: `${100 / data.length}%` }}
              >
                <div
                  className="h-full transition-all duration-300 group-hover:opacity-90"
                  style={{
                    width: `${width}%`,
                    marginLeft: `${marginLeft}%`,
                    backgroundColor: item.color || defaultColors[index % defaultColors.length],
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {tooltipFormatter(item.value)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ResponsiveContainer>
    </div>
  );
}