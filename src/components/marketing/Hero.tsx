export default function Hero() {
  return (
    <section className="relative mx-auto max-w-container-max overflow-hidden px-6 py-20 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2 opacity-20">
        <div className="bg-primary-container absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]"></div>
        <div className="bg-tertiary-container absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-secondary"></span>
          <span className="font-label-bold text-label-bold text-primary uppercase">
            Trusted by 500+ Engineering Teams
          </span>
        </div>
        <h1 className="font-display-xl text-display-xl text-on-surface mb-6">
          Turn Your GitHub Into <span className="text-primary">Proof of Skill</span>
        </h1>
        <p className="font-body-base text-body-base text-on-surface-variant mx-auto mb-12 max-w-2xl">
          The elite talent lens for high-growth startups. We analyze your code history to build a
          high-fidelity portfolio that technical recruiters actually trust.
        </p>
        <div className="glass-card mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-xl p-2 sm:flex-row">
          <div className="relative flex w-full flex-1 items-center">
            <span className="material-symbols-outlined text-outline absolute left-4">
              alternate_email
            </span>
            <input
              className="font-body-base text-on-surface w-full bg-transparent py-3 pl-12 border-none focus:ring-0"
              placeholder="github-username"
              type="text"
            />
          </div>
          <button className="skill-gradient font-headline-md text-body-base flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3 text-white transition-all hover:opacity-90 sm:w-auto">
            Analyze <span className="material-symbols-outlined">analytics</span>
          </button>
        </div>
        <p className="font-label-bold text-label-bold text-outline mt-4 uppercase tracking-widest">
          No password required. Public repos only.
        </p>
      </div>
    </section>
  );
}
