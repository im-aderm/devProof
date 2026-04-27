"use client";

interface StrengthScoreProps {
  score: number;
  percentile: number;
  badge: string;
}

export default function StrengthScore({ score, percentile, badge }: StrengthScoreProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-48 h-48 transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="url(#blue-gradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-display font-bold text-on-surface">{score}</span>
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{percentile}th PERCENTILE</span>
      </div>
      
      <div className="mt-6">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20">
          {badge} TIER
        </span>
      </div>
    </div>
  );
}
