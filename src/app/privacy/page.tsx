import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-display-xl mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-on-surface-variant text-body-base">
          <p>Last updated: April 25, 2026</p>
          <p>
            Your privacy is important to us. This Privacy Policy explains how DevProof collects, uses, and protects your information when you use our services.
          </p>
          <h2 className="text-headline-md text-on-surface">1. Information We Collect</h2>
          <p>
            We collect information from your public GitHub profile and repositories when you connect your account. This includes repository names, languages used, and contribution history.
          </p>
          <h2 className="text-headline-md text-on-surface">2. How We Use Information</h2>
          <p>
            We use this information to generate developer portfolios, readiness scores, and AI-powered insights. We do not sell your personal data to third parties.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
