"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";

function PremiumOverlay({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-dark-bg/60 backdrop-blur-xl rounded-3xl border border-white/10 text-center">
      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/40">
        <span className="material-symbols-outlined text-white text-3xl">lock</span>
      </div>
      <h4 className="text-2xl font-bold mb-3">Unlock {title}</h4>
      <p className="text-slate-300 mb-8 max-w-sm">Comparing developers and repositories requires a verified GitHub identity. Sign in to unlock full architectural benchmarking.</p>
      <Link 
        href="/login" 
        className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:scale-105 transition-all active:scale-95 shadow-xl"
      >
        Connect GitHub to Unlock
      </Link>
    </div>
  );
}

export default function CompareEntryPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const isPremium = !!session;
  const [activeTab, setActiveTab] = useState<"users" | "repos">("users");
  
  // User state
  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");

  // Repo state
  const [repoA, setRepoA] = useState(""); // format: owner/repo
  const [repoB, setRepoB] = useState(""); // format: owner/repo

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPremium) {
      router.push("/login");
      return;
    }
    if (activeTab === "users") {
      if (userA.trim() && userB.trim()) {
        router.push(`/compare/users/${userA.trim()}/${userB.trim()}`);
      }
    } else {
      if (repoA.includes("/") && repoB.includes("/")) {
        const [oA, rA] = repoA.trim().split("/");
        const [oB, rB] = repoB.trim().split("/");
        router.push(`/compare/repos/${oA}/${rA}/${oB}/${rB}`);
      }
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader name="Compare" />
      
      <main className="pt-32 px-12 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-display-md text-on-surface mb-4">Benchmarking Protocol</h1>
        <p className="text-on-surface-variant text-body-lg mb-12 max-w-2xl mx-auto">
          Compare two GitHub identities or repositories side-by-side to analyze performance, quality, and architectural parity.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
           <div className="bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/20 flex gap-2">
              <button 
                onClick={() => setActiveTab("users")}
                className={`px-8 py-2.5 rounded-lg text-label-md font-bold uppercase tracking-widest transition-all ${activeTab === "users" ? "bg-surface-container-highest text-primary shadow-lg" : "text-on-surface-variant hover:text-on-surface"}`}
              >
                Users
              </button>
              <button 
                onClick={() => setActiveTab("repos")}
                className={`px-8 py-2.5 rounded-lg text-label-md font-bold uppercase tracking-widest transition-all ${activeTab === "repos" ? "bg-surface-container-highest text-primary shadow-lg" : "text-on-surface-variant hover:text-on-surface"}`}
              >
                Repositories
              </button>
           </div>
        </div>

        <form onSubmit={handleCompare} className="relative glass-card p-12 rounded-2xl border border-outline-variant/20 shadow-2xl space-y-8 overflow-hidden">
          {!isPremium && <PremiumOverlay title="Benchmarking" />}
          
          <div className={!isPremium ? "blur-xl pointer-events-none select-none opacity-20" : "grid grid-cols-1 md:grid-cols-2 gap-8 relative"}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center z-10 hidden md:flex">
               <span className="text-primary font-bold italic">VS</span>
            </div>

            {activeTab === "users" ? (
              <>
                <div className="space-y-4">
                  <label className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest block text-left">Primary Subject</label>
                  <div className="flex items-center px-6 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant mr-3">person</span>
                    <input 
                      type="text" 
                      placeholder="Username A"
                      value={userA}
                      onChange={(e) => setUserA(e.target.value)}
                      className="w-full bg-transparent border-none py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest block text-left">Comparison Subject</label>
                  <div className="flex items-center px-6 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant mr-3">person</span>
                    <input 
                      type="text" 
                      placeholder="Username B"
                      value={userB}
                      onChange={(e) => setUserB(e.target.value)}
                      className="w-full bg-transparent border-none py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <label className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest block text-left">Primary Repository</label>
                  <div className="flex items-center px-6 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant mr-3">folder</span>
                    <input 
                      type="text" 
                      placeholder="owner/repo"
                      value={repoA}
                      onChange={(e) => setRepoA(e.target.value)}
                      className="w-full bg-transparent border-none py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest block text-left">Comparison Repository</label>
                  <div className="flex items-center px-6 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-on-surface-variant mr-3">folder</span>
                    <input 
                      type="text" 
                      placeholder="owner/repo"
                      value={repoB}
                      onChange={(e) => setRepoB(e.target.value)}
                      className="w-full bg-transparent border-none py-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {isPremium && (
            <button 
              type="submit"
              className="w-full py-5 bg-primary-gradient text-surface-container-lowest font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95 uppercase tracking-widest"
            >
              Initiate Comparative Audit
            </button>
          )}
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
           {[
             { title: "Skill Mapping", desc: "Compare technical core stacks and language concentrations." },
             { title: "Velocity Check", desc: "Benchmark PR frequency and issue resolution rates." },
             { title: "Quality Audit", desc: "Analyze average project scores and README standards." },
           ].map(item => (
             <div key={item.title} className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/10">
                <h4 className="text-primary font-bold text-label-md uppercase mb-2">{item.title}</h4>
                <p className="text-on-surface-variant text-body-sm">{item.desc}</p>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
