"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GlassCard, MetricCard } from "@/components/ui/Cards";
import { PrimaryButton, IconButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";
import { MetricSkeleton, ChartSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";
import CollaborationChart from "@/components/dashboard/CollaborationChart";
import TopicExpertise from "@/components/dashboard/TopicExpertise";
import GrowthForecast from "@/components/dashboard/GrowthForecast";
import OptimizationChecklist from "@/components/dashboard/OptimizationChecklist";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && !session?.user?.onboardingCompleted) {
      router.push("/onboarding");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="flex flex-col gap-10 w-full animate-pulse-soft">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
             <Skeleton className="w-64 h-10" />
             <Skeleton className="w-96 h-4" />
          </div>
          <Skeleton className="w-48 h-12 rounded-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <MetricSkeleton />
           <MetricSkeleton />
           <MetricSkeleton />
           <MetricSkeleton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <ChartSkeleton />
           <ChartSkeleton />
        </div>
      </div>
    );
  }

  const { stats, reports, snapshots, languages, topics } = data || { 
    stats: { score: 0, stars: 0, repos: 0, followers: 0, growth: 0, privateRepos: 0, collaboration: { prCount: 0, issueCount: 0, reviewCount: 0 } }, 
    reports: [], 
    snapshots: [],
    languages: [],
    topics: []
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10 w-full"
    >
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div variants={itemVariants} className="space-y-2">
          <h1 className="text-4xl font-black text-text-primary tracking-tighter">
             Welcome, {session?.user?.name?.split(" ")[0] || "Developer"}
          </h1>
          <p className="text-text-secondary font-medium italic border-l-4 border-primary/20 pl-4">Your engineering intelligence protocol is synchronized.</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <PrimaryButton 
            onClick={() => router.push(`/analyze/${(session?.user as any)?.githubUsername}`)}
            icon="refresh"
          >
            Re-Analyze Ledger
          </PrimaryButton>
        </motion.div>
      </section>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <MetricCard title="Developer Score" value={`${stats.score}/100`} icon="bolt" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard title="Total Stars" value={stats.stars} icon="grade" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard 
            title="Repositories" 
            value={stats.repos} 
            icon="folder" 
            trend={stats.privateRepos > 0 ? `${stats.privateRepos} Private` : undefined}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <MetricCard 
            title="Session Growth" 
            value={`${stats.growth >= 0 ? "+" : ""}${stats.growth}%`} 
            icon="trending_up" 
            trend={`${stats.growth}% Velocity`} 
            trendPositive={stats.growth >= 0} 
          />
        </motion.div>
      </div>

      {/* Primary Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <motion.div variants={itemVariants} className="lg:col-span-8">
            <GlassCard className="p-8 h-full">
               <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-10">Engineering Velocity</h3>
               <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={snapshots}>
                        <defs>
                           <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(str) => new Date(str).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          stroke="rgba(255,255,255,0.2)"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.2)"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                          labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="activityScore" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </GlassCard>
         </motion.div>

         <motion.div variants={itemVariants} className="lg:col-span-4">
            <GlassCard className="p-8 h-full">
               <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-10">Collaboration Matrix</h3>
               <CollaborationChart stats={stats.collaboration} />
               <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Efficiency Rating</span>
                     <span className="text-xs font-black text-success">Optimized</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Active Threads</span>
                     <span className="text-xs font-black text-text-primary">24</span>
                  </div>
               </div>
            </GlassCard>
         </motion.div>
      </div>

      {/* Secondary Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <motion.div variants={itemVariants} className="lg:col-span-4">
            <GlassCard className="p-8 h-full">
               <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-10">Growth Projection</h3>
               <GrowthForecast 
                 velocity={`${stats.growth >= 0 ? "+" : ""}${stats.growth}%`}
                 tier={stats.readiness?.badge || "Associate"}
                 status={stats.readiness?.score > 70 ? "Synchronized" : "Pending Sync"}
                 description={stats.readiness?.recommendations[0] || "Based on recent commit patterns and architectural complexity."}
               />
            </GlassCard>
         </motion.div>

         <motion.div variants={itemVariants} className="lg:col-span-8">
            <GlassCard className="p-8 h-full">
               <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-10">Topic Expertise</h3>
               <TopicExpertise topics={topics} />
            </GlassCard>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <motion.div variants={itemVariants} className="lg:col-span-12">
            <GlassCard className="p-8">
               <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-10">System Optimization Checklist</h3>
               <OptimizationChecklist 
                 items={stats.readiness?.recommendations || ["Implement Unit Tests", "Optimize README Metadata", "Link Portfolio Dossier"]}
                 completedItems={stats.readiness?.checklist.filter((c: any) => c.score > 70).map((c: any) => c.name) || ["Synchronize GitHub Ledger"]}
               />
            </GlassCard>
         </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Activity List */}
        <div className="lg:col-span-8 space-y-8">
           <motion.div variants={itemVariants} className="flex items-center justify-between">
              <h3 className="text-xl font-black text-text-primary tracking-tighter uppercase flex items-center gap-3">
                 <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                 Analysis Log
              </h3>
              <button className="text-[10px] font-black text-text-secondary hover:text-primary transition-colors uppercase tracking-widest">Access Archive</button>
           </motion.div>
           
           <div className="space-y-4">
              {reports.length > 0 ? reports.map((report: any, idx: number) => (
                <motion.div 
                  key={report.id} 
                  variants={itemVariants}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-surface border border-border p-6 rounded-2xl hover:border-primary/30 transition-all flex items-center justify-between group shadow-sm"
                >
                   <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-xl bg-surface-variant flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/20 border border-transparent transition-all">
                         <span className="material-symbols-outlined">
                            {report.type === 'compare' ? 'compare_arrows' : report.type === 'review' ? 'rate_review' : 'analytics'}
                         </span>
                      </div>
                      <div>
                         <h4 className="font-bold text-text-primary mb-1 uppercase tracking-tight">{report.type} Audit: {report.targetA}</h4>
                         <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">
                           {new Date(report.createdAt).toLocaleDateString()} • {report.score ? `Index: ${report.score}` : 'Intelligence Sync'}
                         </p>
                      </div>
                   </div>
                   <IconButton 
                    icon="arrow_forward"
                    onClick={() => router.push(`/analyze/${report.targetA}`)}
                   />
                </motion.div>
              )) : (
                <motion.div variants={itemVariants} className="p-16 text-center bg-surface border-2 border-dashed border-border rounded-3xl">
                   <p className="text-text-secondary font-medium italic">No activity recorded in the ledger. Initiate analysis to begin tracking.</p>
                </motion.div>
              )}
           </div>
        </div>

        {/* Intelligence Actions */}
        <div className="lg:col-span-4 space-y-8">
           <motion.div variants={itemVariants}>
              <GlassCard className="primary-gradient text-white !border-none shadow-2xl shadow-indigo-500/20">
                 <h3 className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] mb-8">Intelligence Actions</h3>
                 <div className="space-y-3">
                    <button 
                      onClick={() => router.push("/compare")}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-sm font-black uppercase tracking-widest"
                    >
                       <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>compare_arrows</span>
                       Compare Matrix
                    </button>
                    <button 
                      onClick={() => router.push("/review")}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-sm font-black uppercase tracking-widest"
                    >
                       <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                       Standard Review
                    </button>
                    <button 
                      onClick={() => router.push("/resume")}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-sm font-black uppercase tracking-widest"
                    >
                       <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                       Resume Dossier
                    </button>
                 </div>
              </GlassCard>
           </motion.div>

           <motion.div variants={itemVariants}>
              <GlassCard>
                 <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] mb-8">Protocol Status</h3>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl overflow-hidden border border-border shadow-sm">
                       <img src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    </div>
                    <div>
                       <p className="font-black text-text-primary uppercase tracking-tight leading-none mb-1">{session?.user?.name}</p>
                       <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                          <span className="text-[10px] text-success font-black uppercase tracking-widest">System Active</span>
                       </div>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-surface-variant border border-border rounded-xl text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] hover:text-text-primary hover:border-primary/30 transition-all">
                    System Configuration
                 </button>
              </GlassCard>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
