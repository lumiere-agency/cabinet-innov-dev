"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Send, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col w-full min-h-screen pt-28 pb-20 relative overflow-hidden bg-background">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none hidden md:block" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase">Contactez-nous</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-extrabold leading-tight mb-6 tracking-tight">
            Collaborons pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">l'avenir</span> de votre territoire.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Notre équipe d'experts est prête à vous accompagner dans vos projets les plus ambitieux. Laissez-nous un message et nous vous répondrons très rapidement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Contact Info (Left Column) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="bg-[#0A1A2F] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-full flex flex-col justify-between border border-slate-800">
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none" />
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/30 rounded-full blur-[80px] hidden md:block" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-poppins font-bold mb-10 text-white">Nos Coordonnées</h3>
                
                <div className="flex flex-col gap-8">
                  <motion.div whileHover={{ x: 5 }} className="flex gap-5 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-slate-100">Notre Siège</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">Kasnack, Kaolack</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex gap-5 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0 border border-accent/30 group-hover:bg-accent/30 group-hover:scale-110 transition-all duration-300">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-slate-100">Téléphone</h4>
                      <a href="tel:+221769710160" className="text-slate-400 text-sm hover:text-white transition-colors block">+221 76 971 01 60</a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex gap-5 items-start group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/30 group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-slate-100">Email</h4>
                      <a href="mailto:innodevcabinet@gmail.com" className="text-slate-400 text-sm hover:text-white transition-colors block">innodevcabinet@gmail.com</a>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transform transition-all duration-500 hover:bg-white/10 hover:shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#25D366]" />
                    </div>
                    <h4 className="font-bold text-lg text-white">Support WhatsApp</h4>
                  </div>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">Une question urgente ? N'hésitez pas à nous envoyer un message direct.</p>
                  <Button asChild className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all duration-300 h-12 rounded-xl">
                    <a href="https://wa.me/221769710160" target="_blank" rel="noopener noreferrer" className="font-bold text-base flex justify-between items-center px-4">
                      <span>Démarrer la discussion</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form (Right Column) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </main>
  );
}

function ContactFormContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || "";
  const [subject, setSubject] = useState(initialSubject);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (isSubmitted) {
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center justify-center text-center p-10 md:p-16 bg-white dark:bg-card border border-slate-100 dark:border-border rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none h-full min-h-[600px] relative overflow-hidden"
        >
          {/* Confetti-like background effects */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl hidden md:block" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl hidden md:block" />
          
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-24 h-24 rounded-[2rem] bg-secondary/10 flex items-center justify-center mb-8 text-secondary border-2 border-secondary/20 shadow-inner"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h3 className="text-3xl font-poppins font-bold text-foreground mb-4">Message Envoyé !</h3>
          <p className="text-muted-foreground mb-10 max-w-md text-base leading-relaxed">
            Merci de l'intérêt que vous portez à INNOV'DEV. Notre équipe a bien reçu votre demande et reviendra vers vous sous 24 à 48 heures.
          </p>
          <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)} className="rounded-xl border-2 hover:bg-secondary/5 hover:text-secondary hover:border-secondary transition-all duration-300">
            Envoyer un autre message
          </Button>
        </motion.div>
      </AnimatePresence>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const organization = (document.getElementById('organization') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    setIsSending(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: email,
          message: `Organisation: ${organization || 'Non renseigné'}\n\nMessage:\n${message}`,
          subject: `Nouvelle demande: ${subject || 'Général'}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur d'envoi");
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg("Une erreur est survenue lors de l'envoi du message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-card border border-slate-100 dark:border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none relative h-full">
      <h3 className="text-3xl font-poppins font-bold mb-8 text-foreground">Écrivez-nous</h3>
      {errorMsg && <div className="text-red-500 text-sm mb-4">{errorMsg}</div>}
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="space-y-3">
              <Label htmlFor="firstName" className="text-sm font-semibold ml-1">Prénom</Label>
              <Input id="firstName" required placeholder="Jean" className="bg-slate-50 dark:bg-background h-14 rounded-2xl border-slate-200 dark:border-border focus-visible:ring-primary shadow-sm transition-all duration-300 hover:border-primary/50" />
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-3">
              <Label htmlFor="lastName" className="text-sm font-semibold ml-1">Nom</Label>
              <Input id="lastName" required placeholder="Diop" className="bg-slate-50 dark:bg-background h-14 rounded-2xl border-slate-200 dark:border-border focus-visible:ring-primary shadow-sm transition-all duration-300 hover:border-primary/50" />
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="space-y-3">
            <Label htmlFor="email" className="text-sm font-semibold ml-1">Adresse Email</Label>
            <Input id="email" type="email" required placeholder="jean.diop@exemple.com" className="bg-slate-50 dark:bg-background h-14 rounded-2xl border-slate-200 dark:border-border focus-visible:ring-primary shadow-sm transition-all duration-300 hover:border-primary/50" />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3">
            <Label htmlFor="organization" className="text-sm font-semibold ml-1">Organisation / Entreprise</Label>
            <Input id="organization" placeholder="Votre structure" className="bg-slate-50 dark:bg-background h-14 rounded-2xl border-slate-200 dark:border-border focus-visible:ring-primary shadow-sm transition-all duration-300 hover:border-primary/50" />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3">
            <Label htmlFor="subject" className="text-sm font-semibold ml-1">Sujet de votre demande</Label>
            <div className="relative">
              <select 
                id="subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="appearance-none flex h-14 w-full items-center justify-between rounded-2xl border border-slate-200 dark:border-border bg-slate-50 dark:bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50 shadow-sm"
              >
                <option value="" disabled>Sélectionnez un domaine d'expertise</option>
                <option value="etudes">Études de terrain & Données</option>
                <option value="coaching">Coaching territorial</option>
                <option value="projet">Montage & Pilotage de projet</option>
                <option value="formation">Consultance & Formation</option>
                <option value="autre">Autre demande</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3">
            <Label htmlFor="message" className="text-sm font-semibold ml-1">Votre message</Label>
            <Textarea id="message" required placeholder="Décrivez votre projet ou votre besoin en détail..." className="min-h-[160px] bg-slate-50 dark:bg-background resize-none rounded-2xl border-slate-200 dark:border-border p-4 focus-visible:ring-primary shadow-sm transition-all duration-300 hover:border-primary/50" />
          </motion.div>

          <motion.div variants={fadeInUp} className="pt-4">
            <Button type="submit" variant="default" size="lg" className="w-full h-14 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 group/btn text-base font-bold">
              Envoyer la demande <Send className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}

function ContactForm() {
  return (
    <Suspense fallback={
      <div className="bg-white dark:bg-card border border-slate-100 dark:border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-primary">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="font-semibold text-sm">Chargement du formulaire...</p>
        </div>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}
