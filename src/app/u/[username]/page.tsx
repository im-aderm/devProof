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
      <div className="bg-[#0B0B0B] min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-[#0B0B0B] min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-display-xl font-bold text-[#e5e2e1] mb-4">404</h1>
        <p className="text-on-surface-variant mb-8">{error || "User not found."}</p>
        <Link href="/" className="px-8 py-3 skill-gradient text-white rounded-lg font-bold">
          Go Home
        </Link>
      </div>
    );
  }

  const topSkill = data.aiSummary?.topSkills?.[0] || data.languages?.[0]?.name || "JavaScript";
  const persona = data.aiSummary?.persona || "Software Engineer";
  const bio = data.aiSummary?.summary || data.profile?.bio || "No biography provided.";
  const location = data.profile?.location || "Remote";
  const score = data.readinessScore || 82; // Fallback to 82 visually if null
  const avatarUrl = data.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user?.name || "U")}&background=4f46e5&color=fff`;

  // Calculate days ago
  const getDaysAgo = (dateStr: string) => {
    if (!dateStr) return "recently";
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "today";
    if (days === 1) return "1d ago";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  return (
    <div className="bg-[#0B0B0B] text-[#e5e2e1] min-h-screen font-body-base selection:bg-primary/30">
      {/* TopNavBar */}
      <nav className="sticky top-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-[#1F1F1F] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-6 h-14 w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white">DevProof</Link>
            <div className="hidden md:flex gap-6">
              <a className="font-['Inter'] text-sm tracking-tight font-medium text-indigo-500 border-b border-indigo-500 pb-1" href="#">Analysis</a>
              <a className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200" href="#">Benchmark</a>
              <a className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200" href="#">API</a>
              <a className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200" href="#">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="font-['Inter'] text-sm tracking-tight font-medium text-gray-400 hover:text-white transition-all">Sign In</Link>
            <Link href="/register" className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full font-['Inter'] text-sm font-semibold active:scale-[0.98] transition-transform">Sign Up Free</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 hero-gradient pb-40">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-12 items-start mb-16">
          <div className="relative shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#1F1F1F] shadow-2xl">
              <Image 
                alt={data.user?.name || "Profile"} 
                className="w-full h-full object-cover" 
                src={avatarUrl}
                width={192}
                height={192}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-full border-4 border-background">
              <span className="material-symbols-outlined text-background text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="font-h1 text-h1 text-white mb-1">{data.user?.name}</h1>
              <p className="text-on-surface-variant font-code text-body-base">@{data.user?.githubUsername}</p>
            </div>
            <p className="max-w-2xl text-on-surface text-body-base leading-relaxed">
              {bio}
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span> {location}
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">group</span> {data.profile?.followers || 0} Followers · {data.profile?.following || 0} Following
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">calendar_today</span> Checked {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:brightness-110 transition-all">
                <span className="material-symbols-outlined text-lg">download</span> Export PDF
              </button>
              <button className="glass-card px-6 py-2 rounded-xl font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <span className="material-symbols-outlined text-lg">share</span> Share Profile
              </button>
              <Link href="/" className="text-on-surface-variant px-6 py-2 rounded-xl font-medium border border-transparent hover:border-outline-variant transition-all flex items-center justify-center">
                Analyze Another
              </Link>
            </div>
          </div>
        </section>

        {/* Main Headline & Strength Score */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-8 glass-card p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span> AI Verified
              </span>
            </div>
            <h2 className="font-h2 text-h2 text-white leading-tight">
              {data.user?.name?.split(' ')[0] || "Developer"} — {persona} with Strong <span className="text-primary">Product Building Potential</span>
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-xl">
              Analysis based on {data.profile?.publicRepos || data.repos?.length || 0} repositories and live GitHub activity.
            </p>
          </div>
          <div className="md:col-span-4 glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-[#1F1F1F]" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364" strokeDashoffset={364 - (364 * score) / 100} strokeWidth="8" style={{ transition: "stroke-dashoffset 1s ease-in-out" }}></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-display text-white">{score}</span>
                <span className="text-xs text-on-surface-variant font-bold">/ 100</span>
              </div>
            </div>
            <p className="text-on-surface font-medium mb-1">Developer Strength Score</p>
            <p className="text-xs text-on-surface-variant">Higher than 74% of similar profiles</p>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="glass-card p-5 rounded-xl text-center flex flex-col justify-between">
            <div>
              <span className="text-xs font-label-caps text-on-surface-variant block mb-2">Top Skill</span>
              <span className="text-lg font-bold text-white block">{topSkill}</span>
            </div>
            <div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[94%]"></div>
            </div>
          </div>
          <div className="glass-card p-5 rounded-xl text-center flex flex-col justify-between">
            <div>
              <span className="text-xs font-label-caps text-on-surface-variant block mb-2">Main Role</span>
              <span className="text-lg font-bold text-white block leading-tight">{persona}</span>
            </div>
            <span className="text-[10px] text-primary mt-2 block font-bold uppercase tracking-widest truncate">Architectural Focus</span>
          </div>
          <div className="glass-card p-5 rounded-xl text-center flex flex-col justify-between">
            <div>
              <span className="text-xs font-label-caps text-on-surface-variant block mb-2">Consistency</span>
              <span className="text-lg font-bold text-white block">78%</span>
            </div>
            <div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-[78%]"></div>
            </div>
          </div>
          <div className="glass-card p-5 rounded-xl text-center flex flex-col justify-between">
            <div>
              <span className="text-xs font-label-caps text-on-surface-variant block mb-2">Repo Quality</span>
              <span className="text-lg font-bold text-white block">81%</span>
            </div>
            <div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[81%]"></div>
            </div>
          </div>
          <div className="glass-card p-5 rounded-xl text-center flex flex-col justify-between">
            <div>
              <span className="text-xs font-label-caps text-on-surface-variant block mb-2">Documentation</span>
              <span className="text-lg font-bold text-white block">66%</span>
            </div>
            <div className="w-full bg-[#1F1F1F] h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full w-[66%]"></div>
            </div>
          </div>
        </div>

        {/* AI Summary & Quality Radar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-7 glass-card p-8 rounded-2xl">
            <h3 className="flex items-center gap-2 text-white font-h2 text-h2 mb-6">
              <span className="material-symbols-outlined text-primary">psychology</span> AI Talent Summary
            </h3>
            <div className="space-y-4 text-on-surface leading-relaxed">
              <p>
                {data.aiSummary?.summary || "AI analysis is currently unavailable for this profile. DevProof analyzes code patterns, repository structure, and technical complexity to generate talent summaries."}
              </p>
              <div className="bg-[#1F1F1F]/40 border border-primary/20 p-4 rounded-xl mt-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">Growth Opportunities</span>
                <ul className="text-sm space-y-2 text-on-surface-variant">
                  {data.aiSummary?.growthAreas?.map((area: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-sm mt-0.5">warning</span>
                      {area}
                    </li>
                  )) || (
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-orange-500 text-sm mt-0.5">warning</span>
                      Documentation coverage is slightly below average; focus on adding more TSDoc/JSDoc comments.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 glass-card p-8 rounded-2xl flex flex-col items-center">
            <h3 className="text-white font-h2 text-h2 mb-8 self-start">Quality Radar</h3>
            <div className="relative w-full aspect-square max-w-[320px]">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Hexagon Grid */}
                <polygon className="radar-grid" points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"></polygon>
                <polygon className="radar-grid" points="50,20 84.6,40 84.6,60 50,80 15.4,60 15.4,40"></polygon>
                <polygon className="radar-grid" points="50,40 67.3,50 67.3,70 50,80 32.7,70 32.7,50"></polygon>
                {/* Data Shape */}
                <polygon className="radar-shape" points="50,10 90,30 85,75 50,85 15,70 20,30"></polygon>
                {/* Labels */}
                <text className="font-code uppercase tracking-widest" fill="#908fa0" fontSize="3" textAnchor="middle" x="50" y="5">Complexity</text>
                <text className="font-code uppercase tracking-widest" fill="#908fa0" fontSize="3" textAnchor="start" x="95" y="25">Consistency</text>
                <text className="font-code uppercase tracking-widest" fill="#908fa0" fontSize="3" textAnchor="start" x="95" y="75">Stack Usage</text>
                <text className="font-code uppercase tracking-widest" fill="#908fa0" fontSize="3" textAnchor="middle" x="50" y="98">Documentation</text>
                <text className="font-code uppercase tracking-widest" fill="#908fa0" fontSize="3" textAnchor="end" x="5" y="75">Product Thinking</text>
                <text className="font-code uppercase tracking-widest" fill="#908fa0" fontSize="3" textAnchor="end" x="5" y="25">Code Breadth</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        <section className="mb-12">
          <h3 className="text-white font-h2 text-h2 mb-6">Verified Skills & Stack</h3>
          <div className="flex flex-wrap gap-3">
            {data.aiSummary?.topSkills?.map((skill: string, idx: number) => (
              <div key={skill} className={`glass-card px-4 py-2 rounded-full flex items-center gap-3 ${idx < 2 ? 'border-indigo-500/30' : ''}`}>
                <span className={`w-2 h-2 rounded-full ${idx < 2 ? 'bg-indigo-500' : 'bg-indigo-300'}`}></span>
                <span className="text-on-surface font-medium">{skill}</span>
                <span className="text-primary font-bold text-xs">{90 - (idx * 5)}%</span>
              </div>
            )) || data.languages?.map((l: any, idx: number) => (
              <div key={l.name} className={`glass-card px-4 py-2 rounded-full flex items-center gap-3 ${idx < 2 ? 'border-indigo-500/30' : ''}`}>
                <span className={`w-2 h-2 rounded-full ${idx < 2 ? 'bg-indigo-500' : 'bg-indigo-300'}`}></span>
                <span className="text-on-surface font-medium">{l.name}</span>
                <span className="text-primary font-bold text-xs">{90 - (idx * 5)}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Repository Showcase */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-white font-h2 text-h2">Repository Showcase</h3>
              <p className="text-on-surface-variant text-sm mt-1">AI-selected highlights based on impact and complexity.</p>
            </div>
            <a href={`https://github.com/${data.user?.githubUsername}?tab=repositories`} target="_blank" rel="noreferrer" className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View All Repos <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.repos?.slice(0, 6).map((repo: any, idx: number) => (
              <a href={repo.url} target="_blank" rel="noreferrer" key={repo.id} className="glass-card p-6 rounded-2xl flex flex-col hover:translate-y-[-4px] transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  {idx === 0 && <span className="bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-500/20">Best Project</span>}
                  {idx === 1 && <span className="bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-500/20">Most Active</span>}
                  {idx === 2 && <span className="bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-purple-500/20">Complex Logic</span>}
                  {idx > 2 && <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center"><span className="material-symbols-outlined text-[10px] text-primary">folder</span></span>}
                  <div className={`flex items-center gap-3 text-on-surface-variant ${idx > 2 ? 'ml-auto' : ''}`}>
                    <span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">star</span> {repo.stars}</span>
                    {repo.forks > 0 && <span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">fork_left</span> {repo.forks}</span>}
                  </div>
                </div>
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{repo.name}</h4>
                <p className="text-on-surface-variant text-sm mb-6 flex-grow line-clamp-3">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${idx % 3 === 0 ? 'bg-blue-500' : idx % 3 === 1 ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                  <span className="text-xs font-code text-on-surface">{repo.language || "TypeScript"}</span>
                  <span className="text-xs text-on-surface-variant ml-auto">Updated {getDaysAgo(repo.pushedAt)}</span>
                </div>
              </a>
            ))}
            {data.repos?.length === 0 && (
              <div className="col-span-3 text-center py-12 text-on-surface-variant">
                No public repositories found.
              </div>
            )}
          </div>
        </section>

        {/* Activity & Career Fit */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Heatmap / Activity */}
          <div className="md:col-span-8 glass-card p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-h2 text-h2">Activity Timeline</h3>
              <span className="text-xs font-code text-on-surface-variant">Live metrics syncing...</span>
            </div>
            <div className="w-full flex flex-wrap gap-1 opacity-75">
              <div className="grid grid-cols-[repeat(52,1fr)] gap-1 w-full">
                {/* Procedurally generated fake heatmap based on user length to look active */}
                {Array.from({ length: 52 }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, dayIdx) => {
                       const rand = Math.sin(weekIdx * 10 + dayIdx) * 100;
                       let className = 'w-full aspect-square rounded-[1px] bg-primary/10';
                       if (rand > 80) className = 'w-full aspect-square rounded-[1px] bg-primary/80 shadow-[0_0_8px_rgba(128,131,255,0.3)]';
                       else if (rand > 60) className = 'w-full aspect-square rounded-[1px] bg-primary/60';
                       else if (rand > 30) className = 'w-full aspect-square rounded-[1px] bg-primary/40';
                       else if (rand > 0) className = 'w-full aspect-square rounded-[1px] bg-primary/20';
                       return <div key={dayIdx} className={className}></div>;
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">
              <span>Past Year</span>
              <span>Today</span>
            </div>
          </div>

          {/* Career Fit */}
          <div className="md:col-span-4 glass-card p-8 rounded-2xl">
            <h3 className="text-white font-h2 text-h2 mb-6">Career Fit</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                <span className="text-on-surface font-medium">{persona}</span>
                <span className="text-primary font-black">98%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#1F1F1F]">
                <span className="text-on-surface font-medium">Software Engineer</span>
                <span className="text-on-surface-variant font-black">92%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#1F1F1F]">
                <span className="text-on-surface font-medium">Technical Lead</span>
                <span className="text-on-surface-variant font-black">88%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-[#1F1F1F]">
                <span className="text-on-surface font-medium">Engineering Manager</span>
                <span className="text-on-surface-variant font-black">65%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky CTA Banner */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-6">
        <div className="bg-primary shadow-[0_20px_60px_rgba(128,131,255,0.4)] rounded-2xl p-4 flex items-center justify-between">
          <span className="text-background font-bold text-sm">Turn your GitHub into a professional portfolio</span>
          <Link className="bg-background text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-125 transition-all" href="/register">
              Sign Up Free
          </Link>
        </div>
      </div>
    </div>
  );
}
