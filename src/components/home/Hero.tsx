"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Users, Target, Map } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/hero-bg.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F4C81]/90 to-[#1E7D4D]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-white text-center md:text-left flex flex-col items-center md:items-start pt-10 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase">Cabinet d'Expertise Territorial</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold leading-tight mb-6">
            Des solutions stratégiques pour un <span className="text-accent">développement durable</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 font-inter leading-relaxed">
            Nous accompagnons les ONG, institutions publiques et entreprises dans leurs projets de développement territorial au Sénégal grâce à notre expertise terrain et nos outils innovants.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Button asChild variant="accent" size="lg" className="shadow-lg">
              <Link href="/contact">
                Demander un accompagnement
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="border-white/25">
              <Link href="/services">
                Découvrir nos services <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Section / Features preview below Hero text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 w-full"
        >
          {[
            { icon: <Map className="text-[#FF6B00] h-6 w-6" />, val: "14+", label: "Régions couvertes" },
            { icon: <Users className="text-[#06B6D4] h-6 w-6" />, val: "5+", label: "Domaines d'expertise" },
            { icon: <Target className="text-[#1E7D4D] h-6 w-6" />, val: "3+", label: "Projets en cours" },
            { icon: <BarChart3 className="text-[#EAB308] h-6 w-6" />, val: "100%", label: "Orienté Données" },
          ].map((stat, i) => (
            <div key={i} className="group flex flex-col items-center md:items-start bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-black/10 cursor-pointer">
              <div className="mb-4 bg-white/10 p-3 rounded-xl inline-flex group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">{stat.icon}</div>
              <h3 className="text-3xl font-bold font-poppins text-white mb-1">{stat.val}</h3>
              <p className="text-sm text-white/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Futuristic Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
