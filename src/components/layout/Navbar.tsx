"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Accueil", href: "/" },
  { title: "À Propos", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Réalisations", href: "/portfolio" },
  { title: "Blog", href: "/blog" },
  { title: "Équipe", href: "/team" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isLightText = isHome && !isScrolled;
  const isScrolledOrInternal = isScrolled || !isHome;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolledOrInternal
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-1 rounded-xl shadow-md border border-slate-100/50 flex items-center justify-center h-12 w-12 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 overflow-hidden">
            <img src="/logo.png" alt="INNOV'DEV Cabinet" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`font-poppins font-bold text-xl leading-none tracking-tight transition-colors duration-300 ${isLightText ? "text-white" : "text-foreground"}`}>INNOV'DEV</span>
            <span className={`text-[10px] uppercase tracking-wider font-bold transition-colors duration-300 ${isLightText ? "text-amber-400" : "text-[#1E7D4D]"}`}>Cabinet</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`font-semibold text-sm inline-block transition-all duration-300 hover:scale-110 ${
                isLightText ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-[#0F4C81]"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="accent" size="sm" className="px-5 font-semibold">
            <Link href="/contact">
              Demander un accompagnement
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 rounded-md ${isLightText ? "text-white" : "text-foreground"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-foreground/80 font-semibold py-2 border-b border-border/50 hover:text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Button asChild variant="accent" className="w-full mt-2">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Demander un accompagnement
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
