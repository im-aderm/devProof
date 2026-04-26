"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExportDropdown from "@/components/dashboard/ExportDropdown";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

export default function RepoAnalyzePage() {
  const { owner, repo } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/repo/${owner}/${repo}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to analyze repository");
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
  }, [owner, repo]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <DashboardHeader name="Auditing..." />
        <main className="pt-32 px-12 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center mb-4 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary animate-spin">deployed_code</span>
             </div>
             <h1 className="font-display text-headline-md text-on-surface">Auditing Manifest...</h1>
             <p className="text-on-surface-variant font-sans mt-2">Analyzing {owner}/{repo} architecture</p>
          </div>
          <LoadingSkeleton />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8">
        <span className="material-symbols-outlined text-6xl text-error mb-4">gpp_maybe</span>
        <h1 className="font-display text-headline-lg text-on-surface mb-4">Audit Failed</h1>
        <p className="text-on-surface-variant mb-8 max-w-md text-center">{error}</p>
        <button 
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-surface-container-high text-on-surface rounded-lg font-bold border border-outline-variant hover:bg-surface-container-highest transition-all"
        >
          Return to Entry
        </button>
      </div>
    );
  }

  const { repoData, languages, aiSummary, metrics } = data;

  return (
    <div className="bg-background min-h-screen pb-24">
      <DashboardHeader name={`${owner}/${repo}`} />

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        {/* Repo Hero */}
        <section className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="relative">
            <div className="w-48 h-48 rounded-2xl bg-surface-container-low flex items-center justify-center border-4 border-surface-container-high shadow-2xl">
              <span className="material-symbols-outlined text-7xl text-primary">folder</span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-primary-gradient flex flex-col items-center justify-center shadow-xl border-4 border-background">
               <span className="text-[10px] font-bold text-surface-container-lowest uppercase tracking-tighter opacity-80">Quality</span>
               <span className="text-3xl font-display font-bold text-surface-container-lowest leading-none">{metrics.overallScore}</span>
            </div>
          </div>

          <div className="flex-grow pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
               <div className="flex flex-wrap items-center gap-4">
                  <h1 className="font-display text-display-md text-on-surface">{repoData.name}</h1>
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-label-md font-bold uppercase tracking-widest border border-outline-variant">
                     {repoData.license || "No License"}
                  </span>
               </div>
               <ExportDropdown data={data} filename={`devproof-repo-${repoData.name}`} />
            </div>
            <p className="text-body-lg text-on-surface-variant mb-6 max-w-2xl leading-relaxed">
              {repoData.description || "The authors have left this manifest blank. The code speaks for itself."}
            </p>
            <div className="flex flex-wrap gap-8 text-on-surface-variant font-label-md uppercase tracking-[0.15em] font-bold">
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">person</span>
                  By <a href={`/analyze/${owner}`} className="text-on-surface hover:text-primary transition-colors underline decoration-outline-variant">{owner}</a>
               </div>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">history</span>
                  Updated {new Date(repoData.pushedAt).toLocaleDateString()}
               </div>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">open_in_new</span>
                  <a href={repoData.url} target="_blank" className="hover:text-primary transition-colors">GitHub Repository</a>
               </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            
            {/* Vital Statistics */}
            <section>
              <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-8 flex items-center gap-4">
                 Vital Statistics
                 <div className="h-px flex-grow bg-surface-container-highest"></div>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant rounded-xl overflow-hidden">
                {[
                  { label: "Stargazers", value: repoData.stars, icon: "grade" },
                  { label: "Network Forks", value: repoData.forks, icon: "fork_left" },
                  { label: "Watchers", value: repoData.watchers, icon: "visibility" },
                  { label: "Primary Stack", value: repoData.language || "N/A", icon: "code" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface-container-low p-8 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-on-surface-variant mb-3 opacity-50">{stat.icon}</span>
                    <span className="text-2xl font-display font-bold text-on-surface mb-1 truncate w-full px-2">{stat.value}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Architecture Insight */}
            <section className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant">
               <h2 className="font-display text-headline-md text-on-surface mb-6">AI Architectural Review</h2>
               <div className="p-8 bg-surface-container-lowest rounded-xl italic text-on-surface-variant leading-relaxed text-body-lg border-l-4 border-primary">
                  &quot;{aiSummary}&quot;
               </div>
            </section>

            {/* Language Distribution */}
            <section>
               <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-8 flex items-center gap-4">
                 Technological Composition
                 <div className="h-px flex-grow bg-surface-container-highest"></div>
              </h2>
              <div className="space-y-6">
                {Object.entries(languages).sort(([, a]: any, [, b]: any) => b - a).map(([name, size]: any) => {
                  const total = Object.values(languages).reduce((acc: any, s: any) => acc + s, 0) as number;
                  const percentage = Math.round((size / total) * 100);
                  return (
                    <div key={name}>
                      <div className="flex justify-between items-end mb-3">
                        <span className="font-display text-headline-sm text-on-surface">{name}</span>
                        <span className="text-body-sm font-bold text-on-surface-variant uppercase">{percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
                        <div className="h-full bg-primary-gradient transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Audit Pillars */}
            <section className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-on-surface uppercase tracking-[0.2em] mb-8">Audit Pillars</h3>
               <div className="space-y-10">
                  {[
                    { name: "Documentation", score: metrics.readmeScore, color: "primary" },
                    { name: "Complexity", score: metrics.complexityScore, color: "primary" },
                    { name: "Freshness", score: metrics.freshnessScore, color: "primary" },
                  ].map((pillar) => (
                    <div key={pillar.name} className="flex flex-col items-center">
                       <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                          <svg className="w-full h-full rotate-[-90deg]">
                            <circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="4"></circle>
                            <circle
                              className="text-primary transition-all duration-1000 ease-out"
                              cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="4"
                              strokeDasharray="364"
                              strokeDashoffset={364 - (364 * pillar.score) / 100}
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-2xl font-display font-bold text-on-surface">{pillar.score}</span>
                             <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">Index</span>
                          </div>
                       </div>
                       <span className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest">{pillar.name}</span>
                    </div>
                  ))}
               </div>
            </section>

            {/* Suggestions */}
            <section className="p-8 bg-surface-container-high rounded-2xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-primary uppercase tracking-[0.2em] mb-6">Optimization Directives</h3>
               <ul className="space-y-4">
                  {metrics.readmeScore < 70 && (
                    <li className="p-4 bg-surface-container-low rounded-xl text-body-sm text-on-surface-variant border-l-2 border-primary">
                       Enhance manifest documentation to improve architectural transparency.
                    </li>
                  )}
                  {metrics.complexityScore < 50 && (
                    <li className="p-4 bg-surface-container-low rounded-xl text-body-sm text-on-surface-variant border-l-2 border-primary">
                       Increase project visibility and contribution velocity.
                    </li>
                  )}
                  {metrics.freshnessScore < 50 && (
                    <li className="p-4 bg-surface-container-low rounded-xl text-body-sm text-on-surface-variant border-l-2 border-primary">
                       Mitigate architectural staleness with active maintenance.
                    </li>
                  )}
                  {metrics.readmeScore >= 70 && metrics.complexityScore >= 50 && metrics.freshnessScore >= 50 && (
                    <li className="text-body-sm text-primary flex items-center gap-3 italic">
                       <span className="material-symbols-outlined">verified</span>
                       All pillars optimized.
                    </li>
                  )}
               </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
