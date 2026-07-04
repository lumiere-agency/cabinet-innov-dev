"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { motion } from "framer-motion";

interface Realisation {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
}

export default function AdminPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [realisations, setRealisations] = useState<Realisation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchRealisations = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "realisations"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Realisation[];
      setRealisations(data);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      showToast("error", "Erreur de chargement", "Impossible de récupérer les réalisations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) fetchRealisations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer "${title}" ? Cette action est irréversible.`)) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "realisations", id));
      setRealisations((prev) => prev.filter((r) => r.id !== id));
      showToast("success", "Réalisation supprimée", `"${title}" a été supprimée avec succès.`);
    } catch (error) {
      console.error("Erreur suppression:", error);
      showToast("error", "Erreur", "La suppression a échoué. Veuillez réessayer.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
      >
        <div>
          <h1 className="text-3xl font-poppins font-bold text-white mb-1">
            Bienvenue 👋
          </h1>
          <p className="text-slate-400 text-sm">
            Gérez vos réalisations et votre portfolio depuis cet espace.
          </p>
        </div>
        <Link
          href="/admin/realisations/new"
          className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 text-sm shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40 hover:scale-[1.02]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nouvelle réalisation
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          {
            label: "Total des réalisations",
            value: realisations.length,
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            ),
            color: "from-emerald-500/20 to-emerald-600/5",
            iconBg: "bg-emerald-500/20",
            textColor: "text-emerald-400",
          },
          {
            label: "Catégories actives",
            value: [...new Set(realisations.map((r) => r.category))].length,
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
            ),
            color: "from-sky-500/20 to-sky-600/5",
            iconBg: "bg-sky-500/20",
            textColor: "text-sky-400",
          },
          {
            label: "Dernière mise à jour",
            value: realisations[0]?.createdAt?.toLocaleDateString("fr-FR") || "—",
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            ),
            color: "from-amber-500/20 to-amber-600/5",
            iconBg: "bg-amber-500/20",
            textColor: "text-amber-400",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${stat.color} border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl ${stat.iconBg} ${stat.textColor} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            </div>
            <p className={`text-3xl font-bold font-poppins ${stat.textColor}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Realisations List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm"
      >
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <h2 className="font-semibold text-white text-lg">Mes Réalisations</h2>
          <span className="text-xs text-slate-500 bg-slate-800/80 px-3 py-1 rounded-full">{realisations.length} projet{realisations.length > 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 border-[3px] border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 text-sm">Chargement...</p>
            </div>
          </div>
        ) : realisations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <div className="w-16 h-16 rounded-full bg-slate-800/60 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="font-semibold text-slate-300 mb-1">Aucune réalisation</p>
            <p className="text-sm mb-5">Commencez par ajouter votre premier projet.</p>
            <Link
              href="/admin/realisations/new"
              className="text-emerald-400 hover:text-emerald-300 font-medium text-sm flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Ajouter une réalisation
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {realisations.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-800/30 transition-colors group"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Image */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0 ring-1 ring-slate-700/50">
                    {r.imageUrl ? (
                      <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate group-hover:text-emerald-300 transition-colors">{r.title}</p>
                    <p className="text-slate-500 text-xs mt-1">{r.location} · {r.date}</p>
                    <span className="inline-block mt-2 text-[11px] bg-emerald-900/30 text-emerald-400 border border-emerald-800/30 px-2.5 py-0.5 rounded-full font-medium">{r.category}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity w-full sm:w-auto justify-end border-t border-slate-800/40 pt-3 sm:border-t-0 sm:pt-0">
                  <Link
                    href={`/admin/realisations/${r.id}/edit`}
                    className="text-xs font-medium bg-slate-800 hover:bg-sky-900/40 hover:text-sky-400 text-slate-300 px-4 py-2 rounded-xl transition-all border border-slate-700/50 hover:border-sky-700/50 text-center flex-1 sm:flex-initial"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(r.id, r.title)}
                    disabled={deletingId === r.id}
                    className="text-xs font-medium bg-slate-800 hover:bg-red-900/40 hover:text-red-400 text-slate-300 px-4 py-2 rounded-xl transition-all border border-slate-700/50 hover:border-red-700/50 disabled:opacity-40 text-center flex-1 sm:flex-initial"
                  >
                    {deletingId === r.id ? (
                      <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                      "Supprimer"
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
