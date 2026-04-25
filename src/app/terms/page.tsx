import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export default function TermsPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-display-xl mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-on-surface-variant font-body-base">
          <p>Last updated: April 25, 2026</p>
          <p>
            By accessing or using DevProof, you agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-headline-md text-on-surface">1. Use of Service</h2>
          <p>
            You must be a human. Accounts registered by &quot;bots&quot; or other automated methods are not permitted.
          </p>
          <h2 className="text-headline-md text-on-surface">2. User Content</h2>
          <p>
            You retain all rights to your code and GitHub data. By using DevProof, you grant us a license to analyze your public data to provide our services.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
