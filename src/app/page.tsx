import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  return (
    <div className="bg-background min-h-screen text-on-surface">
      {/* Navigation */}
      <header className="bg-background/80 backdrop-blur-md border-b border-outline-variant/10 sticky top-0 z-50 flex items-center justify-between px-12 h-24 w-full">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-display font-bold tracking-tighter bg-primary-gradient bg-clip-text text-transparent uppercase">
            DevProof
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-label-md font-bold uppercase tracking-widest">
            <Link href="/" className="text-primary">Home</Link>
            <Link href="#features" className="text-on-surface-variant hover:text-on-surface transition-colors">Intelligence</Link>
            <Link href="/compare" className="text-on-surface-variant hover:text-on-surface transition-colors">Benchmark</Link>
            <Link href="/about" className="text-on-surface-variant hover:text-on-surface transition-colors">Protocol</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <Link href="/dashboard" className="px-6 py-2.5 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              Terminal
            </Link>
          ) : (
            <Link href="/login" className="px-6 py-2.5 bg-on-surface text-background rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all">
              Initialize
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="py-32 grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Neural Engineering Audit
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight leading-[0.9] uppercase">
              The <span className="bg-primary-gradient bg-clip-text text-transparent">Obsidian</span> Ledger
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed font-medium">
              Transform raw GitHub activity into high-fidelity professional intel. Our AI audits architectural patterns to prove your engineering dominance.
            </p>
            <div className="flex flex-wrap gap-6 pt-6">
              {isLoggedIn ? (
                <Link href="/dashboard" className="px-10 py-5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95">
                  Enter Terminal
                </Link>
              ) : (
                <Link href="/login" className="px-10 py-5 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95">
                  Begin Audit
                </Link>
              )}
              <Link href="/u/demo" className="px-10 py-5 bg-surface-container-high text-on-surface rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-surface-container-highest hover:-translate-y-1 transition-all active:scale-95 border border-outline-variant/20">
                Live Demo
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[120px] opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <div className="relative bg-surface-container-low border border-outline-variant/30 rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-3xl transform group-hover:scale-[1.02] transition-transform duration-700">
              <div className="h-12 bg-surface-container-high/50 border-b border-outline-variant/20 flex items-center px-8 gap-3">
                <div className="w-3 h-3 rounded-full bg-error/40"></div>
                <div className="w-3 h-3 rounded-full bg-warning/40"></div>
                <div className="w-3 h-3 rounded-full bg-success/40"></div>
              </div>
              <div className="p-12">
                <div className="aspect-square bg-background rounded-2xl border border-outline-variant/10 flex flex-col items-center justify-center p-12 text-center space-y-6 relative overflow-hidden group/inner">
                  <div className="absolute inset-0 bg-primary-gradient opacity-[0.03] group-hover/inner:opacity-[0.07] transition-opacity"></div>
                  <span className="material-symbols-outlined text-primary text-8xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
                  <div className="space-y-3 relative z-10 w-full">
                    <div className="h-2 w-3/4 bg-surface-container-highest rounded-full mx-auto animate-pulse"></div>
                    <div className="h-2 w-1/2 bg-surface-container-high rounded-full mx-auto animate-pulse delay-75"></div>
                    <div className="h-2 w-2/3 bg-surface-container-highest rounded-full mx-auto animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-48 border-t border-outline-variant/10">
          <div className="text-center max-w-3xl mx-auto mb-32 space-y-4">
            <h2 className="text-label-md font-black text-primary uppercase tracking-[0.4em]">Capabilities</h2>
            <p className="text-5xl font-display font-black uppercase tracking-tighter">Engineered for the Elite</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] space-y-6 group hover:border-primary/30 transition-all">
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Persona Generation</h3>
              <p className="text-on-surface-variant leading-relaxed font-medium">
                Our LLMs distill years of commit history into a precise architectural persona, identifying your unique engineering signature.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] bg-primary-gradient text-white border-none shadow-2xl shadow-primary/20 space-y-6 scale-105 z-10">
              <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Verified Proof</h3>
              <p className="text-white/80 leading-relaxed font-medium">
                Stop telling recruiters what you can do. Send a cryptographically sound ledger of your real-world technical impact.
              </p>
              <Link href="/login" className="w-full py-4 bg-white text-primary rounded-xl font-black text-[10px] uppercase tracking-widest text-center hover:opacity-90 transition-all inline-block">
                Initialize Account
              </Link>
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] space-y-6 group hover:border-primary/30 transition-all">
              <div className="h-14 w-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">Benchmarking</h3>
              <p className="text-on-surface-variant leading-relaxed font-medium">
                Side-by-side architectural parity checks. Compare stack concentration, velocity, and code quality against industry standards.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant/10 py-24 px-12 bg-surface-container-lowest/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4">
            <span className="text-2xl font-display font-black bg-primary-gradient bg-clip-text text-transparent uppercase tracking-tighter">DevProof</span>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-50">© 2026 Obsidian Intelligence Protocol</p>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
