"use client";

import Navbar from "@/components/marketing/Navbar";
import { GlassCard } from "@/components/ui/Cards";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-body">
      <Navbar />
      
      <main className="flex-1 py-24 lg:py-32 px-6 max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Legal Protocol</span>
            <h1 className="text-5xl font-black text-text-primary tracking-tighter uppercase">Privacy Policy</h1>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest opacity-60 text-center">Last Updated: April 27, 2026</p>
          </div>

          <GlassCard className="!p-12 space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center text-white text-xs">01</span>
                 Data Collection Scope
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                DevProof synchronizes exclusively with public GitHub ledger data. This includes repository architecture, language concentrations, contribution velocity, and public profile metadata. 
                We do not request or store private repository access tokens unless explicitly authorized for a specific session review.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-surface-variant border border-border flex items-center justify-center text-primary text-xs">02</span>
                 Intelligence Processing
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                Collected data is processed via our AI Architectural Layer to generate performance signatures, readiness indices, and technical dossiers. 
                These insights are stored in your local ledger and are only made public if you choose to generate a sharable portfolio link.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-surface-variant border border-border flex items-center justify-center text-primary text-xs">03</span>
                 Third-Party Protocols
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                We never monetize your engineering intelligence. Your data is not sold or traded. 
                We use secure OAuth 2.0 protocols for all GitHub synchronizations to ensure system-level integrity.
              </p>
            </section>

            <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Security Clearance: LEVEL 4</p>
               <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
               </div>
            </div>
          </GlassCard>
        </motion.div>
      </main>

      <footer className="bg-surface border-t border-border py-16 px-8 mt-auto">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <span className="text-xl font-black tracking-tighter hero-gradient-text uppercase">DevProof</span>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">
               <a href="/terms" className="hover:text-primary transition-colors">Terms</a>
               <a href="/about" className="hover:text-primary transition-colors">About</a>
               <a href="/" className="hover:text-primary transition-colors">Home</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
