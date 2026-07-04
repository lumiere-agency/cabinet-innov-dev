"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="py-12 md:py-24 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase">Qui Sommes-Nous</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground leading-tight mb-6">
              L'excellence au service du <span className="text-primary">développement</span>.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              INNOV'DEV est un cabinet d'expertise spécialisé dans l'accompagnement stratégique, le coaching territorial et la recherche de solutions innovantes pour répondre aux défis du développement au Sénégal.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Une équipe pluridisciplinaire d'experts de haut niveau",
                "Des méthodologies basées sur des données probantes",
                "Un accompagnement de proximité avec les acteurs locaux"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 bg-primary/20 p-1 rounded-full text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-muted-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="shadow-xl shadow-primary/20">
              <Link href="/about">
                En savoir plus sur nous <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Image/Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[3rem] transform rotate-3 blur-2xl" />
            
            <div className="relative bg-white dark:bg-card border border-border p-3 rounded-[2.5rem] shadow-2xl">
              <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden bg-muted">
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800" />
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about-preview-2.png')" }} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-500">
                    <Target className="w-10 h-10 text-accent mb-4" />
                    <h3 className="text-xl font-bold font-poppins mb-2">Notre Vision</h3>
                    <p className="text-white/80 text-sm leading-relaxed">Devenir la référence incontournable du consulting en développement territorial au Sénégal d'ici 2030.</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge (Now properly integrated) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-8 -left-4 md:-left-8 bg-white dark:bg-card p-5 rounded-2xl shadow-xl border border-border flex items-center gap-4 z-30"
              >
                <div className="text-4xl font-bold font-poppins text-primary">1</div>
                <div className="text-sm font-semibold text-muted-foreground leading-tight">Année<br/>d'expérience</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
