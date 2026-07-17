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
    <div className="font-body text-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-heading italic text-2xl">Northwind</div>
        <a
          href="#l-pricing"
          className="bg-white text-black text-sm font-medium rounded px-5 py-2 hover:scale-[1.03] transition"
        >
          Get started
        </a>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          Now in early access
        </div>
        <h1 className="font-heading italic text-5xl md:text-7xl text-white mb-6">
          Ship your startup, faster.
        </h1>
        <p className="text-white/65 max-w-xl mx-auto mb-8">
          The all-in-one platform for founders who want to launch without the busywork.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#l-pricing"
            className="bg-white text-black text-sm font-medium rounded px-6 py-3 hover:scale-[1.03] transition"
          >
            Start free
          </a>
          <a
            href="#l-features"
            className="liquid-glass-strong text-sm rounded px-6 py-3 hover:scale-[1.03] transition"
          >
            See features
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10 flex flex-wrap justify-center gap-6 text-white/40 text-sm">
        {['Acme', 'Globex', 'Initech', 'Umbrella', 'Soylent'].map((b) => (
          <span key={b} className="font-heading italic text-lg">{b}</span>
        ))}
      </section>

      <section id="l-features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-3xl text-white mb-8 text-center">Everything you need</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="liquid-glass rounded-2xl p-6">
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-heading italic text-xl text-white mb-1">{f.title}</div>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-3xl text-white mb-8 text-center">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map(([n, t, d]) => (
            <div key={n} className="text-center">
              <div className="font-mono text-sm text-[var(--accent)] mb-2">{n}</div>
              <div className="font-heading italic text-2xl text-white mb-1">{t}</div>
              <p className="text-white/60 text-sm">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="l-pricing" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-3xl text-white mb-8 text-center">Simple pricing</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-6 ${
                t.hl ? 'bg-white text-black' : 'liquid-glass text-white'
              }`}
            >
              <div className={`text-xs uppercase tracking-wider ${t.hl ? 'text-black/60' : 'text-white/50'}`}>
                {t.name}
              </div>
              <div className="font-heading italic text-4xl my-2">{t.price}</div>
              <ul className={`text-sm space-y-1 mb-5 ${t.hl ? 'text-black/70' : 'text-white/65'}`}>
                {t.feats.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <a
                href="#l-pricing"
                className={`block text-center text-sm font-medium rounded px-4 py-2 transition hover:scale-[1.03] ${
                  t.hl ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                Choose {t.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="font-heading italic text-4xl text-white mb-4">Ready when you are</h2>
        <a
          href="#l-pricing"
          className="inline-block bg-white text-black text-sm font-medium rounded px-6 py-3 hover:scale-[1.03] transition"
        >
          Get started free
        </a>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} Northwind — Demo preview
      </footer>
    </div>
  );
}
