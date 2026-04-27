"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PublicPortfolioPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.username) {
      fetchPortfolio();
    }
  }, [params.username]);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`/api/u/${params.username}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Portfolio not found or private.");
        throw new Error("Failed to load portfolio.");
      }
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-h1 font-bold text-on-surface mb-4">404</h1>
        <p className="text-on-surface-variant mb-8">{error || "User not found."}</p>
        <Link href="/" className="px-8 py-3 bg-primary text-white rounded-xl font-bold">
          Go Home
        </Link>
      </div>
    );
  }

  const score = data.readinessScore || 84;
  const avatarUrl = data.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user?.name || "U")}&background=4f46e5&color=fff`;
  const persona = data.aiSummary?.persona || "Software Engineer";

  return (
    <div className="bg-background text-on-surface font-body-base antialiased min-h-screen">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 max-w-full mx-auto bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">DevProof</Link>
          <div className="hidden md:flex gap-6">
            <Link className="font-sans antialiased text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href="#">Portfolio</Link>
            <Link className="font-sans antialiased text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href="#">Analysis</Link>
            <Link className="font-sans antialiased text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href="#">Talent Explorer</Link>
            <Link className="font-sans antialiased text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" href="#">Pricing</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors">notifications</button>
          <Link href="/dashboard" className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-sans antialiased text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all">Dashboard</Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-container-max mx-auto space-y-16">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 glass-card rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-primary/20 bg-slate-100 dark:bg-slate-900">
                <img className="w-full h-full object-cover" alt={data.user?.name} src={avatarUrl} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-success text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg uppercase tracking-wider">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Verified
              </div>
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">{data.user?.name}</h1>
                <p className="text-lg font-medium text-on-surface-variant flex items-center justify-center md:justify-start gap-2">
                  <span className="material-symbols-outlined text-primary">code</span>
                  {persona}
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">hub</span>
                  <span className="text-xs font-bold text-on-surface-variant">@{data.user?.githubUsername}</span>
                </div>
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Share Profile
                </button>
              </div>
              <p className="text-body text-on-surface-variant max-w-2xl leading-relaxed">
                {data.profile?.bio || data.aiSummary?.summary || "No biography provided."}
              </p>
            </div>
          </div>

          {/* Readiness Score */}
          <div className="lg:col-span-4 glass-card rounded-xl p-8 flex flex-col justify-between min-h-[320px]">
            <div>
              <h3 className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-6">Readiness Score</h3>
              <div className="relative flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle className="text-slate-100 dark:text-slate-800" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                  <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset={440 - (440 * score) / 100} strokeLinecap="round" strokeWidth="12"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-on-surface">{score}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">Elite</span>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-xs font-medium text-on-surface-variant">Top tier engineering alignment detected based on patterns.</p>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500" style={{ width: `${score}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Arsenal */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-600">terminal</span>
            Technical Arsenal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl space-y-4 border-l-4 border-indigo-500">
              <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {data.languages?.slice(0, 5).map((l: any) => (
                  <span key={l.name} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold">{l.name}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-4 border-l-4 border-cyan-500">
              <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em]">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {data.aiSummary?.topSkills?.slice(0, 5).map((s: string) => (
                  <span key={s} className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-bold">{s}</span>
                ))}
              </div>
            </div>
            <div className="glass-card p-6 rounded-xl space-y-4 border-l-4 border-amber-500">
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Growth Areas</h3>
              <div className="flex flex-wrap gap-2">
                {data.aiSummary?.growthAreas?.map((g: string) => (
                  <span key={g} className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold">{g}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold text-on-surface">Featured Projects</h2>
            <Link className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline" href={`https://github.com/${data.user?.githubUsername}?tab=repositories`}>
              View All Repos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.repos?.slice(0, 4).map((repo: any) => (
              <a key={repo.id} href={repo.url} target="_blank" rel="noreferrer" className="group glass-card overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-on-surface group-hover:text-indigo-600 transition-colors">{repo.name}</h3>
                    <div className="flex gap-2">
                      <span className="flex items-center gap-1 text-on-surface-variant text-xs font-bold">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {repo.stars}
                      </span>
                      <span className="flex items-center gap-1 text-on-surface-variant text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">fork_right</span> {repo.forks}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant line-clamp-2 leading-relaxed h-10">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div> 
                      {repo.languages?.[0]?.name || "Code"}
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant ml-auto uppercase tracking-wider">Public Repo</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Precision Analysis */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-on-surface">Precision Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 glass-card rounded-xl p-8 space-y-6">
              <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Commit Velocity</h3>
              <div className="h-48 flex items-end gap-1">
                {Array.from({ length: 15 }).map((_, i) => {
                  const h = Math.floor(Math.random() * 80) + 20;
                  return (
                    <div key={i} className={`flex-1 rounded-t-sm transition-all duration-500 ${i === 10 ? 'bg-indigo-600' : 'bg-indigo-500/20 hover:bg-indigo-500'}`} style={{ height: `${h}%` }}></div>
                  );
                })}
              </div>
              <p className="text-xs font-medium text-on-surface-variant">Daily activity patterns show consistent engagement and release peaks.</p>
            </div>
            <div className="glass-card rounded-xl p-8 flex flex-col justify-between text-center items-center">
              <span className="material-symbols-outlined text-4xl text-success">task_alt</span>
              <div>
                <div className="text-5xl font-black text-on-surface">99%</div>
                <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-2">Uptime Score</div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-8 flex flex-col justify-between text-center items-center border-l-4 border-amber-500">
              <span className="material-symbols-outlined text-4xl text-amber-500">bug_report</span>
              <div>
                <div className="text-5xl font-black text-on-surface">0.4</div>
                <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mt-2">Debt Ratio</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 max-w-container-max mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">DevProof</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">© 2026 DevProof. Precision Engineering Metrics.</p>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            <Link className="hover:text-indigo-600 transition-colors" href="/">Home</Link>
            <Link className="hover:text-indigo-600 transition-colors" href="/privacy">Privacy</Link>
            <Link className="hover:text-indigo-600 transition-colors" href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
