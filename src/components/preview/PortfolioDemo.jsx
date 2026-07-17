const projects = [
  { title: 'Nebula Store', cat: 'Web', g: 'from-[var(--accent)]/30 to-[var(--accent2)]/30' },
  { title: 'Orbit Labs', cat: 'Brand', g: 'from-[var(--accent2)]/30 to-[var(--accent4)]/30' },
  { title: 'Pulse App', cat: 'Product', g: 'from-[var(--accent4)]/30 to-[var(--accent)]/30' },
  { title: 'Drift Studio', cat: 'Web', g: 'from-[var(--accent3)]/30 to-[var(--accent)]/30' },
  { title: 'Vertex AI', cat: 'Research', g: 'from-[var(--accent2)]/30 to-[var(--accent3)]/30' },
  { title: 'Lumen', cat: 'Product', g: 'from-[var(--accent)]/30 to-[var(--accent4)]/30' },
];

export default function PortfolioDemo() {
  return (
    <div className="font-body text-white">
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-heading italic text-2xl">A. Rivera</div>
        <nav className="hidden sm:flex gap-6 text-sm text-white/70">
          <a href="#p-work" className="hover:text-white">Work</a>
          <a href="#p-about" className="hover:text-white">About</a>
          <a href="#p-contact" className="hover:text-white">Contact</a>
        </nav>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          Designer · Developer
        </div>
        <h1 className="font-heading italic text-5xl md:text-7xl text-white mb-6">
          I build things that move.
        </h1>
        <p className="text-white/65 max-w-xl mx-auto mb-8">
          Independent designer and front-end developer crafting fast, expressive websites
          and product experiences.
        </p>
        <a
          href="#p-work"
          className="inline-block bg-white text-black text-sm font-medium rounded px-6 py-3 hover:scale-[1.03] transition"
        >
          View my work
        </a>
      </section>

      <section id="p-about" className="max-w-5xl mx-auto px-6 py-16">
        <div className="liquid-glass rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="font-heading italic text-3xl text-white mb-3">About</h2>
            <p className="text-white/65 leading-relaxed">
              I help founders and studios ship polished web products — from first wireframe to
              launch. Equal parts design and code.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              ['6+', 'Years'],
              ['40+', 'Projects'],
              ['12', 'Awards'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-heading italic text-3xl text-white">{v}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="p-work" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-heading italic text-3xl text-white mb-6">Selected Work</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div key={p.title} className="liquid-glass rounded-2xl overflow-hidden">
              <div className={`h-40 bg-gradient-to-br ${p.g}`} />
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-white/50">{p.cat}</div>
                <div className="font-heading italic text-xl text-white">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="p-contact" className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="font-heading italic text-4xl text-white mb-3">Let's work together</h2>
        <p className="text-white/60 mb-6">Available for select projects this quarter.</p>
        <a
          href="mailto:hello@example.com"
          className="inline-block bg-white text-black text-sm font-medium rounded px-6 py-3 hover:scale-[1.03] transition"
        >
          Say hello
        </a>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} A. Rivera — Demo preview
      </footer>
    </div>
  );
}
