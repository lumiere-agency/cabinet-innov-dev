import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      <Hero />
      <AboutPreview />
      <ServicesOverview />
      <CTASection />
    </main>
  );
}
