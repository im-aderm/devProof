"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

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

  if (status === "loading" || loading) {
    return (
      <div className="p-8">
        <LoadingSkeleton />
      </div>
    );
  }

  const { stats, reports, snapshots } = data || { 
    stats: { score: 0, stars: 0, repos: 0, followers: 0, growth: 0 }, 
    reports: [], 
    snapshots: [] 
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {session?.user?.name?.split(" ")[0]}</h1>
          <p className="text-slate-400 font-medium">Your engineering intelligence is up to date.</p>
        </div>
        <button 
          onClick={() => router.push(`/analyze/${session?.user?.githubUsername}`)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Re-Analyze Profile
        </button>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Dev Score</p>
            <h3 className="text-3xl font-black text-white">{stats.score}<span className="text-slate-500 text-lg font-medium">/100</span></h3>
          </div>
          <div className="h-12 w-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
             <span className="material-symbols-outlined font-bold">bolt</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Total Stars</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-white">{stats.stars}</h3>
            <span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider border border-amber-500/20">Popularity</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Repositories</p>
          <h3 className="text-3xl font-black text-white">{stats.repos}</h3>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Growth</p>
          <div className="flex items-end gap-3">
            <h3 className={`text-3xl font-black ${stats.growth >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {stats.growth >= 0 ? "+" : ""}{stats.growth}%
            </h3>
            <span className="material-symbols-outlined text-emerald-500 mb-1">trending_up</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                 <span className="material-symbols-outlined text-indigo-500">history</span>
                 Recent Activity
              </h3>
              <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">View All</button>
           </div>
           
           <div className="space-y-4">
              {reports.length > 0 ? reports.map((report: any) => (
                <div key={report.id} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-between group">
                   <div className="flex items-center gap-6">
                      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                         <span className="material-symbols-outlined">
                            {report.type === 'compare' ? 'compare_arrows' : report.type === 'review' ? 'rate_review' : 'analytics'}
                         </span>
                      </div>
                      <div>
                         <h4 className="font-bold text-white mb-1 capitalize">{report.type} Analysis: {report.targetA}</h4>
                         <p className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleDateString()} • {report.score ? `Score: ${report.score}` : 'Intelligence Report'}</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => router.push(`/analyze/${report.targetA}`)}
                    className="h-10 w-10 rounded-full border border-white/5 flex items-center justify-center text-slate-500 hover:bg-white/5 hover:text-white transition-all"
                   >
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </button>
                </div>
              )) : (
                <div className="p-12 text-center glass-card rounded-3xl border border-dashed border-white/10">
                   <p className="text-slate-500 font-medium">No activity recorded yet. Run your first analysis to begin.</p>
                </div>
              )}
           </div>
        </div>

        {/* Quick Actions / Sidebar */}
        <div className="space-y-8">
           <div className="glass-card p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-600/10 to-transparent">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-[10px] text-indigo-400">Premium Actions</h3>
              <div className="space-y-3">
                 <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-bold text-white">
                    <span className="material-symbols-outlined text-indigo-500">compare_arrows</span>
                    Compare Developers
                 </button>
                 <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-bold text-white">
                    <span className="material-symbols-outlined text-cyan-500">rate_review</span>
                    Full Repo Review
                 </button>
                 <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-bold text-white">
                    <span className="material-symbols-outlined text-amber-500">description</span>
                    Build Verified Resume
                 </button>
              </div>
           </div>

           <div className="glass-card p-8 rounded-3xl border border-white/5">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Account Status</h3>
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10">
                    <img src={session?.user?.image || ""} alt="" />
                 </div>
                 <div>
                    <p className="font-bold text-white text-sm">{session?.user?.name}</p>
                    <p className="text-[10px] text-emerald-500 font-black uppercase">Verified Pro</p>
                 </div>
              </div>
              <button className="w-full py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                 Manage Connection
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
