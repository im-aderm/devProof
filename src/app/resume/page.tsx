"use client";

import { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";

export default function ResumeBuilderPage() {
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    title: "Senior Fullstack Engineer",
    email: "alex.rivera@devproof.io",
    location: "San Francisco, CA",
    github: "github.com/arivera"
  });

  const [experience, setExperience] = useState([
    {
      company: "TechFlow Systems",
      role: "Senior Software Engineer",
      period: "2021 — Present",
      desc: "Led the migration of legacy microservices to a serverless architecture using AWS Lambda and Node.js, resulting in a 40% reduction in infrastructure costs."
    },
    {
      company: "DataSphere Inc",
      role: "Fullstack Developer",
      period: "2018 — 2020",
      desc: "Architected a real-time data visualization dashboard using React and D3.js, supporting over 50,000 daily active users."
    }
  ]);

  const [skills, setSkills] = useState(["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "Docker"]);

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExp = [...experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setExperience(newExp);
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const addSkill = () => {
    const skill = prompt("Enter new skill:");
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { company: "New Company", role: "Software Engineer", period: "2024 — Present", desc: "Description here..." }
    ]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body">
      {/* Top Header */}
      <header className="bg-surface/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border sticky top-0 z-50 flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-black tracking-tighter primary-gradient bg-clip-text text-transparent">
            DevProof
          </Link>
          <div className="h-6 w-px bg-border mx-2"></div>
          <h2 className="text-[10px] font-black text-text-primary uppercase tracking-[0.3em]">Resume Dossier Protocol</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-surface-variant transition-colors text-[10px] font-black uppercase tracking-widest text-text-secondary">
            <span className="material-symbols-outlined text-sm">layers</span>
            Templates
          </button>
          <PrimaryButton 
            onClick={() => window.print()}
            icon="download"
            className="px-6 py-2.5"
          >
            Export PDF
          </PrimaryButton>
        </div>
      </header>

      <main className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel: Editor */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto bg-surface-variant/30 border-r border-border p-8 space-y-8 no-print">
          {/* Personal Profile */}
          <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
              <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Personal Profile</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Full Name</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Job Title</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  value={profile.title}
                  onChange={(e) => handleProfileChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Email Address</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Location</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  value={profile.location}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
                </div>
                <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Experience</h3>
              </div>
              <button 
                onClick={addExperience}
                className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Add Directive
              </button>
            </div>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-border bg-surface-variant/30 relative group">
                  <button 
                    onClick={() => removeExperience(idx)}
                    className="absolute top-4 right-4 text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <input 
                      className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight" 
                      type="text" 
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                    />
                    <input 
                      className="bg-transparent text-right text-[10px] text-text-secondary border-none p-0 focus:ring-0 w-full font-black uppercase tracking-widest" 
                      type="text" 
                      value={exp.period}
                      onChange={(e) => handleExperienceChange(idx, "period", e.target.value)}
                    />
                  </div>
                  <input 
                    className="bg-transparent text-[10px] text-primary font-black border-none p-0 focus:ring-0 mb-4 w-full uppercase tracking-widest" 
                    type="text" 
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-surface rounded-xl border border-border text-xs h-32 p-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium leading-relaxed"
                    value={exp.desc}
                    onChange={(e) => handleExperienceChange(idx, "desc", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
              </div>
              <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Technical Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-surface-variant border border-border text-text-primary rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                  {skill} 
                  <button onClick={() => removeSkill(skill)}>
                    <span className="material-symbols-outlined text-[14px] hover:text-error transition-colors">close</span>
                  </button>
                </span>
              ))}
              <button 
                onClick={addSkill}
                className="px-4 py-2 border-2 border-dashed border-border text-text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-surface-variant transition-colors"
              >
                + Add Component
              </button>
            </div>
          </div>
          <div className="h-24"></div>
        </section>

        {/* Right Panel: Live Preview */}
        <section className="hidden md:flex flex-1 h-full bg-border/20 overflow-y-auto justify-center p-12 relative overflow-x-hidden">
          {/* Resume Template A4 */}
          <div className="w-full max-w-[800px] bg-white shadow-2xl p-16 flex flex-col text-slate-900 min-h-[1131px] aspect-[1/1.414] rounded-sm origin-top scale-95 transition-transform">
            <header className="border-b-8 border-indigo-600 pb-10 mb-10">
              <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter uppercase">{profile.name}</h1>
              <p className="text-2xl font-bold text-indigo-600 mb-6 tracking-tight">{profile.title}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">mail</span> {profile.email}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">location_on</span> {profile.location}</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">link</span> {profile.github}</span>
              </div>
            </header>

            <div className="grid grid-cols-3 gap-16 flex-1">
              <div className="col-span-2 space-y-12">
                <section>
                  <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Professional Experience</h4>
                  <div className="space-y-10">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <h5 className="font-black text-lg text-slate-900 tracking-tight uppercase">{exp.company}</h5>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{exp.role}</p>
                        <p className="text-xs text-slate-500 leading-relaxed text-justify font-medium">
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Verified Projects</h4>
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h5 className="font-black text-sm text-slate-900 tracking-tight uppercase">DevProof Intelligence Platform</h5>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        An AI-driven technical analysis engine that quantifies engineering readiness through automated repository audits and structural code quality scoring.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-span-1 space-y-12">
                <section>
                  <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Technical Stack</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {skills.map(s => (
                       <span key={s} className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{s}</span>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Academic Background</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="font-black text-sm text-slate-900 tracking-tight uppercase">UC Berkeley</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">B.S. Computer Science</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Class of 2018</p>
                    </div>
                  </div>
                </section>

                <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mt-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-indigo-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Verified Dossier</span>
                  </div>
                  <p className="text-[9px] text-indigo-900/60 leading-relaxed font-bold uppercase tracking-widest">
                    This document is cryptographically verified against authenticated GitHub ledger contributions.
                  </p>
                </section>
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-slate-100 text-center">
              <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em]">Generated via DevProof Intelligence Protocol • Verified Standard</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
