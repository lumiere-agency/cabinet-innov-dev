"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: string;
  readTime: string;
  createdAt: string; // Serialized date
}

export default function BlogListClient({ articles }: { articles: Article[] }) {
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const regularArticles = articles.length > 1 ? articles.slice(1) : [];

  if (articles.length === 0) {
    return (
      <div className="text-center py-10 md:py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
        <h3 className="text-2xl font-semibold text-white mb-2">Aucun article publié</h3>
        <p className="text-slate-400">Revenez bientôt pour découvrir nos actualités.</p>
      </div>
    );
  }

  return (
    <>
      {featuredArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 group"
        >
          <Link href={`/blog/${featuredArticle.id}`} className="block">
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col lg:flex-row h-auto lg:h-[450px]">
              <div className="w-full lg:w-3/5 h-64 lg:h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-transparent z-10 hidden lg:block" />
                <img
                  src={featuredArticle.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative z-20">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center text-slate-400 text-xs gap-1.5">
                    <Clock size={14} /> {featuredArticle.readTime} min
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-poppins font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
                <p className="text-slate-400 mb-8 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-500">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{featuredArticle.author}</p>
                      <div className="flex items-center text-xs text-slate-500 gap-1.5">
                        <Calendar size={12} /> {new Date(featuredArticle.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grille d'articles réguliers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link href={`/blog/${article.id}`} className="group block h-full">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-slate-600 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/20">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={article.imageUrl || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-900/80 backdrop-blur text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700/50">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-slate-400 text-xs gap-4 mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime} min</span>
                  </div>
                  <h3 className="text-xl font-poppins font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-emerald-500 text-sm font-semibold gap-2 mt-auto">
                    Lire l'article
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
