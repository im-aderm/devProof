"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard, SummaryCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
        />
        <h1 className="text-2xl font-black text-text-primary uppercase tracking-widest animate-pulse">
          Architectural Audit: {repo}
        </h1>
        <p className="text-text-secondary mt-4 font-bold uppercase tracking-widest text-xs opacity-50">
          Performing deep structural evaluation...
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
        <h1 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Review Aborted</h1>
        <p className="text-text-secondary mb-10 max-w-md mx-auto font-medium leading-relaxed">{error}</p>
        <PrimaryButton onClick={() => router.push("/")} icon="arrow_back">
          Return to Entry
        </PrimaryButton>
      </div>
    );
  }

  const { review } = data;

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
            <section className="flex flex-col md:flex-row justify-between items-end gap-8">
               <div className="text-left space-y-4">
                  <motion.span variants={itemVariants} className="text-xs font-black text-primary uppercase tracking-[0.4em]">Full Architectural Review</motion.span>
                  <motion.h1 variants={itemVariants} className="text-5xl font-black text-text-primary tracking-tighter uppercase leading-none">{repo}</motion.h1>
                  <motion.p variants={itemVariants} className="text-text-secondary text-lg font-medium italic">High-fidelity engineering standard evaluation protocol.</motion.p>
               </div>
               <motion.div variants={itemVariants} className="flex gap-6 items-center">
                  <PrimaryButton icon="download">Export Dossier</PrimaryButton>
                  <div className="px-8 py-4 bg-surface rounded-3xl border border-border text-center shadow-sm">
                     <span className="block text-3xl font-black text-primary tracking-tighter">{review.bestPracticesScore}</span>
                     <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Purity Index</span>
                  </div>
               </motion.div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-12">
                  
                  {/* Architectural Observations */}
                  <section className="space-y-8">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter flex items-center gap-4">
                        Structural Observations
                        <div className="h-px flex-grow bg-border/50"></div>
                     </h2>
                     <div className="grid grid-cols-1 gap-4">
                        {review.observations.map((obs: string, idx: number) => (
                          <motion.div key={idx} variants={itemVariants} className="p-8 bg-surface rounded-3xl border-l-4 border-primary border-y border-r border-border group hover:bg-surface-variant transition-all shadow-sm">
                             <p className="text-sm font-medium text-text-primary leading-relaxed">{obs}</p>
                          </motion.div>
                        ))}
                     </div>
                  </section>

                  {/* Refactoring Directives */}
                  <motion.div variants={itemVariants}>
                     <GlassCard className="relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                           <span className="material-symbols-outlined text-[120px] text-primary">terminal</span>
                        </div>
                        <h2 className="text-sm font-black text-text-primary uppercase tracking-widest mb-10 flex items-center gap-3">
                           <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>handyman</span>
                           Refactoring Directives
                        </h2>
                        <div className="space-y-10 relative z-10">
                           {review.suggestedRefactors.map((ref: string, idx: number) => (
                             <div key={idx} className="flex gap-8 items-start group/item">
                                <div className="w-12 h-12 rounded-2xl bg-surface-variant flex items-center justify-center flex-shrink-0 border border-border group-hover/item:border-primary/30 transition-colors">
                                   <span className="text-lg font-black text-primary">0{idx + 1}</span>
                                </div>
                                <div className="space-y-2">
                                   <p className="text-sm font-medium text-text-secondary leading-relaxed group-hover/item:text-text-primary transition-colors">{ref}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </GlassCard>
                  </motion.div>
               </div>

               {/* Right Sidebar */}
               <div className="lg:col-span-4 space-y-8">
                  
                  {/* Scoring Pillars */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Engineering Pillars" icon="shield">
                        <div className="space-y-10 pt-4">
                           {[
                              { name: "Structure", score: review.structureScore },
                              { name: "Readability", score: review.readinessScore || review.readabilityScore || 0 },
                              { name: "Maintainability", score: review.maintainabilityScore },
                           ].map((pillar) => (
                              <div key={pillar.name}>
                                 <div className="flex justify-between items-end mb-3">
                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{pillar.name}</span>
                                    <span className="text-xs font-black text-primary">{pillar.score}%</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden border border-border">
                                    <motion.div 
                                       initial={{ width: 0 }}
                                       animate={{ width: `${pillar.score}%` }}
                                       transition={{ duration: 1, delay: 0.2 }}
                                       className="h-full primary-gradient"
                                    ></motion.div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </SummaryCard>
                  </motion.div>

                  {/* Missing Practices */}
                  <motion.div variants={itemVariants}>
                     <SummaryCard title="Missing Pillars" icon="warning">
                        <div className="space-y-4 pt-2">
                           {review.missingPractices.map((practice: string) => (
                             <div key={practice} className="p-5 bg-surface-variant rounded-2xl flex items-center gap-5 text-xs font-black uppercase tracking-widest text-text-secondary border border-border group hover:border-error/30 transition-all">
                                <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                                {practice}
                             </div>
                           ))}
                        </div>
                     </SummaryCard>
                  </motion.div>

                  {/* Final Action */}
                  <motion.div variants={itemVariants}>
                     <PrimaryButton className="w-full py-5" onClick={() => router.push("/")} icon="archive">
                        Archive Audit Results
                     </PrimaryButton>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
