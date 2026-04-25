"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardHeader({ profile, name }: { profile: any; name: string }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Overview", href: "/dashboard" },
    { name: "Repositories", href: "/repositories" },
    { name: "Readiness", href: "/readiness" },
    { name: "Resume", href: "/resume" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-8 h-20 bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5 shadow-2xl">
      <div className="flex items-center gap-12">
        <Link href="/" className="text-xl font-black tracking-tighter text-white">DevProof</Link>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-bold uppercase tracking-widest pb-1 transition-colors ${
                pathname === link.href ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-on-surface">{name}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{profile?.location || "Remote"}</p>
          </div>
          <img className="w-10 h-10 rounded-full border border-primary/20" src={profile?.image || `https://ui-avatars.com/api/?name=${name}`} alt={name} />
        </div>
        <button onClick={() => signOut()} className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">logout</button>
      </div>
    </header>
  );
}
