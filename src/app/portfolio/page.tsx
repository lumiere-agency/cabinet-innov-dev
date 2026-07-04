import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PortfolioListClient, { Realisation } from "./PortfolioListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Réalisations | Innov'dev",
  description: "Explorez nos cas d'études et découvrez comment INNOV'DEV transforme les défis locaux en réussites concrètes.",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getProjects() {
  const q = query(collection(db, "realisations"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() 
        || (data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000).toISOString() : new Date().toISOString()),
    } as unknown as Realisation;
  });
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="flex-1 flex flex-col w-full pt-32 pb-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6">
        {/* ── HEADER ── */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
            <span className="text-sm font-semibold tracking-widest uppercase font-poppins">Notre Portfolio</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold leading-tight mb-8 text-slate-900">
            Créateurs <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">d&apos;impact</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto">
            Explorez nos cas d&apos;études et découvrez comment INNOV&apos;DEV transforme les défis locaux en réussites concrètes.
          </p>
        </div>

        <PortfolioListClient projects={projects} />
      </div>
    </main>
  );
}
