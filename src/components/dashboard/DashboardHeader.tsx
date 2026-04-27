"use client";

import Link from "next/link";

export default function DashboardHeader({ name }: { name: string }) {
  return (
    <header className="fixed top-0 left-0 w-full h-24 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 z-50 flex items-center justify-between px-12">
      <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-on-surface uppercase">
        DevProof
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        <Link href="/" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Home</Link>
        <Link href="/dashboard" className="text-label-md font-bold uppercase tracking-widest text-primary">Analyze</Link>
        <Link href="/compare" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Compare</Link>
        <Link href="/review" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Review</Link>
      </nav>

      <div className="flex items-center gap-6">
        <div className="text-right hidden xl:block">
          <p className="text-label-md font-bold text-on-surface uppercase tracking-widest">{name}</p>
          <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Live Intelligence</p>
        </div>
        <Link 
          href="/"
          className="px-6 py-2.5 bg-primary text-surface-container-lowest text-[10px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          Analyze Now
        </Link>
      </div>
    </header>
  );
}
