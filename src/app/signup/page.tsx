"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?signup=success");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
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
          <h1 className="text-4xl font-black text-text-primary mb-4 tracking-tighter uppercase">Join Protocol</h1>
          <p className="text-text-secondary font-medium italic">Create your operative account to begin ledger verification.</p>
        </div>

        <div className="glass-card p-10 rounded-[32px] border border-border shadow-2xl space-y-8 relative overflow-hidden">
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-[10px] font-black uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-4">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="OPERATIVE NAME"
                className="w-full bg-surface border border-border rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-4">Email Identity</label>
              <input 
                required
                type="email" 
                placeholder="EMAIL@PROTOCOL.IO"
                className="w-full bg-surface border border-border rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-4">Access Key</label>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                className="w-full bg-surface border border-border rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-2xl text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/10"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Initialize Account"
              )}
            </PrimaryButton>
          </form>

          <div className="text-center">
             <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">
                Already registered? <Link href="/login" className="text-primary hover:underline">Sign In</Link>
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
