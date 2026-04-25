"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface AdminStats {
  totalUsers: number;
  apiRequests24h: number;
  aiSpendMonth: number;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [accessError, setAccessError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("error") === "insufficient_permissions") {
      setAccessError("You do not have administrator privileges.");
      setLoading(false);
      return;
    }

    if (status === "authenticated") {
      verifyAdminAccess();
    }
  }, [status, searchParams]);

  const verifyAdminAccess = async () => {
    try {
      // Server-side admin verification — not trusting client JWT alone
      const res = await fetch("/api/admin/verify");
      if (!res.ok) {
        router.replace("/dashboard");
        return;
      }
      setVerified(true);
      fetchAdminStats();
    } catch {
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminStats = async () => {
    // TODO: Replace with real /api/admin/stats endpoint in medium-term refactor
    // Placeholder: wired to real data structure for future implementation
    setStats({ totalUsers: 0, apiRequests24h: 0, aiSpendMonth: 0 });
  };

  if (status === "loading" || loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (accessError || !verified) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-display-xl font-bold text-on-surface mb-4">Access Denied</h1>
        <p className="text-on-surface-variant mb-8">
          {accessError || "You do not have administrator privileges."}
        </p>
        <Link
          href="/dashboard"
          className="px-8 py-3 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all"
        >
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
          {/* Total Users */}
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10">
                <span className="material-symbols-outlined">group</span>
              </div>
              <Link
                href="/admin/users"
                className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full hover:underline"
              >
                View Details
              </Link>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">
                Total Users
              </p>
              <h3 className="text-2xl font-bold text-on-surface">
                {stats?.totalUsers ?? "—"}
              </h3>
            </div>
          </div>

          {/* API Usage */}
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-tertiary bg-tertiary/10">
                <span className="material-symbols-outlined">api</span>
              </div>
              <span className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full">
                24h Window
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">
                API Requests
              </p>
              <h3 className="text-2xl font-bold text-on-surface">
                {stats?.apiRequests24h ?? "—"}
              </h3>
            </div>
          </div>

          {/* AI Spend */}
          <div className="glass-card rounded-xl p-8 border-outline-variant/20">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <span className="text-secondary font-label-bold text-[10px] uppercase bg-secondary/10 px-2 py-0.5 rounded-full">
                This Month
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-label-bold uppercase tracking-wider mb-1">
                AI Spend
              </p>
              <h3 className="text-2xl font-bold text-on-surface">
                {stats?.aiSpendMonth != null ? `$${stats.aiSpendMonth.toFixed(2)}` : "—"}
              </h3>
            </div>
          </div>
        </div>

        {/* Recent Errors placeholder */}
        <div className="glass-card rounded-xl p-8 border-outline-variant/20 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-headline-md font-bold">Recent Errors</h3>
            <Link
              href="/admin/errors"
              className="text-primary text-sm font-bold uppercase tracking-widest hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="bg-surface-container-high p-6 rounded-lg border border-outline-variant/30">
            <p className="text-on-surface-variant italic">
              No critical errors reported in the last 24 hours.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
