"use client";

import { motion } from "framer-motion";

interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionGraphProps {
  data: {
    totalContributions: number;
    weeks: ContributionWeek[];
  } | null;
}

export default function ContributionGraph({ data }: ContributionGraphProps) {
  if (!data) return (
    <div className="w-full h-32 flex items-center justify-center border border-border/50 rounded-2xl bg-surface-variant/50 italic text-text-secondary text-xs">
      Contribution data unavailable.
    </div>
  );

  // Map GitHub colors to our theme
  const getLevelColor = (count: number) => {
    if (count === 0) return "bg-white/5";
    if (count < 3) return "bg-indigo-500/20";
    if (count < 6) return "bg-indigo-500/40";
    if (count < 10) return "bg-indigo-500/70";
    return "bg-primary"; // Cyan/Indigo primary
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Logic to show month labels at the top
  const monthLabels: { label: string; weekIdx: number }[] = [];
  let currentMonth = -1;

  data.weeks.forEach((week, weekIdx) => {
    const firstDay = new Date(week.contributionDays[0].date);
    const month = firstDay.getMonth();
    if (month !== currentMonth) {
      monthLabels.push({ label: months[month], weekIdx });
      currentMonth = month;
    }
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[10px] font-black text-text-primary uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          {data.totalContributions} Contributions in the last year
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="text-[8px] font-black text-text-secondary uppercase tracking-widest opacity-40 mr-1">Less</span>
          {[0, 2, 5, 8, 12].map((lvl) => (
            <div key={lvl} className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(lvl)}`}></div>
          ))}
          <span className="text-[8px] font-black text-text-secondary uppercase tracking-widest opacity-40 ml-1">More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="min-w-[700px] flex flex-col gap-2">
          {/* Month Labels */}
          <div className="flex text-[8px] font-black text-text-secondary uppercase tracking-widest opacity-40 h-3 relative">
            {monthLabels.map((m, i) => (
              <div 
                key={i} 
                className="absolute" 
                style={{ left: `${(m.weekIdx / data.weeks.length) * 100}%` }}
              >
                {m.label}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {data.weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {week.contributionDays.map((day, dayIdx) => (
                  <motion.div
                    key={dayIdx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (weekIdx * 0.01) + (dayIdx * 0.005) }}
                    className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(day.contributionCount)} hover:ring-1 hover:ring-primary transition-all cursor-crosshair`}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
