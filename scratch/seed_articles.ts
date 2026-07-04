import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxEiKb_3IP3OML7jDVZvzvhFDh8Co5w5E",
  authDomain: "site-innovdev.firebaseapp.com",
  projectId: "site-innovdev",
  storageBucket: "site-innovdev.firebasestorage.app",
  messagingSenderId: "303604620710",
  appId: "1:303604620710:web:6f9119bd16e2685e840367",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const articles = [
  {
    title: "Stratégies d'innovation pour les territoires africains en 2026",
    excerpt: "Comment les collectivités locales africaines peuvent tirer parti des nouvelles technologies pour accélérer leur développement de manière durable.",
    content: "## L'essor de la GovTech en Afrique\n\nLe continent africain connaît une transformation numérique sans précédent. Les collectivités locales, souvent confrontées à des défis d'infrastructure et de gestion des ressources, trouvent aujourd'hui dans le numérique un levier puissant d'accélération.\n\n### Les 3 piliers de la transformation\n\n1. **La dématérialisation des services publics** : Faciliter l'accès aux citoyens et réduire la bureaucratie.\n2. **La gestion intelligente des données (Data)** : Mieux comprendre les besoins locaux pour des politiques publiques ciblées.\n3. **L'inclusion citoyenne** : Utiliser le mobile pour impliquer les populations dans les prises de décision (budgets participatifs).\n\nLe cabinet INNOV'DEV accompagne ces mutations en proposant des stratégies sur-mesure, adaptées aux réalités sociologiques et économiques de chaque territoire. \n\n*« La technologie n'est pas une fin en soi, mais un outil au service du développement humain. »*",
    category: "Développement Local",
    author: "Cabinet INNOV'DEV",
    readTime: "4",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "L'importance des études préalables dans les projets d'infrastructure",
    excerpt: "Pourquoi 70% des projets publics échouent sans une étude de faisabilité rigoureuse ? Décryptage de notre méthodologie d'analyse.",
    content: "## Anticiper pour mieux bâtir\n\nDans le domaine du développement territorial, la précipitation est souvent l'ennemie de l'efficacité. Construire une infrastructure (école, marché, centre de santé) sans étude préalable approfondie expose les décideurs à des risques majeurs : dépassement de budget, inadéquation avec les besoins réels, ou encore obsolescence rapide.\n\n### Notre approche méthodologique\n\nChez INNOV'DEV, notre pôle **Études & Données** intervient en amont pour sécuriser les investissements.\n\n- **Études socio-économiques** : Qui sont les bénéficiaires finaux ? Quels sont leurs usages ?\n- **Études d'impact environnemental** : Comment minimiser l'empreinte écologique du projet ?\n- **Cartographie SIG** : Visualisation spatiale des enjeux pour une implantation optimale.\n\nLes données récoltées permettent aux élus et aux bailleurs de fonds de prendre des décisions éclairées, garantissant ainsi la pérennité des projets financés.",
    category: "Études de cas",
    author: "Équipe Data INNOV'DEV",
    readTime: "3",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Le Coaching Territorial : libérer le potentiel des élus locaux",
    excerpt: "Au-delà des compétences techniques, le leadership des élus est crucial. Découvrez comment notre approche de coaching transforme la gouvernance locale.",
    content: "## Le défi du leadership local\n\nÊtre élu local en Afrique aujourd'hui, c'est être au front face à des attentes citoyennes immenses, avec des ressources souvent limitées. Si les formations classiques apportent des connaissances administratives, elles négligent souvent un aspect fondamental : **le leadership et la posture de l'élu**.\n\n### Qu'est-ce que le coaching territorial ?\n\nC'est un accompagnement personnalisé qui vise à :\n- Renforcer l'intelligence émotionnelle et la gestion des conflits.\n- Aligner la vision politique avec les réalités opérationnelles.\n- Créer une cohésion forte au sein des conseils municipaux.\n\nNous avons récemment déployé ce programme dans plusieurs communes, avec des résultats mesurables : baisse de l'absentéisme aux conseils, augmentation du taux de recouvrement des taxes locales grâce à une meilleure communication, et regains de confiance des citoyens.\n\n[Découvrez nos services de formation et coaching](/services)",
    category: "Innovation",
    author: "Cabinet INNOV'DEV",
    readTime: "5",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000"
  }
];

async function seed() {
  console.log("Seeding articles...");
  try {
    const articlesRef = collection(db, "articles");
    for (const article of articles) {
      await addDoc(articlesRef, {
        ...article,
        createdAt: new Date(),
      });
      console.log(`Added: ${article.title}`);
    }
    console.log("Seed complete!");
  } catch (err) {
    console.error("Error seeding:", err);
  }
}

seed();
