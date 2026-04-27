"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard, SummaryCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
        />
        <h1 className="text-2xl font-black text-text-primary uppercase tracking-widest animate-pulse">
          Benchmarking: {repoA} vs {repoB}
        </h1>
        <p className="text-text-secondary mt-4 font-bold uppercase tracking-widest text-xs opacity-50">
          Analyzing architectural manifests...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-error/10 rounded-3xl flex items-center justify-center mb-8 border border-error/20">
          <span className="material-symbols-outlined text-4xl text-error">warning</span>
        </div>
        <h1 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Audit Critical Failure</h1>
        <p className="text-text-secondary mb-10 max-w-md mx-auto font-medium leading-relaxed">{error}</p>
        <PrimaryButton onClick={() => router.push("/compare")} icon="arrow_back">
          Return to Terminal
        </PrimaryButton>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <TopNavbar />
        
        <main className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-12"
          >
            {/* Page Header */}
            <section className="text-center space-y-4">
              <motion.span variants={itemVariants} className="text-xs font-black text-primary uppercase tracking-[0.4em]">Architectural Parity Audit</motion.span>
              <motion.h1 variants={itemVariants} className="text-5xl font-black text-text-primary tracking-tighter uppercase leading-none">
                 {rA.repoData.name} <span className="text-text-secondary font-medium lowercase opacity-30 mx-4">vs</span> {rB.repoData.name}
              </motion.h1>
            </section>

            {/* Side-by-Side Repo Hero */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden shadow-2xl border border-border">
               {[rA, rB].map((r, idx) => (
                 <div key={idx} className="bg-surface p-12 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 primary-gradient rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="w-32 h-32 rounded-3xl bg-surface-variant flex items-center justify-center mb-8 border border-border shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                      <span className="material-symbols-outlined text-6xl text-primary">folder</span>
                    </div>
                    <h3 className="text-2xl font-black text-text-primary mb-2 tracking-tight z-10">{r.repoData.name}</h3>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 z-10">Subject {idx === 0 ? 'Alpha' : 'Beta'}: @{r.repoData.owner}</p>
                    <p className="text-xs text-text-secondary mb-10 line-clamp-2 max-w-xs font-medium italic z-10">{r.repoData.description || "The manifest remains blank for this repository."}</p>
                    <div className="w-24 h-24 rounded-2xl border-2 border-border flex flex-col items-center justify-center bg-surface-variant shadow-inner z-10">
                       <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">Quality</span>
                       <span className="text-3xl font-black text-primary tracking-tighter leading-none">{r.metrics.overallScore}</span>
                    </div>
                 </div>
               ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-12">
                  
                  {/* Audit Benchmarks */}
                  <section className="space-y-8">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-4">
                        Audit Benchmarks
                        <div className="h-px flex-grow bg-border/50"></div>
                     </h2>
                     <div className="space-y-4">
                        {compareStats.map((stat) => (
                          <motion.div key={stat.label} variants={itemVariants} className="p-8 bg-surface rounded-3xl border border-border group hover:border-primary/30 transition-all shadow-sm">
                             <div className="flex justify-between items-center mb-6">
                                <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">{stat.label}</span>
                             </div>
                             <div className="grid grid-cols-2 gap-12 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] font-black z-10 text-text-secondary">VS</div>
                                
                                <div className="space-y-4">
                                   <div className="flex justify-between items-end">
                                      <span className={`text-3xl font-black tracking-tighter ${stat.a >= stat.b ? "text-primary" : "text-text-primary"}`}>{stat.a}</span>
                                      {stat.a > stat.b && <span className="text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-md bg-primary/5">Superior</span>}
                                   </div>
                                   <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden border border-border">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${Math.min((stat.a / (stat.a + stat.b)) * 100 || 0, 100)}%` }}
                                        className="h-full primary-gradient"
                                      ></motion.div>
                                   </div>
                                </div>

                                <div className="space-y-4 text-right">
                                   <div className="flex justify-between items-end flex-row-reverse">
                                      <span className={`text-3xl font-black tracking-tighter ${stat.b >= stat.a ? "text-primary" : "text-text-primary"}`}>{stat.b}</span>
                                      {stat.b > stat.a && <span className="text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-md bg-primary/5">Superior</span>}
                                   </div>
                                   <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden border border-border flex flex-row-reverse">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${Math.min((stat.b / (stat.a + stat.b)) * 100 || 0, 100)}%` }}
                                        className="h-full primary-gradient"
                                      ></motion.div>
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                        ))}
                     </div>
                  </section>

                  {/* Technological Convergence */}
                  <section className="space-y-8">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-4">
                        Technological Convergence
                        <div className="h-px flex-grow bg-border/50"></div>
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[rA, rB].map((r, idx) => {
                          const langs = Object.keys(r.languages).slice(0, 8);
                          return (
                            <motion.div key={idx} variants={itemVariants}>
                              <GlassCard>
                                 <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-6">{r.repoData.name} Core Stack</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {langs.map((l: any) => (
                                      <span key={l as string} className="px-4 py-2 rounded-xl bg-surface border border-border text-text-primary text-[10px] font-black uppercase tracking-widest hover:border-primary transition-colors cursor-default">
                                         {l as string}
                                      </span>
                                    ))}
                                 </div>
                              </GlassCard>
                            </motion.div>
                          );
                        })}
                     </div>
                  </section>
               </div>

               {/* Right Sidebar */}
               <div className="lg:col-span-4 space-y-8">
                  
                  {/* Comparative Radar */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Audit Pillars" icon="shield">
                        <div className="space-y-10 pt-4">
                           {[
                              { name: "Documentation", a: rA.metrics.readmeScore, b: rB.metrics.readmeScore },
                              { name: "Complexity", a: rA.metrics.complexityScore, b: rB.metrics.complexityScore },
                              { name: "Freshness", a: rA.metrics.freshnessScore, b: rB.metrics.freshnessScore },
                           ].map((pillar) => {
                             const valA = pillar.a;
                             const valB = pillar.b;
                             return (
                               <div key={pillar.name}>
                                  <div className="flex justify-between items-center mb-3">
                                     <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{pillar.name}</span>
                                     <div className="flex gap-4">
                                        <span className={`text-xs font-black ${valA >= valB ? "text-primary" : "text-text-secondary"}`}>{valA}</span>
                                        <span className="text-text-secondary opacity-20">/</span>
                                        <span className={`text-xs font-black ${valB >= valA ? "text-primary" : "text-text-secondary"}`}>{valB}</span>
                                     </div>
                                  </div>
                                  <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden flex border border-border">
                                     <div className="h-full primary-gradient" style={{ width: `${(valA / (valA + valB)) * 100 || 0}%`, opacity: valA >= valB ? 1 : 0.4 }}></div>
                                     <div className="h-full bg-border" style={{ width: "2px" }}></div>
                                     <div className="h-full primary-gradient" style={{ width: `${(valB / (valA + valB)) * 100 || 0}%`, opacity: valB >= valA ? 1 : 0.4 }}></div>
                                  </div>
                               </div>
                             );
                           })}
                        </div>
                     </SummaryCard>
                  </motion.div>

                  {/* Auditor Conclusion */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Audit Conclusion" icon="psychology">
                        <div className="space-y-8 pt-2">
                           {rA.metrics.overallScore > rB.metrics.overallScore ? (
                             <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface-variant rounded-r-2xl">
                               <span className="text-text-primary font-black not-italic">{rA.repoData.name}</span> exhibits superior architectural maturity and documentation standards within the analyzed ledger.
                             </p>
                           ) : rB.metrics.overallScore > rA.metrics.overallScore ? (
                             <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface-variant rounded-r-2xl">
                               <span className="text-text-primary font-black not-italic">{rB.repoData.name}</span> demonstrates higher technical complexity and system-level performance.
                             </p>
                           ) : (
                             <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface-variant rounded-r-2xl">
                               Both architectural manifests maintain strict parity across all analyzed vectors.
                             </p>
                           )}
                           
                           <div className="p-4 bg-surface border border-border rounded-xl space-y-2">
                              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-text-secondary">
                                 <span>Alpha Pushed</span>
                                 <span className="text-text-primary">{new Date(rA.repoData.pushedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-text-secondary">
                                 <span>Beta Pushed</span>
                                 <span className="text-text-primary">{new Date(rB.repoData.pushedAt).toLocaleDateString()}</span>
                              </div>
                           </div>

                           <PrimaryButton className="w-full" icon="download">
                              Export Audit Result
                           </PrimaryButton>
                        </div>
                     </SummaryCard>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
