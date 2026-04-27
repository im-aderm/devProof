import React from "react";

export function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  className = ""
}: {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <div className={`relative flex items-center bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2 focus-within:border-primary/50 transition-colors ${className}`}>
      <span className="material-symbols-outlined text-on-surface-variant mr-2 text-lg">search</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant font-body-sm"
      />
    </div>
  );
}

export function ExportMenu({
  options = ["PDF", "JSON", "CSV"],
  onSelect,
  className = ""
}: {
  options?: string[];
  onSelect?: (format: string) => void;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label-bold flex items-center gap-2 hover:opacity-90 transition-all border border-outline-variant/30">
        <span className="material-symbols-outlined text-sm">download</span>
        Export
      </button>
      {/* Dropdown menu would go here, simplified for Phase 1 base component */}
    </div>
  );
}
