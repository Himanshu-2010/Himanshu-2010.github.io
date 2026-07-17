const posts = [
  {
    title: 'Building a quiet homepage',
    excerpt: 'Why restraint beats noise, and how to design a landing that respects attention.',
    tag: 'Design',
    date: 'Jun 12',
    g: 'from-[var(--accent)]/30 to-[var(--accent2)]/30',
  },
  {
    title: 'The case for plain CSS',
    excerpt: 'Utility classes are great — until they are not. A pragmatic take on styling.',
    tag: 'CSS',
    date: 'May 28',
    g: 'from-[var(--accent2)]/30 to-[var(--accent4)]/30',
  },
  {
    title: 'Shipping on weekends',
    excerpt: 'A short note on sustainable side-project pacing and avoiding burnout.',
    tag: 'Life',
    date: 'May 09',
    g: 'from-[var(--accent4)]/30 to-[var(--accent)]/30',
  },
];

export default function BlogDemo() {
  const [featured, ...rest] = posts;
  return (
    <div className="font-body text-white">
      <header className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-heading italic text-2xl">The Marginalia</div>
        <nav className="flex gap-5 text-sm text-white/70">
          <a href="#b-posts" className="hover:text-white">Posts</a>
          <a href="#b-about" className="hover:text-white">About</a>
        </nav>
      </header>

      <section id="b-posts" className="max-w-4xl mx-auto px-6 py-12">
        <div className="liquid-glass rounded-3xl overflow-hidden mb-10">
          <div className={`h-56 bg-gradient-to-br ${featured.g}`} />
          <div className="p-8">
            <div className="text-xs uppercase tracking-wider text-[var(--accent)] mb-2">
              Featured · {featured.tag}
            </div>
            <h1 className="font-heading italic text-4xl text-white mb-3">{featured.title}</h1>
            <p className="text-white/65 max-w-2xl mb-4">{featured.excerpt}</p>
            <div className="text-sm text-white/40">{featured.date} · 4 min read</div>
          </div>
        </div>

        <h2 className="font-heading italic text-2xl text-white mb-5">Latest posts</h2>
        <div className="space-y-4">
          {rest.map((p) => (
            <article
              key={p.title}
              className="liquid-glass rounded-2xl p-6 flex gap-5 items-center"
            >
              <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${p.g} shrink-0`} />
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50 mb-1">
                  {p.tag} · {p.date}
                </div>
                <h3 className="font-heading italic text-2xl text-white mb-1">{p.title}</h3>
                <p className="text-white/60 text-sm">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="b-about" className="max-w-4xl mx-auto px-6 py-16 border-t border-white/10">
        <h2 className="font-heading italic text-3xl text-white mb-3">About this blog</h2>
        <p className="text-white/65 max-w-2xl leading-relaxed">
          A small, quiet place for notes on design, code, and the craft of shipping things.
          New posts when they are ready — not on a schedule.
        </p>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
        © {new Date().getFullYear()} The Marginalia — Demo preview
      </footer>
    </div>
  );
}
