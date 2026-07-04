"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

export interface TeamMember {
  slug?: string;
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  bio: string;
  bentoText: string;
  email: string;
  phone: string;
  linkedin?: string;
  location: string;
  birthdate: string;
  image: string | null;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  tools: string[];
  skills: { name: string; level: string }[];
  education: { period: string; degree: string; school: string; current?: boolean }[];
  experience: { period: string; role: string; company: string; current?: boolean; description: string[] }[];
  portfolioGrid: { title: string; tag: string; keywords: string[]; desc: string; image: string }[];
}

interface TeamFormProps {
  initialData?: Partial<TeamMember>;
  isEditing?: boolean;
}

const defaultData: TeamMember = {
  firstName: "",
  lastName: "",
  role: "",
  tagline: "",
  bio: "",
  bentoText: "",
  email: "",
  phone: "",
  linkedin: "",
  location: "",
  birthdate: "",
  image: null,
  accentColor: "#1E7D4D",
  gradientFrom: "from-emerald-500",
  gradientTo: "to-emerald-700",
  tools: [],
  skills: [],
  education: [],
  experience: [],
  portfolioGrid: [],
};

const generateSlug = (firstName: string, lastName: string) => {
  return `${firstName}-${lastName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !uploadPreset) throw new Error("Configuration Cloudinary manquante.");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Erreur lors de l'upload.");
  const data = await response.json();
  return data.secure_url;
};

export default function TeamForm({ initialData, isEditing }: TeamFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  
  const [form, setForm] = useState<TeamMember>({ ...defaultData, ...initialData });
  const [loading, setLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(initialData?.image || null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImageFile(file);
    setProfileImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleListAdd = (field: "tools" | "skills" | "education" | "experience" | "portfolioGrid", emptyItem: string | Record<string, unknown>) => {
    setForm({ ...form, [field]: [...(form[field] as unknown[]), emptyItem] });
  };

  const handleListRemove = (field: "tools" | "skills" | "education" | "experience" | "portfolioGrid", index: number) => {
    const newList = [...(form[field] as unknown[])];
    newList.splice(index, 1);
    setForm({ ...form, [field]: newList });
  };

  const handleListChange = (field: string, index: number, subField: string | null, value: string | string[]) => {
    const newList = [...(form[field as keyof TeamMember] as unknown[])];
    if (subField) {
      newList[index] = { ...(newList[index] as Record<string, unknown>), [subField]: value };
    } else {
      newList[index] = value;
    }
    setForm({ ...form, [field]: newList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = form.image;
      if (profileImageFile) {
        imageUrl = await uploadImageToCloudinary(profileImageFile);
      }

      const slug = isEditing && form.slug ? form.slug : generateSlug(form.firstName, form.lastName);

      const finalData = {
        ...form,
        image: imageUrl,
        slug,
        updatedAt: new Date().toISOString(),
      };

      if (!isEditing) {
        (finalData as Record<string, unknown>).createdAt = new Date().toISOString();
      }

      await setDoc(doc(db, "team", slug), finalData);
      showToast("success", "Succès", `Le profil de ${form.firstName} a été enregistré.`);
      router.push("/admin/team");
    } catch (err: unknown) {
      console.error(err);
      showToast("error", "Erreur", (err instanceof Error ? err.message : null) || "Impossible de sauvegarder le profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/team" className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-poppins font-bold text-white">
            {isEditing ? `Modifier le profil de ${form.firstName}` : "Ajouter un membre"}
          </h1>
          <p className="text-slate-400 text-sm">Gérez les informations affichées sur le portfolio.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Identité & Rôle */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Identité & Rôle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Prénom *</label>
              <input required type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nom *</label>
              <input required type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Rôle *</label>
              <input required type="text" name="role" value={form.role} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" placeholder="Ex: Planificateur, Animateur & Coach MPME" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Slogan (Tagline) *</label>
              <input required type="text" name="tagline" value={form.tagline} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" placeholder="Ex: Développement territorial & innovation sociale" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Bio courte (Hero section) *</label>
              <textarea required name="bio" value={form.bio} onChange={handleChange} rows={3} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Texte Bento (Mon profil & parcours) *</label>
              <textarea required name="bentoText" value={form.bentoText} onChange={handleChange} rows={3} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 resize-none" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Contact & Localisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Lien LinkedIn</label>
              <input type="text" name="linkedin" value={form.linkedin || ""} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Localisation</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Date de naissance (Optionnel)</label>
              <input type="text" name="birthdate" value={form.birthdate} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" />
            </div>
          </div>
        </div>

        {/* Design & Avatar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">Design & Avatar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Photo de profil</label>
              <div
                className="relative border-2 border-dashed border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors h-40 flex items-center justify-center bg-slate-800"
                onClick={() => document.getElementById("profile-upload")?.click()}
              >
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="Preview" className="h-full object-contain" />
                ) : (
                  <span className="text-slate-500 text-sm">Cliquez pour ajouter une photo</span>
                )}
                <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Couleur d'accentuation (Hex)</label>
                <div className="flex gap-2">
                  <input type="color" name="accentColor" value={form.accentColor} onChange={handleChange} className="w-12 h-10 rounded cursor-pointer bg-slate-800 border-none" />
                  <input type="text" name="accentColor" value={form.accentColor} onChange={handleChange} className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 uppercase" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Dégradé Départ</label>
                  <input type="text" name="gradientFrom" value={form.gradientFrom} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" placeholder="from-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Dégradé Fin</label>
                  <input type="text" name="gradientTo" value={form.gradientTo} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2" placeholder="to-emerald-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logiciels & Outils */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold text-white">Logiciels & Outils</h2>
            <button type="button" onClick={() => handleListAdd("tools", "")} className="flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {form.tools.map((tool, index) => (
              <div key={index} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={tool} 
                  onChange={(e) => handleListChange("tools", index, null, e.target.value)} 
                  className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-sm" 
                  placeholder="Ex: Excel" 
                />
                <button type="button" onClick={() => handleListRemove("tools", index)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Compétences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold text-white">Domaines de Compétences</h2>
            <button type="button" onClick={() => handleListAdd("skills", { name: "", level: "Expert" })} className="flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {form.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={skill.name} 
                  onChange={(e) => handleListChange("skills", index, "name", e.target.value)} 
                  className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-sm" 
                  placeholder="Ex: Planification territoriale" 
                />
                <button type="button" onClick={() => handleListRemove("skills", index)} className="text-red-400 hover:text-red-300 p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Expériences */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold text-white">Expériences Professionnelles</h2>
            <button type="button" onClick={() => handleListAdd("experience", { period: "", role: "", company: "", description: [""] })} className="flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          <div className="space-y-6">
            {form.experience.map((exp, index) => (
              <div key={index} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative group">
                <button type="button" onClick={() => handleListRemove("experience", index)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-10">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Période</label>
                    <input type="text" value={exp.period} onChange={(e) => handleListChange("experience", index, "period", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm" placeholder="Sept. 2024 - Présent" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Rôle</label>
                    <input type="text" value={exp.role} onChange={(e) => handleListChange("experience", index, "role", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm" placeholder="Consultant" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Entreprise/Lieu</label>
                    <input type="text" value={exp.company} onChange={(e) => handleListChange("experience", index, "company", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm" placeholder="INNOV'DEV, Dakar" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 flex justify-between">
                    <span>Missions (Séparer par une ligne vide pour créer des puces)</span>
                  </label>
                  <textarea 
                    value={exp.description.join('\n\n')} 
                    onChange={(e) => handleListChange("experience", index, "description", e.target.value.split('\n\n').filter(s => s.trim()))} 
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm resize-none" 
                    rows={3} 
                    placeholder="Mission 1...&#10;&#10;Mission 2..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formations (Education) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold text-white">Formations</h2>
            <button type="button" onClick={() => handleListAdd("education", { period: "", degree: "", school: "" })} className="flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          <div className="space-y-4">
            {form.education.map((edu, index) => (
              <div key={index} className="flex gap-4 items-start">
                <input type="text" value={edu.period} onChange={(e) => handleListChange("education", index, "period", e.target.value)} className="w-32 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-sm" placeholder="2021 - 2024" />
                <input type="text" value={edu.degree} onChange={(e) => handleListChange("education", index, "degree", e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-sm" placeholder="Master en..." />
                <input type="text" value={edu.school} onChange={(e) => handleListChange("education", index, "school", e.target.value)} className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-sm" placeholder="Université..." />
                <button type="button" onClick={() => handleListRemove("education", index)} className="text-red-400 hover:text-red-300 p-1.5">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Domaines d'Expertise (Portfolio) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold text-white">Blocs d'Expertise (Portfolio Grid)</h2>
            <button type="button" onClick={() => handleListAdd("portfolioGrid", { title: "", tag: "", keywords: [], desc: "", image: "" })} className="flex items-center gap-1 text-emerald-400 text-sm hover:text-emerald-300">
              <Plus size={16} /> Ajouter
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {form.portfolioGrid.map((item, index) => (
              <div key={index} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative">
                <button type="button" onClick={() => handleListRemove("portfolioGrid", index)} className="absolute top-2 right-2 text-slate-500 hover:text-red-400 bg-slate-800 p-1 rounded-md">
                  <Trash2 size={16} />
                </button>
                <div className="space-y-3 mt-4">
                  <input type="text" value={item.title} onChange={(e) => handleListChange("portfolioGrid", index, "title", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm" placeholder="Titre (ex: Analyse Territoriale)" />
                  <input type="text" value={item.tag} onChange={(e) => handleListChange("portfolioGrid", index, "tag", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm" placeholder="Tag (ex: Expertise Terrain)" />
                  <input type="text" value={item.keywords.join(', ')} onChange={(e) => handleListChange("portfolioGrid", index, "keywords", e.target.value.split(',').map(k => k.trim()).filter(k => k))} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm" placeholder="Mots-clés (séparés par virgule)" />
                  <textarea value={item.desc} onChange={(e) => handleListChange("portfolioGrid", index, "desc", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-sm resize-none" rows={2} placeholder="Description..." />
                  <input type="text" value={item.image} onChange={(e) => handleListChange("portfolioGrid", index, "image", e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg px-3 py-1.5 text-xs" placeholder="URL de l'image d'illustration (Unsplash...)" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-slate-900 border-t border-slate-800 p-4 flex justify-end gap-4 z-40">
          <Link href="/admin/team" className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors">
            Annuler
          </Link>
          <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
            {loading ? "Enregistrement..." : "Enregistrer le profil"}
          </button>
        </div>
      </form>
    </div>
  );
}
