"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopNavbar({ userName = "Alex Rivera", role = "SENIOR ENGINEER" }: { userName?: string, role?: string }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm flex items-center justify-between px-6 h-16 w-full">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input 
            className="w-full bg-slate-100/50 dark:bg-slate-900/50 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none" 
            placeholder="Search developer data..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-colors active:scale-95 duration-200 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{userName}</p>
            <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider mt-1">{role}</p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-indigo-500/10 hover:ring-indigo-500/30 transition-all cursor-pointer">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
