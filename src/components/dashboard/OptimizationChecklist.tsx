"use client";

import { motion } from "framer-motion";

interface OptimizationChecklistProps {
  items: string[];
  completedItems: string[];
}

export default function OptimizationChecklist({ items, completedItems }: OptimizationChecklistProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {completedItems.map((item, idx) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          key={`comp-${idx}`} 
          className="flex items-center gap-4 p-5 bg-surface border border-border rounded-2xl group hover:border-success/30 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center border border-success/20">
            <span className="material-symbols-outlined text-success text-lg font-bold">check</span>
          </div>
          <span className="text-text-primary text-sm font-bold">{item}</span>
        </motion.div>
      ))}
      
      {items.map((item, idx) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (completedItems.length + idx) * 0.05 }}
          key={`sug-${idx}`} 
          className="flex items-center gap-4 p-5 bg-surface/50 border border-border border-dashed rounded-2xl group hover:border-primary/30 transition-all"
        >
          <div className="w-8 h-8 rounded-xl border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors"></div>
          </div>
          <span className="text-text-secondary text-sm italic group-hover:text-text-primary transition-colors">{item}</span>
        </motion.div>
      ))}
    </div>
  );
}
