"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Step3_Analysis() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing sync engine...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const runSync = async () => {
      try {
        if (mounted) setStatus("Importing repositories...");
        const res = await fetch("/api/user/sync", { method: "POST" });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Sync failed");
        }

        if (mounted) {
          setProgress(100);
          setStatus("Profile analysis complete!");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1500);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message);
          setStatus("Sync failed. Please try again from the dashboard.");
        }
      }
    };

    // Simulated progress while sync is running
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // Wait for actual API completion to reach 100
        const next = prev + Math.floor(Math.random() * 5) + 2;
        return next > 95 ? 95 : next;
      });
    }, 1000);

    runSync();

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [router]);

  useEffect(() => {
    if (progress > 0 && progress < 30) setStatus("Fetching GitHub profile...");
    else if (progress >= 30 && progress < 60) setStatus("Mapping repository structure...");
    else if (progress >= 60 && progress < 95) setStatus("Analyzing technology stacks...");
  }, [progress]);

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
            className={`transition-all duration-700 ease-out ${error ? "text-error" : "text-primary-container"}`}
            cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="4"
            strokeDasharray="691"
            strokeDashoffset={691 - (691 * progress) / 100}
          ></circle>
        </svg>
        <div className="relative w-40 h-40 rounded-full bg-surface-container-high border border-outline-variant/20 shadow-inner flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-3 border border-white/5 shadow-xl animate-[spin_8s_linear_infinite]">
              <span className={`material-symbols-outlined text-4xl ${error ? "text-error" : "text-on-surface"}`}>
                {error ? "error" : "terminal"}
              </span>
            </div>
            <span className={`text-display-xl font-display-xl leading-none ${error ? "text-error" : "text-primary"}`}>
              {error ? "!" : `${progress}%`}
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-display-xl font-display-xl text-on-surface mb-4">
        {error ? "Analysis Failed" : "Analyzing your GitHub Profile"}
      </h1>
      <p className="text-body-base text-on-surface-variant max-w-lg mx-auto mb-10">
        {error ? error : "We're scanning repositories, activity, skills, and project quality to build your elite developer identity."}
      </p>

      {error ? (
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-primary-container text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90"
        >
          Go to Dashboard
        </button>
      ) : (
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/10">
            <div
              className="h-full bg-gradient-to-r from-primary-container via-tertiary-container to-secondary transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className={`flex items-center gap-3 ${progress === 100 ? "text-secondary" : "text-primary"}`}>
              <span className={`material-symbols-outlined text-xl ${progress < 100 ? "animate-spin" : ""}`}>
                {progress === 100 ? "check_circle" : "sync"}
              </span>
              <span className="text-body-base font-medium tracking-wide">{status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
