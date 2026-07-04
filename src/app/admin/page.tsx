"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Briefcase, TrendingUp } from "lucide-react";

export default function AdminDashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    realisationsCount: 0,
    articlesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const realisationsSnap = await getDocs(collection(db, "realisations"));
        const articlesSnap = await getDocs(collection(db, "articles"));
        setStats({
          realisationsCount: realisationsSnap.size,
          articlesCount: articlesSnap.size,
        });
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-poppins font-bold text-white mb-2">
          Bienvenue cher co-fondateur 👋
        </h1>
        <p className="text-slate-400 text-sm">
          Gérez votre portfolio et vos articles de blog depuis cet espace centralisé.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Briefcase size={24} />
            </div>
            <h2 className="text-slate-300 font-medium text-lg">Réalisations</h2>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-5xl font-bold font-poppins text-emerald-400">{stats.realisationsCount}</p>
            <Link href="/admin/realisations" className="text-emerald-500 hover:text-emerald-400 text-sm font-medium flex items-center gap-1 transition-colors">
              Gérer <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-sky-500/20 to-sky-600/5 border border-sky-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <h2 className="text-slate-300 font-medium text-lg">Articles du Blog</h2>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-5xl font-bold font-poppins text-sky-400">{stats.articlesCount}</p>
            <Link href="/admin/articles" className="text-sky-500 hover:text-sky-400 text-sm font-medium flex items-center gap-1 transition-colors">
              Gérer <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/5 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-slate-300 font-medium text-lg">Statut Global</h2>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-slate-400 text-sm">Contenu total : <strong className="text-white">{stats.realisationsCount + stats.articlesCount}</strong></p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="text-xs text-indigo-400 mt-1">Plateforme prête pour Google Analytics</p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-poppins font-semibold text-white mb-6">Actions Rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/admin/realisations/new" className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-colors flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <div>
              <h4 className="text-white font-medium text-lg mb-1">Ajouter une Réalisation</h4>
              <p className="text-slate-500 text-sm">Publiez un nouveau projet dans le portfolio.</p>
            </div>
          </Link>

          <Link href="/admin/articles/new" className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <div>
              <h4 className="text-white font-medium text-lg mb-1">Rédiger un Article</h4>
              <p className="text-slate-500 text-sm">Partagez vos actualités sur le blog.</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
