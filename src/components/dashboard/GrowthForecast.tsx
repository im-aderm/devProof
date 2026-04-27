"use client";

interface GrowthForecastProps {
  velocity: string;
  tier: string;
  status: string;
  description: string;
}

export default function GrowthForecast({ velocity, tier, status, description }: GrowthForecastProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary">trending_up</span>
        </div>
        <div>
          <h4 className="text-on-surface font-bold text-sm mb-1">{velocity}</h4>
          <p className="text-on-surface-variant text-xs">{description}</p>
        </div>
      </div>

      <div className="flex items-start gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-primary">verified</span>
        </div>
        <div>
          <h4 className="text-on-surface font-bold text-sm mb-1">{tier} Tier</h4>
          <p className="text-on-surface-variant text-xs">Projected growth trend: {status}</p>
        </div>
      </div>
    </div>
  );
}
