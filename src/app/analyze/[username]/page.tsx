"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";
import ExportDropdown from "@/components/dashboard/ExportDropdown";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

export default function AnalyzePage() {
  const { username } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8">
        <span className="material-symbols-outlined text-6xl text-error mb-4">error</span>
        <h1 className="font-display text-headline-lg text-on-surface mb-4">Analysis Failed</h1>
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

  const { profile, collabStats, repos, aiSummary, scoringResult } = data;

  return (
    <div className="bg-background min-h-screen pb-24">
      <DashboardHeader name={username as string} />

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        {/* Profile Hero - Obsidian Style */}
        <section className="flex flex-col md:flex-row gap-12 items-start mb-20">
          <div className="relative">
            <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-surface-container-high shadow-2xl bg-surface-container-low">
              <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-primary-gradient flex flex-col items-center justify-center shadow-xl border-4 border-background">
               <span className="text-[10px] font-bold text-surface-container-lowest uppercase tracking-tighter opacity-80">Score</span>
               <span className="text-3xl font-display font-bold text-surface-container-lowest leading-none">{scoringResult.score}</span>
            </div>
          </div>

          <div className="flex-grow pt-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
               <div className="flex flex-wrap items-center gap-4">
                 <h1 className="font-display text-display-md text-on-surface">{profile.name || username}</h1>
                 <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-label-md font-bold uppercase tracking-widest border border-outline-variant">
                    {aiSummary.persona}
                 </span>
               </div>
               <ExportDropdown data={data} filename={`devproof-ledger-${username}`} />
            </div>
            <p className="text-body-lg text-on-surface-variant mb-6 max-w-2xl leading-relaxed">
              {profile.bio || "No public bio provided. This developer operates with silent precision."}
            </p>
            <div className="flex flex-wrap gap-8 text-on-surface-variant font-label-md uppercase tracking-[0.15em] font-bold">
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  {profile.location || "Remote"}
               </div>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">link</span>
                  {profile.blog ? <a href={profile.blog} target="_blank" className="hover:text-primary transition-colors">Portfolio</a> : "No Site"}
               </div>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
                  Joined {new Date(profile.created_at).getFullYear()}
               </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Stats Ledger */}
            <section>
              <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-8 flex items-center gap-4">
                 Activity Ledger
                 <div className="h-px flex-grow bg-surface-container-highest"></div>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-outline-variant rounded-xl overflow-hidden">
                {[
                  { label: "Pull Requests", value: collabStats.prCount, icon: "merge_type" },
                  { label: "Issues Fixed", value: collabStats.issueCount, icon: "bug_report" },
                  { label: "Stars Earned", value: repos.reduce((acc: any, r: any) => acc + r.stargazers_count, 0), icon: "grade" },
                  { label: "Public Repos", value: profile.public_repos, icon: "inventory_2" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface-container-low p-8 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-on-surface-variant mb-3 opacity-50">{stat.icon}</span>
                    <span className="text-3xl font-display font-bold text-on-surface mb-1">{stat.value}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Career Insight */}
            <section className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="material-symbols-outlined text-9xl text-primary">psychology</span>
               </div>
               <h2 className="font-display text-headline-md text-on-surface mb-6">AI Behavioral Analysis</h2>
               <div className="space-y-8 relative z-10">
                  <div className="p-6 bg-surface-container-lowest rounded-xl italic text-on-surface-variant leading-relaxed text-body-lg border-l-4 border-primary">
                    &quot;{aiSummary.summary}&quot;
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div>
                        <h4 className="text-label-md font-bold text-primary uppercase tracking-[0.2em] mb-4">Detected Technical Core</h4>
                        <div className="flex flex-wrap gap-2">
                           {aiSummary.topSkills.map((skill: string) => (
                             <span key={skill} className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface text-body-sm font-medium border border-outline-variant">
                                {skill}
                             </span>
                           ))}
                        </div>
                     </div>
                     <div>
                        <h4 className="text-label-md font-bold text-error uppercase tracking-[0.2em] mb-4">Engineering Growth Vectors</h4>
                        <ul className="space-y-3">
                           {aiSummary.growthAreas.map((area: string) => (
                             <li key={area} className="text-body-sm text-on-surface-variant flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 flex-shrink-0"></span>
                                {area}
                             </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </section>

            {/* Top Repositories */}
            <section>
               <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-8 flex items-center gap-4">
                 Strategic Assets
                 <div className="h-px flex-grow bg-surface-container-highest"></div>
              </h2>
              <div className="space-y-4">
                {repos.slice(0, 5).map((repo: any) => (
                  <Link 
                    key={repo.id}
                    href={`/repo/${username}/${repo.name}`}
                    className="group block p-8 bg-surface-container-low hover:bg-surface-container-high rounded-xl transition-all border border-outline-variant"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">folder_open</span>
                        <h3 className="font-display text-headline-sm text-on-surface group-hover:text-primary transition-colors">{repo.name}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-on-surface-variant text-label-md font-bold">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">grade</span> {repo.stargazers_count}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">fork_left</span> {repo.forks_count}</span>
                      </div>
                    </div>
                    <p className="text-body-md text-on-surface-variant mb-6 line-clamp-2">
                      {repo.description || "No project manifest provided."}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {Object.keys(repo.languages).slice(0, 3).map(lang => (
                        <span key={lang} className="text-[10px] font-bold text-primary-container uppercase tracking-widest">{lang}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Strength Score Card */}
            <section className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-on-surface uppercase tracking-[0.2em] mb-8">Performance Spectrum</h3>
               <div className="space-y-8">
                  {scoringResult.checklist.map((item: any) => (
                    <div key={item.name}>
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-label-md font-bold text-on-surface-variant uppercase">{item.name}</span>
                        <span className="text-body-sm font-bold text-primary">{item.score}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-gradient transition-all duration-1000" style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Recommendations */}
            <section className="p-8 bg-surface-container-high rounded-2xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-error uppercase tracking-[0.2em] mb-6">Strategic Optimization</h3>
               <ul className="space-y-4">
                  {scoringResult.recommendations.map((rec: string) => (
                    <li key={rec} className="flex gap-4 p-4 bg-surface-container-low rounded-xl text-body-sm text-on-surface-variant">
                       <span className="material-symbols-outlined text-error text-lg">priority_high</span>
                       {rec}
                    </li>
                  ))}
                  {scoringResult.recommendations.length === 0 && (
                    <li className="text-body-sm text-primary flex items-center gap-3 italic">
                       <span className="material-symbols-outlined">verified</span>
                       Ledger is optimal. No critical vectors identified.
                    </li>
                  )}
               </ul>
            </section>

            {/* Language Mix Chart (Placeholder representation for editorial look) */}
            <section className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant">
               <h3 className="text-label-md font-bold text-on-surface uppercase tracking-[0.2em] mb-6">Stack Concentration</h3>
               <div className="flex flex-col gap-4">
                  {/* Just showing top 5 overall languages aggregated */}
                  {Array.from(new Set(repos.flatMap((r: any) => Object.keys(r.languages))))
                    .slice(0, 5)
                    .map((lang: any) => (
                      <div key={lang} className="flex items-center justify-between group cursor-default">
                        <span className="text-body-md text-on-surface group-hover:text-primary transition-colors">{lang as string}</span>
                        <div className="flex-grow mx-4 h-px bg-surface-container-highest"></div>
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase">Primary</span>
                      </div>
                    ))}
               </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
