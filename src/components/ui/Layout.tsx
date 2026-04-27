import React from "react";

export function AppShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-background text-on-background font-body-base antialiased min-h-screen ${className}`}>
      {children}
    </div>
  );
}

export function StickyNavbar({
  brandName = "DevProof",
  links = [],
  actionButton
}: {
  brandName?: string;
  links?: { name: string; href: string }[];
  actionButton?: React.ReactNode;
}) {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-6 py-3 max-w-full mx-auto bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
      <div className="flex items-center gap-8">
        <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">{brandName}</span>
        <div className="hidden md:flex gap-6">
          {links.map(link => (
            <a key={link.name} href={link.href} className="font-inter antialiased text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors">notifications</button>
        <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors">account_circle</button>
        {actionButton || (
          <button className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-inter antialiased text-sm font-medium hover:opacity-90 active:scale-[0.99] transition-all">Get Started</button>
        )}
      </div>
    </nav>
  );
}

export function SectionContainer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`space-y-base ${className}`}>
      {children}
    </section>
  );
}

export function GridLayout({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start ${className}`}>
      {children}
    </div>
  );
}
