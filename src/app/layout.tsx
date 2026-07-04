import type { Metadata } from "next";
import { Poppins, Inter, Manrope } from "next/font/google";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import CustomCursor from "@/components/ui/CustomCursor";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cabinet INNOV'DEV | Développement Territorial",
  description: "Des solutions stratégiques pour un développement territorial durable au Sénégal.",
  keywords: ["développement territorial", "cabinet de conseil", "Sénégal", "innovation sociale", "développement local", "ONG", "secteur public"],
  openGraph: {
    title: "Cabinet INNOV'DEV | Stratégies & Développement",
    description: "Des solutions stratégiques pour un développement territorial durable au Sénégal.",
    url: "https://cabinet-innov-dev.vercel.app",
    siteName: "Cabinet INNOV'DEV",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Logo du Cabinet INNOV'DEV",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabinet INNOV'DEV",
    description: "Des solutions stratégiques pour un développement territorial durable au Sénégal.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${inter.variable} ${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden">
        <AuthProvider>
          <ToastProvider>
            <CustomCursor />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ToastProvider>
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-P78T1RMPQW"} />
    </html>
  );
}
