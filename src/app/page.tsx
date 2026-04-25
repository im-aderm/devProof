import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import Testimonials from "@/components/marketing/Testimonials";
import CTA from "@/components/marketing/CTA";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />
      <main className="pt-24">
        <Hero />
        <FeatureGrid />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
