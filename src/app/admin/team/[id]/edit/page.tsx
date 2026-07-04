"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import TeamForm, { TeamMember } from "@/components/admin/TeamForm";
import { useToast } from "@/components/ui/Toast";

export default function EditTeamMemberPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  
  const [data, setData] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const docRef = doc(db, "team", id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() } as unknown as TeamMember);
        } else {
          showToast("error", "Erreur", "Membre introuvable.");
          router.push("/admin/team");
        }
      } catch (error) {
        console.error(error);
        showToast("error", "Erreur", "Impossible de charger le profil.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 font-medium">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return <TeamForm initialData={data} isEditing={true} />;
}
