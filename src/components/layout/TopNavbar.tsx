"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface TopNavbarProps {
  onMenuClick?: () => void;
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export default function TopNavbar({ onMenuClick, user }: TopNavbarProps) {
  const { data: session } = useSession();
  
  // Use provided user info, or fallback to session user
  const displayUser = user || session?.user;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-40 flex items-center justify-between px-8 md:px-12 h-24 w-full">
      <div className="flex items-center gap-6 flex-1">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        
        <div className="max-w-xl w-full hidden md:block">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors text-xl">search</span>
            <input 
              type="text" 
              placeholder="Execute Global Command..." 
              className="w-full pl-14 pr-6 py-3 bg-white/5 border border-white/5 rounded-2xl focus:ring-1 focus:ring-primary/40 outline-none font-black text-[10px] uppercase tracking-[0.2em] transition-all placeholder:text-white/10"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center gap-4 px-6 py-2.5 bg-white/5 border border-white/5 rounded-2xl">
           <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
           <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Protocol Active</span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-4 p-1 rounded-2xl hover:bg-white/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                src={displayUser?.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"} 
                alt={displayUser?.name || "User"}
              />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1.5">{displayUser?.name || "Developer"}</p>
              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">System Op</p>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-4 w-64 bg-surface border border-white/10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] p-3 z-50 overflow-hidden">
               <div className="px-5 py-4 border-b border-white/5 mb-2">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">{displayUser?.email || "Protocol Active"}</p>
               </div>
               <Link href="/u/profile" className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white">
                  <span className="material-symbols-outlined text-lg">person</span>
                  Ledger Profile
               </Link>
               <Link href="/settings" className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white">
                  <span className="material-symbols-outlined text-lg">settings</span>
                  Configuration
               </Link>
               <button 
                 onClick={() => signOut()}
                 className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-rose-500/10 transition-all text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mt-2"
               >
                  <span className="material-symbols-outlined text-lg">logout</span>
                  Terminate
               </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
