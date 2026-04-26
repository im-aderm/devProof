export default function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-section-gap">
      <div className="glass-card mx-auto max-w-4xl rounded-3xl p-12 text-center lg:p-20 relative z-10">
        <h2 className="font-display-xl text-display-xl text-on-surface mb-6">
          Stop Explaining. <br />
          <span className="text-primary">Start Proving.</span>
        </h2>
        <p className="text-body-base text-on-surface-variant mx-auto mb-10 max-w-xl">
          Join 12,000+ developers who are letting their code do the talking. Build your elite
          portfolio in seconds.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="skill-gradient font-headline-md rounded-lg px-10 py-4 text-white transition-all hover:opacity-90">
            Get Started Free
          </button>
          <button className="bg-surface-container-highest border-outline/30 font-headline-md text-on-surface rounded-lg border px-10 py-4 transition-all hover:bg-opacity-80">
            View Demo Portfolio
          </button>
        </div>
      </div>
      {/* Decorative Background Element */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-full -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="from-primary h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent"></div>
      </div>
    </section>
  );
}
