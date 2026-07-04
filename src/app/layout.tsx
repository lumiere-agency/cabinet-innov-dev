import type { Metadata } from "next";
import { Poppins, Inter, Manrope } from "next/font/google";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { AuthProvider } from "@/lib/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
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
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </ToastProvider>
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
    </html>
  );
}
