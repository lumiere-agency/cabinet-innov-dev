import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const portfolios: Record<string, Record<string, unknown>> = {
  "papa-doudou-diop": {
    name: "Papa Doudou Diop",
    firstName: "Papa Doudou",
    lastName: "DIOP",
    role: "Planificateur, Animateur & Coach MPME",
    tagline: "Développement territorial & innovation sociale",
    image: "/images/papa-doudou-diop.png",
    accentColor: "#1E7D4D",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-700",
    bio: "Spécialisé dans la planification économique et la gestion de projets territoriaux, j'accompagne les acteurs locaux dans l'élaboration de stratégies durables, combinant innovation et inclusion. Mon expertise couvre le marketing territorial et l'animation de dynamiques collectives.",
    bentoText: "Passionné par la mobilisation des ressources locales, je crois en des modèles de développement équilibrés : performance économique, progrès social et respect de l'environnement. Mon approche place l'intelligence collective comme moteur du développement.",
    email: "dioppapedoudou07@gmail.com",
    phone: "+221 78 283 11 46",
    location: "Richard TOLL, Sénégal",
    birthdate: "7 août 2001",
    skills: [
      { name: "Planification territoriale", level: "Expert" },
      { name: "Diagnostic & Prospective", level: "Expert" },
      { name: "Enquêtes (MARP)", level: "Expert" },
      { name: "Coaching MPME", level: "Expert" },
      { name: "Gestion axée sur les résultats (GAR)", level: "Avancé" },
      { name: "Plaidoyer & Animation", level: "Avancé" }
    ],
    tools: [
      "SPSS", "SPHINX", "KOBO Collect", "QGIS", "MS Project", "Excel TCD", "Google Forms", "Suite Office"
    ],
    education: [
      {
        period: "Févr. 2026 – Présent",
        degree: "Master 2 Ingénierie du Développement Territorial",
        school: "Université Alioune Diop (UAD)",
        current: true,
      },
      {
        period: "Juin 2025 – Janv. 2026",
        degree: "Master 1 Ingénierie du Développement Territorial",
        school: "Université Alioune Diop (UAD)",
      },
      {
        period: "2021 – 2024",
        degree: "Licence en Développement Local",
        school: "USSEIN, Kaolack",
      }
    ],
    experience: [
      {
        period: "Juin 2025 – Présent",
        role: "Coach des MPME",
        company: "CAPER-SAS, Kaffrine",
        current: true,
        description: [
          "Assistance technique et coaching des entreprises : diagnostic organisationnel, plans d'action.",
          "Développement et gestion d'un portefeuille de MPME."
        ]
      },
      {
        period: "Janv. 2025 – Juin 2025",
        role: "Stagiaire — Planification",
        company: "Agence Régionale de Développement (ARD), Kaolack",
        description: [
          "Élaboration de plans de développement des collectivités territoriales.",
          "Préparation de rapports et recommandations stratégiques."
        ]
      },
      {
        period: "Janv. 2025",
        role: "Chargé de communication digitale et interne",
        company: "Loum Consulting, Dakar (Télétravail)",
        description: [
          "Rédaction de contenus digitaux et création de campagnes réseaux sociaux.",
          "Analyse des performances et organisation d'événements internes."
        ]
      },
      {
        period: "Sept. 2024 – Nov. 2024",
        role: "Stagiaire en Diagnostic Organisationnel",
        company: "Réseau des Femmes Agricultrices du Nord (REFAN)",
        description: [
          "Réalisation d'un diagnostic organisationnel et institutionnel complet.",
          "Formulation de recommandations stratégiques."
        ]
      },
      {
        period: "Sept. 2022 – Oct. 2022",
        role: "Stagiaire aménagement du territoire",
        company: "Agence Nationale de l'Aménagement du Territoire (ANAT)",
        description: [
          "Collaboration à la planification de projets de développement local.",
          "Préparation et présentation de rapports d'avancement sur les projets."
        ]
      }
    ],
    portfolioGrid: [
      {
        title: "Analyse Territoriale",
        tag: "Expertise Terrain",
        keywords: ["Diagnostic", "MARP"],
        desc: "Diagnostic territorial, prospective socio-économique et enquêtes de terrain.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Management des Organisations",
        tag: "Management",
        keywords: ["Gouvernance", "Stratégie"],
        desc: "Diagnostic institutionnel des OP, planification stratégique et opérationnelle.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Gestion de Projets",
        tag: "Projets",
        keywords: ["Suivi & Éval", "GAR"],
        desc: "Conception, mise en œuvre, suivi-évaluation de projets et approche GAR.",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Planification Stratégique",
        tag: "Planification",
        keywords: ["Développement", "Stratégie"],
        desc: "Élaboration de plans de développement locaux et structuration de projets territoriaux.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Animation Communautaire",
        tag: "Social",
        keywords: ["Inclusion", "Plaidoyer"],
        desc: "Mobilisation des acteurs locaux, animation de dynamiques collectives et plaidoyer.",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb1665e8?q=80&w=800&auto=format&fit=crop"
      },
      {
        title: "Accompagnement MPME",
        tag: "Coaching",
        keywords: ["Entrepreneuriat", "Performance"],
        desc: "Diagnostic, coaching et renforcement de capacités des micro, petites et moyennes entreprises.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  "micheil-rebeiz": {
    name: "Micheil Christhian Mehdi Rebeiz",
    firstName: "Micheil",
    lastName: "REBEIZ",
    role: "Co-fondateur & Expert Développement",
    tagline: "Innovation & stratégie au service des territoires",
    image: null,
    accentColor: "#0F4C81",
    gradientFrom: "from-blue-600",
    gradientTo: "to-blue-800",
    bio: "Acteur clé de la dynamique INNOV'DEV, Micheil apporte une vision innovante et stratégique au service du développement local et territorial. Sa formation et son engagement font de lui un pilier essentiel du cabinet.",
    bentoText: "Je conçois des stratégies innovantes pour dynamiser l'économie locale tout en préservant l'identité territoriale. Mon approche se base sur une analyse systémique des enjeux socio-économiques.",
    email: "m.rebeiz@innovdev.com",
    location: "Mbour, Sénégal",
    tools: ["Planification", "Stratégie", "Innovation", "Design Thinking", "Analyse de données"],
    skills: [{name: "Innovation sociale", level: "Expert"}],
    experience: [
      { period: "2024 – Présent", role: "Co-fondateur", company: "INNOV'DEV", description: ["Définition de la vision stratégique du cabinet.", "Mise en œuvre des projets de développement territorial."] }
    ],
    portfolioGrid: []
  },
  "mamoudou-thiongane": {
    name: "Mamoudou Thiongane",
    firstName: "Mamoudou",
    lastName: "THIONGANE",
    role: "Co-fondateur & Consultant",
    tagline: "Mobilisation communautaire & développement",
    image: null,
    accentColor: "#7C3AED",
    gradientFrom: "from-violet-600",
    gradientTo: "to-violet-800",
    bio: "Expert en mobilisation communautaire et en appui aux dynamiques de développement à la base, j'interviens dans les territoires ruraux avec une approche participative et inclusive.",
    bentoText: "Convaincu que le développement durable passe par l'implication des communautés, je conçois et mets en œuvre des programmes qui renforcent le pouvoir d'agir des populations locales.",
    email: "m.thiongane@innovdev.com",
    location: "Sédo Sébé, Sénégal",
    tools: ["Mobilisation sociale", "Diagnostic participatif", "Animation", "Formation"],
    experience: [
      { period: "2024 – Présent", role: "Co-fondateur", company: "INNOV'DEV", description: ["Animation des dynamiques collectives et appui aux collectivités locales."] }
    ],
    portfolioGrid: []
  },
  "pape-demba-sall": {
    name: "Pape Demba Sall",
    firstName: "Pape Demba",
    lastName: "SALL",
    role: "Co-fondateur & Expert Financier",
    tagline: "Ingénierie financière & montage de projets",
    image: null,
    accentColor: "#B45309",
    gradientFrom: "from-amber-600",
    gradientTo: "to-amber-800",
    bio: "Spécialiste du montage financier de projets publics, je maîtrise les procédures des grands bailleurs de fonds internationaux et accompagne collectivités et ONG dans la recherche de financements.",
    bentoText: "Mon expertise garantit la viabilité financière et la conformité des projets. J'accompagne nos partenaires dans l'optimisation de leurs ressources et la structuration de leurs investissements.",
    email: "p.sall@innovdev.com",
    location: "Mboro, Sénégal",
    tools: ["Analyse financière", "Montage de dossiers", "Recherche de fonds", "Excel", "Reporting financier"],
    experience: [
      { period: "2024 – Présent", role: "Co-fondateur", company: "INNOV'DEV", description: ["Ingénierie financière, montage de dossiers de financement et relations partenaires."] }
    ],
    portfolioGrid: []
  },
  "mamour-ka": {
    name: "Mamour Ka",
    firstName: "Mamour",
    lastName: "KA",
    role: "Co-fondateur & Coordinateur",
    tagline: "Coordination terrain & suivi opérationnel",
    image: null,
    accentColor: "#BE185D",
    gradientFrom: "from-pink-600",
    gradientTo: "to-pink-800",
    bio: "Coordinateur de terrain rigoureux, j'assure le lien opérationnel entre les équipes techniques et les populations bénéficiaires. Mon sens de l'organisation est un atout majeur pour la conduite des projets.",
    bentoText: "Je veille à la bonne exécution des projets sur le terrain en garantissant le respect des délais, des budgets et des standards de qualité. La proximité avec les acteurs locaux est ma priorité.",
    email: "m.ka@innovdev.com",
    location: "Mboro, Sénégal",
    tools: ["Coordination d'équipe", "Suivi logistique", "Planification opérationnelle", "Reporting terrain"],
    experience: [
      { period: "2024 – Présent", role: "Co-fondateur", company: "INNOV'DEV", description: ["Coordination opérationnelle des projets, suivi terrain et gestion de la relation avec les bénéficiaires."] }
    ],
    portfolioGrid: []
  }
};

export async function GET() {
  try {
    for (const [slug, data] of Object.entries(portfolios)) {
      // Use the slug as the document ID
      const docRef = doc(db, 'team', slug);
      await setDoc(docRef, {
        slug,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    return NextResponse.json({ success: true, message: 'Team data seeded successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
