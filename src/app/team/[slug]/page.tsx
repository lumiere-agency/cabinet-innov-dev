import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TeamMember } from "@/components/admin/TeamForm";
import MemberDetailClient from "./MemberDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds

async function getMember(slug: string) {
  const docRef = doc(db, "team", slug);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return docSnap.data() as TeamMember;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMember(slug);
  
  if (!member) {
    return {
      title: "Membre introuvable",
    };
  }

  const fullName = `${member.firstName} ${member.lastName}`;
  const title = `${fullName} - ${member.role} | Innov'dev`;
  
  return {
    title,
    description: member.bio,
    openGraph: {
      title,
      description: member.bio,
      images: member.image ? [{ url: member.image }] : [],
    },
  };
}

export default async function MemberPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getMember(slug);

  if (!member) {
    notFound();
  }

  return <MemberDetailClient member={member} />;
}
