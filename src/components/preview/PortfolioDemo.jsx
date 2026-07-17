const projects = [
  { title: 'Nebula Store', cat: 'E-commerce', g: 'from-[#00d4ff] to-[#7c3aed]' },
  { title: 'Orbit Labs', cat: 'Brand', g: 'from-[#7c3aed] to-[#10b981]' },
  { title: 'Pulse App', cat: 'Product', g: 'from-[#10b981] to-[#00d4ff]' },
  { title: 'Drift Studio', cat: 'Web', g: 'from-[#f59e0b] to-[#00d4ff]' },
  { title: 'Vertex AI', cat: 'Research', g: 'from-[#7c3aed] to-[#f59e0b]' },
  { title: 'Lumen', cat: 'Product', g: 'from-[#00d4ff] to-[#10b981]' },
];

export default function PortfolioDemo() {
  return (
    <div className="font-body text-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-3xl rounded-full bg-[var(--accent)]/10 blur-[120px]" />

      <header className="relative max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-heading italic text-2xl">A. Rivera</div>
        <nav className="hidden sm:flex gap-6 text-sm text-white/70">
          <a href="#p-work" className="hover:text-white transition-colors">Work</a>
          <a href="#p-about" className="hover:text-white transition-colors">About</a>
          <a href="#p-contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
      </header>

      <section className="relative max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[var(--accent)] mb-6 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent4)] animate-pulse" />
          Available for work
        </div>
        <h1 className="font-heading italic text-6xl md:text-8xl text-white mb-6 leading-[0.95]">
          I build things<br />that move.
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
          Independent designer and front-end developer crafting fast, expressive websites
          and product experiences.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#p-work"
            className="bg-white text-black text-sm font-medium rounded-full px-7 py-3.5 hover:scale-[1.04] transition shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
          >
            View my work
          </a>
          <a
            href="#p-contact"
            className="border border-white/20 text-sm rounded-full px-7 py-3.5 hover:bg-white/5 transition"
          >
            Get in touch
          </a>
        </div>
      </section>

      <section id="p-about" className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center bg-white/[0.03] border border-white/10 ring-1 ring-white/5">
          <div className="flex-1">
            <h2 className="font-heading italic text-4xl text-white mb-4">About</h2>
            <p className="text-white/65 leading-relaxed text-lg">
              I help founders and studios ship polished web products — from first wireframe to
              launch. Equal parts design and code.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center shrink-0">
            {[
              ['6+', 'Years'],
              ['40+', 'Projects'],
              ['12', 'Awards'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-heading italic text-4xl text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)]">
                  {v}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="p-work" className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading italic text-4xl text-white">Selected Work</h2>
          <span className="text-white/40 text-sm">2024 — 2025</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 hover:border-white/25 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-44 bg-gradient-to-br ${p.g} relative`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-[var(--accent)]">{p.cat}</div>
                <div className="font-heading italic text-2xl text-white">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="p-contact" className="relative max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="font-heading italic text-5xl text-white mb-4">Let's work together</h2>
        <p className="text-white/60 text-lg mb-8">Available for select projects this quarter.</p>
        <a
          href="mailto:hello@example.com"
          className="inline-block bg-white text-black text-sm font-medium rounded-full px-8 py-4 hover:scale-[1.04] transition shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
        >
          Say hello →
        </a>
      </section>

      <footer className="relative border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} A. Rivera — Demo preview
      </footer>
    </div>
  );
}
