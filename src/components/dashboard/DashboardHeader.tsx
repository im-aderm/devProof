"use client";

import Link from "next/link";

export default function DashboardHeader({ name }: { name: string }) {
  return (
    <header className="fixed top-0 left-0 w-full h-24 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 z-50 flex items-center justify-between px-12">
      <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-on-surface uppercase">
        DevProof
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Link href="/dashboard" className="text-label-md font-bold uppercase tracking-widest text-primary">Analyzer</Link>
        <Link href="/compare" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Compare</Link>
        <Link href="/review" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">AI Review</Link>
      </nav>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-label-md font-bold text-on-surface uppercase tracking-widest">{name}</p>
          <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Open Source Access</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">shield_person</span>
        </div>
      </div>
    </header>
  );
}
