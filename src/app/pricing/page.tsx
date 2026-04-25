import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

export default function PricingPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-40 pb-20 px-6 text-center">
        <h1 className="text-display-xl mb-6">Pricing Plans</h1>
        <p className="text-body-base text-on-surface-variant max-w-2xl mx-auto mb-12">
          Choose the plan that fits your career stage. Unlock advanced features as you grow.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="glass-card p-8 rounded-2xl border-outline-variant/20">
            <h3 className="text-headline-md font-bold mb-2">Free</h3>
            <p className="text-display-xl mb-6">$0</p>
            <ul className="text-left space-y-4 mb-8 text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> 1 profile sync/week
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Basic developer score
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Public portfolio
              </li>
               <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-outline/50">close</span> Unlimited sync
              </li>
               <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-outline/50">close</span> AI deep insights
              </li>
            </ul>
            <button className="w-full py-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">Get Started Free</button>
          </div>

          {/* Pro Plan */}
          <div className="glass-card p-8 rounded-2xl border-primary shadow-[0_0_20px_rgba(79,70,229,0.15)] relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-primary/5 text-primary text-xs font-bold uppercase px-3 py-1 rounded-bl-lg">Most Popular</div>
            <h3 className="text-headline-md font-bold mb-2">Pro</h3>
            <p className="text-display-xl mb-4">$19<span className="text-body-base text-on-surface-variant">/mo</span></p>
            <ul className="text-left space-y-4 mb-8 text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Unlimited sync
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> AI deep insights
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> PDF Resume builder
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Compare users
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Advanced analytics
              </li>
            </ul>
            <button className="w-full py-3 skill-gradient text-white rounded-lg font-bold hover:opacity-90 transition-all">Go Pro</button>
          </div>

           {/* Team Plan - Placeholder */}
           <div className="glass-card p-8 rounded-2xl border-outline-variant/20">
            <h3 className="text-headline-md font-bold mb-2">Team</h3>
            <p className="text-display-xl mb-4">$49<span className="text-body-base text-on-surface-variant">/mo</span></p>
            <ul className="text-left space-y-4 mb-8 text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> All Pro features
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Team collaboration tools
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Role-based access control
              </li>
               <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Export reports
              </li>
               <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">check</span> Priority support
              </li>
            </ul>
            <button className="w-full py-3 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors">Contact Sales</button>
          </div>
        </div>
      </main>
    </div>
  );
}
