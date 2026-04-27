"use client";

interface OptimizationChecklistProps {
  items: string[];
  completedItems: string[];
}

export default function OptimizationChecklist({ items, completedItems }: OptimizationChecklistProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {completedItems.map((item, idx) => (
        <div key={`comp-${idx}`} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30 group">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center border border-primary">
            <span className="material-symbols-outlined text-surface-container-lowest text-xs font-bold">check</span>
          </div>
          <span className="text-on-surface-variant text-sm font-medium">{item}</span>
        </div>
      ))}
      
      {items.map((item, idx) => (
        <div key={`sug-${idx}`} className="flex items-center gap-4 p-4 bg-surface-container-low/50 rounded-xl border border-outline-variant/20 border-dashed group">
          <div className="w-6 h-6 rounded-md border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors">
            <div className="w-1 h-1 rounded-full bg-outline-variant group-hover:bg-primary transition-colors"></div>
          </div>
          <span className="text-on-surface-variant/60 text-sm italic group-hover:text-on-surface-variant transition-colors">{item}</span>
        </div>
      ))}
    </div>
  );
}
