"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";

// Mock data for now, will be fetched from API
const mockReadinessData = {
  score: 84,
  recommendations: [
    "Improve READMEs and project complexity for better quality scores.",
    "Maintain consistent commit activity across your repositories.",
    "Consider contributing to open-source projects or collaborating on team projects."
  ],
  checklist: [
    { name: "Project Quality", score: 75 },
    { name: "Consistency", score: 80 },
    { name: "Collaboration", score: 75 },
    { name: "Documentation", score: 82 },
    { name: "Technical Breadth", score: 70 },
  ],
};

export default function ReadinessPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(mockReadinessData); // Use mock data initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchReadinessData();
    }
  }, [status, router]);

  const fetchReadinessData = async () => {
    try {
      const res = await fetch("/api/user/readiness");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch readiness data", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={null} name={session?.user?.name || "Developer"} />

      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto">
        <div className="mb-10">
          <h1 className="text-display-xl font-bold text-on-surface mb-2">Readiness Score</h1>
          <p className="text-on-surface-variant">Benchmark your profile against industry standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <StatCard
            label="Overall Readiness"
            value={`${data?.score || 0}/100`}
            icon="rocket_launch"
            color="primary"
          />
          {/* Placeholder for other stats if needed */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Detailed Breakdown</h3>
              <div className="space-y-6">
                {data.checklist.map((item: any) => (
                  <div key={item.name} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">{item.name === 'Project Quality' ? 'star' : item.name === 'Consistency' ? 'sync' : item.name === 'Collaboration' ? 'groups' : item.name === 'Documentation' ? 'description' : 'build'}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-on-surface font-bold mb-1">{item.name}</p>
                      <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                        <div className={`h-full bg-${item.name === 'Project Quality' ? 'primary' : item.name === 'Consistency' ? 'secondary' : item.name === 'Documentation' ? 'primary' : item.name === 'Technical Breadth' ? 'tertiary' : 'indigo'} transition-all duration-700 ease-out`} style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                    <span className="font-bold text-primary w-20 text-right">{item.score}/100</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
             <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Improvement Checklist</h3>
              <ul className="space-y-4">
                {data.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                    <p className="text-on-surface leading-relaxed text-sm">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
