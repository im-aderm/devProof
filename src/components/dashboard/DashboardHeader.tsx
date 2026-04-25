"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHeader({ profile, name }: { profile: any; name: string }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/user/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length === 0) return;

    try {
      await fetch("/api/user/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationIds: unreadIds }),
      });
      // Optimistically update UI
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark notifications as read", error);
    }
  };

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
        <div className="relative flex items-center gap-4 border-r border-outline-variant/20 pr-6">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors relative"
          >
            notifications
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute top-16 right-0 mt-2 w-80 max-h-96 overflow-y-auto glass-card rounded-xl border border-outline-variant/30 p-4 shadow-2xl">
              {notifications.length === 0 ? (
                <p className="text-sm text-on-surface-variant italic">No notifications yet.</p>
              ) : (
                <>
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3 rounded-lg mb-2 ${n.isRead ? 'bg-surface-container-lowest' : 'bg-primary/5 border border-primary/20'}`}>
                      <p className={`text-sm font-bold ${n.isRead ? 'text-on-surface-variant' : 'text-primary'}`}>{n.title}</p>
                      <p className={`text-xs ${n.isRead ? 'text-on-surface-variant/80' : 'text-on-surface'}`}>{n.message}</p>
                      <p className="text-[10px] text-on-surface-variant/60 mt-1">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  ))}
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAsRead}
                      className="text-xs font-bold text-primary uppercase tracking-widest mt-4 w-full p-2 hover:bg-white/5 rounded"
                    >
                      Mark all as read
                    </button>
                  )}
                </>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 border-r border-outline-variant/20 pr-6">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-on-surface">{name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{profile?.location || "Remote"}</p>
            </div>
            <img className="w-10 h-10 rounded-full border border-primary/20" src={profile?.image || `https://ui-avatars.com/api/?name=${name}`} alt={name} />
          </div>
          <button onClick={() => signOut()} className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors">logout</button>
        </div>
      </div>
    </header>
  );
}