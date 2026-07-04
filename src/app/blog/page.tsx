import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogListClient from "./BlogListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Innov'dev",
  description: "Décryptages, analyses et retours d'expérience sur les enjeux du développement au Sénégal.",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getArticles() {
  const q = query(
    collection(db, "articles"), 
    where("status", "==", "published"),
    orderBy("createdAt", "desc")
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() 
        || (data.createdAt?.seconds ? new Date(data.createdAt.seconds * 1000).toISOString() : new Date().toISOString()),
    } as {
      id: string;
      title: string;
      excerpt: string;
      content: string;
      category: string;
      imageUrl: string;
      author: string;
      readTime: string;
      createdAt: string;
    };
  });
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="bg-[#0f172a] min-h-screen pt-24 pb-20">
      {/* En-tête */}
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Actualités & Insights
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
          Le blog du développement territorial
        </h1>
        <p className="text-lg text-slate-400">
          Décryptages, analyses et retours d'expérience sur les enjeux du développement au Sénégal.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <BlogListClient articles={articles} />
      </div>
    </div>
  );
}
