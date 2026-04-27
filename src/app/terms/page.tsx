"use client";

import Navbar from "@/components/marketing/Navbar";
import { GlassCard } from "@/components/ui/Cards";
import { motion } from "framer-motion";

export default function TermsPage() {
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
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Service Protocol</span>
            <h1 className="text-5xl font-black text-text-primary tracking-tighter uppercase">Terms of Service</h1>
            <p className="text-text-secondary text-sm font-bold uppercase tracking-widest opacity-60 text-center">Last Updated: April 27, 2026</p>
          </div>

          <GlassCard className="!p-12 space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center text-white text-xs">01</span>
                 Acceptance of Protocol
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                By initializing a synchronization session with the DevProof Intelligence Protocol, you agree to be bound by these Terms of Service. 
                Any attempt to bypass system security or manipulate architectural scores will result in immediate termination of your intelligence access.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-surface-variant border border-border flex items-center justify-center text-primary text-xs">02</span>
                 User Authorization
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                You must be a verified human operator. Automated ledger synchronization or "bot" accounts are strictly prohibited. 
                You are responsible for the integrity of the GitHub identity connected to your DevProof ledger.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-surface-variant border border-border flex items-center justify-center text-primary text-xs">03</span>
                 Intellectual Property
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                You retain all rights to your original source code. DevProof claims no ownership over your repositories. 
                By using the service, you grant the protocol a non-exclusive license to analyze and process your public data for the purpose of generating engineering intelligence reports.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
                 <span className="w-8 h-8 rounded-lg bg-surface-variant border border-border flex items-center justify-center text-primary text-xs">04</span>
                 System Availability
              </h2>
              <p className="text-text-secondary leading-relaxed font-medium italic border-l-4 border-primary/20 pl-6">
                The DevProof platform is provided "as is" without warranty of any kind. 
                We reserve the right to modify or terminate the protocol at any time for system maintenance or security synchronization.
              </p>
            </section>

            <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Compliance Status: FULLY ALIGNED</p>
               <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">gavel</span>
                  <span className="material-symbols-outlined text-primary">terminal</span>
               </div>
            </div>
          </GlassCard>
        </motion.div>
      </main>

      <footer className="bg-surface border-t border-border py-16 px-8 mt-auto">
         <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <span className="text-xl font-black tracking-tighter hero-gradient-text uppercase">DevProof</span>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-text-secondary">
               <a href="/privacy" className="hover:text-primary transition-colors">Privacy</a>
               <a href="/about" className="hover:text-primary transition-colors">About</a>
               <a href="/" className="hover:text-primary transition-colors">Home</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
