import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ArticleShare from "./ArticleShare";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

async function getArticle(id: string) {
  const docRef = doc(db, "articles", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  const data = docSnap.data();
  return {
    id: docSnap.id,
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
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    return {
      title: "Article introuvable",
    };
  }

  return {
    title: `${article.title} | Innov'dev Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-[#0f172a] min-h-screen pt-24 pb-20 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Hero Header */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl mb-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft size={16} /> Retour au blog
        </Link>
        
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-slate-400 text-sm flex items-center gap-1.5">
            <Clock size={14} /> {article.readTime} min de lecture
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-poppins font-bold text-white leading-[1.1] mb-8">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-500 border border-slate-700">
              <User size={20} />
            </div>
            <div>
              <p className="font-semibold text-white">{article.author}</p>
              <div className="flex items-center text-sm text-slate-400 gap-1.5 mt-0.5">
                <Calendar size={14} /> Publié le {new Date(article.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>

          <ArticleShare title={article.title} excerpt={article.excerpt} />
        </div>
      </div>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="container mx-auto px-4 md:px-6 max-w-5xl mb-16 relative">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 relative">
            <Image 
              src={article.imageUrl} 
              alt={article.title} 
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="prose prose-invert prose-lg prose-emerald max-w-none 
            prose-headings:font-poppins prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-300 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-900 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-200"
        >
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Footer Author Box */}
        <div className="mt-20 p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex flex-shrink-0 items-center justify-center text-emerald-500 border border-slate-700 shadow-xl">
            <User size={32} />
          </div>
          <div>
            <h3 className="text-xl font-poppins font-bold text-white mb-2">À propos de l'auteur</h3>
            <p className="text-slate-400 leading-relaxed">
              L'équipe du Cabinet INNOV'DEV partage régulièrement son expertise sur les thématiques liées au développement territorial, à l'innovation stratégique et au coaching institutionnel au Sénégal.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
