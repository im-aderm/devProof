import React from "react";

export function PrimaryButton({
  children,
  icon,
  onClick,
  className = "",
  disabled = false
}: {
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none ${className}`}
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
  disabled = false
}: {
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 px-4 py-2 rounded-lg font-label-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none ${className}`}
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
      className={`material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors disabled:opacity-50 disabled:pointer-events-none ${className}`}
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
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </div>
      <button
        onClick={onClick}
        className="w-14 h-14 bg-primary shadow-xl shadow-primary/20 rounded-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </button>
    </div>
  );
}
