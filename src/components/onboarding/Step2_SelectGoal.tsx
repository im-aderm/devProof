"use client";

import { useState } from "react";

const goals = [
  {
    id: "job-hunting",
    title: "Job Hunting",
    description: "Finding full-time engineering roles.",
    icon: "work",
    color: "primary",
  },
  {
    id: "mlh-fellowship",
    title: "MLH Fellowship",
    description: "Accelerating through open source.",
    icon: "emoji_events",
    color: "tertiary",
  },
  {
    id: "internship",
    title: "Internship",
    description: "Early career industry experience.",
    icon: "school",
    color: "secondary",
  },
  {
    id: "improve-profile",
    title: "Improve Profile",
    description: "Polishing your technical brand.",
    icon: "auto_awesome",
    color: "primary",
  },
];

export default function Step2_SelectGoal({ onNext, onBack }: { onNext: (goal: string) => void; onBack: () => void }) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div className="w-full max-w-[640px] flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <span className="font-label-bold text-label-bold text-primary uppercase">Step 2 of 3</span>
          <span className="font-label-bold text-label-bold text-on-surface-variant">Preferences / Goals</span>
        </div>
        <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-primary-container to-tertiary-container rounded-full shadow-[0_0_8px_rgba(79,70,229,0.4)]"></div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-8 md:p-12 shadow-2xl flex flex-col gap-10">
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">What are you working toward?</h1>
          <p className="font-body-base text-body-base text-on-surface-variant">Select the goal that best describes your current career trajectory.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`border rounded-lg p-6 flex flex-col gap-4 cursor-pointer transition-all group relative overflow-hidden ${
                selectedGoal === goal.id
                  ? "border-primary-container bg-primary-container/5 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                  : "border-white/10 hover:bg-surface-container-high"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center transition-colors ${
                  selectedGoal === goal.id ? "text-primary-container" : "text-on-surface-variant group-hover:text-primary"
                }`}>
                  <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                </div>
                {selectedGoal === goal.id ? (
                  <div className="h-5 w-5 rounded-full border-2 border-primary-container bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-xs text-white" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-white/10"></div>
                )}
              </div>
              <div>
                <h3 className="text-body-base font-semibold text-on-surface">{goal.title}</h3>
                <p className="text-body-sm text-on-surface-variant mt-1">{goal.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <button
            onClick={onBack}
            className="w-full md:w-auto order-2 md:order-1 px-8 py-3 text-slate-400 font-label-bold text-label-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Back
          </button>
          <button
            disabled={!selectedGoal}
            onClick={() => selectedGoal && onNext(selectedGoal)}
            className="w-full md:w-auto order-1 md:order-2 px-10 py-4 bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-50 hover:to-indigo-600 text-white rounded-lg font-label-bold text-label-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
      <p className="text-center text-body-sm text-on-surface-variant/60">
        You can change these goals at any time from your dashboard.
      </p>
    </div>
  );
}
