import { useScrollReveal } from '../../lib/motion';
import DATA from '../../data/info.json';

export default function AboutChapter() {
  const ref = useScrollReveal();
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="grid-bg" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          01 — The Builder
        </div>
        <h2 className="reveal font-heading italic text-white text-5xl md:text-7xl leading-[0.95] mb-8">
          Engineering is learned by building.
        </h2>
        <div className="reveal grid md:grid-cols-2 gap-8 mb-12">
          {DATA.bio.map((b, i) => (
            <p key={i} className="text-white/70 font-body text-lg leading-relaxed">
              {b}
            </p>
          ))}
        </div>
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
          {DATA.stats.map((s, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-5">
              <div className="font-heading italic text-4xl text-white">{s.value}</div>
              <div className="font-body text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="reveal mt-10 flex flex-wrap gap-8">
          {[
            { label: 'School', value: DATA.school },
            { label: 'OS', value: DATA.os },
            { label: 'Editor', value: DATA.editor },
          ].map((it) => (
            <div key={it.label}>
              <div className="font-body text-xs tracking-widest uppercase text-[var(--accent)] mb-1">
                {it.label}
              </div>
              <div className="font-body text-white/80">{it.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
