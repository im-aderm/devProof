"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/onboarding" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <span className="text-3xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
              DevProof
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Connect Your Talent</h1>
          <p className="text-slate-400">Unlock advanced intelligence, comparisons, and historical growth tracking.</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 bg-white/5 backdrop-blur-xl">
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-xl shadow-white/10"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </>
            )}
          </button>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="material-symbols-outlined text-sm text-indigo-500">lock</span>
              Secure OAuth encryption. We never see your password.
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="material-symbols-outlined text-sm text-indigo-500">visibility_off</span>
              We only read public profile data by default.
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-600 font-medium px-4">
          By continuing, you agree to DevProof's <Link href="/terms" className="text-slate-400 hover:text-white underline transition-colors">Terms of Service</Link> and <Link href="/privacy" className="text-slate-400 hover:text-white underline transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
