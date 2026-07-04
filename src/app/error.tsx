"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl bg-card border border-border p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-red-500/20 shadow-inner">
          <AlertTriangle size={40} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-4">
          Une erreur est survenue
        </h1>
        
        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
          Nous sommes désolés, une erreur inattendue s'est produite lors du chargement de cette page. Notre équipe a été notifiée.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-xl hover:-translate-y-1"
          >
            <RefreshCcw size={20} />
            Réessayer
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-100 dark:bg-slate-800 text-foreground font-bold px-8 py-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm hover:-translate-y-1"
          >
            <Home size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
