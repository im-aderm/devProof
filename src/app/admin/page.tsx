"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // Check if the user is an admin
      // In a real app, this check might be done server-side or via a dedicated API
      // For now, we assume the session data might contain admin status if available
      // Or we might fetch user details to check isAdmin
      if ((session?.user as any)?.isAdmin) {
        setIsAdmin(true);
        setLoading(false);
      } else {
        // If not admin, redirect or show unauthorized message
        router.push("/dashboard"); // Redirect to regular dashboard for now
      }
    }
  }, [status, session, router]);

  if (status === "loading" || loading) {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  // If not admin, this part won't be rendered due to redirection
  // But as a fallback:
  if (!isAdmin) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-display-xl font-bold text-on-surface mb-4">Access Denied</h1>
        <p className="text-on-surface-variant mb-8">You do not have administrator privileges.</p>
        <Link href="/dashboard" className="px-8 py-3 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <DashboardHeader profile={null} name={session?.user?.name || "Admin"} />

      <main className="pt-28 pb-12 px-8 max-w-[1440px] mx-auto">
        <div className="mb-10">
          <h1 className="text-display-xl font-bold text-on-surface mb-2">Admin Dashboard</h1>
          <p className="text-on-surface-variant">System overview and management tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* User Metrics Card */}
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10`}>
                <span className="material-symbols-outlined">group</span>
              </div>
              <span className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full">View Details</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">Total Users</p>
              <h3 className="text-2xl font-bold text-on-surface">1,234</h3> {/* Mock data */}
            </div>
          </div>

          {/* API Usage Card */}
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-tertiary bg-tertiary/10`}>
                <span className="material-symbols-outlined">api</span>
              </div>
              <span className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full">View Details</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">API Requests (24h)</p>
              <h3 className="text-2xl font-bold text-on-surface">5,678</h3> {/* Mock data */}
            </div>
          </div>

          {/* AI Spend Card */}
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10`}>
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <span className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full">View Details</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">AI Spend (Month)</p>
              <h3 className="text-2xl font-bold text-on-surface">$123.45</h3> {/* Mock data */}
            </div>
          </div>
        </div>

        {/* More sections for Error Logs, Abuse Reports, Feature Flags will go here */}
        {/* Placeholder for Error Logs */}
        <div className="glass-card rounded-xl p-8 border-outline-variant/20 mb-10">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md font-bold">Recent Errors</h3>
              <Link href="/admin/errors" className="text-primary text-sm font-bold uppercase tracking-widest hover:underline">View All</Link>
           </div>
           <div className="bg-surface-container-high p-6 rounded-lg border border-outline-variant/30">
              <p className="text-on-surface-variant italic">No critical errors reported in the last 24 hours.</p>
           </div>
        </div>

      </main>
    </div>
  );
}
