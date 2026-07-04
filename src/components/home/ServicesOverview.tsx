"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Map, BookOpen, Briefcase, Network, Compass, Monitor } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Études de terrain & Données",
    description: "Collecte, analyse et cartographie de données territoriales pour éclairer la prise de décision stratégique.",
    icon: <Map className="w-10 h-10 text-primary" />,
    color: "bg-primary/10",
  },
  {
    title: "Coaching Territorial",
    description: "Accompagnement continu des acteurs locaux pour renforcer leurs capacités opérationnelles et managériales.",
    icon: <Compass className="w-10 h-10 text-accent" />,
    color: "bg-accent/10",
  },
  {
    title: "Consultance & Formation",
    description: "Programmes sur-mesure pour développer l'expertise de vos équipes dans la gestion de projets complexes.",
    icon: <BookOpen className="w-10 h-10 text-secondary" />,
    color: "bg-secondary/10",
  },
  {
    title: "Montage de Projets",
    description: "De l'idéation à la recherche de financements, nous structurons vos projets de développement.",
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    color: "bg-primary/10",
  },
  {
    title: "Dynamisme Institutionnel",
    description: "Amélioration de la gouvernance et de l'organisation des institutions publiques et privées.",
    icon: <Network className="w-10 h-10 text-accent" />,
    color: "bg-accent/10",
  },
  {
    title: "Outils Numériques",
    description: "Déploiement de solutions digitales (tableaux de bord, SIG) pour le suivi de vos interventions.",
    icon: <Monitor className="w-10 h-10 text-secondary" />,
    color: "bg-secondary/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ServicesOverview() {
  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary mb-4">
              <span className="text-sm font-semibold tracking-wider uppercase">Nos Domaines d'Expertise</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-poppins font-bold text-foreground leading-tight">
              Des solutions <span className="text-primary">adaptées</span> à vos défis.
            </h2>
          </div>
          <Link href="/services" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-[#1E7D4D] group transition-colors mt-6 md:mt-0">
            Voir tous nos services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Link href="/services" className="block h-full">
                <Card className="h-full border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 bg-card/60 backdrop-blur-md group cursor-pointer overflow-hidden relative rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <CardHeader className="p-8 pb-4">
                    <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-poppins font-bold group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <CardDescription className="text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                      Découvrir ce service <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 md:hidden flex justify-center">
          <Link href="/services" className="flex items-center gap-2 text-primary font-bold hover:text-[#1E7D4D] group transition-colors">
            Voir tous nos services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
