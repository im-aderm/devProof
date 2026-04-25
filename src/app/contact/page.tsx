import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export default function ContactPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-display-xl mb-8">Get in Touch</h1>
        <p className="text-body-base text-on-surface-variant mb-12">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
        <div className="glass-card p-8 rounded-2xl max-w-lg mx-auto text-left">
          <form className="space-y-6">
            <div>
              <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-2">Name</label>
              <input type="text" className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-2">Email</label>
              <input type="email" className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="font-label-bold text-xs uppercase text-on-surface-variant block mb-2">Message</label>
              <textarea rows={4} className="w-full bg-surface-container-high border border-outline/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
            </div>
            <button className="w-full py-4 skill-gradient text-white rounded-lg font-headline-md hover:opacity-90 transition-all">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
