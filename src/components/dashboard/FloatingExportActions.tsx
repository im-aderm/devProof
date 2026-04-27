"use client";

interface FloatingExportActionsProps {
  onExport: (format: string) => void;
}

export default function FloatingExportActions({ onExport }: FloatingExportActionsProps) {
  return (
    <div className="fixed right-12 bottom-12 flex flex-col gap-4 z-40">
      <button 
        onClick={() => onExport('csv')}
        className="w-12 h-12 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface rounded-xl flex items-center justify-center border border-outline-variant shadow-2xl transition-all hover:scale-110 group"
        title="Export CSV"
      >
        <span className="material-symbols-outlined">table_chart</span>
      </button>
      
      <button 
        onClick={() => onExport('pdf')}
        className="w-12 h-12 bg-primary text-surface-container-lowest rounded-xl flex items-center justify-center shadow-xl shadow-primary/20 transition-all hover:scale-110 hover:rotate-3 group"
        title="Export PDF"
      >
        <span className="material-symbols-outlined">picture_as_pdf</span>
      </button>
    </div>
  );
}
