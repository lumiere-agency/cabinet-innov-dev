"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowRight, Share2 } from "lucide-react";

export default function Footer() {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "INNOV'DEV Cabinet",
          text: "Découvrez INNOV'DEV, expert en développement territorial",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Lien copié dans le presse-papiers !");
      }
    } catch (err) {
      console.error("Erreur lors du partage:", err);
    }
  };

  return (
    <footer className="bg-[#0A1A2F] text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-white p-1.5 rounded-xl shadow-md border border-slate-200/30 flex items-center justify-center h-12 w-12 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <Image src="/logo.png" alt="INNOV'DEV Cabinet" width={48} height={48} className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl leading-none tracking-tight text-white">INNOV'DEV</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#1E7D4D]">Cabinet</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Des solutions stratégiques pour un développement territorial durable. Notre expertise au service des ONG, institutions et entreprises au Sénégal.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/innov-dev/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0077b5] transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://wa.me/221769710160" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#25D366] transition-colors text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.065-.301-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.202.049-.383-.024-.533-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.36z"></path><path d="M22 12c0 5.523-4.477 10-10 10-1.892 0-3.665-.533-5.18-1.455L2 22l1.503-4.664C2.553 15.86 2 14.004 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10z"></path></svg>
              </a>
              <button onClick={handleShare} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary transition-colors text-white">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-poppins font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-4 h-1 bg-primary rounded-full"></span> Liens Rapides
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Accueil", href: "/" },
                { label: "À Propos de nous", href: "/about" },
                { label: "Nos Services", href: "/services" },
                { label: "Réalisations", href: "/portfolio" },
                { label: "L'Équipe", href: "/team" },
                { label: "Blog & Actualités", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-poppins font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-4 h-1 bg-accent rounded-full"></span> Nos Services
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Études de terrain",
                "Coaching territorial",
                "Consultance & Formation",
                "Pilotage de projets",
                "Dynamisme institutionnel",
                "Cartographie",
              ].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-sm hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-poppins font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-4 h-1 bg-secondary rounded-full"></span> Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-sm">Kasnack, Kaolack</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-primary shrink-0" size={20} />
                <a href="tel:+221769710160" className="text-sm hover:text-primary transition-colors">+221 76 971 01 60</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-primary shrink-0" size={20} />
                <a href="mailto:innodevcabinet@gmail.com" className="text-sm hover:text-primary transition-colors">innodevcabinet@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Cabinet INNOV'DEV. Tous droits réservés.</p>
          <div className="flex gap-4 items-center">
            <Link href="/admin" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors border border-emerald-500/30 px-2 py-1 rounded-md">
              Espace Admin
            </Link>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
