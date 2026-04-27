"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">DevProof</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link href="/about" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all">About Us</Link>
          <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all">Contact</Link>
        </nav>

        <div className="flex items-center gap-4 flex-shrink-0">
          {session ? (
            <Link 
              href="/dashboard"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-indigo-400 transition-all px-6 py-3 border border-white/10 rounded-full bg-white/5"
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              href="/login"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-indigo-400 transition-all px-8 py-3 border border-white/10 rounded-full bg-white/5"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
