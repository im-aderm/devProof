"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function TopNavbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/10 shadow-sm flex items-center justify-between px-6 h-20 w-full">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
          <input 
            className="w-full bg-surface-container-high/50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50 transition-all outline-none text-on-surface" 
            placeholder="Search Intelligence Ledger..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-colors active:scale-95 duration-200">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>

        <div className="h-8 w-px bg-outline-variant/20"></div>

        <div className="flex items-center gap-4 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-on-surface leading-none uppercase tracking-tight">{session?.user?.name || "Guest Developer"}</p>
            <p className="text-[10px] font-bold text-primary tracking-widest mt-1.5 uppercase opacity-80">Verified Intel</p>
          </div>
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer shadow-lg shadow-primary/10">
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              src={session?.user?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"} 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
