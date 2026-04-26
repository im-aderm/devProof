"use client";

import { useState } from "react";

export default function ExportDropdown({ data, filename }: { data: any; filename: string }) {
  const [open, setOpen] = useState(false);

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const downloadCSV = () => {
    // Basic CSV for repos if available
    let csvContent = "data:text/csv;charset=utf-8,";
    if (data.repos) {
      csvContent += "Name,Stars,Forks,Language,URL\n";
      data.repos.forEach((r: any) => {
        csvContent += `${r.name},${r.stargazers_count || r.stars},${r.forks_count || r.forks},${r.language},${r.html_url || r.url}\n`;
      });
    } else {
      csvContent += "Key,Value\n";
      Object.entries(data).forEach(([k, v]) => {
        if (typeof v !== 'object') csvContent += `${k},${v}\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  const printPDF = () => {
    window.print();
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left no-print">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface rounded-lg font-bold border border-outline-variant hover:bg-surface-container-highest transition-all"
      >
        <span className="material-symbols-outlined text-primary">download</span>
        Export Report
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-2xl z-[100] p-2 overflow-hidden">
          <button 
            onClick={printPDF}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-on-surface hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
            Export as PDF
          </button>
          <button 
            onClick={downloadJSON}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-on-surface hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-lg">data_object</span>
            Export as JSON
          </button>
          <button 
            onClick={downloadCSV}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-on-surface hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-lg">csv</span>
            Export as CSV
          </button>
          <button 
            onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                setOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-on-surface hover:bg-primary/10 hover:text-primary rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-lg">content_copy</span>
            Copy Data
          </button>
        </div>
      )}
    </div>
  );
}
