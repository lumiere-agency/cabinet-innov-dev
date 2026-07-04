"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";

const CATEGORIES = [
  "Études & Données",
  "Coaching Territorial",
  "Consultance",
  "Formation",
  "Cartographie",
  "Pilotage de projets",
];

export default function EditRealisationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    category: CATEGORIES[0],
    description: "",
    challenge: "",
    approach: "",
    results: "",
  });
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  // Charger les données existantes
  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const docRef = doc(db, "realisations", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            title: data.title || "",
            location: data.location || "",
            date: data.date || "",
            category: data.category || CATEGORIES[0],
            description: data.description || "",
            challenge: data.challenge || "",
            approach: data.approach || "",
            results: data.results || "",
          });
          setCurrentImageUrl(data.imageUrl || "");
        } else {
          router.push("/admin");
        }
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données de cette réalisation.");
      } finally {
        setFetching(false);
      }
    };
    if (id) fetchDoc();
  }, [id, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = currentImageUrl;

      // Si une nouvelle image a été sélectionnée, uploader sur Cloudinary
      if (imageFile) {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
          throw new Error("Configuration Cloudinary manquante.");
        }

        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );

        if (!response.ok) throw new Error("Erreur lors de l'upload de l'image.");
        const data = await response.json();
        imageUrl = data.secure_url;
      }

      await updateDoc(doc(db, "realisations", id), {
        ...form,
        imageUrl,
      });

      showToast("success", "Modifications enregistrées !", `"${form.title}" a été mis à jour avec succès.`);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      showToast("error", "Erreur", "La mise à jour a échoué. Veuillez réessayer.");
      setError("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-poppins font-bold text-white">Modifier la Réalisation</h1>
          <p className="text-slate-400 text-sm">Mettez à jour les informations de ce projet.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Image Upload */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <label className="block text-sm font-semibold text-slate-300 mb-3">Image du projet</label>
          <div
            className="relative border-2 border-dashed border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-600 transition-colors"
            onClick={() => document.getElementById("image-upload-edit")?.click()}
          >
            {imagePreview || currentImageUrl ? (
              <img
                src={imagePreview || currentImageUrl}
                alt="Preview"
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="h-56 flex flex-col items-center justify-center text-slate-500 gap-3">
                <svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium">Cliquez pour changer l'image</p>
                <p className="text-xs opacity-70">PNG, JPG, WEBP — Max 5MB</p>
              </div>
            )}
            <input id="image-upload-edit" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          {imageFile && <p className="text-xs text-emerald-400 mt-2">✓ Nouvelle image sélectionnée : {imageFile.name}</p>}
          {!imageFile && currentImageUrl && <p className="text-xs text-slate-500 mt-2">Image actuelle conservée si vous n'en sélectionnez pas une nouvelle.</p>}
        </div>

        {/* Informations principales */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-white">Informations principales</h2>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Titre du projet *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Localisation *</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Année *</label>
              <input
                type="text"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contenu détaillé */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-5">
          <h2 className="font-semibold text-white">Contenu détaillé</h2>
          {[
            { label: "Résumé / Description courte *", key: "description", placeholder: "Décrivez le projet en 2-3 phrases." },
            { label: "Le Défi", key: "challenge", placeholder: "Quel problème avez-vous résolu ?" },
            { label: "Notre Approche", key: "approach", placeholder: "Comment INNOV'DEV est-il intervenu ?" },
            { label: "Résultats & Impact", key: "results", placeholder: "Quels ont été les résultats concrets ?" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
              <textarea
                required={key === "description"}
                rows={3}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800/50 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Link
            href="/admin"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
