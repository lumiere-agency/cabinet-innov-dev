"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, BookOpen, Briefcase, Network, Compass, Monitor, Lightbulb, BarChart } from "lucide-react";
import Link from "next/link";

const allServices = [
  {
    title: "Études de terrain et collecte de données",
    slug: "etudes",
    description: "Conduite d'enquêtes quantitatives et qualitatives exhaustives. Nous déployons des équipes sur le terrain équipées de solutions numériques pour garantir la fiabilité des données collectées.",
    icon: <Map className="w-10 h-10 text-primary" />,
    color: "bg-primary/10 border-primary/20",
  },
  {
    title: "Coaching territorial continu",
    slug: "coaching",
    description: "Accompagnement personnalisé des collectivités locales et des élus dans la mise en œuvre de leurs politiques publiques et le suivi de leurs indicateurs de performance.",
    icon: <Compass className="w-10 h-10 text-accent" />,
    color: "bg-accent/10 border-accent/20",
  },
  {
    title: "Consultance et formation",
    slug: "autre",
    description: "Renforcement de capacités des ressources humaines des ONG et institutions. Formations sur mesure allant de la gestion de projet au leadership stratégique.",
    icon: <BookOpen className="w-10 h-10 text-secondary" />,
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    title: "Montage et pilotage de projets",
    slug: "projet",
    description: "Nous structurons vos idées en projets bancables, recherchons les financements et assurons la coordination technique jusqu'à l'évaluation finale.",
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    color: "bg-primary/10 border-primary/20",
  },
  {
    title: "Dynamisme institutionnel et organisationnel",
    slug: "coaching",
    description: "Audits organisationnels et propositions de restructuration pour rendre les institutions plus agiles, transparentes et performantes.",
    icon: <Network className="w-10 h-10 text-accent" />,
    color: "bg-accent/10 border-accent/20",
  },
  {
    title: "Accompagnement technique aux entreprises",
    slug: "projet",
    description: "Aide à la stratégie de développement, études de marché, et plans d'affaires pour les PME et grandes entreprises voulant s'implanter ou croître localement.",
    icon: <BarChart className="w-10 h-10 text-secondary" />,
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    title: "Cartographie et diagnostics territoriaux",
    slug: "etudes",
    description: "Réalisation de Systèmes d'Information Géographique (SIG) et de monographies pour identifier les atouts et vulnérabilités d'une zone.",
    icon: <Monitor className="w-10 h-10 text-primary" />,
    color: "bg-primary/10 border-primary/20",
  },
  {
    title: "Entrepreneuriat et recherche intellectuelle",
    slug: "autre",
    description: "Soutien aux initiatives entrepreneuriales innovantes et production d'études prospectives sur les enjeux de développement sénégalais.",
    icon: <Lightbulb className="w-10 h-10 text-accent" />,
    color: "bg-accent/10 border-accent/20",
  },
];

export default function ServicesPage() {
  return (
    <main className="flex-1 flex flex-col w-full pt-28 pb-20 bg-background relative">
      <div className="absolute top-0 right-0 -mt-40 -mr-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent mb-4 mx-auto">
            <span className="text-sm font-semibold tracking-wider uppercase">Nos Pôles d'Expertise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold leading-tight mb-6">
            Un catalogue complet de <span className="text-primary">services premium</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            De la phase de diagnostic sur le terrain jusqu'au déploiement de solutions organisationnelles, INNOV'DEV couvre toute la chaîne de valeur du développement.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {allServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="h-full"
            >
              <Card className="h-full bg-card/50 backdrop-blur-md border border-border/60 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 group flex flex-col rounded-3xl">
                <CardHeader className="p-6 pb-4">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-poppins font-bold group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-1 flex flex-col">
                  <CardDescription className="text-base text-muted-foreground flex-1 mb-6 leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full justify-between hover:bg-secondary hover:text-white hover:border-secondary group/btn transition-all duration-300">
                    <Link href={`/contact?subject=${service.slug}`}>
                      Demander ce service <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
