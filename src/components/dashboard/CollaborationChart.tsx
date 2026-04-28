"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CollaborationChartProps {
  stats: {
    prCount: number;
    issueCount: number;
    reviewCount: number;
  };
}

export default function CollaborationChart({ stats }: CollaborationChartProps) {
  const data = [
    { name: "Authoring (PRs)", value: stats.prCount, color: "#4f46e5" },
    { name: "Support (Issues)", value: stats.issueCount, color: "#06b6d4" },
    { name: "Mentoring (Reviews)", value: stats.reviewCount, color: "#8b5cf6" },
  ];

  const total = data.reduce((acc, d) => acc + d.value, 0);

  if (total === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center italic text-text-secondary text-xs">
        No collaboration history found.
      </div>
    );
  }

  return (
    <div className="h-[240px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0F172A', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '10px',
              fontFamily: 'inherit',
              fontWeight: '900',
              textTransform: 'uppercase'
            }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-black text-text-primary">{total}</span>
        <span className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Total Actions</span>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
