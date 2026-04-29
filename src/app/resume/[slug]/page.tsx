"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PrimaryButton } from "@/components/ui";

export default function PublicResumePage() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [verificationData, setVerificationData] = useState<{ trustScore: number, signals: any[] }>({ trustScore: 0, signals: [] });
  const [certifications, setCertifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resume/public/${slug}`);
        const result = await res.json();
        if (res.ok) {
          setData(result);
          // Fetch verification
          if (result.id) {
            fetch(`/api/resume/verify?resumeId=${result.id}`)
              .then(res => res.json())
              .then(vData => {
                if (!vData.error) setVerificationData(vData);
              });
          }
        } else {
          setError(result.error || "Failed to load resume");
        }
      } catch (err) {
        setError("A connection error occurred.");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchResume();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">Decrypting Dossier...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-6xl text-error mb-6 opacity-20">lock</span>
        <h1 className="text-2xl font-black text-text-primary mb-2 uppercase tracking-tighter">{error}</h1>
        <p className="text-sm text-text-secondary mb-8 max-w-md">This career identity is either private or does not exist in the DevProof ledger.</p>
        <Link href="/">
           <PrimaryButton icon="home">Return Home</PrimaryButton>
        </Link>
      </div>
    );
  }

  const { profile, experience, projects, education, skills, awards, languages, sectionOrder } = data;

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 font-body text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Floating Export Button */}
      <div className="fixed bottom-8 right-8 z-50 no-print">
        <PrimaryButton 
          onClick={() => window.print()}
          icon="download"
          className="shadow-2xl shadow-indigo-500/20"
        >
          Download PDF
        </PrimaryButton>
      </div>

      <div className="resume-container max-w-[900px] mx-auto bg-white shadow-2xl rounded-sm p-12 md:p-20 relative overflow-hidden ring-1 ring-slate-200">
        
        {/* Verification Watermark */}
        <div className="absolute top-8 right-8 flex items-center gap-2 pointer-events-none opacity-40">
           <span className="material-symbols-outlined text-indigo-600 text-lg">verified</span>
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">DevProof Verified Standard</span>
        </div>

        <header className="border-b-8 border-indigo-600 pb-12 mb-12">
          <h1 className="text-6xl font-black text-slate-900 mb-3 tracking-tighter uppercase leading-none">{profile.name}</h1>
          <p className="text-3xl font-bold text-indigo-600 mb-8 tracking-tight">{profile.title}</p>
          <div className="flex flex-wrap gap-x-10 gap-y-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-default">
               <span className="material-symbols-outlined text-sm text-indigo-500">mail</span> {profile.email}
            </span>
            {profile.phone && (
              <span className="flex items-center gap-2 cursor-default">
                 <span className="material-symbols-outlined text-sm text-indigo-500">call</span> {profile.phone}
              </span>
            )}
            <span className="flex items-center gap-2 cursor-default">
               <span className="material-symbols-outlined text-sm text-indigo-500">location_on</span> {profile.location}
            </span>
            <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-default">
               <span className="material-symbols-outlined text-sm text-indigo-500">link</span> {profile.github}
            </span>
            {profile.linkedin && (
              <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-default">
                 <span className="material-symbols-outlined text-sm text-indigo-500">share</span> {profile.linkedin}
              </span>
            )}
            {profile.portfolio && (
              <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-default">
                 <span className="material-symbols-outlined text-sm text-indigo-500">public</span> {profile.portfolio}
              </span>
            )}
            {profile.website && (
              <span className="flex items-center gap-2 hover:text-indigo-600 transition-colors cursor-default">
                 <span className="material-symbols-outlined text-sm text-indigo-500">language</span> {profile.website}
              </span>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-16">
            {sectionOrder?.filter((s: string) => ["experience", "projects", "education"].includes(s)).map((section: string) => (
              <div key={section}>
                {section === "experience" && experience?.length > 0 && (
                  <section>
                    <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Professional Experience</h4>
                    <div className="space-y-12">
                      {experience.map((exp: any, idx: number) => (
                        <div key={idx} className="space-y-4 relative group">
                          <div className="flex justify-between items-baseline">
                            <div className="flex items-center gap-3">
                              <h5 className="font-black text-xl text-slate-900 tracking-tight uppercase group-hover:text-indigo-600 transition-colors">{exp.company}</h5>
                              {verificationData.signals.some(s => s.type === "identity" || s.type === "work") && (
                                <span className="material-symbols-outlined text-indigo-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                              )}
                            </div>
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                              {exp.startDate ? new Date(exp.startDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : ""} — {exp.isCurrent ? "Present" : (exp.endDate ? new Date(exp.endDate).toLocaleDateString([], { month: 'short', year: 'numeric' }) : "")}
                            </span>
                          </div>
                          <p className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em]">{exp.role} • {exp.type || "Full-time"} • {exp.location || "Remote"}</p>
                          <p className="text-[13px] text-slate-500 leading-relaxed text-justify font-medium">{exp.desc}</p>
                          {exp.skillsUsed && (
                             <div className="flex flex-wrap gap-2 mt-4">
                                {exp.skillsUsed.split(',').map((s: string) => (
                                   <span key={s} className="text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-2 py-1 rounded-md">{s.trim()}</span>
                                ))}
                             </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {section === "projects" && projects?.length > 0 && (
                  <section className="mt-16">
                    <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Verified Projects</h4>
                    <div className="grid grid-cols-1 gap-10">
                      {projects.map((project: any, idx: number) => (
                        <div key={idx} className="space-y-3 p-6 bg-slate-50/50 rounded-xl border border-transparent hover:border-slate-200 transition-all hover:bg-white hover:shadow-lg">
                          <div className="flex items-center gap-3">
                            <h5 className="font-black text-lg text-slate-900 tracking-tight uppercase">{project.name}</h5>
                            {verificationData.signals.some(s => s.type === "github_project" && s.payload?.url === project.url) && (
                              <>
                                <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span>
                                <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest border border-indigo-200 px-2 py-0.5 rounded-full bg-indigo-50/50 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                  GitHub Ledger Verified
                                </span>
                              </>
                            )}
                          </div>
                          <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{project.description}</p>
                          {project.url && (
                             <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline mt-2">
                               View Repository <span className="material-symbols-outlined text-xs">arrow_outward</span>
                             </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {section === "education" && education?.length > 0 && (
                  <section className="mt-16">
                    <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Academic Background</h4>
                    <div className="space-y-8">
                      {education.map((edu: any, idx: number) => (
                        <div key={idx} className="space-y-3 relative group">
                          <div className="flex justify-between items-baseline">
                            <h5 className="font-black text-xl text-slate-900 tracking-tight uppercase group-hover:text-indigo-600 transition-colors">{edu.institution}</h5>
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                              {edu.startYear} — {edu.endYear || "Present"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">{edu.degree}</p>
                            {edu.grade && <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded border border-slate-100">{edu.grade}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {section === "certifications" && data.certifications?.length > 0 && (
                  <section className="mt-16">
                    <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Certifications</h4>
                    <div className="space-y-6">
                      {data.certifications.map((cert: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center">
                          <div>
                            <h5 className="font-black text-md text-slate-900 uppercase tracking-tight">{cert.title}</h5>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.issuer}</p>
                          </div>
                          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{cert.date}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-16">
            {sectionOrder?.filter((s: string) => ["skills", "languages", "awards"].includes(s)).map((section: string) => (
              <div key={section}>
                {section === "skills" && (
                  <div className="space-y-16">
                    {data.skills?.technical?.length > 0 && (
                      <section>
                        <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Technical Stack</h4>
                        <div className="flex flex-wrap gap-2.5">
                          {data.skills.technical.map((skill: string) => (
                            <span key={skill} className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                    {data.skills?.soft?.length > 0 && (
                      <section>
                        <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Soft Capabilities</h4>
                        <div className="flex flex-wrap gap-2.5">
                          {data.skills.soft.map((skill: string) => (
                            <span key={skill} className="px-3.5 py-2 bg-slate-50 border border-slate-100 text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                )}

                {section === "languages" && languages?.length > 0 && (
                  <section className="mt-16">
                    <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Languages</h4>
                    <div className="space-y-5">
                      {languages.map((l: any) => (
                        <div key={l.name} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">{l.name}</span>
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{l.level}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {section === "awards" && awards?.length > 0 && (
                  <section className="mt-16">
                    <h4 className="text-[11px] font-black text-indigo-600 border-b-2 border-slate-100 pb-4 mb-10 uppercase tracking-[0.4em]">Awards</h4>
                    <div className="space-y-6">
                      {awards.map((aw: any) => (
                        <div key={aw.title} className="space-y-1.5 p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
                          <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{aw.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{aw.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ))}

            <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800 mt-auto text-white shadow-2xl relative overflow-hidden group">
              {/* Trust Score Progress Bar */}
              <div className="absolute top-0 left-0 h-1 bg-indigo-500 transition-all duration-1000" style={{ width: `${verificationData.trustScore}%` }}></div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-indigo-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-indigo-400">Ledger Verification</span>
                </div>
                <div className="text-right">
                   <div className="text-2xl font-black text-white leading-none">{verificationData.trustScore}%</div>
                   <div className="text-[7px] font-black text-indigo-400 uppercase tracking-widest">Trust Score</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                 {verificationData.signals.map((sig, i) => (
                    <div key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[7px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                       <span className="w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.5)]"></span>
                       {sig.type.replace('_', ' ')}
                    </div>
                 ))}
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-[0.1em]">
                This professional identity is cryptographically anchored to GitHub authenticated contributions. 
                All project metrics and timelines are verified via DevProof Intelligence Protocol.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-800">
                 <Link href="/" className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] hover:underline flex items-center gap-2">
                    Verify this on DevProof <span className="material-symbols-outlined text-xs">arrow_forward</span>
                 </Link>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.5em]">DevProof Verified Standard • Professional Identity Node</p>
        </footer>
      </div>
    </div>
  );
}
