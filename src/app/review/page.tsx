"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ReviewEntryPage() {
  const router = useRouter();
  const [repo, setRepo] = useState("");

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (repo.includes("/")) {
      const [owner, name] = repo.trim().split("/");
      router.push(`/review/${owner}/${name}`);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader name="AI Review" />
      
      <main className="pt-32 px-12 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-display-md text-on-surface mb-4">Architectural Audit</h1>
        <p className="text-on-surface-variant text-body-lg mb-12 max-w-2xl mx-auto">
          Deploy an AI Architect to analyze repository structure, readability patterns, and engineering best practices.
        </p>

        <form onSubmit={handleReview} className="glass-card p-12 rounded-2xl border border-outline-variant/20 shadow-2xl space-y-8">
          <div className="space-y-4">
            <label className="text-label-md font-bold text-on-surface-variant uppercase tracking-widest block text-left">Target Repository</label>
            <div className="flex items-center px-6 bg-surface-container-low rounded-xl border border-outline-variant focus-within:border-primary transition-all">
              <span className="material-symbols-outlined text-on-surface-variant mr-3">terminal</span>
              <input 
                type="text" 
                placeholder="owner/repo"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="w-full bg-transparent border-none py-6 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-0 outline-none text-xl font-display"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!repo.includes("/")}
            className="w-full py-5 bg-primary-gradient text-surface-container-lowest font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            Commence Deep Review
          </button>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
           <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-4">account_tree</span>
              <h4 className="font-display text-headline-sm text-on-surface mb-2">Structure Analysis</h4>
              <p className="text-on-surface-variant text-body-sm">Audits project organization, naming conventions, and file distribution patterns.</p>
           </div>
           <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary mb-4">menu_book</span>
              <h4 className="font-display text-headline-sm text-on-surface mb-2">Readability Audit</h4>
              <p className="text-on-surface-variant text-body-sm">Evaluates documentation quality and overall project approachability for contributors.</p>
           </div>
        </div>
      </main>
    </div>
  );
}
