"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

export default function RepositoriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchRepos();
    }
  }, [status, router]);

  const fetchRepos = async () => {
    try {
      const res = await fetch("/api/repositories");
      const result = await res.json();
      setRepos(result);
    } catch (error) {
      console.error("Failed to fetch repositories", error);
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
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-display-xl font-bold text-on-surface mb-2">Repositories</h1>
            <p className="text-on-surface-variant">Manage and analyze your technical projects.</p>
          </div>
          <button 
            onClick={fetchRepos}
            className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/20 rounded-lg hover:bg-surface-bright transition-colors"
          >
            <span className="material-symbols-outlined text-sm">sync</span> Refresh Data
          </button>
        </div>

        <div className="glass-card rounded-xl border-outline-variant/20 overflow-hidden">
          <div className="grid grid-cols-12 p-6 border-b border-outline-variant/20 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            <div className="col-span-5">Project Name</div>
            <div className="col-span-2">Primary Language</div>
            <div className="col-span-2">Stars / Forks</div>
            <div className="col-span-2 text-center">Lens Score</div>
            <div className="col-span-1"></div>
          </div>
          <div className="divide-y divide-outline-variant/10">
            {repos.map((repo) => (
              <div key={repo.id} className="grid grid-cols-12 p-6 items-center hover:bg-white/5 transition-colors group">
                <div className="col-span-5 flex flex-col">
                  <Link href={`/repositories/${repo.id}`} className="text-on-surface font-bold group-hover:text-primary transition-colors">
                    {repo.name}
                  </Link>
                  <span className="text-body-sm text-on-surface-variant line-clamp-1">{repo.description || "No description."}</span>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-1 rounded-full bg-surface-container-highest text-[10px] font-bold text-on-surface-variant uppercase">
                    {repo.language || "Unknown"}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-4 text-on-surface-variant">
                  <span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">star</span> {repo.stars}</span>
                  <span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">fork_right</span> {repo.forks}</span>
                </div>
                <div className="col-span-2 flex justify-center">
                  {repo.metrics ? (
                    <div className="flex flex-col items-center">
                      <span className="text-primary font-bold">{repo.metrics.complexity}/100</span>
                      <div className="w-20 h-1 bg-surface-container-highest rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-primary" style={{ width: `${repo.metrics.complexity}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold opacity-40">Not Analyzed</span>
                  )}
                </div>
                <div className="col-span-1 flex justify-end">
                  <Link href={`/repositories/${repo.id}`} className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">
                    chevron_right
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
