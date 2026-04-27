import React from "react";

export function StrengthCircle({ score, label, maxScore = 100 }: { score: number, label: string, maxScore?: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / maxScore) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-40 h-40 transform -rotate-90">
        <circle className="text-surface-container-highest" cx="80" cy="80" fill="transparent" r={radius} stroke="currentColor" strokeWidth="12"></circle>
        <circle 
          className="text-primary-container transition-all duration-1000 ease-out" 
          cx="80" cy="80" 
          fill="transparent" 
          r={radius} 
          stroke="currentColor" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          strokeLinecap="round" 
          strokeWidth="12"
        ></circle>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display-xl text-display-xl text-on-surface">{score}</span>
        <span className="font-label-bold text-on-surface-variant uppercase">{label}</span>
      </div>
    </div>
  );
}

export function ProgressBar({ percent, className = "", colorClass = "bg-gradient-to-r from-primary to-tertiary" }: { percent: number; className?: string; colorClass?: string }) {
  return (
    <div className={`h-1 w-full bg-surface-container-highest rounded-full overflow-hidden ${className}`}>
      <div className={`h-full ${colorClass} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }}></div>
    </div>
  );
}
