const posts = [
  {
    title: 'Building a quiet homepage',
    excerpt: 'Why restraint beats noise, and how to design a landing that respects attention.',
    tag: 'Design',
    date: 'Jun 12',
    read: '4 min',
    g: 'from-[#00d4ff] to-[#7c3aed]',
  },
  {
    title: 'The case for plain CSS',
    excerpt: 'Utility classes are great — until they are not. A pragmatic take on styling.',
    tag: 'CSS',
    date: 'May 28',
    read: '6 min',
    g: 'from-[#7c3aed] to-[#10b981]',
  },
  {
    title: 'Shipping on weekends',
    excerpt: 'A short note on sustainable side-project pacing and avoiding burnout.',
    tag: 'Life',
    date: 'May 09',
    read: '3 min',
    g: 'from-[#10b981] to-[#00d4ff]',
  },
];

export default function BlogDemo() {
  const [featured, ...rest] = posts;
  return (
    <div className="font-body text-white relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/3 w-[50vw] h-[50vw] max-w-2xl max-h-2xl rounded-full bg-[var(--accent2)]/10 blur-[120px]" />

      <header className="relative max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-heading italic text-2xl">The Marginalia</div>
        <nav className="flex gap-6 text-sm text-white/70">
          <a href="#b-posts" className="hover:text-white transition-colors">Posts</a>
          <a href="#b-about" className="hover:text-white transition-colors">About</a>
          <a
            href="#b-about"
            className="bg-white text-black rounded-full px-4 py-1.5 hover:scale-[1.04] transition"
          >
            Subscribe
          </a>
        </nav>
      </header>

      <section className="relative max-w-4xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1 className="font-heading italic text-5xl md:text-6xl text-white mb-3">Notes & essays</h1>
        <p className="text-white/55 max-w-lg mx-auto">
          On design, code, and the craft of shipping things.
        </p>
      </section>

      <section id="b-posts" className="relative max-w-4xl mx-auto px-6 py-10">
        <div className="group rounded-3xl overflow-hidden mb-12 bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all">
          <div className={`h-64 bg-gradient-to-br ${featured.g} relative`}>
            <span className="absolute top-4 left-4 text-[0.65rem] uppercase tracking-widest px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
              Featured
            </span>
          </div>
          <div className="p-8">
            <div className="text-xs uppercase tracking-wider text-[var(--accent)] mb-2">
              {featured.tag} · {featured.date} · {featured.read}
            </div>
            <h2 className="font-heading italic text-4xl text-white mb-3">{featured.title}</h2>
            <p className="text-white/65 max-w-2xl text-lg">{featured.excerpt}</p>
          </div>
        </div>

        <h3 className="font-heading italic text-2xl text-white mb-6">Latest posts</h3>
        <div className="space-y-4">
          {rest.map((p) => (
            <article
              key={p.title}
              className="group rounded-2xl p-5 flex gap-5 items-center bg-white/[0.03] border border-white/10 hover:border-white/25 hover:-translate-y-0.5 transition-all"
            >
              <div className={`w-28 h-28 rounded-xl bg-gradient-to-br ${p.g} shrink-0`} />
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-1.5">
                  {p.tag} · {p.date} · {p.read}
                </div>
                <h4 className="font-heading italic text-2xl text-white mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                  {p.title}
                </h4>
                <p className="text-white/60 text-sm">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="b-about"
        className="relative max-w-4xl mx-auto px-6 py-16 mt-8 border-t border-white/10"
      >
        <div className="rounded-3xl p-8 md:p-10 bg-white/[0.03] border border-white/10 text-center">
          <h2 className="font-heading italic text-4xl text-white mb-3">Get new posts by email</h2>
          <p className="text-white/60 max-w-lg mx-auto mb-6">
            A small, quiet place for notes on design and code. New posts when they are ready —
            not on a schedule.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              placeholder="you@example.com"
              className="flex-1 bg-black/25 border border-white/10 rounded-full px-5 py-3 text-sm outline-none focus:border-[var(--accent)]"
            />
            <button className="bg-white text-black text-sm font-medium rounded-full px-6 py-3 hover:scale-[1.04] transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} The Marginalia — Demo preview
      </footer>
    </div>
  );
}
