"use client";

import { useState } from "react";
import Link from "next/link";

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
    <div className="bg-light-bg min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm sticky top-0 z-50 flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
            DevProof
          </Link>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest">Resume Builder</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">layers</span>
            Templates
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-200 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export PDF
          </button>
        </div>
      </header>

      <main className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel: Editor */}
        <section className="w-full md:w-1/2 h-full overflow-y-auto bg-slate-50/50 border-r border-slate-200 p-8 space-y-8 no-print">
          {/* Personal Profile */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined">person</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Personal Profile</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input 
                  className="w-full rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm p-3 outline-none transition-all" 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Title</label>
                <input 
                  className="w-full rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm p-3 outline-none transition-all" 
                  type="text" 
                  value={profile.title}
                  onChange={(e) => handleProfileChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input 
                  className="w-full rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm p-3 outline-none transition-all" 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                <input 
                  className="w-full rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 text-sm p-3 outline-none transition-all" 
                  type="text" 
                  value={profile.location}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Experience</h3>
              </div>
              <button 
                onClick={addExperience}
                className="text-indigo-600 font-bold text-xs flex items-center gap-1 hover:underline uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                Add Entry
              </button>
            </div>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50 relative group">
                  <button 
                    onClick={() => removeExperience(idx)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input 
                      className="bg-transparent font-bold text-sm border-none p-0 focus:ring-0 w-full" 
                      type="text" 
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                    />
                    <input 
                      className="bg-transparent text-right text-xs text-slate-500 border-none p-0 focus:ring-0 w-full" 
                      type="text" 
                      value={exp.period}
                      onChange={(e) => handleExperienceChange(idx, "period", e.target.value)}
                    />
                  </div>
                  <input 
                    className="bg-transparent text-xs text-indigo-600 font-bold border-none p-0 focus:ring-0 mb-3 w-full" 
                    type="text" 
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-white rounded-xl border-slate-200 text-xs h-24 p-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    value={exp.desc}
                    onChange={(e) => handleExperienceChange(idx, "desc", e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined">terminal</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Technical Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-2">
                  {skill} 
                  <button onClick={() => removeSkill(skill)}>
                    <span className="material-symbols-outlined text-[14px] hover:text-red-500">close</span>
                  </button>
                </span>
              ))}
              <button 
                onClick={addSkill}
                className="px-3 py-1 border border-dashed border-slate-300 text-slate-500 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                + Add Skill
              </button>
            </div>
          </div>
          <div className="h-12"></div>
        </section>

        {/* Right Panel: Live Preview */}
        <section className="hidden md:flex flex-1 h-full bg-slate-200/50 overflow-y-auto justify-center p-12 relative overflow-x-hidden">
          <div className="absolute top-8 right-8 flex flex-col gap-2 z-10 no-print">
            <button className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">zoom_in</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-full shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-sm">zoom_out</span>
            </button>
          </div>

          {/* Resume Template A4 */}
          <div className="w-full max-w-[800px] bg-white shadow-2xl p-12 flex flex-col text-slate-800 min-h-[1131px] aspect-[1/1.414]">
            <header className="border-b-4 border-indigo-600 pb-8 mb-8">
              <h1 className="text-4xl font-black text-slate-900 mb-1">{profile.name}</h1>
              <p className="text-xl font-bold text-indigo-600 mb-4">{profile.title}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">mail</span> {profile.email}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">location_on</span> {profile.location}</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">link</span> {profile.github}</span>
              </div>
            </header>

            <div className="grid grid-cols-3 gap-12 flex-1">
              <div className="col-span-2 space-y-10">
                <section>
                  <h4 className="text-xs font-black text-indigo-600 border-b border-slate-200 pb-2 mb-6 uppercase tracking-[0.2em]">Experience</h4>
                  <div className="space-y-8">
                    {experience.map((exp, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h5 className="font-black text-base text-slate-900">{exp.company}</h5>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <p className="text-xs font-bold text-indigo-600 mb-3">{exp.role}</p>
                        <p className="text-xs text-slate-500 leading-relaxed text-justify">
                          {exp.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black text-indigo-600 border-b border-slate-200 pb-2 mb-6 uppercase tracking-[0.2em]">Featured Projects</h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 mb-2">DevProof Intelligence Platform</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        An AI-driven technical analysis engine that quantifies engineering readiness through automated repository audits and structural code quality scoring.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="col-span-1 space-y-10">
                <section>
                  <h4 className="text-xs font-black text-indigo-600 border-b border-slate-200 pb-2 mb-6 uppercase tracking-[0.2em]">Skills</h4>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stack</p>
                      <p className="text-xs font-bold text-slate-700 leading-relaxed">
                        {skills.join(", ")}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-black text-indigo-600 border-b border-slate-200 pb-2 mb-6 uppercase tracking-[0.2em]">Education</h4>
                  <div>
                    <p className="font-bold text-sm text-slate-900">UC Berkeley</p>
                    <p className="text-xs text-slate-600 mt-1">B.S. Computer Science</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Class of 2018</p>
                  </div>
                </section>

                <section className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-green-600 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Verified Builder</span>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-tight">
                    This document is cryptographically verified against authenticated GitHub contributions.
                  </p>
                </section>
              </div>
            </div>

            <footer className="mt-12 pt-6 border-t border-slate-100 text-center">
              <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.3em]">Generated via DevProof Intelligence Platform</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
