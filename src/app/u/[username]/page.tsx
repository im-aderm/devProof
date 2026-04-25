"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function PublicPortfolioPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.username) {
      fetchPortfolio();
    }
  }, [params.username]);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`/api/u/${params.username}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Portfolio not found or private.");
        throw new Error("Failed to load portfolio.");
      }
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-display-xl font-bold text-on-surface mb-4">404</h1>
        <p className="text-on-surface-variant mb-8">{error || "User not found."}</p>
        <Link href="/" className="px-8 py-3 skill-gradient text-white rounded-lg font-bold">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen font-inter antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary-container rounded-full blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            <div className="relative">
              <Image
                src={data.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name || "U")}&background=4f46e5&color=fff`}
                alt={`${data.user.name} profile photo`}
                width={160}
                height={160}
                className="w-40 h-40 rounded-full border-4 border-primary/20 shadow-2xl object-cover"
              />
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-4 border-background">
                <span className="material-symbols-outlined text-white text-xs">verified</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                <h1 className="text-display-xl font-bold text-on-surface">{data.user.name}</h1>
                <span className="px-3 py-1 bg-surface-container-highest border border-outline-variant/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">
                  {data.aiSummary?.persona || "Software Engineer"}
                </span>
              </div>
              <p className="text-body-base text-on-surface-variant max-w-2xl mb-8">
                {data.aiSummary?.summary || data.profile?.bio || "No biography provided."}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-on-surface-variant">
                <span className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">location_on</span> {data.profile?.location || "Remote"}</span>
                <span className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">link</span> <a href={data.profile?.blog || "#"} className="hover:text-primary transition-colors">{data.profile?.blog?.replace('https://', '') || "No blog"}</a></span>
                <span className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-sm">terminal</span> <a href={`https://github.com/${data.user.githubUsername}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">@{data.user.githubUsername}</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Stats Section */}
      <section className="py-20 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <h2 className="text-headline-md font-bold text-on-surface mb-8">Core Competencies</h2>
              <div className="flex flex-wrap gap-3">
                {data.aiSummary?.topSkills?.map((skill: string) => (
                  <div key={skill} className="glass-card px-6 py-4 rounded-xl border-outline-variant/20 flex items-center gap-4 group hover:border-primary/50 transition-colors">
                    <span className="text-on-surface font-bold">{skill}</span>
                  </div>
                )) || data.languages.map((l: any) => (
                  <div key={l.name} className="glass-card px-6 py-4 rounded-xl border-outline-variant/20 flex items-center gap-4 group hover:border-primary/50 transition-colors">
                    <span className="text-on-surface font-bold">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="glass-card p-8 rounded-2xl border-primary/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Lens Score</p>
                  {data.readinessScore != null ? (
                    <>
                      <h3 className="text-6xl font-black text-primary mb-4">
                        {data.readinessScore}<span className="text-2xl text-on-surface-variant">/100</span>
                      </h3>
                      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden mb-6">
                        <div className="h-full bg-primary" style={{ width: `${data.readinessScore}%` }} />
                      </div>
                    </>
                  ) : (
                    <p className="text-on-surface-variant text-sm italic mb-6">Score not yet calculated.</p>
                  )}
                  <p className="text-xs text-on-surface-variant leading-relaxed italic">
                    Verified developer readiness score powered by DevProof.
                  </p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-8xl">analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 max-w-5xl mx-auto px-8">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-headline-lg font-bold text-on-surface mb-2">Featured Projects</h2>
            <p className="text-on-surface-variant italic">A selection of my most significant technical contributions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.repos.map((repo: any) => (
            <div key={repo.id} className="glass-card rounded-2xl border-outline-variant/20 overflow-hidden flex flex-col hover:border-primary/30 transition-all group">
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">folder</span>
                  </div>
                  <div className="flex items-center gap-4 text-on-surface-variant">
                    <span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">star</span> {repo.stars}</span>
                    <span className="flex items-center gap-1 text-xs"><span className="material-symbols-outlined text-sm">fork_right</span> {repo.forks}</span>
                  </div>
                </div>
                <h3 className="text-headline-md font-bold text-on-surface group-hover:text-primary transition-colors mb-2">
                  {repo.name}
                </h3>
                <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-3">
                  {repo.description || "Experimental project focusing on technical debt reduction and system scalability."}
                </p>
                <div className="flex flex-wrap gap-2">
                  {repo.languages.slice(0, 3).map((l: any) => (
                    <span key={l.name} className="px-2 py-0.5 bg-surface-container-highest rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                      {l.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-8 py-4 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <a href={repo.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                  Source Code <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-surface-container-lowest text-center">
        <div className="max-w-xl mx-auto px-8">
          <p className="text-on-surface font-bold mb-6 italic">Interested in collaborating or hiring?</p>
          <div className="flex justify-center gap-6">
             <button className="skill-gradient px-8 py-3 text-white rounded-lg font-bold shadow-xl shadow-indigo-500/20">Contact {data.user.name.split(' ')[0]}</button>
          </div>
          <div className="mt-12 pt-12 border-t border-white/5 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
            Generated with <span className="text-primary font-black">DevProof</span> — The Elite Talent Lens
          </div>
        </div>
      </footer>
    </div>
  );
}
