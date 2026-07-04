"use client";


import { motion } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Mail, Phone, MapPin, Check,
  Leaf, ChartLine, Users
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TeamMember } from "@/components/admin/TeamForm";

interface MemberDetailClientProps {
  member: TeamMember;
}

export default function MemberDetailClient({ member }: MemberDetailClientProps) {
  const accentColor = member.accentColor || "#1E7D4D";
  const initials = member.firstName ? [member.firstName.split(' ')[0][0], member.lastName[0]].join('') : "ID";

  const getWhatsAppLink = (phone: string) => {
    // Nettoyer le numéro (enlever les espaces, tirets, etc.)
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <main className="bg-slate-50 min-h-screen text-slate-800 font-inter relative overflow-hidden selection:bg-primary/20">
      
      {/* ── BACKGROUND ORBS ── */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F4C81]/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#1E7D4D]/10 rounded-full blur-[100px] -z-10 -translate-x-1/3" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#FF6B00]/5 rounded-full blur-[100px] -z-10" />

      {/* ── NAVBAR/BACK LINK ── */}
      <nav className="absolute top-28 left-4 md:left-12 z-20">
        <Link href="/team" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-wider transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour à l'équipe
        </Link>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="pt-40 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content */}
          <div className="flex-1 space-y-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold text-slate-700 mb-6">
                👋 L'intelligence collective comme moteur
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-black leading-[1.1] text-slate-900 mb-4">
                Je suis <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, #1E7D4D, ${accentColor})` }}>
                  {member.firstName} {member.lastName}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-600 font-poppins flex items-center gap-3">
                {member.role}
                <span className="w-2 h-8 bg-secondary animate-pulse" />
              </h2>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
              {member.bio}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap gap-4 pt-4">
              <a href="#about" className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-secondary/20 hover:-translate-y-1">
                Découvrir mon profil <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 bg-white text-slate-800 font-bold px-8 py-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
                Me contacter
              </a>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex-1 relative w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-white/50 backdrop-blur-xl border border-white shadow-2xl p-4">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-100 relative">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.firstName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className={`transform transition-transform duration-500 ${member.slug === 'papa-doudou-diop' ? 'object-contain p-2 bg-slate-50' : 'object-cover object-top'}`}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex items-center justify-center`}>
                    <span className="text-8xl font-poppins font-black text-white/20 select-none">{initials}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Floating Badges */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-12 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 text-[#1E7D4D]">
                <Leaf size={28} />
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-32 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 text-[#0F4C81]">
                <ChartLine size={28} />
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="absolute top-1/2 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 text-[#FF6B00]">
                <Users size={24} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT BENTO GRID ── */}
      <section id="about" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-secondary font-bold uppercase tracking-widest text-sm block mb-3">Découvrir</span>
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-slate-900">Mon Profil & Parcours</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main About Box */}
          <div className="md:col-span-2 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
            <h3 className="text-2xl font-poppins font-bold text-slate-900 mb-6">{member.tagline}</h3>
            <p className="text-slate-600 leading-relaxed text-lg font-medium mb-8 whitespace-pre-line">
              {member.bentoText}
            </p>
            <a href="#experience" className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all">
              Voir mes expériences <ArrowRight size={18} />
            </a>
          </div>

          {/* Stats Boxes */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center items-center text-center hover:shadow-xl transition-all duration-300 flex-1">
              <span className="text-5xl font-black mb-3" style={{ color: accentColor }}>
                {member.education?.[0] ? 'BAC+5' : 'Expert'}
              </span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {member.education?.[0]?.degree.split(' ')[0] || 'Domaine'}
              </span>
            </div>
            
            {/* New Engagement/Alternative Stat Box */}
            <div className="bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center items-center text-center hover:shadow-xl transition-all duration-300 flex-1">
              <span className="text-5xl font-black mb-3 text-slate-900">
                100%
              </span>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Engagement Local
              </span>
            </div>
          </div>

          {/* Tools Box */}
          {member.tools && member.tools.length > 0 && (
            <div className="md:col-span-1 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-poppins font-bold text-slate-900 mb-6">Logiciels & Outils</h3>
              <div className="flex flex-wrap gap-3">
                {member.tools.map((tool: string, i: number) => (
                  <span key={`tool-${i}`} className="bg-primary/5 text-primary border border-primary/10 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Skills Box */}
          {member.skills && member.skills.length > 0 && (
            <div className="md:col-span-2 bg-white/60 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-poppins font-bold text-slate-900 mb-6">Domaines de Compétences</h3>
              <div className="flex flex-wrap gap-3">
                {member.skills.map((skill: { name: string; level: string }, i: number) => (
                  <span key={`skill-${i}`} className="bg-white text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2">
                    <Check size={14} className="text-secondary" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ── */}
      {member.experience && member.experience.length > 0 && (
        <section id="experience" className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm block mb-3">Parcours</span>
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-slate-900">Mes Expériences</h2>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-1/2 space-y-12">
            {member.experience.map((exp: { period: string; role: string; company: string; description: string[] }, i: number) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                key={i} 
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-[-9px] top-2 w-4 h-4 rounded-full border-4 border-slate-50 bg-primary shadow-sm"
                  style={{ backgroundColor: i === 0 ? accentColor : '#0F4C81' }}
                />
                
                {/* Content Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                  <span className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-slate-100 bg-slate-50 text-slate-600">
                    {exp.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 font-poppins">{exp.role}</h3>
                  <h4 className="text-sm font-bold mb-6" style={{ color: accentColor }}>{exp.company}</h4>
                  
                  <ul className="space-y-3">
                    {exp.description.map((desc: string, k: number) => (
                      <li key={k} className="flex items-start gap-3 text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                        <Check size={18} className="shrink-0 mt-1" style={{ color: accentColor }} />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── PORTFOLIO / EXPERTISE ── */}
      {member.portfolioGrid && member.portfolioGrid.length > 0 && (
        <section id="portfolio" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm block mb-3">Domaines</span>
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-slate-900">Mes Domaines d'Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {member.portfolioGrid.map((item: { title: string; tag: string; keywords: string[]; desc: string; image: string }, i: number) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="inline-block bg-secondary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex gap-2 mb-4">
                    {item.keywords.map((kw: string, k: number) => (
                      <span key={k} className="text-[10px] font-bold uppercase tracking-wider text-slate-500">#{kw}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── CONTACT SECTION ── */}
      <section id="contact" className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-12">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 rounded-full blur-[80px]" />
          
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">Travaillons Ensemble</h2>
            <p className="text-slate-300 font-medium leading-relaxed mb-8">
              Je suis à l'écoute de nouvelles opportunités pour mettre mes compétences en développement local au service de votre territoire ou organisation.
            </p>
            
            <div className="space-y-6">
              {member.email && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                    <a href={`mailto:${member.email}`} className="text-white font-medium hover:text-secondary transition-colors">{member.email}</a>
                  </div>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Téléphone</span>
                    <a href={`tel:${member.phone}`} className="text-white font-medium hover:text-secondary transition-colors">{member.phone}</a>
                  </div>
                </div>
              )}
              {member.location && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Localisation</span>
                    <span className="text-white font-medium">{member.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-[400px] relative z-10 bg-white rounded-[2rem] p-8 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Contactez-moi directement</h3>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed">
              Choisissez le moyen qui vous convient le mieux pour me contacter.
            </p>
            <div className="space-y-4">
              {member.phone && (
                <a 
                  href={getWhatsAppLink(member.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#20bd5a] transition-all hover:-translate-y-1 shadow-md shadow-[#25D366]/20 flex items-center justify-center"
                >
                  <Phone size={20} className="mr-3" /> Discuter sur WhatsApp
                </a>
              )}
              {member.email && (
                <a 
                  href={`mailto:${member.email}`}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-md flex items-center justify-center"
                >
                  <Mail size={20} className="mr-3" /> M'envoyer un Email
                </a>
              )}
              {!member.phone && !member.email && (
                <div className="text-center text-slate-500 text-sm py-4 border border-slate-200 rounded-xl bg-slate-50">
                  Aucun contact direct disponible
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

    </main>
  );
}
