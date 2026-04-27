"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-h1 text-h1 text-light-text-primary dark:text-dark-text-primary tracking-tight mb-2">Developer Dashboard</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary font-body text-body">Insights gathered from your GitHub repositories and contributions.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-95">
          <span className="material-symbols-outlined text-sm">download</span>
          Export Report
        </button>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Developer Score */}
        <div className="glass-card p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary font-caption text-caption uppercase tracking-wider mb-2 font-bold">Developer Score</p>
            <h3 className="text-3xl font-black text-light-text-primary dark:text-dark-text-primary">84<span className="text-light-text-secondary text-lg font-medium">/100</span></h3>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90">
              <circle className="text-slate-100 dark:text-slate-800" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
              <circle className="text-indigo-600" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="176" strokeDashoffset="28" strokeWidth="4" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-indigo-600 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            </div>
          </div>
        </div>

        {/* MLH Readiness */}
        <div className="glass-card p-6 rounded-2xl shadow-sm">
          <p className="text-light-text-secondary dark:text-dark-text-secondary font-caption text-caption uppercase tracking-wider mb-2 font-bold">MLH Readiness</p>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-black text-light-text-primary dark:text-dark-text-primary">Likely</h3>
            <span className="bg-success/10 text-success px-2 py-1 rounded-lg font-bold text-[10px] uppercase tracking-tighter">Verified</span>
          </div>
          <div className="flex gap-1">
            <div className="h-1 flex-1 bg-success rounded-full"></div>
            <div className="h-1 flex-1 bg-success rounded-full"></div>
            <div className="h-1 flex-1 bg-success rounded-full"></div>
            <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          </div>
        </div>

        {/* Top Skill */}
        <div className="glass-card p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-indigo-600 text-3xl">terminal</span>
          </div>
          <div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary font-caption text-caption uppercase tracking-wider mb-1 font-bold">Top Skill</p>
            <h3 className="text-2xl font-black text-light-text-primary dark:text-dark-text-primary">TypeScript</h3>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Expert Proficiency</p>
          </div>
        </div>

        {/* Weekly Growth */}
        <div className="glass-card p-6 rounded-2xl shadow-sm">
          <p className="text-light-text-secondary dark:text-dark-text-secondary font-caption text-caption uppercase tracking-wider mb-2 font-bold">Weekly Growth</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-light-text-primary dark:text-dark-text-primary">+12%</h3>
            <div className="flex items-center text-success mb-1">
              <span className="material-symbols-outlined text-lg">trending_up</span>
            </div>
          </div>
          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-2 font-medium">vs. previous 7 days</p>
        </div>
      </div>

      {/* Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commit Activity */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-h4 text-h4 text-light-text-primary dark:text-dark-text-primary mb-1">Commit Activity</h4>
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Performance tracking across all active branches.</p>
            </div>
            <select className="bg-slate-100 dark:bg-slate-900 border-none rounded-xl text-sm font-bold px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
              <div className="w-full border-t border-slate-100 dark:border-slate-800 border-dashed"></div>
              <div className="w-full border-t border-slate-100 dark:border-slate-800 border-dashed"></div>
              <div className="w-full border-t border-slate-100 dark:border-slate-800 border-dashed"></div>
              <div className="w-full border-t border-slate-100 dark:border-slate-800 border-dashed"></div>
            </div>
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "rgba(79, 70, 229, 0.2)", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "rgba(79, 70, 229, 0)", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M0,280 L50,240 L100,260 L150,180 L200,220 L250,140 L300,160 L350,80 L400,120 L450,40 L500,100 L550,60 L600,20 L650,50 L700,10" fill="transparent" stroke="#4f46e5" strokeLinecap="round" strokeWidth="4" vectorEffect="non-scaling-stroke"></path>
              <path d="M0,280 L50,240 L100,260 L150,180 L200,220 L250,140 L300,160 L350,80 L400,120 L450,40 L500,100 L550,60 L600,20 L650,50 L700,10 L700,300 L0,300 Z" fill="url(#grad)" vectorEffect="non-scaling-stroke"></path>
            </svg>
          </div>
          <div className="flex justify-between mt-4 px-2">
            <span className="text-[10px] font-bold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Week 1</span>
            <span className="text-[10px] font-bold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Week 2</span>
            <span className="text-[10px] font-bold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Week 3</span>
            <span className="text-[10px] font-bold text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Week 4</span>
          </div>
        </div>

        {/* Languages Breakdown */}
        <div className="glass-card p-8 rounded-3xl shadow-sm flex flex-col">
          <h4 className="font-h4 text-h4 text-light-text-primary dark:text-dark-text-primary mb-1">Languages</h4>
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-8">Codebase distribution.</p>
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90">
                <circle className="text-indigo-600" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="125" strokeWidth="24"></circle>
                <circle className="text-cyan-500" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="400" strokeWidth="24"></circle>
                <circle className="text-slate-200 dark:text-slate-800" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502" strokeDashoffset="480" strokeWidth="24"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-sm font-bold text-light-text-secondary dark:text-dark-text-secondary">Total</p>
                <p className="text-2xl font-black text-light-text-primary dark:text-dark-text-primary">1.2M</p>
                <p className="text-[10px] text-light-text-secondary dark:text-dark-text-secondary font-bold">LOC</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[
              { name: "TypeScript", color: "bg-indigo-600", percent: "75%" },
              { name: "React / JSX", color: "bg-cyan-500", percent: "20%" },
              { name: "Other", color: "bg-slate-200 dark:bg-slate-800", percent: "5%" },
            ].map((lang) => (
              <div key={lang.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${lang.color}`}></span>
                  <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{lang.name}</span>
                </div>
                <span className="text-sm font-bold text-light-text-primary dark:text-dark-text-primary">{lang.percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-indigo-600" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          <h3 className="font-h3 text-h3 text-light-text-primary dark:text-dark-text-primary">AI Insights</h3>
          <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ml-2">Experimental</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Strong in frontend systems", 
              desc: "Your component abstraction patterns are in the top 5% of React developers. Strong adherence to Atomic Design principles detected.",
              icon: "verified_user",
              color: "indigo"
            },
            { 
              title: "Improve testing culture", 
              desc: "Unit test coverage dropped to 64% this week. Focus on adding regression tests for the latest authentication module updates.",
              icon: "error",
              color: "warning"
            },
            { 
              title: "Add open source contributions", 
              desc: "Participating in the Next.js ecosystem could boost your 'Community Influence' score by up to 15 points this quarter.",
              icon: "add_circle",
              color: "cyan"
            }
          ].map((insight) => (
            <div key={insight.title} className="group hover:scale-[1.02] transition-all duration-300">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden h-full">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-${insight.color === "warning" ? "warning" : insight.color + "-600"} bg-${insight.color === "warning" ? "warning/10" : insight.color + "-100"} dark:bg-${insight.color === "warning" ? "warning/20" : insight.color + "-900/40"}`}>
                  <span className="material-symbols-outlined">{insight.icon}</span>
                </div>
                <h5 className="font-bold text-light-text-primary dark:text-dark-text-primary mb-2">{insight.title}</h5>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">{insight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
