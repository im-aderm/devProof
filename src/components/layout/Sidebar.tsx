"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Portfolio", icon: "person_pin", href: "/u/profile" },
  { name: "Resume", icon: "description", href: "/resume" },
  { name: "Compare", icon: "compare_arrows", href: "/compare" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <aside className="h-full flex flex-col py-8 bg-surface w-64 border-r border-border z-50">
      <div className="px-8 mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="DevProof" className="h-10 w-auto" />
        </Link>
        {onClose && (
          <button onClick={onClose} className="md:hidden p-2 text-text-secondary hover:text-white transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em] ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-inner"
                  : "text-text-secondary hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto">
        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white text-[8px] font-black uppercase tracking-[0.2em] opacity-40">Sync Status</p>
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-full primary-gradient"></div>
          </div>
          <p className="text-[9px] text-text-secondary font-medium leading-relaxed italic">
            Ledger synchronized with global commit matrix.
          </p>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[60]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 h-full shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
