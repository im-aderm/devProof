"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Repositories", icon: "folder_open", href: "/repos" },
  { name: "Portfolio", icon: "person_pin", href: "/u/profile" }, // Will need to replace profile with dynamic username later
  { name: "Resume", icon: "description", href: "/resume" },
  { name: "Readiness", icon: "verified", href: "/readiness" },
  { name: "Compare", icon: "compare_arrows", href: "/compare" },
  { name: "Settings", icon: "settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col py-4 bg-slate-50 dark:bg-slate-950 w-64 border-r border-slate-200 dark:border-slate-800 z-50">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
        </div>
        <div>
          <h2 className="font-black text-slate-900 dark:text-white text-lg leading-tight">DevProof</h2>
          <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase">Developer Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ease-in-out text-sm font-medium ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <div className="p-4 bg-slate-900 dark:bg-indigo-900/40 rounded-xl border border-slate-800">
          <p className="text-white text-[10px] font-bold mb-2 uppercase tracking-wider">Analysis Plan</p>
          <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden mb-3">
            <div className="h-full w-2/3 bg-cyan-400"></div>
          </div>
          <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors active:scale-95 duration-200">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
