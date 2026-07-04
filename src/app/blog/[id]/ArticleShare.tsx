"use client";

import { Share2 } from "lucide-react";

interface ArticleShareProps {
  title: string;
  excerpt: string;
}

export default function ArticleShare({ title, excerpt }: ArticleShareProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papiers !");
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition-colors border border-slate-700 hover:border-slate-600"
    >
      <Share2 size={16} /> Partager
    </button>
  );
}
