"use client";

import { useState } from "react";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/Buttons";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Reorder, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import { useRouter } from "next/navigation";

export default function ResumeBuilderPage() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // content | design

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    website: "",
    summary: ""
  });
  const [verificationData, setVerificationData] = useState<{ trustScore: number, signals: any[] }>({ trustScore: 0, signals: [] });
  const [isVerifying, setIsVerifying] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);

  const [experience, setExperience] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<{ technical: string[], soft: string[] }>({ technical: [], soft: [] });
  const [awards, setAwards] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [volunteer, setVolunteer] = useState<any[]>([]);
  const [languages, setLanguages] = useState<any[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [references, setReferences] = useState("");
  const [sectionOrder, setSectionOrder] = useState<string[]>(["experience", "projects", "education", "skills", "certifications", "awards", "languages"]);
  const [isPublic, setIsPublic] = useState(false);
  const [currentSlug, setCurrentSlug] = useState("");

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
          setCertifications(data.certifications || []);
          setVolunteer(data.volunteer || []);
          setLanguages(data.languages || []);
          setInterests(data.interests || []);
          setReferences(data.references || "");
          setSectionOrder(data.sectionOrder || ["experience", "projects", "education", "skills", "awards", "volunteer", "languages", "interests"]);
          setIsPublic(data.isPublic || false);
          setCurrentSlug(data.slug || "");
          if (data.id) setResumeId(data.id);
          
          // Fetch verification if we have an ID
          if (data.id) {
            fetch(`/api/resume/verify?resumeId=${data.id}`)
              .then(res => res.json())
              .then(vData => {
                if (!vData.error) setVerificationData(vData);
              });
          }
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

  const handleVerify = async () => {
    if (!resumeId) return;
    setIsVerifying(true);
    try {
      const res = await fetch("/api/resume/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId })
      });
      const data = await res.json();
      if (data.success) {
        setVerificationData({ trustScore: data.trustScore, signals: data.signals });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

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
          certifications,
          volunteer,
          languages,
          interests,
          references,
          sectionOrder,
          isPublic
        }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentSlug(data.slug);
        alert("Dossier Synchronized Successfully.");
      } else {
        alert(`Save Failed: ${data.error || "Unknown Error"}`);
      }
    } catch (error: any) {
      console.error("Failed to save resume", error);
      alert(`Connection Error: ${error.message}`);
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

  const addCertification = () => {
    setCertifications([...certifications, { title: "", issuer: "", date: "" }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleCertificationChange = (index: number, field: string, value: any) => {
    const newCertifications = [...certifications];
    newCertifications[index][field] = value;
    setCertifications(newCertifications);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
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
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="md:pl-64 flex flex-col min-h-screen w-full transition-all duration-300">
        <TopNavbar 
          onMenuClick={() => setIsSidebarOpen(true)} 
          actions={
            <div className="flex items-center gap-4 no-print">
              <div className="flex items-center bg-surface-variant/50 rounded-xl p-1 border border-border">
                <button 
                  onClick={() => setIsPublic(false)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${!isPublic ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Private
                </button>
                <button 
                  onClick={() => setIsPublic(true)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${isPublic ? 'bg-surface text-primary shadow-sm' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  Public
                </button>
              </div>

              {isPublic && currentSlug && (
                <button 
                  onClick={() => {
                    const url = `${window.location.origin}/resume/${currentSlug}`;
                    navigator.clipboard.writeText(url);
                    alert("Public Link Copied to Clipboard!");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:bg-surface-variant transition-colors text-[9px] font-black uppercase tracking-widest text-primary"
                >
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                  Copy Link
                </button>
              )}

              <div className="h-6 w-px bg-border"></div>

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
          }
        />

        <main className="flex flex-1 h-[calc(100vh-96px)] overflow-hidden">
        {/* Left Panel: Editor */}
        <section className="no-print w-full md:w-1/2 h-full overflow-y-auto bg-surface-variant/30 border-r border-border p-8 space-y-8">
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
                  value={profile.name || ""}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Job Title</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  value={profile.title || ""}
                  onChange={(e) => handleProfileChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Email Address</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="email" 
                  value={profile.email || ""}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Phone Number</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="tel" 
                  placeholder="+1 (555) 000-0000"
                  value={profile.phone || ""}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Location</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  value={profile.location || ""}
                  onChange={(e) => handleProfileChange("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">LinkedIn URL</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  placeholder="linkedin.com/in/username"
                  value={profile.linkedin || ""}
                  onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">GitHub URL</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  placeholder="github.com/username"
                  value={profile.github || ""}
                  onChange={(e) => handleProfileChange("github", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Portfolio URL</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  placeholder="https://yourportfolio.com"
                  value={profile.portfolio || ""}
                  onChange={(e) => handleProfileChange("portfolio", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Personal Website</label>
                <input 
                  className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-3 outline-none transition-all font-bold" 
                  type="text" 
                  placeholder="https://yourwebsite.com"
                  value={profile.website || ""}
                  onChange={(e) => handleProfileChange("website", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Short Summary / Bio</label>
              <textarea 
                className="w-full rounded-xl border-border bg-surface focus:ring-2 focus:ring-primary/20 text-sm p-4 h-32 outline-none transition-all font-medium" 
                placeholder="Brief professional summary..."
                value={profile.summary || ""}
                onChange={(e) => handleProfileChange("summary", e.target.value)}
              />
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
                                <input className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={exp.company || ""} onChange={(e) => handleExperienceChange(idx, "company", e.target.value)} placeholder="Company" />
                                <input className="bg-transparent text-[10px] text-primary font-black border-none p-0 focus:ring-0 w-full uppercase tracking-widest mb-4" value={exp.role || ""} onChange={(e) => handleExperienceChange(idx, "role", e.target.value)} placeholder="Role" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-1">
                                     <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Start Date</label>
                                     <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="date" value={exp.startDate || ""} onChange={(e) => handleExperienceChange(idx, "startDate", e.target.value)} />
                                  </div>
                                  <div className="space-y-1">
                                     <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">End Date</label>
                                     {exp.isCurrent ? (
                                        <div className="w-full bg-surface-variant/50 border border-border border-dashed rounded-lg p-2 text-[10px] font-black text-primary uppercase tracking-widest text-center">Present</div>
                                     ) : (
                                        <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="date" value={exp.endDate || ""} onChange={(e) => handleExperienceChange(idx, "endDate", e.target.value)} />
                                     )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                  <input 
                                     type="checkbox" 
                                     id={`current-${idx}`}
                                     className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                                     checked={exp.isCurrent} 
                                     onChange={(e) => handleExperienceChange(idx, "isCurrent", e.target.checked)} 
                                  />
                                  <label htmlFor={`current-${idx}`} className="text-[10px] font-black text-text-primary uppercase tracking-widest cursor-pointer">I am currently working here</label>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="space-y-1">
                                     <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Employment Type</label>
                                     <select className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" value={exp.type || "Full-time"} onChange={(e) => handleExperienceChange(idx, "type", e.target.value)}>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                        <option value="Internship">Internship</option>
                                     </select>
                                  </div>
                                  <div className="space-y-1">
                                     <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Location</label>
                                     <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="text" placeholder="London, UK" value={exp.location || ""} onChange={(e) => handleExperienceChange(idx, "location", e.target.value)} />
                                   </div>
                                </div>
                                <textarea className="w-full bg-surface rounded-xl border border-border text-xs h-32 p-4 outline-none font-medium mb-4" value={exp.desc || ""} onChange={(e) => handleExperienceChange(idx, "desc", e.target.value)} placeholder="Achievements..." />
                                <div className="space-y-1">
                                   <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Skills Used (comma separated)</label>
                                   <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="text" placeholder="React, Node.js, TypeScript" value={exp.skillsUsed || ""} onChange={(e) => handleExperienceChange(idx, "skillsUsed", e.target.value)} />
                                </div>
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
                                <input className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={project.name || ""} onChange={(e) => handleProjectChange(idx, "name", e.target.value)} />
                                <textarea className="w-full bg-surface rounded-xl border border-border text-xs h-24 p-4 outline-none font-medium" value={project.description || ""} onChange={(e) => handleProjectChange(idx, "description", e.target.value)} />
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
                                <input className="bg-transparent font-black text-sm border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={edu.institution || ""} onChange={(e) => {
                                   const n = [...education]; n[idx].institution = e.target.value; setEducation(n);
                                }} />
                                <input className="bg-transparent text-[10px] text-primary font-black border-none p-0 focus:ring-0 w-full uppercase tracking-widest mb-4" value={edu.degree || ""} onChange={(e) => {
                                   const n = [...education]; n[idx].degree = e.target.value; setEducation(n);
                                }} />
                                <div className="grid grid-cols-3 gap-4">
                                   <div className="space-y-1">
                                      <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Start Year</label>
                                      <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="text" placeholder="2020" value={edu.startYear || ""} onChange={(e) => {
                                         const n = [...education]; n[idx].startYear = e.target.value; setEducation(n);
                                      }} />
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">End Year</label>
                                      <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="text" placeholder="2024" value={edu.endYear || ""} onChange={(e) => {
                                         const n = [...education]; n[idx].endYear = e.target.value; setEducation(n);
                                      }} />
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Grade/GPA</label>
                                      <input className="w-full bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="text" placeholder="First Class" value={edu.grade || ""} onChange={(e) => {
                                         const n = [...education]; n[idx].grade = e.target.value; setEducation(n);
                                      }} />
                                   </div>
                                </div>
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
                              <button onClick={() => {const s = prompt("Technical Skill?"); if(s) setSkills({...skills, technical: [...skills.technical, s]})}} className="px-3 py-1.5 border border-dashed border-border rounded-lg text-[10px] font-bold hover:bg-surface-variant">+ Add Technical</button>
                           </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-border border-dashed">
                           <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Soft Capabilities</label>
                           <div className="flex flex-wrap gap-2">
                              {skills.soft?.map(s => (
                                 <span key={s} className="px-3 py-1.5 bg-surface-variant border border-border rounded-lg text-[10px] font-bold flex items-center gap-2">
                                    {s} <button onClick={() => setSkills({...skills, soft: (skills.soft || []).filter(sk => sk !== s)})}><span className="material-symbols-outlined text-xs">close</span></button>
                                 </span>
                              ))}
                              <button onClick={() => {const s = prompt("Soft Skill?"); if(s) setSkills({...skills, soft: [...(skills.soft || []), s]})}} className="px-3 py-1.5 border border-dashed border-border rounded-lg text-[10px] font-bold hover:bg-surface-variant">+ Add Soft</button>
                           </div>
                        </div>
                    </div>
                 )}

                 {section === "certifications" && (
                    <div className="bg-surface rounded-3xl border border-border p-8 shadow-sm space-y-6">
                       <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-primary border border-indigo-100 dark:border-indigo-800/50 cursor-grab">
                                <span className="material-symbols-outlined text-xl">drag_indicator</span>
                             </div>
                             <h3 className="text-sm font-black text-text-primary uppercase tracking-widest">Certifications</h3>
                          </div>
                          <button onClick={addCertification} className="text-primary font-black text-[10px] flex items-center gap-2 hover:underline uppercase tracking-widest">
                             <span className="material-symbols-outlined text-sm">add_circle</span>
                             Add Entry
                          </button>
                       </div>
                       <div className="space-y-4">
                          {certifications.map((cert, idx) => (
                             <div key={idx} className="p-4 rounded-xl border border-border bg-surface-variant/30 relative group">
                                <button onClick={() => removeCertification(idx)} className="absolute top-2 right-2 text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                                <input className="bg-transparent font-black text-xs border-none p-0 focus:ring-0 w-full text-text-primary uppercase tracking-tight mb-2" value={cert.title || ""} onChange={(e) => handleCertificationChange(idx, "title", e.target.value)} placeholder="Certification Title" />
                                <div className="grid grid-cols-2 gap-4">
                                   <input className="bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" value={cert.issuer || ""} onChange={(e) => handleCertificationChange(idx, "issuer", e.target.value)} placeholder="Issuer" />
                                   <input className="bg-surface border border-border rounded-lg p-2 text-[10px] font-bold outline-none" type="text" placeholder="Year" value={cert.date || ""} onChange={(e) => handleCertificationChange(idx, "date", e.target.value)} />
                                </div>
                             </div>
                          ))}
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
                                <input className="bg-transparent font-black text-xs border-none p-0 w-full mb-1" value={aw.title || ""} onChange={e => {const n=[...awards]; n[idx].title=e.target.value; setAwards(n);}} />
                                <input className="bg-transparent text-[10px] text-text-secondary border-none p-0 w-full" value={aw.issuer || ""} onChange={e => {const n=[...awards]; n[idx].issuer=e.target.value; setAwards(n);}} />
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
                                <input className="bg-transparent font-black text-xs border-none p-0 flex-1" value={l.name || ""} onChange={e => {const n=[...languages]; n[idx].name=e.target.value; setLanguages(n);}} />
                                <select className="bg-surface border border-border rounded-lg p-2 text-[10px] font-bold" value={l.level || "Professional"} onChange={e => {const n=[...languages]; n[idx].level=e.target.value; setLanguages(n);}}>
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
          <div className="resume-container w-full max-w-[800px] bg-white shadow-2xl p-16 flex flex-col text-slate-900 min-h-[1131px] rounded-sm origin-top scale-95 transition-transform overflow-hidden">
            <header className="border-b-8 border-indigo-600 pb-10 mb-10">
              <h1 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter uppercase">{profile.name}</h1>
              <p className="text-2xl font-bold text-indigo-600 mb-6 tracking-tight">{profile.title}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">mail</span> {profile.email}</span>
                {profile.phone && (
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">call</span> {profile.phone}</span>
                )}
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">location_on</span> {profile.location}</span>
                {profile.github && (
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">link</span> {profile.github}</span>
                )}
                {profile.linkedin && (
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">share</span> {profile.linkedin}</span>
                )}
                {profile.portfolio && (
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">language</span> {profile.portfolio}</span>
                )}
                {profile.website && (
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm text-indigo-500">public</span> {profile.website}</span>
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
                                 <div className="flex items-center gap-2">
                                  <h5 className="font-black text-lg text-slate-900 tracking-tight uppercase">{exp.company}</h5>
                                  {verificationData.signals.some(s => s.type === "identity" || s.type === "work") && (
                                    <span className="material-symbols-outlined text-indigo-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                  )}
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : ""} — {exp.isCurrent ? "Present" : (exp.endDate ? new Date(exp.endDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : "")}
                                </span>
                              </div>
                              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">{exp.role} • {exp.type || "Full-time"} • {exp.location || "Remote"}</p>
                              <p className="text-xs text-slate-500 leading-relaxed text-justify font-medium">{exp.desc}</p>
                              {exp.skillsUsed && (
                                 <div className="flex flex-wrap gap-2 mt-3">
                                    {exp.skillsUsed.split(',').map((s: string) => (
                                       <span key={s} className="text-[8px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-2 py-0.5 rounded">{s.trim()}</span>
                                    ))}
                                 </div>
                              )}
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
                                {verificationData.signals.some(s => s.type === "github_project" && s.payload?.url === project.url) && (
                                  <span className="material-symbols-outlined text-indigo-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                )}
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
                              <div className="flex justify-between items-baseline">
                                <h5 className="font-black text-md text-slate-900 uppercase tracking-tight">{edu.institution}</h5>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{edu.startYear} — {edu.endYear || "Present"}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{edu.degree}</p>
                                {edu.grade && <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{edu.grade}</span>}
                              </div>
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
                    {section === "skills" && (
                      <section>
                        {skills.technical?.length > 0 && (
                          <div className="mb-10">
                            <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-6 uppercase tracking-[0.3em]">Technical Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.technical.map((skill: string) => (
                                <span key={skill} className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {skills.soft?.length > 0 && (
                          <div>
                            <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-6 uppercase tracking-[0.3em]">Soft Capabilities</h4>
                            <div className="flex flex-wrap gap-2">
                              {skills.soft.map((skill: string) => (
                                <span key={skill} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
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

                    {section === "certifications" && certifications?.length > 0 && (
                      <section className="mt-12">
                        <h4 className="text-[10px] font-black text-indigo-600 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-[0.3em]">Professional Certifications</h4>
                        <div className="space-y-4">
                          {certifications?.map((cert, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <div>
                                <h5 className="font-black text-[11px] text-slate-900 uppercase tracking-tight">{cert.title}</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cert.issuer}</p>
                              </div>
                              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{cert.date}</span>
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

                <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mt-auto relative group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-indigo-600 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Verified Dossier</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Trust Score:</span>
                       <span className="text-sm font-black text-indigo-600">{verificationData.trustScore}%</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-indigo-900/60 leading-relaxed font-bold uppercase tracking-widest mb-4">
                    This document is cryptographically verified against authenticated GitHub ledger contributions.
                  </p>
                  <button 
                    onClick={handleVerify}
                    disabled={isVerifying || !resumeId}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors disabled:opacity-50 no-print"
                  >
                    {isVerifying ? "Verifying..." : "Refresh Verification"}
                  </button>
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
    </div>
  );
}
