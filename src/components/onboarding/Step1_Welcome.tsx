"use client";

import { signIn } from "next-auth/react";

/* eslint-disable @next/next/no-img-element */
export default function Step1_Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative bg-surface-container-low border border-outline-variant/30 rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-12 w-full max-w-4xl">
      {/* Left Column: Visual Mockup */}
      <div className="hidden md:flex md:col-span-5 bg-surface-container-high/50 p-10 flex-col justify-between border-r border-outline-variant/20">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">terminal</span>
            </div>
            <span className="font-headline-md text-headline-md tracking-tighter text-on-surface">DevProof</span>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/30 shadow-sm transform -rotate-2">
              <div className="flex justify-between items-start mb-2">
                <span className="text-label-bold font-label-bold text-primary">react-optimization-core</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold">98/100</span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full w-[98%] bg-gradient-to-r from-primary to-secondary"></div>
              </div>
            </div>
            <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/30 shadow-sm translate-x-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-label-bold font-label-bold text-tertiary">distributed-ledger-api</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold">92/100</span>
              </div>
              <div className="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-primary to-tertiary"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <p className="text-body-sm font-body-sm text-on-surface-variant italic">
            &quot;The most accurate representation of my engineering impact I&apos;ve ever seen.&quot;
          </p>
          <p className="text-label-bold font-label-bold text-on-surface mt-2">— Lead Engineer, Stripe</p>
        </div>
      </div>

      {/* Right Column: Form Content */}
      <div className="md:col-span-7 p-8 md:p-14 flex flex-col justify-center text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
          <div className="flex gap-1.5">
            <div className="h-1 w-8 rounded-full bg-primary-container"></div>
            <div className="h-1 w-8 rounded-full bg-outline-variant/30"></div>
            <div className="h-1 w-8 rounded-full bg-outline-variant/30"></div>
          </div>
          <span className="text-label-bold font-label-bold text-on-surface-variant uppercase tracking-widest">Step 1 of 3</span>
        </div>
        <h1 className="text-display-xl font-display-xl text-on-surface mb-6">Welcome to DevProof</h1>
        <p className="text-body-base font-body-base text-on-surface-variant mb-10 max-w-md mx-auto md:mx-0">
          Connect your GitHub account to analyze your projects, uncover strengths, and build your developer profile.
        </p>
        <div className="space-y-4 max-w-sm mx-auto md:mx-0">
          <button
            onClick={() => signIn("github", { callbackUrl: "/onboarding?step=2" })}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-b from-primary-container to-[#4338CA] text-white rounded-lg font-semibold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            Continue with GitHub
          </button>
          <div className="pt-4">
            <button
              onClick={onNext}
              className="text-label-bold font-label-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest cursor-pointer"
            >
              Skip for now
            </button>
          </div>
        </div>
        <div className="mt-12 flex items-start gap-3 p-4 bg-surface-container rounded-lg border border-outline-variant/10">
          <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
          <p className="text-xs text-on-surface-variant text-left leading-relaxed">
            We only request read-access to your public repositories and contribution history. Your code remains private and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
