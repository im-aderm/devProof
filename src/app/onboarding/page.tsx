"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Step1_Welcome from "@/components/onboarding/Step1_Welcome";
import Step2_SelectGoal from "@/components/onboarding/Step2_SelectGoal";
import Step3_Analysis from "@/components/onboarding/Step3_Analysis";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const s = searchParams.get("step");
    if (s) setStep(parseInt(s));
  }, [searchParams]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handleBackStep = () => setStep((prev) => prev - 1);

  const handleGoalSelection = async (goal: string) => {
    try {
      const res = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });

      if (!res.ok) throw new Error("Failed to save goal");

      setStep(3);
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") {
    return <div className="bg-background min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-base antialiased">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 h-16 bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/10 shadow-2xl shadow-indigo-500/5">
        <div className="text-xl font-bold tracking-tighter text-slate-50 uppercase">DevProof</div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-indigo-300 transition-colors">help_outline</span>
          <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-indigo-300 transition-colors">close</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-margin-mobile md:px-margin-desktop py-section-gap relative overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary-container/10 rounded-full blur-[120px] pointer-events-none"></div>

        {step === 1 && <Step1_Welcome onNext={handleNextStep} />}
        {step === 2 && <Step2_SelectGoal onNext={handleGoalSelection} onBack={handleBackStep} />}
        {step === 3 && <Step3_Analysis />}
      </main>

      <footer className="w-full py-12 border-t border-white/5 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8 gap-4">
          <div className="text-slate-300 font-label-bold text-label-bold uppercase tracking-widest text-xs">
            © 2024 DevProof Technical Analysis. All rights reserved.
          </div>
          <div className="flex gap-8">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest hover:text-indigo-400 cursor-pointer">Privacy Policy</span>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest hover:text-indigo-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
