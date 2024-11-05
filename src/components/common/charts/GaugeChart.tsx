import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  value: number;
  min?: number;
  max?: number;
  colors?: string[];
  height?: number;
  label?: string;
  formatter?: (value: number) => string;
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  colors = ['#FF4D4F', '#FFA940', '#52C41A'],
  height = 200,
  label,
  formatter = (val) => `${val}%`
}: Props) {
  // 计算角度和颜色
  const angle = ((value - min) / (max - min)) * 360;
  const colorIndex = Math.floor((angle / 360) * colors.length);
  const color = colors[Math.min(colorIndex, colors.length - 1)];

  // 构建仪表盘数据
  const data = [
    { value: value - min, color },
    { value: max - value, color: '#f0f0f0' }
  ];

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            dataKey="value"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ top: '40%' }}
      >
        <span className="text-3xl font-bold">{formatter(value)}</span>
        {label && <span className="text-sm text-gray-500 mt-1">{label}</span>}
      </div>
    </div>
  );
}