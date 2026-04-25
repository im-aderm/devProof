"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock components for comparison metrics
const MetricComparison = ({ title, valueA, valueB, icon, color }: { title: string; valueA: string | number; valueB: string | number; icon: string; color: string }) => (
  <div className="glass-card rounded-xl p-6 border-outline-variant/20 flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="text-on-surface font-bold">{title}</span>
    </div>
    <div className="flex items-center gap-6">
      <span className="text-on-surface font-bold">{valueA}</span>
      <span className="text-on-surface-variant">vs</span>
      <span className="text-on-surface font-bold">{valueB}</span>
    </div>
  </div>
);

const colorMap = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  tertiary: "text-tertiary bg-tertiary/10",
};

export default function ComparePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");
  const [comparisonData, setComparisonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleCompare = async () => {
    if (!userA || !userB) {
      setError("Please enter both GitHub usernames.");
      return;
    }
    setLoading(true);
    setError(null);
    setComparisonData(null);

    try {
      const res = await fetch(`/api/compare/${userA}/${userB}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to compare users.");
      }
      const data = await res.json();
      setComparisonData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={null} name={session?.user?.name || "Developer"} />

      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto">
        <div className="mb-10">
          <h1 className="text-display-xl font-bold text-on-surface mb-2">Compare Developers</h1>
          <p className="text-on-surface-variant">Benchmark skills and contributions side-by-side.</p>
        </div>

        <div className="glass-card rounded-xl p-8 mb-10 border-outline-variant/20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col w-full md:w-1/3">
              <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-2">GitHub Username 1</label>
              <input
                type="text"
                value={userA}
                onChange={(e) => setUserA(e.target.value)}
                className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="e.g., octocat"
              />
            </div>
            <div className="text-center text-on-surface-variant">vs</div>
            <div className="flex flex-col w-full md:w-1/3">
              <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-2">GitHub Username 2</label>
              <input
                type="text"
                value={userB}
                onChange={(e) => setUserB(e.target.value)}
                className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                placeholder="e.g., torvalds"
              />
            </div>
            <button
              onClick={handleCompare}
              disabled={loading || !userA || !userB}
              className="px-10 py-4 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50 mt-6 md:mt-0"
            >
              {loading ? "Comparing..." : "Compare"}
            </button>
          </div>
          {error && <p className="text-error text-center mt-6">{error}</p>}
        </div>

        {comparisonData && (
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <h2 className="text-headline-lg font-bold text-on-surface mb-8">Comparison Results</h2>
            <div className="space-y-8">
              <MetricComparison
                title="Overall Readiness Score"
                valueA={comparisonData.userA.readinessScore || "N/A"}
                valueB={comparisonData.userB.readinessScore || "N/A"}
                icon="rocket_launch"
                color="primary"
              />
              <MetricComparison
                title="Top Skill"
                valueA={comparisonData.userA.topSkill || "N/A"}
                valueB={comparisonData.userB.topSkill || "N/A"}
                icon="code"
                color="secondary"
              />
              <MetricComparison
                label="Repositories"
                valueA={comparisonData.userA.repoCount || 0}
                valueB={comparisonData.userB.repoCount || 0}
                icon="inventory_2"
                color="tertiary"
              />
              <MetricComparison
                label="Total Stars"
                valueA={comparisonData.userA.totalStars || 0}
                valueB={comparisonData.userB.totalStars || 0}
                icon="grade"
                color="primary"
              />
               {/* Add more metrics like Language Diversity, Collaboration etc. */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
