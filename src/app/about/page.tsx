import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export default function AboutPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-display-xl mb-8">About DevProof</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-on-surface-variant text-body-base">
          <p>
            DevProof was founded with a single mission: to help developers turn their code into their most valuable professional asset.
          </p>
          <p>
            In a world where &quot;green squares&quot; only tell half the story, we use advanced analytics and AI to deep-dive into repository history, code complexity, and structural patterns.
          </p>
          <h2 className="text-headline-md text-on-surface mt-12 mb-4">Our Vision</h2>
          <p>
            We believe that talent should be verified by action, not just credentials. DevProof provides a high-fidelity lens for recruiters and managers to see the true depth of engineering talent.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
