"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  status: "draft" | "published";
  createdAt: Date;
}

export default function AdminArticlesPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        status: doc.data().status || "published", // Fallback to published for older articles
      })) as Article[];
      setArticles(data);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      showToast("error", "Erreur de chargement", "Impossible de récupérer les articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (user) fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer l'article "${title}" ? Cette action est irréversible.`)) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "articles", id));
      setArticles((prev) => prev.filter((r) => r.id !== id));
      showToast("success", "Article supprimé", `"${title}" a été supprimé avec succès.`);
    } catch (error) {
      console.error("Erreur suppression:", error);
      showToast("error", "Erreur", "La suppression a échoué. Veuillez réessayer.");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string, title: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await updateDoc(doc(db, "articles", id), { status: newStatus });
      setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a));
      showToast("success", "Statut mis à jour", `"${title}" est maintenant ${newStatus === "published" ? "publié" : "en brouillon"}.`);
    } catch (error) {
      console.error("Erreur toggle status:", error);
      showToast("error", "Erreur", "Impossible de mettre à jour le statut.");
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
            Gestion du Blog
          </h1>
          <p className="text-slate-400 text-sm">
            Rédigez, modifiez et gérez vos actualités.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 text-sm shadow-lg shadow-sky-900/30 hover:shadow-sky-800/40 hover:scale-[1.02]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Rédiger un article
        </Link>
      </motion.div>

      {/* Articles List */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-sm"
      >
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <h2 className="font-semibold text-white text-lg">Tous les articles</h2>
          <span className="text-xs text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full font-medium">{articles.length} article{articles.length > 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="w-9 h-9 border-[3px] border-sky-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-500 text-sm">Chargement...</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <div className="w-16 h-16 rounded-full bg-slate-800/60 flex items-center justify-center mb-5">
              <svg className="w-7 h-7 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="font-semibold text-slate-300 mb-1">Aucun article publié</p>
            <p className="text-sm mb-5">Partagez votre première actualité avec le monde.</p>
            <Link
              href="/admin/articles/new"
              className="text-sky-400 hover:text-sky-300 font-medium text-sm flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Rédiger un article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {articles.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-slate-800/30 transition-colors group"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Image */}
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 ring-1 ring-slate-700/50">
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
                    <p className="font-semibold text-white text-sm truncate group-hover:text-sky-300 transition-colors">{r.title}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="text-xs text-slate-500">{r.createdAt.toLocaleDateString('fr-FR')}</span>
                      <span className="inline-block text-[10px] bg-sky-900/30 text-sky-400 border border-sky-800/30 px-2 py-0.5 rounded font-medium uppercase tracking-wider">{r.category}</span>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-medium uppercase tracking-wider ${
                        r.status === "published" 
                          ? "bg-emerald-900/30 text-emerald-400 border border-emerald-800/30" 
                          : "bg-amber-900/30 text-amber-400 border border-amber-800/30"
                      }`}>
                        {r.status === "published" ? "Publié" : "Brouillon"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity w-full sm:w-auto justify-end border-t border-slate-800/40 pt-3 sm:border-t-0 sm:pt-0">
                  <button
                    onClick={() => toggleStatus(r.id, r.status, r.title)}
                    className="text-xs font-medium bg-slate-800 hover:bg-indigo-900/40 hover:text-indigo-400 text-slate-300 px-4 py-2 rounded-xl transition-all border border-slate-700/50 hover:border-indigo-700/50 text-center flex-1 sm:flex-initial"
                  >
                    {r.status === "published" ? "Passer en brouillon" : "Publier"}
                  </button>
                  <Link
                    href={`/admin/articles/${r.id}/edit`}
                    className="text-xs font-medium bg-slate-800 hover:bg-emerald-900/40 hover:text-emerald-400 text-slate-300 px-4 py-2 rounded-xl transition-all border border-slate-700/50 hover:border-emerald-700/50 text-center flex-1 sm:flex-initial"
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
