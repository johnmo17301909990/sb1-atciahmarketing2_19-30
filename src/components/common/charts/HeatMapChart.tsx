import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface Props {
  data: Array<{
    x: string | number;
    y: string | number;
    value: number;
  }>;
  xLabels: string[];
  yLabels: string[];
  colors?: string[];
  height?: number;
  tooltipFormatter?: (value: number) => string;
}

export function HeatMapChart({
  data,
  xLabels,
  yLabels,
  colors = ['#fff5f5', '#ff7875', '#f5222d'],
  height = 400,
  tooltipFormatter = (value) => `${value}`
}: Props) {
  // 计算值的范围
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // 计算颜色
  const getColor = (value: number) => {
    const ratio = (value - minValue) / (maxValue - minValue);
    const colorIndex = Math.floor(ratio * (colors.length - 1));
    return colors[colorIndex];
  };

  // 计算单元格大小
  const cellWidth = 100 / xLabels.length;
  const cellHeight = 100 / yLabels.length;

  return (
    <div style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <div className="relative w-full h-full">
          {/* Y轴标签 */}
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-600">
            {yLabels.map((label, i) => (
              <div key={i} style={{ height: `${cellHeight}%` }} className="flex items-center">
                {label}
              </div>
            ))}
          </div>

          {/* 热力图主体 */}
          <div className="absolute left-12 right-0 top-0 bottom-12">
            {data.map((cell, i) => {
              const x = xLabels.indexOf(cell.x as string);
              const y = yLabels.indexOf(cell.y as string);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${x * cellWidth}%`,
                    top: `${y * cellHeight}%`,
                    width: `${cellWidth}%`,
                    height: `${cellHeight}%`,
                    backgroundColor: getColor(cell.value),
                  }}
                  className="border border-gray-100 transition-colors duration-200 hover:opacity-75"
                  title={tooltipFormatter(cell.value)}
                />
              );
            })}
          </div>

          {/* X轴标签 */}
          <div className="absolute left-12 right-0 bottom-0 h-12 flex justify-between text-xs text-gray-600">
            {xLabels.map((label, i) => (
              <div key={i} style={{ width: `${cellWidth}%` }} className="flex justify-center items-start">
                {label}
              </div>
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
}