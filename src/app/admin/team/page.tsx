"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Edit2, Trash2, Plus, Users, Search } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function AdminTeamPage() {
  interface TeamListItem {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    email?: string;
    image?: string;
    gradientFrom?: string;
    gradientTo?: string;
    createdAt?: string;
  }
  const [members, setMembers] = useState<TeamListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TeamListItem[];
      setMembers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le profil de ${name} ? Cette action est irréversible.`)) {
      try {
        await deleteDoc(doc(db, "team", id));
        showToast("success", "Profil supprimé", "Le membre a été retiré avec succès.");
      } catch (error) {
        console.error(error);
        showToast("error", "Erreur", "Impossible de supprimer le profil.");
      }
    }
  };

  const filteredMembers = members.filter(m => 
    m.firstName.toLowerCase().includes(search.toLowerCase()) || 
    m.lastName.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-poppins font-bold text-white flex items-center gap-3">
            <Users size={24} className="text-emerald-400" /> Gestion de l'Équipe & CV
          </h1>
          <p className="text-slate-400 text-sm mt-1">Gérez les profils et les CV des membres de l'équipe.</p>
        </div>
        <Link href="/admin/team/new" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
          <Plus size={18} /> Ajouter un membre
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Rechercher un membre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            Chargement des membres...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            Aucun membre trouvé.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Membre</th>
                  <th className="px-6 py-4 font-medium">Rôle</th>
                  <th className="px-6 py-4 font-medium">Créé le</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden flex-shrink-0">
                          {member.image ? (
                            <img src={member.image} alt={member.firstName} className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${member.gradientFrom} ${member.gradientTo} flex items-center justify-center text-white font-bold text-sm`}>
                              {member.firstName[0]}{member.lastName[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{member.firstName} {member.lastName}</div>
                          <div className="text-slate-500 text-xs">{member.email || "Pas d'email"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {member.createdAt ? new Date(member.createdAt).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/team/${member.id}/edit`} className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </Link>
                        <button onClick={() => handleDelete(member.id, `${member.firstName} ${member.lastName}`)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
