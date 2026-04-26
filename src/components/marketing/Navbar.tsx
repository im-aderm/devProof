"use client";

import Link from "next/link";
export default function Navbar() {

  return (
    <header className="fixed top-0 z-50 mx-auto flex w-full max-w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3 font-inter antialiased shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-none">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
          DevProof
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Portfolio
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Analysis
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Talent Explorer
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Pricing
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] dark:bg-indigo-400 dark:text-slate-950"
          >
            Dashboard
          </Link>
      </div>
    </header>
  );
}
