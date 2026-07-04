"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, Shield, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col w-full pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase">À Propos de Nous</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground leading-tight mb-6">
              L'excellence au service du <span className="text-primary">développement territorial</span>.
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed font-medium mb-6">
              Le Cabinet INNOV'DEV est né d'une volonté forte : apporter des solutions stratégiques, innovantes et adaptées aux réalités sénégalaises pour accélérer le développement local et institutionnel.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[350px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about-preview-2.png')" }} />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
          </motion.div>
        </div>

        {/* Premium Bento Grid: Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 auto-rows-fr">
          
          {/* Mission - Spans 2 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 bg-card/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:border-primary/40 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-poppins font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">Notre Mission</h2>
            <p className="text-muted-foreground leading-relaxed relative z-10 text-lg">
              Accompagner les acteurs de développement (ONG, État, collectivités, entreprises) à travers des diagnostics précis, des stratégies éprouvées et un renforcement de capacités continu pour garantir des impacts tangibles sur le terrain.
            </p>
          </motion.div>

          {/* Vision - Spans 1 column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 bg-gradient-to-br from-[#0F4C81] to-[#0A1A2F] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold mb-4 relative z-10">Notre Vision</h2>
            <p className="text-white/80 leading-relaxed relative z-10">
              Devenir la référence incontournable du consulting en développement territorial au Sénégal d'ici 2030, reconnue pour notre rigueur et innovation.
            </p>
          </motion.div>

          {/* 3 Values - Span 1 column each */}
          {[
            { icon: <Shield />, title: "Transparence & Éthique", desc: "Nous opérons avec la plus grande intégrité dans toutes nos missions." },
            { icon: <Cpu />, title: "Innovation", desc: "Intégration d'outils numériques pour une efficacité maximale." },
            { icon: <CheckCircle2 />, title: "Excellence Qualité", desc: "Des livrables rigoureux, vérifiés et exploitables immédiatement." }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="md:col-span-1 bg-card/40 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-500 shadow-sm group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-300 relative z-10">
                {val.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 relative z-10 group-hover:text-accent transition-colors">{val.title}</h3>
              <p className="text-sm text-muted-foreground relative z-10">{val.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
