"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExportDropdown from "@/components/dashboard/ExportDropdown";

export default function CompareReposResultsPage() {
  const { ownerA, repoA, ownerB, repoB } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/compare/repos/${ownerA}/${repoA}/${ownerB}/${repoB}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to compare repositories");
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
  }, [ownerA, repoA, ownerB, repoB]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mb-6 border border-outline-variant/20 animate-pulse">
          <span className="material-symbols-outlined text-4xl text-primary animate-spin">compare</span>
        </div>
        <h1 className="font-display text-headline-md text-on-surface mb-2">Analyzing Parity...</h1>
        <p className="text-on-surface-variant font-sans animate-pulse">Benchmarking {repoA} vs {repoB} architectural standards</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8">
        <span className="material-symbols-outlined text-6xl text-error mb-4">gpp_maybe</span>
        <h1 className="font-display text-headline-lg text-on-surface mb-4">Audit Terminated</h1>
        <p className="text-on-surface-variant mb-8 max-w-md text-center">{error}</p>
        <button 
          onClick={() => router.push("/compare")}
          className="px-8 py-3 bg-surface-container-high text-on-surface rounded-lg font-bold border border-outline-variant hover:bg-surface-container-highest transition-all"
        >
          Return to Entry
        </button>
      </div>
    );
  }

  const { repoA: rA, repoB: rB } = data;

  const compareStats = [
    { label: "Quality Index", a: rA.metrics.overallScore, b: rB.metrics.overallScore },
    { label: "Stargazers", a: rA.repoData.stars, b: rB.repoData.stars },
    { label: "Network Forks", a: rA.repoData.forks, b: rB.repoData.forks },
    { label: "Documentation", a: rA.metrics.readmeScore, b: rB.metrics.readmeScore },
    { label: "Complexity", a: rA.metrics.complexityScore, b: rB.metrics.complexityScore },
    { label: "Freshness", a: rA.metrics.freshnessScore, b: rB.metrics.freshnessScore },
  ];

  return (
    <div className="bg-background min-h-screen pb-24">
      <DashboardHeader name="Repo Audit" />

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <span className="text-label-md font-bold text-primary uppercase tracking-[0.3em] mb-4 block">Architectural Comparison Report</span>
           <h1 className="font-display text-display-md text-on-surface uppercase tracking-tight leading-none">
             {rA.repoData.name} <span className="text-on-surface-variant font-normal lowercase opacity-30 mx-4">vs</span> {rB.repoData.name}
           </h1>
        </div>

        {/* Side-by-Side Repo Hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant rounded-2xl overflow-hidden shadow-2xl mb-20 border border-outline-variant">
           {[rA, rB].map((r, idx) => (
             <div key={idx} className="bg-surface-container-low p-12 flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 border-4 border-background shadow-xl">
                  <span className="material-symbols-outlined text-5xl text-primary">folder</span>
                </div>
                <h3 className="font-display text-headline-sm text-on-surface mb-2">{r.repoData.name}</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">By {r.repoData.owner}</p>
                <p className="text-body-sm text-on-surface-variant mb-8 line-clamp-2 max-w-xs">{r.repoData.description || "No description available."}</p>
                <div className="w-24 h-24 rounded-full border-4 border-surface-container-highest flex flex-col items-center justify-center bg-background">
                   <span className="text-[8px] font-bold text-on-surface-variant uppercase tracking-widest">Quality</span>
                   <span className="text-2xl font-display font-bold text-primary leading-none">{r.metrics.overallScore}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           <div className="lg:col-span-8 space-y-20">
              
              {/* Comparative Metrics Table */}
              <section>
                 <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-10 flex items-center gap-4">
                    Audit Benchmarks
                    <div className="h-px flex-grow bg-surface-container-highest"></div>
                 </h2>
                 <div className="space-y-4">
                    {compareStats.map((stat) => (
                      <div key={stat.label} className="p-8 bg-surface-container-low rounded-xl border border-outline-variant group hover:bg-surface-container-high transition-all">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest">{stat.label}</span>
                         </div>
                         <div className="grid grid-cols-2 gap-12 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-outline-variant flex items-center justify-center text-[8px] font-bold z-10">VS</div>
                            
                            <div className="text-left">
                               <div className="flex justify-between items-end mb-2">
                                  <span className={`text-2xl font-display font-bold ${stat.a >= stat.b ? "text-primary" : "text-on-surface"}`}>{stat.a}</span>
                                  {stat.a > stat.b && <span className="text-[10px] font-bold text-primary uppercase">Leader</span>}
                               </div>
                               <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                                  <div className="h-full bg-primary-gradient opacity-80" style={{ width: `${Math.min((stat.a / (stat.a + stat.b)) * 100 || 0, 100)}%` }}></div>
                               </div>
                            </div>

                            <div className="text-right">
                               <div className="flex justify-between items-end mb-2 flex-row-reverse">
                                  <span className={`text-2xl font-display font-bold ${stat.b >= stat.a ? "text-primary" : "text-on-surface"}`}>{stat.b}</span>
                                  {stat.b > stat.a && <span className="text-[10px] font-bold text-primary uppercase">Leader</span>}
                               </div>
                               <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex flex-row-reverse">
                                  <div className="h-full bg-primary-gradient opacity-80" style={{ width: `${Math.min((stat.b / (stat.a + stat.b)) * 100 || 0, 100)}%` }}></div>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Stack Converge */}
              <section>
                 <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-10 flex items-center gap-4">
                    Technological Convergence
                    <div className="h-px flex-grow bg-surface-container-highest"></div>
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[rA, rB].map((r, idx) => {
                      const langs = Object.keys(r.languages).slice(0, 5);
                      return (
                        <div key={idx} className="p-8 bg-surface-container-low rounded-xl border border-outline-variant">
                           <h4 className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest mb-6">{r.repoData.name} Tech Stack</h4>
                           <div className="flex flex-wrap gap-3">
                              {langs.map((l: any) => (
                                <span key={l as string} className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-body-sm font-medium border border-outline-variant">
                                   {l as string}
                                </span>
                              ))}
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </section>
           </div>

           {/* Performance Radar Sidebar */}
           <div className="lg:col-span-4 space-y-12">
              <section className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant">
                 <h3 className="text-label-md font-bold text-on-surface uppercase tracking-[0.2em] mb-10">Comparative Pillars</h3>
                 <div className="space-y-12">
                    {[
                      { name: "Documentation", a: rA.metrics.readmeScore, b: rB.metrics.readmeScore },
                      { name: "Complexity", a: rA.metrics.complexityScore, b: rB.metrics.complexityScore },
                      { name: "Freshness", a: rA.metrics.freshnessScore, b: rB.metrics.freshnessScore },
                    ].map((pillar) => {
                      const valA = pillar.a;
                      const valB = pillar.b;
                      return (
                        <div key={pillar.name}>
                           <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{pillar.name}</span>
                              <div className="flex gap-4">
                                 <span className={`text-body-sm font-bold ${valA >= valB ? "text-primary" : "text-on-surface-variant"}`}>{valA}</span>
                                 <span className="text-on-surface-variant opacity-20">/</span>
                                 <span className={`text-body-sm font-bold ${valB >= valA ? "text-primary" : "text-on-surface-variant"}`}>{valB}</span>
                              </div>
                           </div>
                           <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
                              <div className="h-full bg-primary opacity-80" style={{ width: `${(valA / (valA + valB)) * 100 || 0}%`, borderRight: "1px solid #04170D" }}></div>
                              <div className="h-full bg-on-surface-variant opacity-20" style={{ width: `${(valB / (valA + valB)) * 100 || 0}%` }}></div>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </section>

              {/* Comparative Insight */}
              <section className="p-8 bg-surface-container-high rounded-2xl border border-outline-variant">
                 <h3 className="text-label-md font-bold text-primary uppercase tracking-[0.2em] mb-6">Audit Conclusion</h3>
                 <div className="space-y-6">
                    {rA.metrics.overallScore > rB.metrics.overallScore ? (
                      <p className="text-body-sm text-on-surface-variant leading-relaxed">
                        <span className="text-primary font-bold">{rA.repoData.name}</span> exhibits superior architectural maturity and documentation standards.
                      </p>
                    ) : rB.metrics.overallScore > rA.metrics.overallScore ? (
                      <p className="text-body-sm text-on-surface-variant leading-relaxed">
                        <span className="text-primary font-bold">{rB.repoData.name}</span> demonstrates higher technical complexity and network traction.
                      </p>
                    ) : (
                      <p className="text-body-sm text-on-surface-variant leading-relaxed">
                        Both architectural manifests maintain strict parity across all analyzed vectors.
                      </p>
                    )}
                    <div className="p-4 bg-surface-container-low rounded-xl text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant mb-6">
                       Subject A: {new Date(rA.repoData.pushedAt).toLocaleDateString()} <br />
                       Subject B: {new Date(rB.repoData.pushedAt).toLocaleDateString()}
                    </div>
                    <ExportDropdown data={data} filename={`devproof-repo-compare-${rA.repoData.name}-vs-${rB.repoData.name}`} />
                 </div>
              </section>
           </div>
        </div>
      </main>
    </div>
  );
}
