"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useTransform, useMotionValue } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";

function FloatingObject({ 
  children, 
  mouseX, 
  mouseY, 
  factor = 0.1, 
  initialX = 0, 
  initialY = 0, 
  className = "" 
}: { 
  children: React.ReactNode; 
  mouseX: any; 
  mouseY: any; 
  factor?: number; 
  initialX?: number; 
  initialY?: number;
  className?: string;
}) {
  const x = useTransform(mouseX, (val: number) => initialX + val * factor);
  const y = useTransform(mouseY, (val: number) => initialY + val * factor);

  return (
    <motion.div 
      style={{ x, y }} 
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/analyze/${username.trim()}`);
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#05070A] text-white flex flex-col">
      <Navbar />

      {/* Parallax Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <FloatingObject mouseX={mouseX} mouseY={mouseY} factor={0.05} initialX={-300} initialY={-200} className="top-1/4 left-1/2">
           <div className="w-16 h-16 glass-card rounded-3xl opacity-20 rotate-12"></div>
        </FloatingObject>
        <FloatingObject mouseX={mouseX} mouseY={mouseY} factor={-0.08} initialX={400} initialY={100} className="bottom-1/4 left-1/3">
           <div className="w-24 h-24 glass-card rounded-full opacity-10"></div>
        </FloatingObject>
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-center relative z-10 px-6 pt-32 pb-20">
        <div className="w-full max-w-4xl flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full space-y-8"
          >
            <h1 className="text-4xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] hero-gradient-text">
              GitHub Skill <br />
              <span className="text-white">Verification</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
              Analyze your GitHub profile to verify your technical skills and generate a professional report.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleAnalyze}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 w-full max-w-2xl"
          >
            <div className={`relative flex flex-col md:flex-row items-center gap-2 p-2 rounded-[2rem] border transition-all duration-500 ${isFocused ? 'bg-white/20 border-primary/50' : 'bg-white/15 border-white/60 hover:border-white/80'}`}>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter GitHub username..." 
                className="w-full bg-transparent border-none py-6 px-8 text-xl md:text-2xl font-bold placeholder:text-white/40 focus:ring-0 outline-none"
              />
              <button 
                type="submit"
                disabled={!username.trim()}
                className="w-full md:w-auto px-10 py-5 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-indigo-50 cursor-pointer transition-all disabled:opacity-30 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
              >
                Analyze <span className="material-symbols-outlined text-sm">bolt</span>
              </button>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
               {['vercel', 'openai', 'facebook'].map(suggestion => (
                 <button 
                   key={suggestion}
                   type="button"
                   onClick={() => setUsername(suggestion)}
                   className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                 >
                   @{suggestion}
                 </button>
               ))}
            </div>
          </motion.form>
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8 z-10 border-t border-white/5">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
          Built for engineers • Powered by GitHub Data
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  );
}
