"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background with dynamic gradients */}
      <div className="absolute inset-0 bg-[#0A1A2F]" />
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-8 border border-accent/20">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase">Prêt à démarrer ?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white leading-tight mb-6">
            Concrétisons ensemble vos projets de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">développement</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Contactez-nous dès aujourd'hui pour échanger sur vos besoins. Notre équipe est prête à concevoir des solutions sur mesure pour votre territoire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 group">
              <Link href="/contact">
                Nous contacter <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
              <Link href="/portfolio">
                Voir nos réalisations <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
