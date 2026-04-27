"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
  data: { subject: string; A: number; fullMark: number }[];
}

export default function CodeQualityRadar({ data }: RadarChartProps) {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.05)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 10, fontWeight: "bold" }}
          />
          <Radar
            name="Developer"
            dataKey="A"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
