"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [status, setStatus] = useState<"pending" | "verified" | "error">("pending");

  useEffect(() => {
    if (!email) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/auth/status?email=${email}`);
        const data = await res.json();
        if (data.verified) {
          setStatus("verified");
          setTimeout(() => router.push("/login?verified=true"), 2000);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    };

    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [email, router]);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-12 rounded-[40px] border border-border shadow-2xl text-center space-y-8">
          <div className="relative inline-block">
             <div className="w-24 h-24 rounded-3xl primary-gradient flex items-center justify-center shadow-2xl shadow-indigo-500/20 mx-auto">
                <span className={`material-symbols-outlined text-4xl text-white ${status === 'pending' ? 'animate-spin' : ''}`}>
                   {status === 'verified' ? 'verified' : 'mark_email_read'}
                </span>
             </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-text-primary tracking-tighter uppercase">
              {status === 'verified' ? 'Identity Verified' : 'Awaiting Signal'}
            </h1>
            <p className="text-text-secondary font-medium italic leading-relaxed">
              {status === 'verified' 
                ? "Your email has been cryptographically confirmed. Access granted."
                : `We've dispatched a verification link to ${email || 'your inbox'}.`}
            </p>
          </div>

          {status === 'pending' && (
            <div className="flex flex-col items-center gap-4 pt-4">
               <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></span>
               </div>
               <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em] opacity-40">Polling Ledger Status</p>
            </div>
          )}

          <div className="pt-8 border-t border-border">
             <Link href="/login" className="text-[10px] font-black text-text-secondary hover:text-primary transition-colors uppercase tracking-widest">
                Back to Entry Protocol
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
