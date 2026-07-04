"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Calendar, X, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface Realisation {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  imageUrl: string;
  description: string;
  challenge?: string;
  approach?: string;
  results?: string;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Étude": { bg: "bg-blue-500", text: "text-white", border: "border-blue-400" },
  "Formation": { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-400" },
  "Coaching": { bg: "bg-violet-500", text: "text-white", border: "border-violet-400" },
  "Diagnostic": { bg: "bg-amber-500", text: "text-white", border: "border-amber-400" },
  "Projet": { bg: "bg-rose-500", text: "text-white", border: "border-rose-400" },
};

const getCategoryStyle = (category: string) => {
  const match = Object.entries(categoryColors).find(([key]) =>
    category.toLowerCase().includes(key.toLowerCase())
  );
  return match?.[1] || { bg: "bg-primary", text: "text-white", border: "border-primary/80" };
};

export default function PortfolioListClient({ projects }: { projects: Realisation[] }) {
  const [selectedProject, setSelectedProject] = useState<Realisation | null>(null);
  const [activeFilter, setActiveFilter] = useState("Tous");

  const categories = ["Tous", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    activeFilter === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── FILTER TABS ── */}
      {projects.length > 0 && categories.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      )}

      {/* ── EMPTY STATE ── */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 md:py-32 bg-card rounded-[3rem] border border-border shadow-sm max-w-3xl mx-auto"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
            <ExternalLink className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-3xl font-poppins font-bold text-foreground mb-4">
            Bientôt disponible
          </h3>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10 font-inter">
            Nos équipes travaillent actuellement sur le terrain. Nos études de cas détaillées seront publiées ici prochainement.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all glow-primary-hover shadow-xl"
          >
            Contactez-nous pour en savoir plus <ArrowRight size={18} />
          </Link>
        </motion.div>
      )}

      {/* ── PROJECTS MASONRY/GRID ── */}
      {filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, i) => {
              const catStyle = getCategoryStyle(project.category);
              // Make the first item larger if it's the "Tous" view
              const isFeatured = i === 0 && activeFilter === "Tous" && filteredProjects.length > 2;
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`group cursor-pointer ${isFeatured ? 'lg:col-span-2' : ''}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="bg-card rounded-[2.5rem] p-4 border border-border/60 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 h-full flex flex-col relative group-hover:-translate-y-2">
                    
                    {/* Image Container */}
                    <div className={`relative w-full rounded-[2rem] overflow-hidden bg-muted mb-6 ${isFeatured ? 'h-80 lg:h-[28rem]' : 'h-72'}`}>
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes={isFeatured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <ExternalLink className="w-16 h-16 text-primary/20" />
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                      {/* Category Badge Floating */}
                      <div className="absolute top-6 left-6 z-10">
                        <span
                          className={`text-xs font-bold px-4 py-2 rounded-xl backdrop-blur-md shadow-lg ${catStyle.bg} ${catStyle.text} border ${catStyle.border} bg-opacity-90`}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Hover Icon */}
                      <div className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-4 pb-4 flex flex-col flex-grow">
                      <div className="flex items-center gap-5 text-sm text-muted-foreground font-medium mb-4">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <MapPin size={14} className="text-accent" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                          <Calendar size={14} className="text-primary" />
                          {project.date}
                        </span>
                      </div>

                      <h3 className={`font-poppins font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight ${isFeatured ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
                        {project.title}
                      </h3>

                      <p className={`text-muted-foreground leading-relaxed font-inter flex-grow mb-6 ${isFeatured ? 'text-lg lg:max-w-3xl line-clamp-2' : 'text-base line-clamp-3'}`}>
                        {project.description}
                      </p>

                      <div className="flex items-center text-primary text-sm font-bold gap-2 pt-6 border-t border-slate-100 mt-auto">
                        Découvrir le projet
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-2 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ── PROJECT DETAIL MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card rounded-[2.5rem] border border-border shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - Floating */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 text-slate-900 hover:bg-white hover:scale-110 flex items-center justify-center transition-all z-20 shadow-lg"
              >
                <X size={18} />
              </button>

              {/* Modal Header Image */}
              {selectedProject.imageUrl && (
                <div className="relative h-64 md:h-80 shrink-0">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover rounded-t-[2.5rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-t-[2.5rem]" />
                  <div className="absolute bottom-6 left-8 right-8">
                    <span className={`inline-block mb-3 text-xs font-bold px-3 py-1.5 rounded-lg ${getCategoryStyle(selectedProject.category).bg} ${getCategoryStyle(selectedProject.category).text}`}>
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-poppins font-bold text-white leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Modal Body */}
              <div className="p-8 md:p-10 flex-grow">
                {!selectedProject.imageUrl && (
                  <div className="mb-6">
                    <span className={`inline-block mb-3 text-xs font-bold px-3 py-1.5 rounded-lg ${getCategoryStyle(selectedProject.category).bg} ${getCategoryStyle(selectedProject.category).text}`}>
                      {selectedProject.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground leading-tight">
                      {selectedProject.title}
                    </h2>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 font-medium mb-8 pb-8 border-b border-slate-100">
                  <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                    <MapPin size={16} className="text-accent" />
                    {selectedProject.location}
                  </span>
                  <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl">
                    <Calendar size={16} className="text-primary" />
                    {selectedProject.date}
                  </span>
                </div>

                <div className="space-y-8 text-slate-600 leading-relaxed font-inter text-base">
                  <div>
                    <h4 className="text-slate-900 font-bold font-poppins text-lg mb-3 flex items-center gap-3">
                      <span className="w-1.5 h-6 bg-primary rounded-full inline-block" />
                      Le Projet
                    </h4>
                    <p className="pl-4">{selectedProject.description}</p>
                  </div>

                  {selectedProject.challenge && (
                    <div>
                      <h4 className="text-slate-900 font-bold font-poppins text-lg mb-3 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                        Le Défi
                      </h4>
                      <p className="pl-4">{selectedProject.challenge}</p>
                    </div>
                  )}

                  {selectedProject.approach && (
                    <div>
                      <h4 className="text-slate-900 font-bold font-poppins text-lg mb-3 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-secondary rounded-full inline-block" />
                        Notre Approche
                      </h4>
                      <p className="pl-4">{selectedProject.approach}</p>
                    </div>
                  )}

                  {selectedProject.results && (
                    <div>
                      <h4 className="text-slate-900 font-bold font-poppins text-lg mb-3 flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block" />
                        Résultats & Impact
                      </h4>
                      <div className="pl-4 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                        <p className="whitespace-pre-line text-slate-700">{selectedProject.results}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-slate-500 font-medium">
                    Intéressé par une intervention similaire ?
                  </p>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                  >
                    Nous contacter <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
