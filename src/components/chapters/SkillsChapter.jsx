import { useScrollReveal, gsap } from '../../lib/motion';
import { useEffect, useRef } from 'react';
import DATA from '../../data/info.json';

export default function SkillsChapter() {
  const ref = useScrollReveal();
  const barsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-fill', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: barsRef.current, start: 'top 80%' },
      });
    }, barsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full flex items-center py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="grid-bg" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          03 — Craft
        </div>
        <h2 className="reveal font-heading italic text-white text-5xl md:text-7xl mb-10">
          Tech Stack
        </h2>

        <div ref={barsRef} className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {DATA.skills.map((s) => (
            <div key={s.label} className="reveal">
              <div className="flex justify-between mb-2">
                <span className="font-body text-white/80">{s.label}</span>
                <span className="font-body text-white/50">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="skill-fill h-full rounded-full"
                  style={{
                    width: `${s.level}%`,
                    background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA.skillCats.map((c) => (
            <div key={c.name} className="liquid-glass rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3 text-white font-body">
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </div>
              <ul className="space-y-1">
                {c.items.map((it, j) => (
                  <li key={j} className="text-white/60 font-body text-sm">
                    · {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
