"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Debounced Search Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          if (res.ok) {
            const data = await res.json();
            setSearchResults(data.results || []);
          }
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = [
    { id: "analyze", title: "Analyze Developer", icon: "person_search", shortcut: "A", action: (q: string) => router.push(`/analyze/${q}`) },
    { id: "repo", title: "Audit Repository", icon: "folder_managed", shortcut: "R", action: (q: string) => router.push(`/repo/${q}`) },
    { id: "compare", title: "Compare Identities", icon: "compare_arrows", shortcut: "C", action: () => router.push("/compare") },
    { id: "review", title: "AI Architecture Review", icon: "psychology", shortcut: "V", action: () => router.push("/review") },
    { id: "home", title: "Return to Hub", icon: "home", shortcut: "H", action: () => router.push("/") },
  ];

  const filteredCommands = query 
    ? commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const handleAction = (command: typeof commands[0]) => {
    if (command.id === "analyze" || command.id === "repo") {
      command.action(query);
    } else {
      command.action("");
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-surface border border-border rounded-[32px] shadow-2xl overflow-hidden relative z-10"
          >
            <div className="p-6 border-b border-border flex items-center gap-4">
              <span className="material-symbols-outlined text-primary">terminal</span>
              <input
                autoFocus
                placeholder="Enter command or subject (e.g. facebook/react)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredCommands.length > 0) {
                    handleAction(filteredCommands[0]);
                  }
                }}
                className="w-full bg-transparent border-none outline-none text-text-primary font-bold placeholder:text-text-secondary/30 uppercase tracking-widest text-xs"
              />
              <div className="px-3 py-1 bg-surface-variant rounded-lg border border-border text-[10px] font-black text-text-secondary uppercase tracking-widest">
                ESC
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-3">
               {query.length < 2 ? (
                 <div className="space-y-1">
                    <p className="px-4 py-2 text-[8px] font-black text-text-secondary uppercase tracking-[0.3em]">Quick Protocols</p>
                    {commands.map((command) => (
                      <button
                        key={command.id}
                        onClick={() => handleAction(command)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-surface-variant group transition-all text-left"
                      >
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:text-primary transition-all">
                              <span className="material-symbols-outlined text-xl">{command.icon}</span>
                           </div>
                           <p className="text-xs font-black text-text-primary uppercase tracking-widest">{command.title}</p>
                        </div>
                        <div className="w-6 h-6 rounded-lg bg-surface border border-border flex items-center justify-center text-[10px] font-black text-text-secondary uppercase">
                           {command.shortcut}
                        </div>
                      </button>
                    ))}
                 </div>
               ) : (
                 <div className="space-y-1">
                    <p className="px-4 py-2 text-[8px] font-black text-text-secondary uppercase tracking-[0.3em]">
                      {isSearching ? "Searching Global Ledger..." : `Results for "${query}"`}
                    </p>
                    
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => {
                            router.push(result.url);
                            setIsOpen(false);
                            setQuery("");
                          }}
                          className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-surface-variant group transition-all text-left"
                        >
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-surface-variant overflow-hidden flex items-center justify-center border border-border group-hover:border-primary/30 transition-all">
                                {result.image ? (
                                  <img src={result.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="material-symbols-outlined text-xl">
                                    {result.type === 'repo' ? 'folder' : 'person'}
                                  </span>
                                )}
                             </div>
                             <div>
                                <p className="text-xs font-black text-text-primary uppercase tracking-widest">{result.title}</p>
                                <p className="text-[10px] text-text-secondary font-medium italic mt-1">{result.type === 'user' ? 'Operative Identity' : 'Repository Asset'}</p>
                             </div>
                          </div>
                          <span className="material-symbols-outlined text-text-secondary opacity-0 group-hover:opacity-100 transition-all">north_west</span>
                        </button>
                      ))
                    ) : !isSearching && (
                      <div className="p-12 text-center space-y-4">
                        <span className="material-symbols-outlined text-4xl text-text-secondary opacity-20">search_off</span>
                        <p className="text-xs font-black text-text-secondary uppercase tracking-widest opacity-40">No intelligence matches found</p>
                      </div>
                    )}
                 </div>
               )}
            </div>

            <div className="p-4 bg-surface-variant/50 border-t border-border flex justify-between items-center px-8">
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-md bg-surface border border-border flex items-center justify-center text-[8px] font-black">↵</div>
                     <span className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Select</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-5 h-5 rounded-md bg-surface border border-border flex items-center justify-center text-[8px] font-black">↑↓</div>
                     <span className="text-[8px] font-black text-text-secondary uppercase tracking-widest">Navigate</span>
                  </div>
               </div>
               <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">DevProof Intelligence Layer V2.4</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
