"use client";

import { useId } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarChartProps {
  data: { subject: string; A: number; fullMark: number }[];
}

export default function CodeQualityRadar({ data }: RadarChartProps) {
  const gradientId = useId();

  return (
    <div className="w-full h-[320px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="currentColor" className="text-border/30" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "currentColor", fontSize: 9, fontWeight: 900, textAnchor: "middle" }}
            className="text-text-secondary uppercase tracking-widest"
          />
          <Radar
            name="Developer"
            dataKey="A"
            stroke="#4f46e5"
            fill={`url(#${gradientId})`}
            fillOpacity={0.5}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
