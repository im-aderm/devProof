"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-session"; // Wait, I should use next-auth
import { useSession as useAuthSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard } from "@/components/ui/Cards";
import { Skeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

export default function RepositoriesPage() {
  const { data: session, status } = useAuthSession();
  const router = useRouter();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/repositories?page=${page}&limit=10`);
        if (res.ok) {
          const data = await res.json();
          setRepos(data.repositories);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch repositories", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchRepos();
    }
  }, [status, page]);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col min-h-screen w-full">
        <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-text-primary tracking-tighter uppercase">Repository Ledger</h1>
              <p className="text-text-secondary font-medium italic border-l-4 border-primary/20 pl-4">Full architectural catalog of synchronized assets.</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="w-full h-24 rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {repos.map((repo, idx) => (
                  <motion.div
                    key={repo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <GlassCard 
                      className="p-6 hover:border-primary/30 transition-all cursor-pointer group"
                      onClick={() => router.push(`/repo/${repo.fullName}`)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-text-primary uppercase tracking-tight group-hover:text-primary transition-colors">{repo.name}</h3>
                          <p className="text-[10px] text-text-secondary font-medium italic line-clamp-1">{repo.description || "No description provided."}</p>
                        </div>
                        
                        <div className="flex items-center gap-8">
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">Stack</p>
                              <p className="text-[10px] font-black text-text-primary uppercase tracking-widest">{repo.language || "N/A"}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">Stars</p>
                              <p className="text-[10px] font-black text-text-primary uppercase tracking-widest">{repo.stars}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[8px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">Technical Index</p>
                              <p className="text-[10px] font-black text-primary uppercase tracking-widest">{repo.score}%</p>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-10">
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="p-3 rounded-xl bg-surface border border-border disabled:opacity-30 hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">Phase {page} of {totalPages}</span>
                  <button 
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="p-3 rounded-xl bg-surface border border-border disabled:opacity-30 hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
