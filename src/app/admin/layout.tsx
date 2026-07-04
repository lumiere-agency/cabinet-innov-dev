"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, router, isLoginPage]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium">Vérification de l'accès...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Top Bar */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg h-8 w-8 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
          </div>
          <span className="font-poppins font-bold text-white text-sm">INNOV'DEV Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Backdrop for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg h-9 w-9 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-poppins font-bold text-white text-sm leading-none">INNOV'DEV</p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
          {[
            { name: "Vue d'ensemble", path: "/admin", exact: true, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /></svg> },
            { name: "Réalisations", path: "/admin/realisations", exact: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
            { name: "Articles (Blog)", path: "/admin/articles", exact: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg> },
            { name: "CV & Équipe", path: "/admin/team", exact: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
          ].map((link) => {
            const isActive = link.exact ? pathname === link.path : pathname.startsWith(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                  isActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.icon}
                {link.name}
              </a>
            );
          })}
          <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium mt-4 border-t border-slate-800 pt-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Voir le site public
          </a>
        </nav>
        <div className="p-4 border-t border-slate-800 shrink-0">
          <p className="text-xs text-slate-500 truncate mb-3">{user.email}</p>
          <button
            onClick={async () => {
              const { signOut } = await import("firebase/auth");
              const { auth } = await import("@/lib/firebase");
              await signOut(auth);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-900/30 hover:text-red-400 text-slate-300 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
