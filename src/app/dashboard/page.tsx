"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  const [username, setUsername] = useState("");

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader name="Guest" />
      
      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-display-xl font-bold text-on-surface mb-2">GitHub Account Analyzer</h1>
          <p className="text-on-surface-variant">Enter a GitHub username to generate a professional intelligence report.</p>
        </div>

        <div className="max-w-xl mx-auto glass-card p-8 rounded-xl border-outline-variant/20">
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="e.g. octocat"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-grow bg-surface-container-highest border-none rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary outline-none"
            />
            <button 
              onClick={() => {
                if (username) {
                  window.location.href = `/u/${username}`;
                }
              }}
              className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Analyze
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
