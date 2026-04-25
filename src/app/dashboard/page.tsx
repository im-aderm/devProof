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
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generatingAi, setGeneratingAi] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (!session?.user?.onboardingCompleted) {
        router.push("/onboarding");
      } else {
        // Fetch both in parallel
        Promise.all([fetchDashboardData(), fetchAiSummary()]);
      }
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/user/dashboard");
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiSummary = async () => {
    try {
      const res = await fetch("/api/user/ai-summary");
      if (!res.ok) return;
      const result = await res.json();
      if (result) setAiSummary(result);
    } catch (error) {
      console.error("Failed to fetch AI summary", error);
    }
  };

  const handleGenerateAi = async () => {
    setGeneratingAi(true);
    try {
      const res = await fetch("/api/user/ai-summary", { method: "POST" });
      const result = await res.json();
      setAiSummary(result);
    } catch (error) {
      console.error("Failed to generate AI summary", error);
    } finally {
      setGeneratingAi(false);
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
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-display-xl font-bold text-on-surface mb-2">Engineer Overview</h1>
            <p className="text-on-surface-variant">Real-time performance metrics and talent indexing.</p>
          </div>
          {aiSummary?.persona && (
             <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Persona</span>
                <p className="text-on-surface font-bold text-sm">{aiSummary.persona}</p>
             </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            label="Developer Score"
            value={
              data?.stats.devScoreCalculated
                ? `${data.stats.devScore}/100`
                : "—"
            }
            trend={data?.stats.devScoreCalculated ? undefined : "Visit /readiness to calculate"}
            icon="analytics"
            color="primary"
          />
          <StatCard
            label="Top Skill"
            value={aiSummary?.topSkills?.[0] ?? data?.stats.topSkill ?? "—"}
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
          <div className="lg:col-span-8 space-y-8">
            <RecentRepos repos={data?.repos || []} />
            
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-headline-md font-bold">AI Career Insight</h3>
                {!aiSummary && (
                   <button 
                    onClick={handleGenerateAi}
                    disabled={generatingAi}
                    className="text-xs font-bold text-primary uppercase tracking-widest hover:underline disabled:opacity-50"
                   >
                    {generatingAi ? "Generating..." : "Generate Insight"}
                   </button>
                )}
              </div>
              
              {aiSummary ? (
                <div className="space-y-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <p className="text-on-surface leading-relaxed italic">
                      &quot;{aiSummary.summary}&quot;
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase text-on-surface-variant mb-3 tracking-widest">Inferred Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiSummary.topSkills?.map((skill: string) => (
                          <span key={skill} className="px-2 py-1 rounded bg-surface-container-highest text-[10px] font-bold text-on-surface">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase text-on-surface-variant mb-3 tracking-widest">Growth Areas</h4>
                      <ul className="space-y-1">
                        {aiSummary.growthAreas?.map((area: string) => (
                          <li key={area} className="text-xs text-on-surface-variant flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span> {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-dashed border-outline-variant/30 rounded-lg p-12 text-center">
                  <p className="text-on-surface-variant text-sm italic">Connect your profile to generate professional AI insights.</p>
                </div>
              )}
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
              {data?.stats.devScoreCalculated ? (
                <div className="space-y-6">
                  {[
                    { label: "Documentation", value: data.stats.documentation ?? 0, color: "bg-secondary", textColor: "text-secondary" },
                    { label: "Complexity", value: data.stats.projectQuality ?? 0, color: "bg-tertiary", textColor: "text-tertiary" },
                    { label: "Consistency", value: data.stats.consistency ?? 0, color: "bg-primary", textColor: "text-primary" },
                  ].map(({ label, value, color, textColor }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold uppercase text-on-surface-variant">{label}</span>
                        <span className={`text-xs font-bold ${textColor}`}>{value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-on-surface-variant text-xs italic mb-4">Calculate your readiness score to see profile strength.</p>
                  <a href="/readiness" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">Calculate Now →</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
