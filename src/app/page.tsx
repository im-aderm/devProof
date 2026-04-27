import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-light-bg min-h-screen">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm top-0 sticky z-50 flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
            DevProof
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-small font-medium">
            <Link href="/" className="text-indigo-600 font-semibold">Home</Link>
            <Link href="#features" className="text-slate-500 hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#showcase" className="text-slate-500 hover:text-slate-900 transition-colors">Showcase</Link>
            <Link href="/pricing" className="text-slate-500 hover:text-slate-900 transition-colors">Pricing</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-small font-bold hover:bg-indigo-700 transition-all active:scale-95">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-content-max mx-auto px-6">
        {/* Hero Section */}
        <section className="py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-black uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              AI-Powered Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Turn Your GitHub Into <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Proof of Skill</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Our AI deep-analyzes your engineering patterns, codebase complexity, and contribution velocity to build a verified professional identity recruiters trust.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
                Analyze My GitHub
              </Link>
              <Link href="/u/demo" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 hover:-translate-y-1 transition-all active:scale-95">
                View Demo
              </Link>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
              <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <div className="p-8 bg-slate-50/50">
                <div className="aspect-video bg-white rounded-2xl shadow-inner border border-slate-100 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <span className="material-symbols-outlined text-indigo-600 text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-slate-100 rounded-full mx-auto animate-pulse"></div>
                    <div className="h-3 w-32 bg-slate-50 rounded-full mx-auto animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-2xl border-y border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-lg">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                ))}
                <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+10k</div>
              </div>
              <p className="text-small text-light-text-secondary">Join <span className="font-bold text-light-text-primary">10k+ Developers</span> building proof</p>
            </div>
            <div className="flex items-center gap-xl opacity-30 grayscale font-black text-2xl text-slate-400">
              <span>GITHUB</span>
              <span>VERCEL</span>
              <span>LINEAR</span>
            </div>
            <div className="text-right">
              <p className="text-h3 font-black text-indigo-600">500+</p>
              <p className="text-caption text-light-text-secondary uppercase tracking-widest font-bold">Reports Generated</p>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="py-3xl">
          <div className="text-center max-w-2xl mx-auto mb-2xl">
            <h2 className="text-h2 font-h2 text-light-text-primary mb-md">Engineered for Excellence</h2>
            <p className="text-body text-light-text-secondary">Deep analysis of your codebase, commit patterns, and project structure to build a profile that recruiters actually trust.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-lg">
            <div className="bento-card md:col-span-2 bg-white p-lg rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-lg items-center">
              <div className="flex-1 space-y-md">
                <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                </div>
                <h3 className="text-h3 font-h3">AI Strength Analysis</h3>
                <p className="text-small text-light-text-secondary leading-relaxed">
                  Our proprietary LLMs analyze code quality, complexity, and documentation habits across all your repositories to identify your true technical strengths.
                </p>
              </div>
              <div className="flex-1 h-48 bg-slate-50 rounded-2xl p-md border border-slate-100 flex items-end gap-2">
                <div className="flex-1 bg-indigo-100 rounded-t-lg h-[40%]" />
                <div className="flex-1 bg-indigo-200 rounded-t-lg h-[60%]" />
                <div className="flex-1 bg-indigo-400 rounded-t-lg h-[90%]" />
                <div className="flex-1 bg-indigo-600 rounded-t-lg h-[75%]" />
                <div className="flex-1 bg-indigo-300 rounded-t-lg h-[50%]" />
              </div>
            </div>

            <div className="bento-card bg-indigo-600 text-white p-lg rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <h3 className="text-h3 font-h3 mb-sm">Resume Export</h3>
                <p className="text-small text-white/80 leading-relaxed">Generate recruiter-ready PDF resumes based on your real-world contributions instantly.</p>
              </div>
              <Link href="/resume" className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-small text-center hover:bg-slate-50 transition-colors">
                Try Builder
              </Link>
            </div>

            <div className="bento-card bg-white p-lg rounded-3xl border border-slate-100 shadow-sm">
              <div className="h-12 w-12 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-md">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
              </div>
              <h3 className="text-h4 font-h4 mb-sm">Repo Scoring</h3>
              <p className="text-small text-light-text-secondary leading-relaxed">Individual repository audits to show project maturity and technical debt management.</p>
            </div>

            <div className="bento-card bg-white p-lg rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="relative h-32 w-32 mb-md">
                <svg className="h-full w-full transform -rotate-90">
                  <circle className="text-slate-100" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="12" />
                  <circle className="text-indigo-600" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="91.1" strokeWidth="12" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-h3 font-bold text-light-text-primary">84%</span>
                </div>
              </div>
              <h3 className="text-h4 font-h4 mb-xs">MLH Readiness</h3>
              <p className="text-caption text-light-text-secondary">Measure your alignment with MLH and industry standards.</p>
            </div>

            <div className="bento-card bg-white p-lg rounded-3xl border border-slate-100 shadow-sm">
              <div className="h-12 w-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-md">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
              <h3 className="text-h4 font-h4 mb-sm">Career Advice</h3>
              <p className="text-small text-light-text-secondary leading-relaxed">Personalized tips on what technologies to learn next based on your current stack and goals.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-3xl">
          <div className="bg-indigo-600 rounded-[3rem] p-2xl text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/50 to-cyan-500/50"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-lg">
              <h2 className="text-h1 font-h1 text-white">Ready to turn code into opportunity?</h2>
              <p className="text-body text-indigo-100">Stop sending links to confusing repos. Start sending proof of your engineering excellence.</p>
              <div className="pt-lg">
                <Link href="/dashboard" className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl shadow-2xl hover:scale-105 transition-transform active:scale-95 inline-block">
                  Get Your Proof for Free
                </Link>
              </div>
              <p className="text-caption text-indigo-200 font-medium">No credit card required • Secure OAuth login</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-2xl py-xl px-6">
        <div className="max-w-content-max mx-auto flex flex-col md:flex-row justify-between items-center gap-lg">
          <div className="space-y-sm">
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">DevProof</span>
            <p className="text-caption text-light-text-secondary">© 2026 DevProof Intelligence Corp. All rights reserved.</p>
          </div>
          <div className="flex gap-xl text-small font-medium text-light-text-secondary">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
