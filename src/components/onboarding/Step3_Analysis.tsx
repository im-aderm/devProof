"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Step3_Analysis() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Importing repositories...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 10) + 5;
        return next > 100 ? 100 : next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 30) setStatus("Importing repositories...");
    else if (progress < 60) setStatus("Detecting technologies...");
    else if (progress < 90) setStatus("Analyzing codebase quality...");
    else setStatus("Finalizing Lens score...");

    if (progress === 100) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  }, [progress, router]);

  return (
    <div className="w-full max-w-2xl text-center z-10 flex flex-col items-center">
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant/30">
        <span className="text-secondary font-label-bold text-label-bold uppercase tracking-widest">Step 3 of 3</span>
        <span className="h-1 w-1 rounded-full bg-outline-variant"></span>
        <span className="text-on-surface-variant font-label-bold text-label-bold uppercase tracking-widest">Deep Analysis</span>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-primary/20 animate-[pulse_2s_infinite]"></div>
        <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
          <circle className="text-surface-container-highest" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="4"></circle>
          <circle
            className="text-primary-container transition-all duration-700 ease-out"
            cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="4"
            strokeDasharray="691"
            strokeDashoffset={691 - (691 * progress) / 100}
          ></circle>
        </svg>
        <div className="relative w-40 h-40 rounded-full bg-surface-container-high border border-outline-variant/20 shadow-inner flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-3 border border-white/5 shadow-xl animate-[spin_8s_linear_infinite]">
              <span className="material-symbols-outlined text-4xl text-on-surface">terminal</span>
            </div>
            <span className="text-display-xl font-display-xl text-primary leading-none">{progress}%</span>
          </div>
        </div>
      </div>

      <h1 className="text-display-xl font-display-xl text-on-surface mb-4">Analyzing your GitHub Profile</h1>
      <p className="text-body-base text-on-surface-variant max-w-lg mx-auto mb-10">
        We&apos;re scanning repositories, activity, skills, and project quality to build your elite developer identity.
      </p>

      <div className="max-w-md mx-auto w-full space-y-6">
        <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/10">
          <div
            className="h-full bg-gradient-to-r from-primary-container via-tertiary-container to-secondary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-secondary">
            <span className="material-symbols-outlined text-xl animate-spin">sync</span>
            <span className="text-body-base font-medium tracking-wide">{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
