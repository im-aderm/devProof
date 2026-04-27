"use client";

import { motion } from "framer-motion";

interface GrowthForecastProps {
  velocity: string;
  tier: string;
  status: string;
  description: string;
}

export default function GrowthForecast({ velocity, tier, status, description }: GrowthForecastProps) {
  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-start gap-4 p-5 bg-surface border border-border rounded-2xl group hover:border-primary/30 transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-indigo-800/50">
          <span className="material-symbols-outlined text-primary text-2xl">trending_up</span>
        </div>
        <div>
          <h4 className="text-text-primary font-black text-sm mb-1 uppercase tracking-tight">{velocity}</h4>
          <p className="text-text-secondary text-xs leading-relaxed">{description}</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-start gap-4 p-5 bg-surface border border-border rounded-2xl group hover:border-primary/30 transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center flex-shrink-0 border border-indigo-100 dark:border-indigo-800/50">
          <span className="material-symbols-outlined text-primary text-2xl">insights</span>
        </div>
        <div>
          <h4 className="text-text-primary font-black text-sm mb-1 uppercase tracking-tight">{tier} Projection</h4>
          <p className="text-text-secondary text-xs leading-relaxed">System status: {status}. Trajectory optimized for high-performance engineering.</p>
        </div>
      </motion.div>
    </div>
  );
}
