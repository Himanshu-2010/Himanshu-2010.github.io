const features = [
  { icon: '⚡', title: 'Blazing fast', desc: 'Sub-second loads with edge rendering and smart caching.' },
  { icon: '🎯', title: 'Conversion-first', desc: 'Layouts built to turn visitors into signups.' },
  { icon: '🔒', title: 'Secure by default', desc: 'Best-practice headers, auth, and data handling.' },
  { icon: '📈', title: 'Analytics ready', desc: 'Plug in your stack and measure what matters.' },
];

const steps = [
  ['01', 'Sign up', 'Create your account in seconds.'],
  ['02', 'Connect', 'Link your data and integrations.'],
  ['03', 'Launch', 'Ship and start growing.'],
];

const tiers = [
  { name: 'Starter', price: '₹0', feats: ['1 project', 'Community support'], hl: false },
  { name: 'Pro', price: '₹999', feats: ['Unlimited projects', 'Priority support', 'Analytics'], hl: true },
  { name: 'Scale', price: '₹2,999', feats: ['Teams', 'SSO', 'Dedicated CSM'], hl: false },
];

export default function LandingDemo() {
  return (
    <div className="font-body text-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 w-[60vw] h-[60vw] max-w-2xl max-h-2xl rounded-full bg-[var(--accent2)]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -left-20 w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full bg-[var(--accent)]/10 blur-[120px]" />

      <header className="relative max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-heading italic text-2xl">Northwind</div>
        <a
          href="#l-pricing"
          className="bg-white text-black text-sm font-medium rounded-full px-6 py-2.5 hover:scale-[1.04] transition"
        >
          Get started
        </a>
      </header>

      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--accent)] mb-6 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5">
          ✦ Now in early access
        </div>
        <h1 className="font-heading italic text-6xl md:text-8xl text-white mb-6 leading-[0.95]">
          Ship your startup,<br />faster.
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
          The all-in-one platform for founders who want to launch without the busywork.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#l-pricing"
            className="bg-white text-black text-sm font-medium rounded-full px-7 py-3.5 hover:scale-[1.04] transition shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
          >
            Start free
          </a>
          <a
            href="#l-features"
            className="border border-white/20 text-sm rounded-full px-7 py-3.5 hover:bg-white/5 transition"
          >
            See features
          </a>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-16 flex flex-wrap justify-center items-center gap-8 opacity-50">
        {['Acme', 'Globex', 'Initech', 'Umbrella', 'Soylent'].map((b) => (
          <span key={b} className="font-heading italic text-xl">{b}</span>
        ))}
      </section>

      <section id="l-features" className="relative max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-4xl text-white mb-10 text-center">Everything you need</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 bg-white/[0.03] border border-white/10 hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className="font-heading italic text-xl text-white mb-1.5">{f.title}</div>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-4xl text-white mb-12 text-center">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map(([n, t, d]) => (
            <div key={n} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center font-mono text-sm text-[var(--accent)] border border-[var(--accent)]/30 bg-[var(--accent)]/5">
                {n}
              </div>
              <div className="font-heading italic text-2xl text-white mb-1.5">{t}</div>
              <p className="text-white/60 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="l-pricing" className="relative max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-4xl text-white mb-10 text-center">Simple pricing</h2>
        <div className="grid sm:grid-cols-3 gap-5 items-start">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-7 transition-all duration-300 ${
                t.hl
                  ? 'bg-white text-black scale-[1.04] shadow-[0_12px_40px_rgba(255,255,255,0.18)]'
                  : 'bg-white/[0.03] border border-white/10 text-white hover:border-white/25'
              }`}
            >
              {t.hl && (
                <div className="text-[0.65rem] uppercase tracking-widest font-medium text-[var(--accent2)] mb-2">
                  Most popular
                </div>
              )}
              <div className={`text-xs uppercase tracking-wider ${t.hl ? 'text-black/60' : 'text-white/50'}`}>
                {t.name}
              </div>
              <div className="font-heading italic text-5xl my-3">{t.price}</div>
              <ul className={`text-sm space-y-2 mb-6 ${t.hl ? 'text-black/70' : 'text-white/65'}`}>
                {t.feats.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className={t.hl ? 'text-[var(--accent2)]' : 'text-[var(--accent4)]'}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#l-pricing"
                className={`block text-center text-sm font-medium rounded-full px-4 py-2.5 transition hover:scale-[1.03] ${
                  t.hl ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                Choose {t.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="font-heading italic text-5xl text-white mb-6">Ready when you are</h2>
        <a
          href="#l-pricing"
          className="inline-block bg-white text-black text-sm font-medium rounded-full px-8 py-4 hover:scale-[1.04] transition shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
        >
          Get started free →
        </a>
      </section>

      <footer className="relative border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} Northwind — Demo preview
      </footer>
    </div>
  );
}
