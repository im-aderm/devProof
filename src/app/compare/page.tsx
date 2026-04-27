"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

export default function CompareEntryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "repos">("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [userA, setUserA] = useState("");
  const [userB, setUserB] = useState("");
  const [repoA, setRepoA] = useState("");
  const [repoB, setRepoB] = useState("");

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-background font-body">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300 w-full">
        <TopNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="p-8 md:p-12 max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-12"
          >
            <section className="text-center space-y-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Benchmarking Protocol</span>
              <h1 className="text-5xl font-black text-text-primary tracking-tighter uppercase">Comparative Matrix</h1>
              <p className="text-text-secondary text-lg font-medium max-w-2xl mx-auto italic">
                Analyze architectural parity and performance signatures between identities or repositories.
              </p>
            </section>

            <div className="flex justify-center">
               <div className="bg-surface-variant/50 p-1.5 rounded-2xl border border-border flex gap-2">
                  <button 
                    onClick={() => setActiveTab("users")}
                    className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "users" ? "bg-surface text-primary shadow-lg" : "text-text-secondary hover:text-text-primary"}`}
                  >
                    Identities
                  </button>
                  <button 
                    onClick={() => setActiveTab("repos")}
                    className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "repos" ? "bg-surface text-primary shadow-lg" : "text-text-secondary hover:text-text-primary"}`}
                  >
                    Repositories
                  </button>
               </div>
            </div>

            <GlassCard className="!p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <span className="material-symbols-outlined text-[160px] text-primary">compare_arrows</span>
               </div>

               <form onSubmit={handleCompare} className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-surface border-2 border-border flex items-center justify-center z-10 hidden md:flex shadow-xl">
                        <span className="text-primary font-black italic text-xs">VS</span>
                     </div>

                     {activeTab === "users" ? (
                       <>
                         <div className="space-y-3">
                           <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Lead Identity</label>
                           <div className="flex items-center px-6 bg-surface-variant/30 rounded-2xl border border-border focus-within:border-primary/50 transition-all">
                             <span className="material-symbols-outlined text-text-secondary mr-4">person</span>
                             <input 
                               type="text" 
                               placeholder="Username Alpha"
                               value={userA}
                               onChange={(e) => setUserA(e.target.value)}
                               className="w-full bg-transparent border-none py-5 text-text-primary placeholder:text-text-secondary/30 focus:ring-0 outline-none font-bold"
                             />
                           </div>
                         </div>
                         <div className="space-y-3">
                           <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Comparison Identity</label>
                           <div className="flex items-center px-6 bg-surface-variant/30 rounded-2xl border border-border focus-within:border-primary/50 transition-all">
                             <span className="material-symbols-outlined text-text-secondary mr-4">person</span>
                             <input 
                               type="text" 
                               placeholder="Username Beta"
                               value={userB}
                               onChange={(e) => setUserB(e.target.value)}
                               className="w-full bg-transparent border-none py-5 text-text-primary placeholder:text-text-secondary/30 focus:ring-0 outline-none font-bold"
                             />
                           </div>
                         </div>
                       </>
                     ) : (
                       <>
                         <div className="space-y-3">
                           <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Primary Repository</label>
                           <div className="flex items-center px-6 bg-surface-variant/30 rounded-2xl border border-border focus-within:border-primary/50 transition-all">
                             <span className="material-symbols-outlined text-text-secondary mr-4">folder</span>
                             <input 
                               type="text" 
                               placeholder="owner/repo"
                               value={repoA}
                               onChange={(e) => setRepoA(e.target.value)}
                               className="w-full bg-transparent border-none py-5 text-text-primary placeholder:text-text-secondary/30 focus:ring-0 outline-none font-bold"
                             />
                           </div>
                         </div>
                         <div className="space-y-3">
                           <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Comparison Repository</label>
                           <div className="flex items-center px-6 bg-surface-variant/30 rounded-2xl border border-border focus-within:border-primary/50 transition-all">
                             <span className="material-symbols-outlined text-text-secondary mr-4">folder</span>
                             <input 
                               type="text" 
                               placeholder="owner/repo"
                               value={repoB}
                               onChange={(e) => setRepoB(e.target.value)}
                               className="w-full bg-transparent border-none py-5 text-text-primary placeholder:text-text-secondary/30 focus:ring-0 outline-none font-bold"
                             />
                           </div>
                         </div>
                       </>
                     )}
                  </div>

                  <PrimaryButton 
                    type="submit"
                    className="w-full py-5 text-lg"
                    icon="analytics"
                  >
                    Initiate Comparative Audit
                  </PrimaryButton>
               </form>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: "Skill Mapping", desc: "Compare technical core stacks and language concentrations across all ledgers.", icon: "architecture" },
                 { title: "Velocity Check", desc: "Benchmark PR frequency and issue resolution rates for elite performance profiling.", icon: "speed" },
                 { title: "Quality Audit", desc: "Analyze system-level abstraction layers and documentation standards.", icon: "verified" },
               ].map(item => (
                 <div key={item.title} className="p-8 bg-surface rounded-3xl border border-border group hover:border-primary/30 transition-all shadow-sm space-y-4">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-widest">{item.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium italic">{item.desc}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
