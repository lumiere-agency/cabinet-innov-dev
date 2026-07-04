"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TeamMember } from "@/components/admin/TeamForm";

interface TeamListClientProps {
  team: TeamMember[];
}

export default function TeamListClient({ team }: TeamListClientProps) {
  if (team.length === 0) {
    return (
      <div className="text-center py-10 md:py-20 bg-card rounded-[2rem] border border-border">
        <h3 className="text-2xl font-semibold mb-2">Aucun membre pour le moment</h3>
        <p className="text-muted-foreground">Revenez bientôt !</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto text-center mb-24 mt-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6"
        >
          <span className="text-sm font-semibold tracking-wider uppercase font-poppins">Notre Équipe</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-foreground leading-tight mb-6"
        >
          Les esprits derrière <span className="text-secondary">INNOV&apos;DEV</span>.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto"
        >
          Des co-fondateurs jeunes, dynamiques et hautement qualifiés, unis par la passion du développement territorial au Sénégal.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-6 max-w-md mx-auto"
        >
          {[
            { value: team.length || "5", label: "Co-fondateurs" },
            { value: "100%", label: "Engagement Local" },
          ].map((stat, i) => (
            <div key={i} className="flex-1 min-w-[140px] text-center p-6 rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 shadow-lg shadow-black/5">
              <p className="text-4xl font-poppins font-bold text-secondary mb-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto mb-20">
        {team.map((member, i) => {
          const initials = member.firstName ? [member.firstName.split(" ")[0][0], member.lastName[0]].join("") : "ID";
          return (
            <motion.div
              key={member.slug || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)]" // Responsive width for 3-col layout
            >
              <Link href={`/team/${member.slug}`} className="block h-full group">
                <div className="bg-card rounded-[2rem] overflow-hidden border border-border shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative">
                  
                  {/* Glowing effect behind card on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Avatar Header */}
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={`${member.firstName} ${member.lastName}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        className={`transform transition-transform duration-700 group-hover:scale-[1.05] ${member.slug === 'papa-doudou-diop' ? 'object-contain p-2 bg-slate-50' : 'object-cover object-top'}`}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex flex-col items-center justify-center group-hover:scale-[1.05] transition-transform duration-700`}>
                        <span className="text-7xl font-poppins font-black text-white/20 select-none">
                          {initials}
                        </span>
                        <span className="mt-4 text-xs font-bold text-white/40 uppercase tracking-widest bg-black/10 px-4 py-1.5 rounded-full">
                          Photo à venir
                        </span>
                      </div>
                    )}
                    
                    {/* Gradient overlay to make text readable if any */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Specialty badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md border border-white/20"
                        style={{ backgroundColor: `${member.accentColor}e6`, color: "#fff" }}
                      >
                        {member.tagline?.split(' ')[0] || "Expertise"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 bg-card">
                    <h3 className="text-2xl font-poppins font-bold text-foreground group-hover:text-secondary transition-colors duration-300 mb-1 leading-tight">
                      {member.firstName}{" "}
                      <span className="font-medium text-muted-foreground">{member.lastName}</span>
                    </h3>
                    
                    <p className="text-sm font-bold mb-4" style={{ color: member.accentColor }}>{member.role}</p>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed font-inter mb-6 flex-grow line-clamp-3">
                      {member.bio}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-border">
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                        <MapPin size={14} className="text-accent" /> {member.location}
                      </span>
                      <div className="flex items-center gap-3">
                        {member.email && (
                          <object>
                            <a
                              href={`mailto:${member.email}`}
                              title="Envoyer un e-mail"
                              onClick={(e) => e.stopPropagation()} // Prevent link click
                              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                            >
                              <Mail size={16} />
                            </a>
                          </object>
                        )}
                        {member.linkedin && (
                          <object>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="LinkedIn"
                              onClick={(e) => e.stopPropagation()}
                              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0077b5] hover:text-white transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                          </object>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── CTA Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 text-center max-w-4xl mx-auto"
      >
        <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
              Vous avez un projet de développement ?
            </h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto font-inter text-lg">
              Notre équipe est prête à vous accompagner. Discutons ensemble de vos objectifs et de la stratégie à adopter.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 shadow-xl hover:shadow-accent/30 hover:-translate-y-1"
            >
              Prendre contact <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
