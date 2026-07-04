import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innovdev-senegal.com'; // À remplacer par le vrai domaine

  // Get dynamic articles
  const articlesSnapshot = await getDocs(collection(db, 'articles'));
  const articles = articlesSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      url: `${baseUrl}/blog/${doc.id}`,
      lastModified: data.createdAt?.toDate?.() || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // Get dynamic portfolio items
  const portfolioSnapshot = await getDocs(collection(db, 'portfolio'));
  const portfolioItems = portfolioSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      url: `${baseUrl}/portfolio/${doc.id}`,
      lastModified: data.createdAt?.toDate?.() || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  // Get dynamic team members
  const teamSnapshot = await getDocs(collection(db, 'team'));
  const teamMembers = teamSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      url: `${baseUrl}/team/${data.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  // Static routes
  const routes = ['', '/services', '/portfolio', '/blog', '/team', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.9,
    })
  );

  return [...routes, ...articles, ...portfolioItems, ...teamMembers];
}
