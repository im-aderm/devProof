"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard, SummaryCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

export default function CompareResultsPage() {
  const { userA, userB } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/compare/users/${userA}/${userB}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to compare users");
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
  }, [userA, userB]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
        />
        <h1 className="text-2xl font-black text-text-primary uppercase tracking-widest animate-pulse">
          Benchmarking: {userA} vs {userB}
        </h1>
        <p className="text-text-secondary mt-4 font-bold uppercase tracking-widest text-xs opacity-50">
          Syncing performance signatures...
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
        <h1 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Benchmarking Failed</h1>
        <p className="text-text-secondary mb-10 max-w-md mx-auto font-medium leading-relaxed">{error}</p>
        <PrimaryButton onClick={() => router.push("/compare")} icon="arrow_back">
          Return to Terminal
        </PrimaryButton>
      </div>
    );
  }

  const { userA: dA, userB: dB } = data;

  const compareStats = [
    { label: "Overall Score", a: dA.scoringResult.score, b: dB.scoringResult.score },
    { label: "Stars Earned", a: dA.repos.reduce((acc: any, r: any) => acc + (r.stargazers_count || 0), 0), b: dB.repos.reduce((acc: any, r: any) => acc + (r.stargazers_count || 0), 0) },
    { label: "PR Count", a: dA.collabStats.prCount, b: dB.collabStats.prCount },
    { label: "Issue Resolution", a: dA.collabStats.issueCount, b: dB.collabStats.issueCount },
    { label: "Public Repos", a: dA.profile.public_repos, b: dB.profile.public_repos },
    { label: "Followers", a: dA.profile.followers, b: dB.profile.followers },
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
              <motion.span variants={itemVariants} className="text-xs font-black text-primary uppercase tracking-[0.4em]">Comparative Intelligence Dossier</motion.span>
              <motion.h1 variants={itemVariants} className="text-5xl font-black text-text-primary tracking-tighter uppercase">
                 {userA} <span className="text-text-secondary font-medium lowercase opacity-30 mx-4">vs</span> {userB}
              </motion.h1>
            </section>

            {/* Side-by-Side Hero */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden shadow-2xl border border-border">
               {[dA, dB].map((u, idx) => (
                 <div key={idx} className="bg-surface p-12 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 primary-gradient rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <div className="w-32 h-32 rounded-3xl overflow-hidden mb-8 border-4 border-surface shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                      <img src={u.profile.avatar_url} alt={u.profile.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl font-black text-text-primary mb-2 tracking-tight z-10">{u.profile.name || (idx === 0 ? userA : userB)}</h3>
                    <p className="text-xs text-text-secondary mb-10 line-clamp-2 max-w-xs font-medium italic z-10">{u.profile.bio || "No bio available."}</p>
                    <div className="w-24 h-24 rounded-2xl border-2 border-border flex flex-col items-center justify-center bg-surface-variant shadow-inner z-10">
                       <span className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">Score</span>
                       <span className="text-3xl font-black text-primary tracking-tighter leading-none">{u.scoringResult.score}</span>
                    </div>
                 </div>
               ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-12">
                  
                  {/* Statistical Parity */}
                  <section className="space-y-8">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-4">
                        Statistical Parity
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
                                      {stat.a > stat.b && <span className="text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-md bg-primary/5">Leader</span>}
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
                                      {stat.b > stat.a && <span className="text-[8px] font-black text-primary uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded-md bg-primary/5">Leader</span>}
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

                  {/* Stack Convergence */}
                  <section className="space-y-8">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-4">
                        Stack Convergence
                        <div className="h-px flex-grow bg-border/50"></div>
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[dA, dB].map((u, idx) => {
                          const langs = Array.from(new Set(u.repos.flatMap((r: any) => Object.keys(r.languages)))).slice(0, 8);
                          return (
                            <motion.div key={idx} variants={itemVariants}>
                              <GlassCard>
                                 <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-6">{idx === 0 ? userA : userB} Core Stacks</h4>
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
                     <SummaryCard title="Comparative Pillars" icon="radar">
                        <div className="space-y-10 pt-4">
                           {dA.scoringResult.checklist.map((pillar: any, idx: number) => {
                             const valA = pillar.score;
                             const valB = dB.scoringResult.checklist[idx].score;
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

                  {/* Auditor Observation */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Auditor Observation" icon="psychology">
                        <div className="space-y-8 pt-2">
                           {dA.scoringResult.score > dB.scoringResult.score ? (
                             <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface-variant rounded-r-2xl">
                               <span className="text-text-primary font-black not-italic">{userA}</span> demonstrates higher architectural stability and project quality metrics within the analyzed ledger.
                             </p>
                           ) : dB.scoringResult.score > dA.scoringResult.score ? (
                             <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface-variant rounded-r-2xl">
                               <span className="text-text-primary font-black not-italic">{userB}</span> exhibits superior engineering velocity and technical breadth across their public portfolio.
                             </p>
                           ) : (
                             <p className="text-xs font-medium text-text-secondary leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-surface-variant rounded-r-2xl">
                               Both subjects maintain high technical parity with nearly identical performance signatures.
                             </p>
                           )}
                           
                           <PrimaryButton className="w-full" icon="download">
                              Export Comparison
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
