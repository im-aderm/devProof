"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import LanguageChart from "@/components/dashboard/LanguageChart";
import RecentRepos from "@/components/dashboard/RecentRepos";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (!(session?.user as any)?.onboardingCompleted) {
        router.push("/onboarding");
      } else {
        fetchDashboardData();
      }
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/user/dashboard");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary font-bold uppercase tracking-widest text-xs">Loading Dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={data?.profile} name={session?.user?.name || "Developer"} />
      
      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto">
        <div className="mb-10">
          <h1 className="text-display-xl font-bold text-on-surface mb-2">Engineer Overview</h1>
          <p className="text-on-surface-variant">Real-time performance metrics and talent indexing.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Developer Score"
            value={`${data?.stats.devScore}/100`}
            trend="+4.2%"
            icon="analytics"
            color="primary"
          />
          <StatCard
            label="Top Skill"
            value={data?.stats.topSkill}
            icon="code"
            color="secondary"
          />
          <StatCard
            label="Repositories"
            value={data?.stats.repoCount}
            icon="inventory_2"
            color="tertiary"
          />
          <StatCard
            label="Total Stars"
            value={data?.stats.totalStars}
            icon="grade"
            color="primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <RecentRepos repos={data?.repos || []} />
            
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">AI Career Insight</h3>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <p className="text-on-surface leading-relaxed">
                  Based on your recent activity in <span className="text-primary font-bold">{data?.stats.topSkill}</span>, 
                  you show a strong proficiency in system architecture. Your consistency has increased by 12% 
                  over the last 30 days. We recommend exploring distributed systems to further boost your score.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Language Mix</h3>
              <LanguageChart data={data?.languages || []} />
            </div>

            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Profile Strength</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-on-surface-variant">Documentation</span>
                    <span className="text-xs font-bold text-secondary">82%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full w-[82%] bg-secondary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-on-surface-variant">Complexity</span>
                    <span className="text-xs font-bold text-tertiary">65%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-tertiary"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-on-surface-variant">Frequency</span>
                    <span className="text-xs font-bold text-primary">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
