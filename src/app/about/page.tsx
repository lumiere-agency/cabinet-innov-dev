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

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-8 rounded-3xl shadow-lg shadow-black/5"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-poppins font-bold mb-4">Notre Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Accompagner les acteurs de développement (ONG, État, collectivités, entreprises) à travers des diagnostics précis, des stratégies éprouvées et un renforcement de capacités continu pour garantir des impacts tangibles sur le terrain.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0F4C81] text-white p-8 rounded-3xl shadow-lg shadow-[#0F4C81]/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 relative z-10">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-poppins font-bold mb-4 relative z-10">Notre Vision</h2>
            <p className="text-white/80 leading-relaxed relative z-10">
              Devenir la référence incontournable du consulting en développement territorial au Sénégal d'ici 2030, reconnue pour notre rigueur intellectuelle, notre innovation méthodologique et notre intégrité.
            </p>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-poppins font-bold mb-4">Nos Valeurs Fondamentales</h2>
          <p className="text-muted-foreground">Ce qui guide nos actions au quotidien sur le terrain et dans nos bureaux.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Shield />, title: "Transparence & Éthique", desc: "Nous opérons avec la plus grande intégrité dans toutes nos missions." },
            { icon: <Cpu />, title: "Innovation", desc: "Intégration d'outils numériques pour une efficacité maximale." },
            { icon: <CheckCircle2 />, title: "Excellence Qualité", desc: "Des livrables rigoureux, vérifiés et exploitables immédiatement." }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:bg-card transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent">
                {val.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{val.title}</h3>
              <p className="text-sm text-muted-foreground">{val.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
