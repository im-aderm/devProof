"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/Cards";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goals, setGoals] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const nextStep = () => setStep((s) => s + 1);

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goals, experience }),
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    } catch (error) {
      console.error("Onboarding failed", error);
      setIsAnalyzing(false);
    }
  };

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center p-6 overflow-hidden relative font-body">
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-xl z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-10"
            >
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl primary-gradient shadow-2xl shadow-indigo-500/20 mb-4">
                <span className="material-symbols-outlined text-5xl text-white font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Protocol Initialization</span>
                <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
                  Welcome, {session?.user?.name?.split(" ")[0] || "Operator"}
                </h1>
                <p className="text-lg text-text-secondary max-w-md mx-auto font-medium italic">
                  Prepare your DevProof ledger to unlock deep engineering intelligence.
                </p>
              </div>
              <PrimaryButton
                onClick={nextStep}
                className="px-12 py-5 text-xl"
                icon="bolt"
              >
                Initialize Protocol
              </PrimaryButton>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="text-center space-y-3">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Section 01</span>
                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Directive Alignment</h2>
                 <p className="text-text-secondary font-medium italic">Select your primary intelligence goals.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "job", label: "Career Search", icon: "search" },
                  { id: "mlh", label: "Fellowship", icon: "verified" },
                  { id: "intern", label: "Internships", icon: "school" },
                  { id: "os", label: "Open Source", icon: "hub" },
                  { id: "portfolio", label: "Build Ledger", icon: "person_pin" },
                  { id: "recruiter", label: "Visibility", icon: "visibility" },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex items-center gap-4 p-6 rounded-2xl border-2 transition-all group ${
                      goals.includes(goal.id)
                        ? "border-primary bg-indigo-50 dark:bg-indigo-900/20 text-text-primary"
                        : "border-border bg-surface text-text-secondary hover:border-primary/30"
                    }`}
                  >
                    <span className={`material-symbols-outlined ${goals.includes(goal.id) ? 'text-primary' : 'opacity-40 group-hover:text-primary transition-all'}`}>{goal.icon}</span>
                    <span className="font-black text-xs uppercase tracking-widest">{goal.label}</span>
                  </button>
                ))}
              </div>
              <PrimaryButton
                disabled={goals.length === 0}
                onClick={nextStep}
                className="w-full py-5 text-lg"
                icon="arrow_forward"
              >
                Proceed to Phase 02
              </PrimaryButton>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="text-center space-y-3">
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Section 02</span>
                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Engineering Tier</h2>
                 <p className="text-text-secondary font-medium italic">How would you classify your architectural depth?</p>
              </div>
              <div className="space-y-4">
                {[
                  { id: "beginner", label: "Entry Level", desc: "Foundational knowledge, simple system logic." },
                  { id: "intermediate", label: "Component Lead", desc: "Production application management." },
                  { id: "advanced", label: "System Architect", desc: "Deep architectural depth and system integrity." },
                  { id: "pro", label: "Industry Veteran", desc: "Complex distributed systems management." },
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExperience(level.id)}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left ${
                      experience === level.id
                        ? "border-primary bg-indigo-50 dark:bg-indigo-900/20 shadow-lg shadow-indigo-500/5"
                        : "border-border bg-surface text-text-secondary hover:border-primary/30"
                    }`}
                  >
                    <div>
                      <h4 className={`font-black text-xs uppercase tracking-widest mb-1 ${experience === level.id ? 'text-primary' : 'text-text-primary'}`}>{level.label}</h4>
                      <p className="text-[10px] font-medium italic leading-relaxed opacity-60">{level.desc}</p>
                    </div>
                    <div className={`h-6 w-6 rounded-xl border-2 flex items-center justify-center transition-all ${experience === level.id ? 'border-primary bg-primary' : 'border-border'}`}>
                      {experience === level.id && <span className="material-symbols-outlined text-[14px] text-white font-black">check</span>}
                    </div>
                  </button>
                ))}
              </div>
              <PrimaryButton
                disabled={!experience}
                onClick={nextStep}
                className="w-full py-5 text-lg"
                icon="done_all"
              >
                Finalize Configuration
              </PrimaryButton>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-12"
            >
              {!isAnalyzing ? (
                <>
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative h-40 w-40 rounded-[40px] border-4 border-surface shadow-2xl flex items-center justify-center overflow-hidden">
                      <img 
                        src={session?.user?.image || ""} 
                        className="h-full w-full object-cover" 
                        alt="Profile"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 primary-gradient text-white px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest z-20 shadow-xl border-4 border-background">
                       Verified
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Ready for Audit?</h2>
                    <p className="text-text-secondary max-w-sm mx-auto font-medium italic leading-relaxed">
                      We're about to deploy the AI Architectural Layer across your entire public GitHub history.
                    </p>
                  </div>
                  <PrimaryButton
                    onClick={startAnalysis}
                    className="px-16 py-6 text-xl"
                    icon="psychology"
                  >
                    Commence Audit
                  </PrimaryButton>
                </>
              ) : (
                <div className="space-y-12">
                  <div className="relative h-48 w-48 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-border/30" cx="96" cy="96" fill="transparent" r="90" stroke="currentColor" strokeWidth="12" />
                      <motion.circle 
                        className="text-primary" 
                        cx="96" cy="96" 
                        fill="transparent" 
                        r="90" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "565 565", strokeDashoffset: 565 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="material-symbols-outlined text-6xl animate-spin text-primary opacity-40">autorenew</span>
                       <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mt-4">Active</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">Synchronizing Ledger</h3>
                    <div className="flex flex-col gap-4 items-center text-[10px] text-text-secondary font-black uppercase tracking-widest opacity-60">
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>- Syncing Repositories -</motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>- Auditing Architectural Debt -</motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>- Generating Talent Persona -</motion.p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 flex gap-4">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-1 rounded-full transition-all duration-500 ${
              s === step ? "w-12 bg-primary" : "w-6 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
