"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [settings, setSettings] = useState({ isPublic: true, portfolioTheme: "indigo" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchSettings();
    }
  }, [status, router]);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/user/settings");
      const result = await res.json();
      if (result) setSettings({ isPublic: result.isPublic, portfolioTheme: result.portfolioTheme });
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={null} name={session?.user?.name || "Developer"} />

      <main className="pt-28 pb-12 px-8 max-w-3xl mx-auto">
        <h1 className="text-display-xl font-bold text-on-surface mb-10">Settings</h1>

        <div className="space-y-8">
          <div className="glass-card rounded-2xl p-8 border-outline-variant/20">
            <h3 className="text-headline-md font-bold mb-6">Portfolio Visibility</h3>
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/5">
              <div>
                <p className="text-on-surface font-bold mb-1 text-sm">Public Profile</p>
                <p className="text-on-surface-variant text-xs">Allow anyone with the link to view your developer portfolio.</p>
              </div>
              <button 
                onClick={() => setSettings({ ...settings, isPublic: !settings.isPublic })}
                className={`w-14 h-8 rounded-full relative transition-colors ${settings.isPublic ? "bg-primary" : "bg-surface-container-highest"}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${settings.isPublic ? "left-7" : "left-1"}`}></div>
              </button>
            </div>
            {settings.isPublic && (
               <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Share Link</span>
                  <span className="text-on-surface text-xs font-mono">devproof.com/u/{(session?.user as any)?.githubUsername}</span>
               </div>
            )}
          </div>

          <div className="glass-card rounded-2xl p-8 border-outline-variant/20">
            <h3 className="text-headline-md font-bold mb-6">Portfolio Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              {["indigo", "emerald", "purple"].map((theme) => (
                <div 
                  key={theme}
                  onClick={() => setSettings({ ...settings, portfolioTheme: theme })}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all text-center ${settings.portfolioTheme === theme ? "border-primary bg-primary/5" : "border-white/5 hover:border-white/10"}`}
                >
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${theme === 'indigo' ? 'bg-primary' : theme === 'emerald' ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{theme}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="px-10 py-3 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {saving ? "Saving Changes..." : "Save Settings"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
