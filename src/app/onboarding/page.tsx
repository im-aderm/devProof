"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate API analysis
    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  };

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-xl z-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 shadow-2xl shadow-indigo-500/20 mb-4">
                <span className="material-symbols-outlined text-4xl font-bold">handshake</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Welcome, {session?.user?.name?.split(" ")[0] || "Developer"}
              </h1>
              <p className="text-xl text-slate-400 max-w-md mx-auto leading-relaxed">
                Let's set up your DevProof profile to unlock precise career intelligence.
              </p>
              <button
                onClick={nextStep}
                className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all active:scale-[0.98] shadow-xl"
              >
                Get Started
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3">What are your goals?</h2>
                <p className="text-slate-400">Select all that apply to personalize your insights.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "job", label: "Job Hunting", icon: "search" },
                  { id: "mlh", label: "MLH Fellowship", icon: "verified" },
                  { id: "intern", label: "Internships", icon: "school" },
                  { id: "os", label: "Open Source", icon: "hub" },
                  { id: "portfolio", label: "Build Portfolio", icon: "person_pin" },
                  { id: "recruiter", label: "Recruiter Visibility", icon: "visibility" },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                      goals.includes(goal.id)
                        ? "border-indigo-500 bg-indigo-500/10 text-white"
                        : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    <span className="material-symbols-outlined">{goal.icon}</span>
                    <span className="font-bold">{goal.label}</span>
                  </button>
                ))}
              </div>
              <button
                disabled={goals.length === 0}
                onClick={nextStep}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-indigo-500/20"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3">Engineering Level</h2>
                <p className="text-slate-400">How would you describe your current expertise?</p>
              </div>
              <div className="space-y-4">
                {[
                  { id: "beginner", label: "Beginner", desc: "Learning foundations, simple projects" },
                  { id: "intermediate", label: "Intermediate", desc: "Building full apps, consistent coder" },
                  { id: "advanced", label: "Advanced", desc: "Deep systems knowledge, production exp" },
                  { id: "pro", label: "Professional", desc: "Industry veteran, architectural focus" },
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExperience(level.id)}
                    className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all text-left ${
                      experience === level.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-white/5 bg-white/5 text-slate-400 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-white text-lg">{level.label}</h4>
                      <p className="text-sm opacity-60">{level.desc}</p>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${experience === level.id ? 'border-cyan-500 bg-cyan-500' : 'border-white/20'}`}>
                      {experience === level.id && <span className="material-symbols-outlined text-[16px] text-white">check</span>}
                    </div>
                  </button>
                ))}
              </div>
              <button
                disabled={!experience}
                onClick={nextStep}
                className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold text-lg hover:bg-cyan-600 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                Finish Setup
              </button>
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
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative h-32 w-32 rounded-full border-4 border-white/10 flex items-center justify-center overflow-hidden">
                      <img 
                        src={session?.user?.image || ""} 
                        className="h-full w-full object-cover" 
                        alt="Profile"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Ready to analyze?</h2>
                    <p className="text-slate-400 max-w-sm mx-auto">
                      We're about to perform a deep structural audit of your GitHub activity. This takes a few seconds.
                    </p>
                  </div>
                  <button
                    onClick={startAnalysis}
                    className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 active:scale-[0.95]"
                  >
                    Start Analysis
                  </button>
                </>
              ) : (
                <div className="space-y-10">
                  <div className="relative h-40 w-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle className="text-white/5" cx="80" cy="80" fill="transparent" r="76" stroke="currentColor" strokeWidth="8" />
                      <motion.circle 
                        className="text-indigo-500" 
                        cx="80" cy="80" 
                        fill="transparent" 
                        r="76" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "477 477", strokeDashoffset: 477 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl animate-spin text-indigo-400">autorenew</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">Intelligence Engine Active</h3>
                    <div className="flex flex-col gap-2 items-center text-slate-400 font-medium">
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Syncing repositories...</motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Calculating architectural debt...</motion.p>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>Generating talent persona...</motion.p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      {step < 4 && (
        <div className="absolute bottom-10 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step ? "w-8 bg-white" : "w-4 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
