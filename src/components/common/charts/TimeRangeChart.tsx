import React, { useState } from 'react';
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
}

export function TimeRangeChart({
  data,
  metrics,
  xAxisKey,
  height = 400,
  tooltipFormatter = formatters.number
}: Props) {
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');
  const [zoomedData, setZoomedData] = useState(data);

  const handleMouseDown = (e: any) => {
    if (e) {
      setRefAreaLeft(e.activeLabel);
    }
  };

  const handleMouseMove = (e: any) => {
    if (refAreaLeft && e) {
      setRefAreaRight(e.activeLabel);
    }
  };

  const handleMouseUp = () => {
    if (refAreaLeft && refAreaRight) {
      // 确保左右区域顺序正确
      const left = Math.min(
        data.findIndex(d => d[xAxisKey] === refAreaLeft),
        data.findIndex(d => d[xAxisKey] === refAreaRight)
      );
      const right = Math.max(
        data.findIndex(d => d[xAxisKey] === refAreaLeft),
        data.findIndex(d => d[xAxisKey] === refAreaRight)
      );

      // 更新缩放数据
      setZoomedData(data.slice(left, right + 1));
    }
    setRefAreaLeft('');
    setRefAreaRight('');
  };

  const handleReset = () => {
    setZoomedData(data);
  };

  return (
    <div className="space-y-4">
      {zoomedData !== data && (
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          重置缩放
        </button>
      )}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={zoomedData}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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

            {refAreaLeft && refAreaRight && (
              <ReferenceArea
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
                fill="#8884d8"
                fillOpacity={0.3}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}