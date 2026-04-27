"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard, MetricCard, RepoCard, SummaryCard } from "@/components/ui/Cards";
import { PrimaryButton, FloatingFAB } from "@/components/ui/Buttons";
import StrengthScore from "@/components/dashboard/StrengthScore";
import CodeQualityRadar from "@/components/dashboard/RadarChart";
import GrowthForecast from "@/components/dashboard/GrowthForecast";
import OptimizationChecklist from "@/components/dashboard/OptimizationChecklist";
import { motion, AnimatePresence } from "framer-motion";

export default function AnalyzePage() {
  const { username } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIdx, setTypewriterIdx] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        }, 10);
        return () => clearTimeout(timeout);
      }
    }
  }, [data, typewriterIdx]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
        />
        <h1 className="text-2xl font-black text-text-primary uppercase tracking-widest animate-pulse">
          Synchronizing Ledger: {username}
        </h1>
        <p className="text-text-secondary mt-4 font-bold uppercase tracking-widest text-xs opacity-50">
          Auditing GitHub Repositories & Contributions...
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
        <h1 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Analysis Protocol Failed</h1>
        <p className="text-text-secondary mb-10 max-w-md mx-auto font-medium leading-relaxed">{error}</p>
        <PrimaryButton onClick={() => router.push("/")} icon="arrow_back">
          Return to Terminal
        </PrimaryButton>
      </div>
    );
  }

  const { profile, collabStats, repos, aiSummary, scoringResult, growthForecast: growth } = data;
  const totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);

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
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col min-h-screen w-full">
        <TopNavbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          user={data ? {
            name: data.profile.name || data.profile.login,
            image: data.profile.avatar_url,
            email: `@${data.profile.login}`
          } : undefined}
        />
        
        <main className="p-6 md:p-12 max-w-7xl mx-auto w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-12"
          >
            {/* Header / Hero Section */}
            <section className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start w-full">
                 <motion.div 
                   variants={itemVariants}
                   className="relative group flex-shrink-0"
                 >
                   <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-surface shadow-2xl relative z-10">
                      <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="absolute -bottom-3 -right-3 primary-gradient text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest z-20 shadow-xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      Verified
                   </div>
                   <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                 </motion.div>

                 <div className="flex-1 w-full space-y-6 text-center md:text-left pt-2">
                    <motion.div variants={itemVariants} className="space-y-2">
                       <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tighter leading-none">
                          {profile.name || username}
                       </h1>
                       <div className="flex items-center justify-center md:justify-start gap-4">
                          <p className="text-text-secondary font-bold flex items-center gap-2">
                             <span className="material-symbols-outlined text-primary text-xl">hub</span>
                             @{profile.login}
                          </p>
                          <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
                          <p className="text-primary font-black uppercase tracking-widest text-[10px]">
                             {aiSummary.persona}
                          </p>
                       </div>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-text-secondary w-full max-w-2xl leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6 py-2 text-sm md:text-base mx-auto md:mx-0">
                       {profile.bio || "No public bio provided. This developer operates with silent precision across the global codebase."}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8 pt-2">
                       <div className="text-center md:text-left">
                          <span className="block text-xl md:text-2xl font-black text-text-primary tracking-tighter">{collabStats.prCount + collabStats.issueCount}</span>
                          <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Contributions</span>
                       </div>
                       <div className="text-center md:text-left">
                          <span className="block text-xl md:text-2xl font-black text-text-primary tracking-tighter">{profile.public_repos}</span>
                          <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Repositories</span>
                       </div>
                       <div className="text-center md:text-left">
                          <span className="block text-xl md:text-2xl font-black text-text-primary tracking-tighter">{totalStars >= 1000 ? `${(totalStars / 1000).toFixed(1)}k` : totalStars}</span>
                          <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Total Stars</span>
                       </div>
                    </motion.div>
                 </div>
              </div>
              
              <motion.div variants={itemVariants} className="w-full md:w-auto">
                <PrimaryButton 
                  className="w-full md:w-auto" 
                  icon="download"
                  onClick={() => alert("Exporting profile report...")}
                >
                   Export Report
                </PrimaryButton>
              </motion.div>
            </section>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               
               {/* Left Content Area (2/3) */}
               <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
                  
                  {/* AI Analysis Summary */}
                  <motion.div variants={itemVariants}>
                    <GlassCard className="relative overflow-hidden group min-h-[400px]">
                       <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                          <span className="material-symbols-outlined text-[160px] text-primary">psychology</span>
                       </div>
                       
                       <div className="flex items-center gap-3 mb-10">
                          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center border border-indigo-100 dark:border-indigo-800/50">
                             <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                          </div>
                          <h2 className="text-sm font-black text-text-primary uppercase tracking-widest">AI Intelligence Summary</h2>
                       </div>

                       <div className="space-y-12">
                          <div className="p-6 md:p-8 bg-surface-variant rounded-2xl italic text-text-primary leading-relaxed text-base md:text-lg border-l-4 border-primary min-h-[160px] shadow-inner relative z-10">
                            &quot;{typewriterText}<span className="animate-pulse bg-primary w-1 h-5 inline-block align-middle ml-1"></span>&quot;
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                             <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Strategic Focus</h4>
                                <div className="flex flex-wrap gap-2">
                                   {aiSummary.topSkills.map((skill: string) => (
                                     <span key={skill} className="px-4 py-2 rounded-xl bg-surface border border-border text-text-primary text-[10px] font-black uppercase tracking-widest hover:border-primary transition-colors cursor-default">
                                        {skill}
                                     </span>
                                   ))}
                                </div>
                             </div>
                             <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-error uppercase tracking-[0.2em]">Optimization Vectors</h4>
                                <ul className="space-y-4">
                                   {aiSummary.growthAreas.map((area: string) => (
                                     <li key={area} className="text-xs text-text-secondary flex items-start gap-4 group/item">
                                        <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform"></span>
                                        <span className="group-hover/item:text-text-primary transition-colors">{area}</span>
                                     </li>
                                   ))}
                                </ul>
                             </div>
                          </div>
                       </div>
                    </GlassCard>
                  </motion.div>

                  {/* Top Repositories */}
                  <div className="space-y-6">
                    <motion.div variants={itemVariants} className="flex justify-between items-end">
                       <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">Elite Repositories</h2>
                       <Link href="/dashboard" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:underline">
                          View All
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                       </Link>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {repos.slice(0, 4).map((repo: any, idx: number) => (
                         <motion.div 
                           key={repo.id}
                           variants={itemVariants}
                           transition={{ delay: idx * 0.1 }}
                         >
                           <RepoCard 
                             name={repo.name}
                             description={repo.description}
                             stars={repo.stargazers_count}
                             forks={repo.forks_count}
                             language={repo.language}
                           />
                         </motion.div>
                       ))}
                    </div>
                  </div>

                  {/* Optimization Checklist */}
                  <motion.div variants={itemVariants} className="space-y-6">
                     <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">Performance Audit</h2>
                     <OptimizationChecklist 
                       completedItems={scoringResult.recommendations.length === 0 ? ["High Contribution Velocity", "Clean Documentation", "Complex System Architecture"] : ["Verified Public Presence"]}
                       items={scoringResult.recommendations}
                     />
                  </motion.div>
               </div>

               {/* Right Sidebar Area (1/3) */}
               <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
                  
                  {/* Developer Strength */}
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Developer Strength" icon="bolt">
                       <StrengthScore 
                         score={scoringResult.score} 
                         percentile={scoringResult.percentile} 
                         badge={scoringResult.badge} 
                       />
                    </SummaryCard>
                  </motion.div>

                  {/* Code Quality Radar */}
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Capability Matrix" icon="radar">
                       <CodeQualityRadar data={scoringResult.radarData} />
                    </SummaryCard>
                  </motion.div>

                  {/* Growth Forecast */}
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Growth Trajectory" icon="trending_up">
                       <GrowthForecast 
                         velocity={growth.velocity}
                         tier={growth.tier}
                         status={growth.status}
                         description={growth.description}
                       />
                    </SummaryCard>
                  </motion.div>

                  {/* Stack Concentration */}
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Stack Concentration" icon="terminal">
                       <div className="space-y-6 pt-2">
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
                                  <span className="text-xs font-black text-text-primary uppercase tracking-tight">{name}</span>
                                  <span className="text-[10px] font-black text-primary">{percentage}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden border border-border">
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
                    </SummaryCard>
                  </motion.div>
               </div>
            </div>
          </motion.div>
        </main>
        
        <footer className="mt-auto py-12 px-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-text-secondary">
          <div className="font-black uppercase tracking-tighter text-sm">DevProof Intelligence Engine</div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-40">© 2026 Developer Skill Verification System</div>
          <div className="flex gap-6">
             <span className="material-symbols-outlined text-xl hover:text-primary transition-colors cursor-pointer">language</span>
             <span className="material-symbols-outlined text-xl hover:text-primary transition-colors cursor-pointer">terminal</span>
          </div>
        </footer>
      </div>

      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-4">
         <FloatingFAB icon="share" label="Share Ledger" onClick={() => {
           navigator.clipboard.writeText(window.location.href);
           alert("Link copied!");
         }} />
         <FloatingFAB icon="description" label="Generate Resume" onClick={() => alert("Generating resume...")} />
         <FloatingFAB icon="person_pin" label="View Portfolio" onClick={() => alert("Viewing portfolio...")} />
      </div>
    </div>
  );
}
