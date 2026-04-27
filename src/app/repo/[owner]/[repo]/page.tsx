"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard, SummaryCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
        />
        <h1 className="text-2xl font-black text-text-primary uppercase tracking-widest animate-pulse">
          Auditing Repository: {repo}
        </h1>
        <p className="text-text-secondary mt-4 font-bold uppercase tracking-widest text-xs opacity-50">
          Analyzing architecture & code quality...
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
        <PrimaryButton onClick={() => router.push("/")} icon="arrow_back">
          Return to Entry
        </PrimaryButton>
      </div>
    );
  }

  const { repoData, languages, aiSummary, metrics } = data;

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
            {/* Repo Hero */}
            <section className="flex flex-col md:flex-row gap-10 items-start">
               <motion.div variants={itemVariants} className="relative">
                  <div className="w-48 h-48 rounded-3xl bg-surface flex items-center justify-center border-4 border-border shadow-2xl relative z-10">
                     <span className="material-symbols-outlined text-7xl text-primary">folder</span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl primary-gradient flex flex-col items-center justify-center shadow-xl border-4 border-surface z-20">
                     <span className="text-[10px] font-black text-white uppercase tracking-tighter opacity-80">Score</span>
                     <span className="text-3xl font-black text-white leading-none">{metrics.overallScore}</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 opacity-30 animate-pulse"></div>
               </motion.div>

               <div className="flex-grow pt-4">
                  <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-6 mb-4">
                     <div className="flex flex-wrap items-center gap-4">
                        <h1 className="text-5xl font-black text-text-primary tracking-tighter">{repoData.name}</h1>
                        <span className="px-4 py-1.5 rounded-xl bg-surface-variant text-text-primary text-[10px] font-black uppercase tracking-widest border border-border shadow-sm">
                           {repoData.license || "Open Source"}
                        </span>
                     </div>
                  </motion.div>
                  
                  <motion.p variants={itemVariants} className="text-text-secondary text-lg mb-8 max-w-2xl leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                     {repoData.description || "The authors have left this manifest blank. The code speaks for itself through its architectural integrity."}
                  </motion.p>
                  
                  <motion.div variants={itemVariants} className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-widest text-text-secondary opacity-60">
                     <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                        Lead: <a href={`/analyze/${owner}`} className="text-text-primary hover:text-primary transition-colors underline decoration-border">{owner}</a>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">history</span>
                        Sync: {new Date(repoData.pushedAt).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">open_in_new</span>
                        <a href={repoData.url} target="_blank" className="hover:text-primary transition-colors">Source Terminal</a>
                     </div>
                  </motion.div>
               </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-12">
                  
                  {/* Vital Stats */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden border border-border shadow-sm">
                     {[
                        { label: "Stargazers", value: repoData.stars, icon: "grade" },
                        { label: "Network Forks", value: repoData.forks, icon: "fork_left" },
                        { label: "Watchers", value: repoData.watchers, icon: "visibility" },
                        { label: "Primary Stack", value: repoData.language || "N/A", icon: "code" },
                     ].map((stat) => (
                        <div key={stat.label} className="bg-surface p-8 flex flex-col items-center text-center hover:bg-surface-variant transition-colors group">
                           <span className="material-symbols-outlined text-text-secondary mb-4 opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all">{stat.icon}</span>
                           <span className="text-2xl font-black text-text-primary mb-2 truncate w-full px-2 tracking-tighter">{stat.value}</span>
                           <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-60">{stat.label}</span>
                        </div>
                     ))}
                  </motion.div>

                  {/* AI Architectural Review */}
                  <motion.div variants={itemVariants}>
                     <GlassCard className="relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                           <span className="material-symbols-outlined text-[120px] text-primary">architecture</span>
                        </div>
                        <h2 className="text-sm font-black text-text-primary uppercase tracking-widest mb-8 flex items-center gap-3">
                           <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                           AI Architectural Analysis
                        </h2>
                        <div className="p-8 bg-surface-variant rounded-2xl italic text-text-primary leading-relaxed text-lg border-l-4 border-primary shadow-inner relative z-10">
                           &quot;{aiSummary}&quot;
                        </div>
                     </GlassCard>
                  </motion.div>

                  {/* Language Distribution */}
                  <motion.div variants={itemVariants} className="space-y-8">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">Technological Composition</h2>
                     <div className="space-y-8">
                        {Object.entries(languages).sort(([, a]: any, [, b]: any) => b - a).map(([name, size]: any, idx) => {
                           const total = Object.values(languages).reduce((acc: any, s: any) => acc + s, 0) as number;
                           const percentage = Math.round((size / total) * 100);
                           return (
                              <div key={name}>
                                 <div className="flex justify-between items-end mb-3">
                                    <span className="text-lg font-black text-text-primary tracking-tight">{name}</span>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{percentage}%</span>
                                 </div>
                                 <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden border border-border">
                                    <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: `${percentage}%` }}
                                       transition={{ duration: 1, delay: idx * 0.1 }}
                                       className="h-full primary-gradient"
                                    ></motion.div>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </motion.div>
               </div>

               {/* Right Sidebar Area */}
               <div className="lg:col-span-4 space-y-8">
                  
                  {/* Audit Pillars */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Audit Pillars" icon="shield">
                        <div className="space-y-10 pt-4">
                           {[
                              { name: "Documentation", score: metrics.readmeScore },
                              { name: "Complexity", score: metrics.complexityScore },
                              { name: "Freshness", score: metrics.freshnessScore },
                           ].map((pillar) => (
                              <div key={pillar.name} className="flex flex-col items-center">
                                 <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                                    <svg className="w-full h-full rotate-[-90deg]">
                                       <circle className="text-border/30" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                                       <motion.circle
                                          initial={{ strokeDashoffset: 364 }}
                                          animate={{ strokeDashoffset: 364 - (364 * pillar.score) / 100 }}
                                          transition={{ duration: 1.5, ease: "easeOut" }}
                                          className="text-primary"
                                          cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"
                                          strokeDasharray="364"
                                          strokeLinecap="round"
                                       ></motion.circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                       <span className="text-3xl font-black text-text-primary tracking-tighter">{pillar.score}</span>
                                       <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-60">Index</span>
                                    </div>
                                 </div>
                                 <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{pillar.name}</span>
                              </div>
                           ))}
                        </div>
                     </SummaryCard>
                  </motion.div>

                  {/* Optimization Directives */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Optimization Directives" icon="lightbulb">
                        <ul className="space-y-4 pt-2">
                           {metrics.readmeScore < 70 && (
                              <li className="p-5 bg-surface-variant rounded-2xl text-xs font-medium text-text-secondary border-l-4 border-primary leading-relaxed">
                                 Enhance manifest documentation to improve architectural transparency and developer onboarding.
                              </li>
                           )}
                           {metrics.complexityScore < 50 && (
                              <li className="p-5 bg-surface-variant rounded-2xl text-xs font-medium text-text-secondary border-l-4 border-primary leading-relaxed">
                                 Increase modular complexity and system-level abstraction layers.
                              </li>
                           )}
                           {metrics.freshnessScore < 50 && (
                              <li className="p-5 bg-surface-variant rounded-2xl text-xs font-medium text-text-secondary border-l-4 border-primary leading-relaxed">
                                 Mitigate architectural staleness with active maintenance and dependency synchronization.
                              </li>
                           )}
                           {metrics.readmeScore >= 70 && metrics.complexityScore >= 50 && metrics.freshnessScore >= 50 && (
                              <li className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-xs font-black text-primary flex items-center gap-3 uppercase tracking-widest border border-indigo-100 dark:border-indigo-800/50">
                                 <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                 All pillars optimized
                              </li>
                           )}
                        </ul>
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
