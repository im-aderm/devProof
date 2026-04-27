"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Repositories", icon: "folder_open", href: "/repos" },
  { name: "Portfolio", icon: "person_pin", href: "/u/profile" },
  { name: "Resume", icon: "description", href: "/resume" },
  { name: "Readiness", icon: "verified", href: "/readiness" },
  { name: "Compare", icon: "compare_arrows", href: "/compare" },
  { name: "Settings", icon: "settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-4 bg-background w-64 border-r border-outline-variant/10 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
        </div>
        <div>
          <h2 className="font-black text-on-surface text-lg leading-tight tracking-tighter">DevProof</h2>
          <p className="text-[10px] text-on-surface-variant font-bold tracking-wide uppercase opacity-50">Developer Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ease-in-out text-sm font-bold ${
                isActive
                  ? "bg-primary-container/20 text-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/20">
          <p className="text-on-surface text-[10px] font-black mb-3 uppercase tracking-widest opacity-50">Analysis Protocol</p>
          <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden mb-4">
            <div className="h-full w-2/3 bg-primary transition-all"></div>
          </div>
          <button className="w-full py-2.5 bg-on-surface text-background rounded-lg text-xs font-black hover:opacity-90 transition-all active:scale-95 duration-200 uppercase tracking-widest">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
