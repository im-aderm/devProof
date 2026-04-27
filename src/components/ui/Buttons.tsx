import React from "react";

export function PrimaryButton({
  children,
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button"
}: {
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`primary-gradient text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {icon && <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>}
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button"
}: {
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`text-text-secondary hover:text-text-primary hover:bg-surface-variant px-4 py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
      {children}
    </button>
  );
}

export function IconButton({
  icon,
  onClick,
  className = "",
  disabled = false
}: {
  icon: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`material-symbols-outlined text-text-secondary p-2 hover:bg-surface-variant rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
    >
      {icon}
    </button>
  );
}

export function FloatingFAB({
  icon,
  label,
  onClick,
  className = ""
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
      <button
        onClick={onClick}
        className="w-14 h-14 primary-gradient shadow-xl shadow-indigo-500/20 rounded-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </button>
    </div>
  );
}
