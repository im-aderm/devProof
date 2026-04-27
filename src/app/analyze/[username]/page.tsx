"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import CodeQualityRadar from "@/components/dashboard/RadarChart";
import StrengthScore from "@/components/dashboard/StrengthScore";
import GrowthForecast from "@/components/dashboard/GrowthForecast";
import OptimizationChecklist from "@/components/dashboard/OptimizationChecklist";
import FloatingExportActions from "@/components/dashboard/FloatingExportActions";
import { motion } from "framer-motion";

function PremiumOverlay({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-dark-bg/40 backdrop-blur-md rounded-3xl border border-white/10 text-center">
      <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-indigo-500/20">
        <span className="material-symbols-outlined text-white">lock</span>
      </div>
      <h4 className="text-xl font-bold mb-2">Unlock {title}</h4>
      <p className="text-sm text-slate-300 mb-6 max-w-[200px]">Sign in with GitHub to view your detailed historical insights.</p>
      <Link 
        href="/login" 
        className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all active:scale-95"
      >
        Connect GitHub
      </Link>
    </div>
  );
}

export default function AnalyzePage() {
  const { username } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIdx, setTypewriterIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/analyze/${username}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to analyze");
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    if (data?.aiSummary?.summary) {
      const text = data.aiSummary.summary;
      if (typewriterIdx < text.length) {
        const timeout = setTimeout(() => {
          setTypewriterText(prev => prev + text[typewriterIdx]);
          setTypewriterIdx(prev => prev + 1);
        }, 15);
        return () => clearTimeout(timeout);
      }
    }
  }, [data, typewriterIdx]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <DashboardHeader name="Analyzing..." />
        <main className="pt-32 px-12 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center mb-4 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary animate-spin">sync</span>
             </div>
             <h1 className="font-display text-headline-md text-on-surface">Generating Ledger...</h1>
             <p className="text-on-surface-variant font-sans mt-2">Auditing GitHub Subject: {username}</p>
          </div>
          <LoadingSkeleton />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
        <h1 className="font-display text-headline-lg text-on-surface mb-4">Analysis Critical Failure</h1>
        <p className="text-on-surface-variant mb-8 max-w-md mx-auto">{error}</p>
        <button 
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-surface-container-high text-on-surface rounded-lg font-bold border border-outline-variant hover:bg-surface-container-highest transition-all"
        >
          Return to Entry
        </button>
      </div>
    );
  }

  const { profile, collabStats, repos, aiSummary, scoringResult, growthForecast } = data;
  const isPremium = !!session;

  const handleExport = (format: string) => {
      if (!isPremium && format !== 'pdf') {
        alert("JSON, CSV, and DOCX exports require a connected GitHub account.");
        router.push("/login");
        return;
      }
      alert(`Exporting as ${format.toUpperCase()}... The Obsidian Ledger is being prepared.`);
  };

  const totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);

  return (
    <div className="bg-background min-h-screen pb-32">
      <DashboardHeader name={username as string} />

      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Profile Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-12 items-start">
            <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-surface-container-high shadow-2xl bg-surface-container-low flex-shrink-0">
              <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <h1 className="font-display text-display-md text-on-surface">{profile.name || username}</h1>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-label-md font-bold uppercase tracking-widest border border-outline-variant">
                   {aiSummary.persona}
                </span>
              </div>
              <p className="text-body-lg text-on-surface-variant mb-8 max-w-2xl leading-relaxed">
                {profile.bio || "No public bio provided. This developer operates with silent precision."}
              </p>
              <div className="flex flex-wrap gap-12 text-on-surface-variant font-label-md uppercase tracking-[0.2em] font-bold text-[10px]">
                 <div>
                    <span className="text-on-surface text-lg block mb-1">{collabStats.prCount + collabStats.issueCount}+</span>
                    <span className="opacity-50">Contributions</span>
                 </div>
                 <div>
                    <span className="text-on-surface text-lg block mb-1">{profile.public_repos}</span>
                    <span className="opacity-50">Repositories</span>
                 </div>
                 <div>
                    <span className="text-on-surface text-lg block mb-1">{totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1)}k` : totalStars}</span>
                    <span className="opacity-50">Total Stars</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="p-10 bg-surface-container-low rounded-3xl border border-outline-variant/30 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl">monitoring</span>
               </div>
               <h3 className="text-label-md font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8 text-center">Developer Strength</h3>
               <StrengthScore 
                score={scoringResult.score} 
                percentile={scoringResult.percentile} 
                badge={scoringResult.badge} 
               />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* AI Summary Section */}
            <section className="bg-surface-container-low p-12 rounded-3xl border border-outline-variant relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-9xl text-primary">psychology</span>
               </div>
               <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-10 flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  AI Analysis Summary
               </h2>
               <div className="space-y-12 relative z-10">
                  <div className="p-8 bg-surface-container-lowest rounded-2xl italic text-on-surface-variant leading-relaxed text-body-lg border-l-4 border-primary min-h-[120px]">
                    &quot;{typewriterText}<span className="animate-pulse">|</span>&quot;
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div>
                        <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-6">Strategic Focus</h4>
                        <div className="flex flex-wrap gap-2">
                           {aiSummary.topSkills.map((skill: string) => (
                             <span key={skill} className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold border border-outline-variant">
                                {skill}
                             </span>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h4 className="text-[10px] font-bold text-error uppercase tracking-[0.2em] mb-6">Growth Vectors</h4>
                        <ul className="space-y-4">
                           {aiSummary.growthAreas.map((area: string) => (
                             <li key={area} className="text-xs text-on-surface-variant flex items-start gap-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 flex-shrink-0"></span>
                                {area}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </section>

            {/* Top Repositories Grid */}
            <section>
               <div className="flex justify-between items-center mb-12">
                  <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest flex items-center gap-4">
                    Top Repositories
                  </h2>
                  <Link href={isPremium ? `/repos` : "/login"} className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline">
                    {isPremium ? "View All" : "Connect to See More"}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
               </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {repos.slice(0, 6).map((repo: any) => (
                  <Link 
                    key={repo.id}
                    href={isPremium ? `/repo/${username}/${repo.name}` : "/login"}
                    className="group block p-8 bg-surface-container-low hover:bg-surface-container-high rounded-2xl transition-all border border-outline-variant hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                    
                    {!isPremium && (
                       <div className="absolute inset-0 z-10 bg-dark-bg/5 backdrop-blur-[2px] pointer-events-none"></div>
                    )}

                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center border border-outline-variant group-hover:border-primary/30 transition-colors">
                           <span className="material-symbols-outlined text-primary text-xl">folder</span>
                        </div>
                        <h3 className="font-display text-headline-sm text-on-surface group-hover:text-primary transition-colors">{repo.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-on-surface-variant mb-8 line-clamp-2 h-10 relative z-10 leading-relaxed">
                      {repo.description || "No project manifest provided."}
                    </p>
                    
                    <div className="flex items-center justify-between relative z-10 pt-4 border-t border-outline-variant/30">
                      <div className="flex flex-wrap gap-4">
                         <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                            <span className="material-symbols-outlined text-sm">grade</span>
                            {repo.stargazers_count}
                         </div>
                         <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant">
                            <span className="material-symbols-outlined text-sm">fork_left</span>
                            {repo.forks_count}
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                         <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{repo.language || "N/A"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Optimization Checklist */}
            <section className="relative">
                <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-12 flex items-center gap-4">
                  Optimization Checklist
                  <div className="h-px flex-grow bg-surface-container-highest"></div>
               </h2>
               {!isPremium && <PremiumOverlay title="Checklist" />}
               <div className={!isPremium ? "blur-md pointer-events-none select-none" : ""}>
                 <OptimizationChecklist 
                  completedItems={scoringResult.recommendations.length === 0 ? ["Strong repo naming", "Has portfolio linked", "Active contributions"] : ["Public profile accessible"]}
                  items={scoringResult.recommendations}
                 />
               </div>
            </section>
          </div>

          {/* Right Column / Sidebar */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Technical Stack Chips */}
            <section className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8">Technical Stack</h3>
               <div className="flex flex-wrap gap-3">
                  {Array.from(new Set(repos.flatMap((r: any) => Object.keys(r.languages))))
                    .slice(0, 12)
                    .map((lang: any) => (
                      <span key={lang} className="px-4 py-2 rounded-xl bg-surface-container-highest text-on-surface text-[10px] font-bold uppercase tracking-widest border border-outline-variant/30">
                        {lang as string}
                      </span>
                    ))}
               </div>
            </section>

            {/* Radar Chart */}
            <section className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8 text-center">Code Quality Radar</h3>
               <CodeQualityRadar data={scoringResult.radarData} />
            </section>

            {/* Growth Forecast */}
            <section className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant relative overflow-hidden">
               <h3 className="text-label-md font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8">Growth Forecast</h3>
               {!isPremium && <PremiumOverlay title="Growth Insights" />}
               <div className={!isPremium ? "blur-md pointer-events-none select-none" : ""}>
                 <GrowthForecast 
                  velocity={growthForecast.velocity}
                  tier={growthForecast.tier}
                  status={growthForecast.status}
                  description={growthForecast.description}
                 />
               </div>
            </section>

            {/* Language Progress bars */}
            <section className="p-8 bg-surface-container-low rounded-3xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-8">Stack Concentration</h3>
               <div className="space-y-6">
                  {/* Aggregating languages */}
                  {Object.entries(
                    repos.reduce((acc: any, r: any) => {
                      Object.entries(r.languages).forEach(([name, size]) => {
                        acc[name] = (acc[name] || 0) + (size as number);
                      });
                      return acc;
                    }, {})
                  )
                  .sort((a: any, b: any) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([name, size]: [string, any], idx, arr) => {
                    const total = arr.reduce((acc, curr) => acc + (curr[1] as number), 0);
                    const percentage = Math.round((size / total) * 100);
                    return (
                      <div key={name}>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-xs font-bold text-on-surface">{name}</span>
                          <span className="text-[10px] font-bold text-primary">{percentage}%</span>
                        </div>
                        <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${percentage}%`, transitionDelay: `${idx * 100}ms` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </section>
          </div>
        </div>
      </main>

      <FloatingExportActions onExport={handleExport} />

      <footer className="mt-32 py-12 px-6 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 text-on-surface-variant/40">
        <div className="font-display font-bold uppercase tracking-tighter text-sm">DevProof Intelligence</div>
        <div className="text-[10px] font-bold uppercase tracking-widest">© 2026 Public Ledger Analysis System</div>
      </footer>
    </div>
  );
}
