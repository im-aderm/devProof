"use client";

import { motion } from "framer-motion";
import { useId } from "react";

interface StrengthScoreProps {
  score: number;
  percentile: number;
  badge: string;
}

export default function StrengthScore({ score, percentile, badge }: StrengthScoreProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const gradientId = useId();

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative">
        <svg className="w-56 h-56 transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-border/30"
          />
          {/* Progress Circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="112"
            cy="112"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeLinecap="round"
            fill="transparent"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl font-black text-text-primary tracking-tighter"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest mt-1">/ 100</span>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
           <span className="material-symbols-outlined text-success text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
           <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{percentile}th PERCENTILE</span>
        </div>
        <span className="px-6 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-primary text-xs font-black uppercase tracking-[0.2em] border border-indigo-100 dark:border-indigo-800/50 shadow-sm">
          {badge} TIER
        </span>
      </div>
    </div>
  );
}
