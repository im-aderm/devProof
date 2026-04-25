"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";

export default function RepositoryDetailPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [repo, setRepo] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && params.id) {
      fetchRepoDetails();
      fetchAiSummary();
    }
  }, [status, params.id, router]);

  const fetchRepoDetails = async () => {
    try {
      const res = await fetch(`/api/repositories/${params.id}`);
      const result = await res.json();
      setRepo(result);
    } catch (error) {
      console.error("Failed to fetch repository details", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAiSummary = async () => {
    try {
      const res = await fetch(`/api/repositories/${params.id}/ai-summary`);
      const result = await res.json();
      if (result?.summary) setAiSummary(result.summary);
    } catch (error) {
      console.error("Failed to fetch AI summary", error);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch(`/api/repositories/${params.id}/analyze`, { method: "POST" });
      const result = await res.json();
      setRepo({ ...repo, metrics: result });
    } catch (error) {
      console.error("Failed to analyze repository", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerateAi = async () => {
    setGeneratingAi(true);
    try {
      const res = await fetch(`/api/repositories/${params.id}/ai-summary`, { method: "POST" });
      const result = await res.json();
      setAiSummary(result.summary);
    } catch (error) {
      console.error("Failed to generate AI summary", error);
    } finally {
      setGeneratingAi(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  if (!repo) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-error">Repository not found.</div>;
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={null} name={session?.user?.name || "Developer"} />

      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto">
        <div className="flex justify-between items-start mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-display-xl font-bold text-on-surface">{repo.name}</h1>
              <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase border border-primary/20">
                {repo.isPrivate ? "Private" : "Public"}
              </span>
            </div>
            <p className="text-on-surface-variant max-w-2xl">{repo.description || "No description provided."}</p>
          </div>
          <div className="flex gap-4">
            <a 
              href={repo.url} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/20 rounded-lg hover:bg-surface-bright transition-colors"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span> View on GitHub
            </a>
            <button 
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/20 rounded-lg hover:bg-surface-bright transition-colors disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-sm ${analyzing ? "animate-spin" : ""}`}>
                {analyzing ? "sync" : "analytics"}
              </span> 
              {analyzing ? "Analyzing..." : "Sync Stats"}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="README Score"
            value={repo.metrics?.readmeScore !== undefined ? `${repo.metrics.readmeScore}/100` : "N/A"}
            icon="description"
            color="primary"
          />
          <StatCard
            label="Complexity"
            value={repo.metrics?.complexity !== undefined ? `${repo.metrics.complexity}/100` : "N/A"}
            icon="account_tree"
            color="secondary"
          />
          <StatCard
            label="Freshness"
            value={repo.metrics?.freshness !== undefined ? `${repo.metrics.freshness}/100` : "N/A"}
            icon="auto_renew"
            color="tertiary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-headline-md font-bold">AI Project Summary</h3>
                <button 
                  onClick={handleGenerateAi}
                  disabled={generatingAi}
                  className="text-xs font-bold text-primary uppercase tracking-widest hover:underline disabled:opacity-50 flex items-center gap-2"
                >
                  <span className={`material-symbols-outlined text-sm ${generatingAi ? "animate-spin" : ""}`}>auto_awesome</span>
                  {generatingAi ? "Generating..." : aiSummary ? "Re-generate" : "Generate Summary"}
                </button>
              </div>
              {aiSummary ? (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                   <p className="text-on-surface leading-relaxed italic">&quot;{aiSummary}&quot;</p>
                </div>
              ) : (
                <div className="bg-white/5 border border-dashed border-outline-variant/30 rounded-lg p-12 text-center">
                  <p className="text-on-surface-variant text-sm italic">Generate a professional AI summary for your portfolio.</p>
                </div>
              )}
            </div>

            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Improvement Suggestions</h3>
              {repo.metrics?.suggestions && repo.metrics.suggestions.length > 0 ? (
                <ul className="space-y-4">
                  {repo.metrics.suggestions.map((suggestion: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                      <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                      <p className="text-on-surface leading-relaxed">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-on-surface-variant italic">No suggestions available. Run analysis to generate insights.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card rounded-xl p-8 border-outline-variant/20">
              <h3 className="text-headline-md font-bold mb-6">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {repo.languages?.map((lang: any) => (
                  <div key={lang.id} className="flex flex-col gap-1 w-full mb-4">
                    <div className="flex justify-between text-xs font-bold uppercase text-on-surface-variant">
                      <span>{lang.name}</span>
                      <span>{Math.round(lang.size / 1024)} KB</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
