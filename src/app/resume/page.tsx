"use client";

import { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Reorder, AnimatePresence } from "framer-motion";

export default function ResumeBuilderPage() {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content"); // content | design

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    email: "",
    location: "",
    github: "",
    portfolio: "",
    summary: ""
  });

  const [experience, setExperience] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<{ technical: string[], soft: string[] }>({ technical: [], soft: [] });
  const [awards, setAwards] = useState<any[]>([]);
  const [volunteer, setVolunteer] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [references, setReferences] = useState("");
  const [sectionOrder, setSectionOrder] = useState<string[]>(["experience", "projects", "education", "skills", "awards", "languages"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/resume/data");
        if (res.ok) {
          const data = await res.json();
          setProfile(data.profile);
          setExperience(data.experience);
          setSkills(data.skills?.technical ? data.skills : { technical: Array.isArray(data.skills) ? data.skills : [], soft: [] });
          setProjects(data.projects || []);
          setEducation(data.education || []);
          setAwards(data.awards || []);
          setVolunteer(data.volunteer || []);
          setLanguages(data.languages || []);
          setInterests(data.interests || []);
          setReferences(data.references || "");
          setSectionOrder(data.sectionOrder || ["experience", "projects", "education", "skills", "awards", "volunteer", "languages", "interests"]);
        }
      } catch (error) {
        console.error("Failed to fetch resume data", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/resume/save", {
        method: "POST",
        body: JSON.stringify({
          profile,
          experience,
          skills,
          projects,
          education,
          awards,
          volunteer,
          languages,
          interests,
          references,
          sectionOrder
        }),
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        alert("Dossier Synchronized Successfully.");
      }
    } catch (error) {
      console.error("Failed to save resume", error);
    } finally {
      setSaving(false);
    }
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setProjects(newProjects);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addProject = () => {
    setProjects([...projects, { name: "New Project", description: "Project summary..." }]);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { 
        company: "New Company", 
        role: "Software Engineer", 
        startDate: "2024-01-01", 
        endDate: "", 
        isCurrent: true, 
        desc: "Description here..." 
      }
    ]);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExp = [...experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setExperience(newExp);
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills({ ...skills, technical: skills.technical.filter(s => s !== skillToRemove) });
  };

  const addSkill = () => {
    const skill = prompt("Enter new skill:");
    if (skill && !skills.technical.includes(skill)) {
      setSkills({ ...skills, technical: [...skills.technical, skill] });
    }
  };


  if (loading) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <header className="h-16 border-b border-border bg-surface flex items-center justify-between px-6">
           <Skeleton className="w-32 h-6" />
           <Skeleton className="w-48 h-10" />
        </header>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 p-8 space-y-8 border-r border-border">
             <Skeleton className="w-full h-48 rounded-3xl" />
             <Skeleton className="w-full h-96 rounded-3xl" />
          </div>
          <div className="w-1/2 p-12 bg-slate-100 flex justify-center">
             <Skeleton className="w-[800px] h-full rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

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
          <button 
            onClick={handleSave}
            disabled={saving}
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border hover:bg-surface-variant transition-colors text-[10px] font-black uppercase tracking-widest text-text-secondary disabled:opacity-50"
          >
            {saving ? (
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="material-symbols-outlined text-sm">save</span>
            )}
            Save Progress
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
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Portfolio URL</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  placeholder="https://yourportfolio.com"
                  value={profile.portfolio}
                  onChange={(e) => handleProfileChange("portfolio", e.target.value)}
                />
              </div>
            </div>
          </div>


          <Reorder.Group axis="y" values={sectionOrder} onReorder={setSectionOrder} className="space-y-8">
            {sectionOrder.map((section) => (
              <Reorder.Item key={section} value={section}>
                 {section === "experience" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                                <span className="material-symbols-outlined text-xl">drag_indicator</span>
                             </div>
                             <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Experience</h3>
                          </div>
                          <button onClick={addExperience} className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest">
                             <span className="material-symbols-outlined text-sm">add_circle</span>
                             Add Directive
                          </button>
                       </div>
                       <div className="space-y-8">
                          {experience.map((exp, idx) => (
                             <div key={idx} className="p-6 rounded-2xl border border-border bg-surface-variant/30 relative group">
                                <button onClick={() => removeExperience(idx)} className="absolute top-4 right-4 text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                                <input className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={exp.company} onChange={(e) => handleExperienceChange(idx, "company", e.target.value)} placeholder="Company" />
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                   <input className="bg-surface border border-border rounded-lg p-2 text-[10px] font-bold" type="date" value={exp.startDate} onChange={(e) => handleExperienceChange(idx, "startDate", e.target.value)} />
                                   {!exp.isCurrent && <input className="bg-surface border border-border rounded-lg p-2 text-[10px] font-bold" type="date" value={exp.endDate} onChange={(e) => handleExperienceChange(idx, "endDate", e.target.value)} />}
                                </div>
                                <textarea className="w-full bg-surface rounded-xl border border-border text-xs h-32 p-4 outline-none font-medium" value={exp.desc} onChange={(e) => handleExperienceChange(idx, "desc", e.target.value)} placeholder="Achievements..." />
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {section === "projects" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                                <span className="material-symbols-outlined text-xl">drag_indicator</span>
                             </div>
                             <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Projects</h3>
                          </div>
                          <button onClick={addProject} className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest">
                             <span className="material-symbols-outlined text-sm">add_circle</span>
                             Add Project
                          </button>
                       </div>
                       <div className="space-y-6">
                          {projects.map((project, idx) => (
                             <div key={idx} className="p-6 rounded-2xl border border-border bg-surface-variant/30 relative group">
                                <button onClick={() => removeProject(idx)} className="absolute top-4 right-4 text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                                <input className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={project.name} onChange={(e) => handleProjectChange(idx, "name", e.target.value)} />
                                <textarea className="w-full bg-surface rounded-xl border border-border text-xs h-24 p-4 outline-none font-medium" value={project.description} onChange={(e) => handleProjectChange(idx, "description", e.target.value)} />
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {section === "education" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                                <span className="material-symbols-outlined text-xl">drag_indicator</span>
                             </div>
                             <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Education</h3>
                          </div>
                          <button onClick={() => setEducation([...education, { institution: "University", degree: "Degree", year: "2024" }])} className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest">
                             <span className="material-symbols-outlined text-sm">add_circle</span>
                             Add Academic
                          </button>
                       </div>
                       <div className="space-y-6">
                          {education.map((edu, idx) => (
                             <div key={idx} className="p-6 rounded-2xl border border-border bg-surface-variant/30 relative group">
                                <button onClick={() => setEducation(education.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                                <input className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={edu.institution} onChange={(e) => {
                                   const n = [...education]; n[idx].institution = e.target.value; setEducation(n);
                                }} />
                                <input className="bg-transparent text-[10px] text-primary font-black border-none p-0 focus:ring-0 w-full uppercase tracking-widest" value={edu.degree} onChange={(e) => {
                                   const n = [...education]; n[idx].degree = e.target.value; setEducation(n);
                                }} />
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {section === "skills" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                              <span className="material-symbols-outlined text-xl">drag_indicator</span>
                           </div>
                           <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Technical Arsenal</h3>
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Technical Skills</label>
                           <div className="flex flex-wrap gap-2">
                              {skills.technical.map(s => (
                                 <span key={s} className="px-3 py-1.5 bg-surface-variant border border-border rounded-lg text-[10px] font-bold flex items-center gap-2">
                                    {s} <button onClick={() => setSkills({...skills, technical: skills.technical.filter(sk => sk !== s)})}><span className="material-symbols-outlined text-xs">close</span></button>
                                 </span>
                              ))}
                              <button onClick={() => {const s = prompt("Skill?"); if(s) setSkills({...skills, technical: [...skills.technical, s]})}} className="px-3 py-1.5 border border-dashed border-border rounded-lg text-[10px] font-bold hover:bg-surface-variant">+ Add</button>
                           </div>
                        </div>
                    </div>
                 )}

                 {section === "awards" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                                <span className="material-symbols-outlined text-xl">drag_indicator</span>
                             </div>
                             <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Awards & Honors</h3>
                          </div>
                          <button onClick={() => setAwards([...awards, { title: "Award Name", issuer: "Issuer", date: "2024" }])} className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest">
                             <span className="material-symbols-outlined text-sm">add_circle</span>
                             Add Award
                          </button>
                       </div>
                       <div className="space-y-6">
                          {awards.map((aw, idx) => (
                             <div key={idx} className="p-4 rounded-xl border border-border bg-surface-variant/30 relative">
                                <button onClick={() => setAwards(awards.filter((_, i) => i !== idx))} className="absolute top-2 right-2 text-text-secondary hover:text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                                <input className="bg-transparent font-black text-xs border-none p-0 w-full mb-1" value={aw.title} onChange={e => {const n=[...awards]; n[idx].title=e.target.value; setAwards(n);}} />
                                <input className="bg-transparent text-[10px] text-text-secondary border-none p-0 w-full" value={aw.issuer} onChange={e => {const n=[...awards]; n[idx].issuer=e.target.value; setAwards(n);}} />
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {section === "languages" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                                <span className="material-symbols-outlined text-xl">drag_indicator</span>
                             </div>
                             <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Languages</h3>
                          </div>
                          <button onClick={() => setLanguages([...languages, { name: "New Language", level: "Native" }])} className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest">
                             <span className="material-symbols-outlined text-sm">add_circle</span>
                             Add Language
                          </button>
                       </div>
                       <div className="grid grid-cols-1 gap-4">
                          {languages.map((l, idx) => (
                             <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface-variant/30">
                                <input className="bg-transparent font-black text-xs border-none p-0 flex-1" value={l.name} onChange={e => {const n=[...languages]; n[idx].name=e.target.value; setLanguages(n);}} />
                                <select className="bg-surface border border-border rounded-lg p-2 text-[10px] font-bold" value={l.level} onChange={e => {const n=[...languages]; n[idx].level=e.target.value; setLanguages(n);}}>
                                   <option>Native</option>
                                   <option>Professional</option>
                                   <option>Intermediate</option>
                                   <option>Basic</option>
                                </select>
                                <button onClick={() => setLanguages(languages.filter((_, i) => i !== idx))} className="text-text-secondary hover:text-error"><span className="material-symbols-outlined text-sm">delete</span></button>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
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
                {profile.portfolio && (
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">language</span> {profile.portfolio}</span>
                )}
              </div>
            </header>

            <div className="grid grid-cols-3 gap-16 flex-1">
              <div className="col-span-2 space-y-12">
                {sectionOrder.filter(s => ["experience", "projects", "education", "volunteer"].includes(s)).map((section) => (
                  <div key={section}>
                    {section === "experience" && experience?.length > 0 && (
                      <section>
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Professional Experience</h4>
                        <div className="space-y-10">
                          {experience?.map((exp, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex justify-between items-baseline">
                                <h5 className="font-black text-lg text-slate-900 tracking-tight uppercase">{exp.company}</h5>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : ""} — {exp.isCurrent ? "Present" : (exp.endDate ? new Date(exp.endDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : "")}
                                </span>
                              </div>
                              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{exp.role}</p>
                              <p className="text-xs text-slate-500 leading-relaxed text-justify font-medium">{exp.desc}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {section === "projects" && projects?.length > 0 && (
                      <section className="mt-12">
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Verified Projects</h4>
                        <div className="grid grid-cols-1 gap-8">
                          {projects?.map((project, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="flex items-center gap-3">
                                <h5 className="font-black text-md text-slate-900 tracking-tight uppercase">{project.name}</h5>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                              </div>
                              <p className="text-xs text-slate-500 leading-relaxed font-medium">{project.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {section === "education" && education?.length > 0 && (
                      <section className="mt-12">
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Academic Background</h4>
                        <div className="space-y-6">
                          {education?.map((edu, idx) => (
                            <div key={idx} className="space-y-1">
                              <h5 className="font-black text-md text-slate-900 uppercase tracking-tight">{edu.institution}</h5>
                              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{edu.degree}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                ))}
              </div>

              <div className="col-span-1 space-y-12">
                {sectionOrder.filter(s => ["skills", "languages", "awards", "interests"].includes(s)).map((section) => (
                  <div key={section}>
                    {section === "skills" && skills?.technical?.length > 0 && (
                      <section>
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Technical Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.technical.map((skill) => (
                            <span key={skill} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {section === "languages" && languages?.length > 0 && (
                      <section className="mt-12">
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Languages</h4>
                        <div className="space-y-4">
                          {languages.map((l) => (
                            <div key={l.name} className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{l.name}</span>
                              <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{l.level}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {section === "awards" && awards?.length > 0 && (
                      <section className="mt-12">
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Awards</h4>
                        <div className="space-y-4">
                          {awards.map((aw) => (
                            <div key={aw.title} className="space-y-1">
                              <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{aw.title}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{aw.issuer}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                ))}

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
