import React from "react";

export function GlassCard({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`glass-card rounded-2xl p-6 md:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function MetricCard({
  title,
  value,
  trend,
  trendPositive,
  icon,
  className = ""
}: {
  title: string;
  value: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  icon?: string;
  className?: string;
}) {
  return (
    <GlassCard className={`flex items-center justify-between ${className}`}>
      <div>
        <p className="text-text-secondary text-[10px] font-black uppercase tracking-wider mb-2">{title}</p>
        <h3 className="text-3xl font-black text-text-primary tracking-tight">{value}</h3>
        {trend && (
          <p className={`flex items-center gap-1 mt-2 text-xs font-bold ${trendPositive ? 'text-success' : 'text-error'}`}>
            <span className="material-symbols-outlined text-sm">
              {trendPositive ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </p>
        )}
      </div>
      {icon && (
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
        </div>
      )}
    </GlassCard>
  );
}

export function RepoCard({
  name,
  description,
  stars,
  forks,
  language,
  className = ""
}: {
  name: string;
  description?: string;
  stars: number;
  forks: number;
  language?: string;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 p-6 ${className}`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary text-xl">folder</span>
          </div>
          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors truncate max-w-[200px]">{name}</h3>
        </div>
      </div>
      
      <p className="text-sm text-text-secondary mb-6 line-clamp-2 min-h-[40px] relative z-10">
        {description || "No project description provided."}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border relative z-10">
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>grade</span> {stars}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
            <span className="material-symbols-outlined text-sm">fork_right</span> {forks}
          </span>
        </div>
        {language && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{language}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function SummaryCard({ title, children, icon, className = "" }: { title: string; children: React.ReactNode; icon?: string; className?: string }) {
  return (
    <GlassCard className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
          </div>
        )}
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div>
        {children}
      </div>
    </GlassCard>
  );
}
