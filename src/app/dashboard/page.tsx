"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPlaceholder() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-display-xl">Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-surface-container-high border border-outline/20 rounded-lg hover:bg-surface-bright transition-colors"
          >
            Log Out
          </button>
        </div>
        
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-headline-md mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
          <p className="text-on-surface-variant">
            You have successfully logged into your DevProof dashboard. 
            Phase 3 will implement the onboarding experience.
          </p>
        </div>
      </div>
    </div>
  );
}
