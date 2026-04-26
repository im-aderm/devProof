"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/analyze/${username.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Editorial Header */}
      <header className="h-24 flex items-center justify-between px-12 z-50">
        <div className="text-2xl font-display font-bold tracking-tighter text-on-surface uppercase">
          DevProof
        </div>
        <nav className="flex items-center gap-10">
          <Link href="/dashboard" className="text-label-md font-bold uppercase tracking-widest text-primary">Analyzer</Link>
          <Link href="/compare" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Compare</Link>
          <Link href="/review" className="text-label-md font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">AI Review</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Atmosphere Background Texture */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl z-10">
          <span className="inline-block px-4 py-1.5 mb-8 rounded-full bg-surface-container-high text-primary text-label-md font-bold uppercase tracking-widest border border-outline-variant">
            The Obsidian Ledger v2.0
          </span>
          
          <h1 className="font-display text-display-lg md:text-display-xl text-on-surface mb-6 leading-tight">
            Transform Activity into <br />
            <span className="text-primary italic">Proof of Skill.</span>
          </h1>
          
          <p className="font-sans text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            The open-source intelligence platform for elite developers. Analyze profiles, 
            audit repositories, and compare performance with surgical precision.
          </p>

          {/* Main Search Action */}
          <form onSubmit={handleAnalyze} className="max-w-2xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-surface-container-low rounded-2xl border border-outline-variant shadow-2xl">
              <div className="flex-grow flex items-center px-6">
                <span className="material-symbols-outlined text-on-surface-variant mr-3">alternate_email</span>
                <input 
                  type="text" 
                  placeholder="Enter GitHub Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-none py-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-0 outline-none text-body-lg font-medium"
                />
              </div>
              <button 
                type="submit"
                className="px-10 py-4 bg-primary-gradient text-surface-container-lowest font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95"
              >
                GENERATE LEDGER
              </button>
            </div>
          </form>

          {/* Quick Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Link href="/dashboard" className="group p-8 bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-all border border-outline-variant">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">analytics</span>
              <h3 className="font-display text-headline-sm text-on-surface mb-2">Account Analyzer</h3>
              <p className="text-body-sm text-on-surface-variant">Deep audit of GitHub profile, skills, and activity.</p>
            </Link>
            
            <Link href="/compare" className="group p-8 bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-all border border-outline-variant">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">compare_arrows</span>
              <h3 className="font-display text-headline-sm text-on-surface mb-2">Public Comparison</h3>
              <p className="text-body-sm text-on-surface-variant">Side-by-side performance benchmarking for talent.</p>
            </Link>

            <Link href="/review" className="group p-8 bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-all border border-outline-variant">
              <span className="material-symbols-outlined text-primary mb-4 text-3xl">code_blocks</span>
              <h3 className="font-display text-headline-sm text-on-surface mb-2">AI Code Review</h3>
              <p className="text-body-sm text-on-surface-variant">Structural and architectural patterns analyzed instantly.</p>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-12 px-12 border-t border-outline-variant bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-on-surface-variant font-label-md uppercase tracking-widest text-xs">
            © 2024 DevProof Technical Analysis. Open Source Intelligence.
          </div>
          <div className="flex gap-12">
            <Link href="/about" className="text-on-surface-variant hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">Documentation</Link>
            <Link href="https://github.com" className="text-on-surface-variant hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">GitHub</Link>
            <Link href="/terms" className="text-on-surface-variant hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">Legal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
