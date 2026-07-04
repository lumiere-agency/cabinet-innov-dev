import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-[150px] md:text-[200px] font-black font-poppins leading-none text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-secondary select-none">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-6">
          Oups ! Page introuvable
        </h2>
        
        <p className="text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
          Il semble que la page que vous recherchez n'existe pas ou a été déplacée. 
          Ne vous inquiétez pas, notre équipe est là pour vous remettre sur le bon chemin.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-xl hover:-translate-y-1"
          >
            <Home size={20} />
            Retour à l'accueil
          </Link>
          
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-card text-foreground border border-border font-bold px-8 py-4 rounded-xl hover:bg-muted transition-all shadow-sm hover:-translate-y-1"
          >
            <Search size={20} />
            Nos services
          </Link>
        </div>
      </div>
    </main>
  );
}
