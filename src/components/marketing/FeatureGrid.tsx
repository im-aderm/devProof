export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-container-max px-6 py-section-gap">
      <div className="grid grid-cols-12 gap-6">
        {/* Large Feature */}
        <div className="glass-card group relative col-span-12 overflow-hidden rounded-xl p-8 lg:col-span-8">
          <div className="relative z-10 lg:w-1/2">
            <h3 className="font-headline-lg text-headline-lg mb-4">Portfolio Generation</h3>
            <p className="text-on-surface-variant mb-6">
              Automatically convert complex commit histories into beautiful, editorial-quality
              project case studies. No manual writing needed.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary/10 text-primary font-label-bold text-label-bold border-primary/20 rounded-full border px-3 py-1">
                AI Summaries
              </span>
              <span className="bg-primary/10 text-primary font-label-bold text-label-bold border-primary/20 rounded-full border px-3 py-1">
                Stack Mapping
              </span>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute bottom-0 right-0 h-2/3 w-2/3 rounded-tl-xl object-cover opacity-40 transition-opacity group-hover:opacity-60"
            alt="Software dashboard interface"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqMuoipS2Lp9uANUKbg049voGxrSWds947OMtvHmpzhKHV0ulDGoCB-AiEWNiwxnxv2TfEF6DoQVB7Lg-0Kl-gy-EKFbs0ElRvroc7UBbewIp5ZMdO52YLGJ6JFOs2X-NchRYvNayttZl3ZhjZR5e4_2qI0otEGOQ5sPs5s5Drz2B8sldSaGuT_--CsewRP0cWeYa7yqZ0byiP-PY5mjgPn3qT8oPsGnaJj4Uumh-nGRfPUhXQKO3UpO3b2u1R4B3y7KnfFvcj2HTA"
          />
        </div>

        {/* Small Feature */}
        <div className="glass-card col-span-12 flex flex-col justify-between rounded-xl p-8 lg:col-span-4">
          <div className="mb-8">
            <span className="material-symbols-outlined text-secondary mb-4 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              insights
            </span>
            <h3 className="font-headline-md text-headline-md mb-2">Readiness Scores</h3>
            <p className="text-on-surface-variant">
              Benchmark your technical depth against industry standards and 99th percentile
              engineers.
            </p>
          </div>
          <div className="bg-surface-container-highest h-2 w-full overflow-hidden rounded-full">
            <div
              className="skill-gradient h-full w-[88%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
            ></div>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">
              Current Readiness
            </span>
            <span className="font-label-bold text-label-bold text-primary">88/100</span>
          </div>
        </div>

        {/* Small Feature */}
        <div className="glass-card col-span-12 rounded-xl p-8 lg:col-span-4">
          <span className="material-symbols-outlined text-tertiary mb-4 text-4xl">dashboard</span>
          <h3 className="font-headline-md text-headline-md mb-2">Skill Dashboards</h3>
          <p className="text-on-surface-variant">
            Deep-dive into language proficiency, contribution frequency, and system architecture
            patterns.
          </p>
        </div>

        {/* Medium Feature */}
        <div className="glass-card col-span-12 grid items-center gap-8 rounded-xl p-8 md:grid-cols-2 lg:col-span-8">
          <div>
            <h3 className="font-headline-lg text-headline-lg mb-4">Precision Metrics</h3>
            <p className="text-on-surface-variant mb-4">
              We filter the noise of green squares to find the actual signal of code complexity and
              impact.
            </p>
            <ul className="space-y-3">
              <li className="text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                Code Impact Analysis
              </li>
              <li className="text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                Structural Integrity Audit
              </li>
              <li className="text-on-surface flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                Team Velocity Comparison
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-high border-outline/10 rounded-lg border p-4 text-center">
              <div className="text-primary text-2xl font-bold">94%</div>
              <div className="text-outline font-label-bold mt-1 text-xs uppercase">Accuracy</div>
            </div>
            <div className="bg-surface-container-high border-outline/10 rounded-lg border p-4 text-center">
              <div className="text-secondary text-2xl font-bold">12k+</div>
              <div className="text-outline font-label-bold mt-1 text-xs uppercase">Profiles</div>
            </div>
            <div className="bg-surface-container-high border-outline/10 rounded-lg border p-4 text-center">
              <div className="text-tertiary text-2xl font-bold">50ms</div>
              <div className="text-outline font-label-bold mt-1 text-xs uppercase">Latency</div>
            </div>
            <div className="bg-surface-container-high border-outline/10 rounded-lg border p-4 text-center">
              <div className="text-on-surface text-2xl font-bold">24/7</div>
              <div className="text-outline font-label-bold mt-1 text-xs uppercase">Sync</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
