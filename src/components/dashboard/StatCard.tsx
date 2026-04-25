export default function StatCard({ label, value, trend, icon, color }: {
  label: string;
  value: string | number;
  trend?: string;
  icon: string;
  color: "primary" | "secondary" | "tertiary";
}) {
  const colorMap = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    tertiary: "text-tertiary bg-tertiary/10",
  };

  return (
    <div className="glass-card rounded-xl p-6 border-outline-variant/20">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {trend && (
          <span className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-on-surface">{value}</h3>
      </div>
    </div>
  );
}
