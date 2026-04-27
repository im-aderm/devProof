"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

export default function ReviewEntryPage() {
  const router = useRouter();
  const [repo, setRepo] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (repo.includes("/")) {
      const [owner, name] = repo.trim().split("/");
      router.push(`/review/${owner}/${name}`);
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
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Architectural Audit Protocol</span>
              <h1 className="text-5xl font-black text-text-primary tracking-tighter uppercase">AI Review Hub</h1>
              <p className="text-text-secondary text-lg font-medium max-w-2xl mx-auto italic">
                Deploy an AI Architect to analyze repository structure, readability patterns, and engineering best practices.
              </p>
            </section>

            <GlassCard className="!p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                  <span className="material-symbols-outlined text-[160px] text-primary">psychology</span>
               </div>

               <form onSubmit={handleReview} className="space-y-10 relative z-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Target Repository</label>
                    <div className="flex items-center px-8 bg-surface-variant/30 rounded-2xl border border-border focus-within:border-primary/50 transition-all">
                      <span className="material-symbols-outlined text-text-secondary mr-6 text-3xl">terminal</span>
                      <input 
                        type="text" 
                        placeholder="owner/repo (e.g., facebook/react)"
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                        className="w-full bg-transparent border-none py-8 text-text-primary placeholder:text-text-secondary/30 focus:ring-0 outline-none text-2xl font-black uppercase tracking-tight"
                      />
                    </div>
                  </div>

                  <PrimaryButton 
                    type="submit"
                    disabled={!repo.includes("/")}
                    className="w-full py-6 text-xl"
                    icon="rate_review"
                  >
                    Commence Deep Review
                  </PrimaryButton>
               </form>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="p-10 bg-surface rounded-3xl border border-border group hover:border-primary/30 transition-all shadow-sm space-y-6">
                  <div className="w-12 h-12 bg-surface-variant rounded-2xl flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                     <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-widest mb-3">Structure Analysis</h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium italic">Audits project organization, naming conventions, and file distribution patterns for system-level integrity.</p>
                  </div>
               </div>
               <div className="p-10 bg-surface rounded-3xl border border-border group hover:border-primary/30 transition-all shadow-sm space-y-6">
                  <div className="w-12 h-12 bg-surface-variant rounded-2xl flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                     <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-widest mb-3">Readability Audit</h4>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium italic">Evaluates documentation quality and overall project approachability for elite contributor synchronization.</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
