import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const marketShareData = [
  { month: '1月', 我方: 32, 竞品A: 28, 竞品B: 24, 竞品C: 16 },
  { month: '2月', 我方: 34, 竞品A: 27, 竞品B: 23, 竞品C: 16 },
  { month: '3月', 我方: 33, 竞品A: 28, 竞品B: 24, 竞品C: 15 },
  { month: '4月', 我方: 35, 竞品A: 26, 竞品B: 23, 竞品C: 16 },
  { month: '5月', 我方: 37, 竞品A: 25, 竞品B: 22, 竞品C: 16 },
  { month: '6月', 我方: 38, 竞品A: 24, 竞品B: 22, 竞品C: 16 },
];

const competitorMetricsData = [
  { subject: '品牌知名度', 我方: 85, 竞品A: 78, 竞品B: 72 },
  { subject: '用户满意度', 我方: 92, 竞品A: 85, 竞品B: 80 },
  { subject: '市场份额', 我方: 38, 竞品A: 24, 竞品B: 22 },
  { subject: '产品创新', 我方: 88, 竞品A: 82, 竞品B: 75 },
  { subject: '价格竞争力', 我方: 75, 竞品A: 82, 竞品B: 85 },
];

const socialMentionsData = [
  { platform: '微博', 正面: 850, 中性: 420, 负面: 130 },
  { platform: '小红书', 正面: 920, 中性: 380, 负面: 90 },
  { platform: '抖音', 正面: 780, 中性: 450, 负面: 110 },
  { platform: '知乎', 正面: 680, 中性: 520, 负面: 150 },
];

interface Props {
  dateRange: string;
}

export function CompetitorAnalysis({ dateRange }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">市场份额趋势</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketShareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="我方" stroke="#8884d8" />
              <Line type="monotone" dataKey="竞品A" stroke="#82ca9d" />
              <Line type="monotone" dataKey="竞品B" stroke="#ffc658" />
              <Line type="monotone" dataKey="竞品C" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">竞争力分析</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competitorMetricsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="我方" dataKey="我方" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="竞品A" dataKey="竞品A" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="竞品B" dataKey="竞品B" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">社交媒体口碑分析</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socialMentionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="正面" stackId="a" fill="#82ca9d" />
                <Bar dataKey="中性" stackId="a" fill="#ffc658" />
                <Bar dataKey="负面" stackId="a" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}