"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ExportDropdown from "@/components/dashboard/ExportDropdown";

export default function ReviewResultsPage() {
  const { owner, repo } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/review/${owner}/${repo}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to perform AI review");
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
      <div className="bg-background min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mb-6 border border-outline-variant/20 animate-pulse">
          <span className="material-symbols-outlined text-4xl text-primary animate-bounce">psychology</span>
        </div>
        <h1 className="font-display text-headline-md text-on-surface mb-2">Architect Thinking...</h1>
        <p className="text-on-surface-variant font-sans animate-pulse">Performing deep structural analysis of {owner}/{repo}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-8">
        <span className="material-symbols-outlined text-6xl text-error mb-4">warning</span>
        <h1 className="font-display text-headline-lg text-on-surface mb-4">Review Aborted</h1>
        <p className="text-on-surface-variant mb-8 max-w-md text-center">{error}</p>
        <button 
          onClick={() => router.push("/review")}
          className="px-8 py-3 bg-surface-container-high text-on-surface rounded-lg font-bold border border-outline-variant hover:bg-surface-container-highest transition-all"
        >
          Return to Entry
        </button>
      </div>
    );
  }

  const { review } = data;

  return (
    <div className="bg-background min-h-screen pb-24">
      <DashboardHeader name="AI Review" />

      <main className="pt-32 px-12 max-w-7xl mx-auto">
        {/* Report Hero */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="text-left">
              <span className="text-label-md font-bold text-primary uppercase tracking-[0.3em] mb-4 block">Architectural Audit Result</span>
              <h1 className="font-display text-display-md text-on-surface leading-none mb-2">{repo}</h1>
              <p className="text-on-surface-variant text-body-lg">Full-scale engineering standard evaluation.</p>
           </div>
           <div className="flex gap-4 items-center">
              <ExportDropdown data={data} filename={`devproof-review-${repo}`} />
              <div className="px-8 py-6 bg-surface-container-low rounded-xl border border-outline-variant text-center">
                 <span className="block text-3xl font-display font-bold text-primary">{review.bestPracticesScore}</span>
                 <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Standards Index</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           {/* Primary Analysis */}
           <div className="lg:col-span-8 space-y-20">
              
              {/* Core Observations */}
              <section>
                 <h2 className="font-display text-headline-sm text-on-surface uppercase tracking-widest mb-10 flex items-center gap-4">
                    Architectural Observations
                    <div className="h-px flex-grow bg-surface-container-highest"></div>
                 </h2>
                 <div className="grid grid-cols-1 gap-6">
                    {review.observations.map((obs: string, idx: number) => (
                      <div key={idx} className="p-8 bg-surface-container-low rounded-xl border-l-4 border-primary group hover:bg-surface-container-high transition-all">
                         <p className="text-body-lg text-on-surface leading-relaxed">{obs}</p>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Refactor Directives */}
              <section className="bg-surface-container-low p-12 rounded-2xl border border-outline-variant">
                 <h2 className="font-display text-headline-md text-on-surface mb-8">Refactoring Directives</h2>
                 <div className="space-y-8">
                    {review.suggestedRefactors.map((ref: string, idx: number) => (
                      <div key={idx} className="flex gap-6 items-start">
                         <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-primary text-xl font-bold">handyman</span>
                         </div>
                         <div>
                            <h4 className="text-on-surface font-bold text-body-lg mb-2">Directive 0{idx + 1}</h4>
                            <p className="text-on-surface-variant text-body-md leading-relaxed">{ref}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* Performance Sidebar */}
           <div className="lg:col-span-4 space-y-12">
              
              {/* Scoring Pillars */}
              <section className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant">
                 <h3 className="text-label-md font-bold text-on-surface uppercase tracking-[0.2em] mb-10">Audit Pillars</h3>
                 <div className="space-y-12">
                    {[
                      { name: "Structure", score: review.structureScore },
                      { name: "Readability", score: review.readinessScore || review.readabilityScore }, // handle key diffs
                      { name: "Maintainability", score: review.maintainabilityScore },
                    ].map((pillar) => (
                      <div key={pillar.name}>
                        <div className="flex justify-between items-end mb-3">
                           <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{pillar.name}</span>
                           <span className="text-body-sm font-bold text-primary">{pillar.score}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                           <div className="h-full bg-primary-gradient transition-all duration-1000" style={{ width: `${pillar.score}%` }}></div>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Missing Practices */}
              <section className="p-8 bg-surface-container-high rounded-2xl border border-outline-variant">
                 <h3 className="text-label-md font-bold text-error uppercase tracking-[0.2em] mb-8 text-center">Missing Engineering Pillars</h3>
                 <div className="space-y-4">
                    {review.missingPractices.map((practice: string) => (
                      <div key={practice} className="p-4 bg-surface-container-low rounded-xl flex items-center gap-4 text-on-surface-variant text-body-sm border border-outline-variant/10">
                         <span className="material-symbols-outlined text-error text-lg">close</span>
                         {practice}
                      </div>
                    ))}
                 </div>
              </section>

              {/* Action Button */}
              <button 
                 onClick={() => router.push("/")}
                 className="w-full py-5 bg-surface-container-lowest text-on-surface text-label-md font-bold uppercase tracking-widest rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all"
              >
                 Archive Review
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}
