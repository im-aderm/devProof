import React from "react";

export function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-xl p-base md:p-8 ${className}`}>
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
    <GlassCard className={`flex flex-col justify-between ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-label-bold text-on-surface-variant uppercase tracking-widest">{title}</h3>
        {icon && <span className="material-symbols-outlined text-primary">{icon}</span>}
      </div>
      <div>
        <p className="font-display-xl text-display-xl text-on-surface leading-tight">{value}</p>
        {trend && (
          <p className={`font-label-bold flex items-center gap-1 mt-2 ${trendPositive ? 'text-success' : 'text-error'}`}>
            <span className="material-symbols-outlined text-sm">
              {trendPositive ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </p>
        )}
      </div>
    </GlassCard>
  );
}

export function RepoCard({
  name,
  description,
  stars,
  forks,
  language,
  imageUrl,
  className = ""
}: {
  name: string;
  description?: string;
  stars: number;
  forks: number;
  language?: string;
  imageUrl?: string;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all ${className}`}>
      {imageUrl && (
        <div className="aspect-video overflow-hidden bg-surface-variant">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-headline-md text-on-surface truncate">{name}</h3>
          <div className="flex gap-2 shrink-0">
            <span className="flex items-center gap-1 text-on-surface-variant font-label-bold">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {stars}
            </span>
            <span className="flex items-center gap-1 text-on-surface-variant font-label-bold">
              <span className="material-symbols-outlined text-sm">fork_right</span> {forks}
            </span>
          </div>
        </div>
        {description && (
          <p className="font-body-sm text-on-surface-variant line-clamp-2">
            {description}
          </p>
        )}
        <div className="pt-2 flex items-center gap-3">
          {language && (
            <span className="flex items-center gap-2 text-xs font-bold text-primary">
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              {language}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function SummaryCard({ title, children, icon, className = "" }: { title: string; children: React.ReactNode; icon?: string; className?: string }) {
  return (
    <div className={`glass-card p-6 rounded-xl space-y-4 ${className}`}>
      <h3 className="font-label-bold text-primary-fixed-dim uppercase flex items-center gap-2">
        {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
        {title}
      </h3>
      <div>
        {children}
      </div>
    </div>
  );
}
