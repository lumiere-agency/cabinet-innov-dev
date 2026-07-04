"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import MarkdownEditor from "@/components/ui/MarkdownEditor";

const CATEGORIES = [
  "Développement Local",
  "Innovation",
  "Stratégie",
  "Études de cas",
  "Décryptage",
];

export default function NewArticlePage() {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: CATEGORIES[0],
    author: "Cabinet INNOV'DEV",
    readTime: "5",
    status: "draft",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent, targetStatus: "draft" | "published") => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = "";

      if (imageFile) {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) throw new Error("Configuration Cloudinary manquante.");

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Erreur lors de l'upload sur Cloudinary.");
        const data = await response.json();
        imageUrl = data.secure_url;
      }

      await addDoc(collection(db, "articles"), {
        ...form,
        status: targetStatus,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      if (targetStatus === "published") {
        showToast("success", "Article publié !", `"${form.title}" est maintenant en ligne.`);
      } else {
        showToast("success", "Brouillon enregistré !", `"${form.title}" a été sauvegardé en brouillon.`);
      }
      router.push("/admin/articles");
    } catch (err) {
      console.error(err);
      showToast("error", "Erreur", "Impossible de sauvegarder l'article.");
      setError("Une erreur est survenue lors de la sauvegarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/articles" className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div>
          <h1 className="text-2xl font-poppins font-bold text-white">Rédiger un article</h1>
          <p className="text-slate-400 text-sm">Créez du contenu optimisé pour votre blog.</p>
        </div>
      </div>

      <form className="flex flex-col gap-6">
        {/* Cover Image */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <label className="block text-sm font-semibold text-slate-300 mb-3">Image de couverture (Optionnel mais recommandé pour le SEO)</label>
          <div
            className="relative border-2 border-dashed border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:border-sky-500 transition-colors"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 gap-3">
                <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-sm font-medium">Cliquez pour sélectionner une image</p>
                <p className="text-xs opacity-70">Ratio 21:9 recommandé</p>
              </div>
            )}
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
        </div>

        {/* SEO & Meta */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-white">Méta-données (SEO)</h2>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Titre de l'article *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Ex: Les 5 enjeux majeurs du développement local en 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Extrait (Résumé court) *</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              placeholder="Sera affiché sur la page d'accueil du blog et dans les résultats Google."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie *</label>
              <input
                list="category-suggestions"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Ex: Innovation"
              />
              <datalist id="category-suggestions">
                {CATEGORIES.map((cat) => <option key={cat} value={cat} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Auteur</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Temps de lecture (min)</label>
              <input
                type="number"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Contenu de l'article *</h2>
          <MarkdownEditor 
            value={form.content} 
            onChange={(val) => setForm({ ...form, content: val })} 
            placeholder="Rédigez votre article ici..."
          />
        </div>

        {error && <div className="bg-red-900/30 text-red-400 text-sm rounded-xl px-4 py-3 border border-red-800/50">{error}</div>}

        <div className="flex gap-3 justify-end">
          <Link href="/admin/articles" className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors">
            Annuler
          </Link>
          <button 
            type="button" 
            onClick={(e) => handleSubmit(e, "draft")}
            disabled={loading} 
            className="px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? "..." : "Enregistrer comme brouillon"}
          </button>
          <button 
            type="button" 
            onClick={(e) => handleSubmit(e, "published")}
            disabled={loading} 
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Traitement...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Publier l'article</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
