"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10 space-y-12"
      >
        <div className="text-center">
          <Link href="/" className="inline-block mb-10 group">
            <img src="/logo.png" alt="DevProof" className="h-16 w-auto transition-transform duration-500 group-hover:scale-105" />
          </Link>
          <h1 className="text-4xl font-black text-text-primary mb-4 tracking-tighter uppercase">Protocol Entry</h1>
          <p className="text-text-secondary font-medium italic">Synchronize your GitHub ledger to access full intelligence suite.</p>
        </div>

        <div className="glass-card p-10 rounded-[32px] border border-border shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
             <span className="material-symbols-outlined text-8xl text-primary">key</span>
          </div>

          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-4 bg-text-primary text-background py-5 px-8 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-xl shadow-indigo-500/10 relative z-10"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Continue with GitHub
              </>
            )}
          </button>

          <div className="space-y-5 pt-2 relative z-10">
            <div className="flex items-start gap-4 text-[10px] text-text-secondary font-black uppercase tracking-widest leading-relaxed">
              <span className="material-symbols-outlined text-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <span>Secure OAuth synchronization. We never see your password.</span>
            </div>
            <div className="flex items-start gap-4 text-[10px] text-text-secondary font-black uppercase tracking-widest leading-relaxed">
              <span className="material-symbols-outlined text-lg text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>visibility_off</span>
              <span>Only public profile data is processed by default.</span>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-text-secondary font-black uppercase tracking-[0.2em] px-8 opacity-40">
          By synchronizing, you agree to the <Link href="/terms" className="hover:text-primary transition-colors underline decoration-border/30">Terms of Service</Link> and <Link href="/privacy" className="hover:text-primary transition-colors underline decoration-border/30">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
