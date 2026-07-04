import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TeamMember } from "@/components/admin/TeamForm";
import TeamListClient from "./TeamListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Équipe | Innov'dev",
  description: "Des co-fondateurs jeunes, dynamiques et hautement qualifiés, unis par la passion du développement territorial au Sénégal.",
};

export const revalidate = 60; // Revalidate every 60 seconds

async function getTeam() {
  const q = query(collection(db, "team"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ ...doc.data() } as TeamMember));
}

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <main className="flex-1 flex flex-col w-full bg-background pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <TeamListClient team={team} />
      </div>
    </main>
  );
}
