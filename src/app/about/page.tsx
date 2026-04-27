"use client";

import Navbar from "@/components/marketing/Navbar";
import { GlassCard } from "@/components/ui/Cards";
import { motion } from "framer-motion";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 py-24 lg:py-32 px-6 max-w-5xl mx-auto w-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <motion.span variants={itemVariants} className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">The Intelligence Protocol</motion.span>
            <motion.h1 variants={itemVariants} className="text-6xl lg:text-7xl font-black text-text-primary tracking-tighter uppercase leading-none">
               About <span className="hero-gradient-text">DevProof</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-text-secondary text-xl font-medium max-w-2xl mx-auto italic">
              Quantifying engineering excellence through deep architectural auditing and ledger synchronization.
            </motion.p>
          </section>

          {/* Mission Grid */}
          <div className="grid md:grid-cols-2 gap-8">
             <motion.div variants={itemVariants}>
                <GlassCard className="h-full space-y-6">
                   <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                   </div>
                   <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">Our Mission</h3>
                   <p className="text-text-secondary leading-relaxed font-medium italic">
                      DevProof was engineered with a single directive: to help high-performance developers turn their code into their most valuable professional asset. 
                      In a landscape where signal is often lost in noise, we provide the ultimate verification layer.
                   </p>
                </GlassCard>
             </motion.div>

             <motion.div variants={itemVariants}>
                <GlassCard className="h-full space-y-6">
                   <div className="w-12 h-12 rounded-2xl bg-surface-variant flex items-center justify-center text-primary border border-border">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                   </div>
                   <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">The Vision</h3>
                   <p className="text-text-secondary leading-relaxed font-medium italic">
                      We believe talent should be verified by action, not just credentials. 
                      DevProof provides a high-fidelity lens for the global engineering community to benchmark complexity, maintainability, and structural integrity.
                   </p>
                </GlassCard>
             </motion.div>
          </div>

          {/* Core Principles */}
          <section className="space-y-12">
             <motion.h2 variants={itemVariants} className="text-3xl font-black text-text-primary uppercase tracking-tighter text-center">Protocol Principles</motion.h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Zero Noise", desc: "No vanity metrics. We focus on architectural depth and structural patterns.", icon: "filter_list" },
                  { title: "Deep Audit", desc: "AI-driven analysis of codebase complexity and technological breadth.", icon: "psychology" },
                  { title: "Open Proof", desc: "Everything is verified against the public GitHub ledger. 100% transparent.", icon: "verified" },
                ].map((item, idx) => (
                  <motion.div 
                    key={item.title} 
                    variants={itemVariants}
                    className="p-8 bg-surface border border-border rounded-3xl group hover:border-primary/30 transition-all shadow-sm space-y-4"
                  >
                     <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                     <h4 className="text-sm font-black text-text-primary uppercase tracking-widest">{item.title}</h4>
                     <p className="text-xs text-text-secondary leading-relaxed font-medium italic">{item.desc}</p>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Final Message */}
          <motion.section variants={itemVariants} className="text-center p-16 bg-surface-variant/30 rounded-[48px] border border-border">
             <h2 className="text-3xl font-black text-text-primary uppercase tracking-tighter mb-6">Engineered for Excellence</h2>
             <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium italic mb-10">
                DevProof is a tool for those who build the future. We don't just show that you code; we show how you engineer.
             </p>
             <div className="flex justify-center gap-6 grayscale opacity-40">
                <span className="text-xl font-black tracking-tighter uppercase">Obsidian Protocol</span>
                <span className="text-xl font-black tracking-tighter uppercase">Titan Stack</span>
                <span className="text-xl font-black tracking-tighter uppercase">Core Ledger</span>
             </div>
          </motion.section>
        </motion.div>
      </main>

      <footer className="bg-surface border-t border-border py-16 px-8">
         <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-2 text-center md:text-left">
               <span className="text-xl font-black tracking-tighter hero-gradient-text uppercase">DevProof</span>
               <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest opacity-60">© 2026 Developer Intelligence Protocol.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">
               <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
               <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
               <a href="/" className="hover:text-primary transition-colors">Home</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
