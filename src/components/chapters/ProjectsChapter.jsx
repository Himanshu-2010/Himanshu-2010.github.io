import { useState } from 'react';
import { useScrollReveal } from '../../lib/motion';
import DATA from '../../data/info.json';

const STATUS_COLOR = {
  complete: 'var(--accent4)',
  prototype: 'var(--accent3)',
  'open-source': 'var(--accent)',
  active: 'var(--accent)',
};

function DetailPanel({ project, onClose }) {
  const open = !!project;
  const catColor = {
    robotics: 'var(--accent)',
    software: '#a78bfa',
    electronics: 'var(--accent3)',
    embedded: 'var(--accent4)',
  };
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 z-[160] h-full w-full max-w-lg overflow-y-auto bg-[var(--bg2)] border-l border-white/10 p-8 transition-transform duration-500 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {project && (
          <div>
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/60 hover:text-white text-xl"
            >
              ✕
            </button>
            <span
              className="inline-block text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: `${catColor[project.category]}22`,
                color: catColor[project.category],
                border: `1px solid ${catColor[project.category]}55`,
              }}
            >
              {project.icon} {project.category}
            </span>
            <h3 className="font-heading italic text-3xl text-white mt-4 mb-2">{project.title}</h3>
            <p className="font-body text-white/65 text-sm leading-relaxed mb-6">{project.summary}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-[0.7rem] font-body px-2 py-1 rounded-full border border-white/10 text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>

            {project.systemParams?.length > 0 && (
              <>
                <div className="font-body text-xs tracking-widest uppercase text-[var(--accent)] mb-2">
                  System Parameters
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
                  {project.systemParams.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between gap-4 px-4 py-2 text-sm border-b border-white/5 last:border-0"
                    >
                      <span className="font-body text-white/50">{p.field}</span>
                      <span className="font-body text-white/85 text-right">{p.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.features?.length > 0 && (
              <>
                <div className="font-body text-xs tracking-widest uppercase text-[var(--accent)] mb-2">
                  Features
                </div>
                <ul className="font-body text-white/65 text-sm space-y-1 mb-6 list-disc pl-5">
                  {project.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </>
            )}

            {project.bom?.length > 0 && (
              <>
                <div className="font-body text-xs tracking-widest uppercase text-[var(--accent)] mb-2">
                  Bill of Materials
                </div>
                <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
                  {project.bom.map((b, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 gap-2 px-4 py-2 text-sm border-b border-white/5 last:border-0 font-mono"
                    >
                      <span className="text-white/85">{b.component}</span>
                      <span className="text-white/50">{b.spec}</span>
                      <span className="text-right text-white/70">×{b.qty}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.code && (
              <>
                <div className="font-body text-xs tracking-widest uppercase text-[var(--accent)] mb-2">
                  Code Snippet ({project.code.lang})
                </div>
                <pre className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-xs text-white/80 overflow-x-auto mb-6">
                  {project.code.snippet}
                </pre>
              </>
            )}

            {project.links && (
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass-strong rounded px-4 py-2 text-sm font-body text-white hover:scale-105 transition"
                  >
                    ⭐ GitHub
                  </a>
                )}
                {project.links.app && (
                  <a
                    href={project.links.app}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass-strong rounded px-4 py-2 text-sm font-body text-white hover:scale-105 transition"
                  >
                    🚀 Live App
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default function ProjectsChapter() {
  const ref = useScrollReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="grid-bg" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          02 — Machines
        </div>
        <h2 className="reveal font-heading italic text-white text-5xl md:text-7xl mb-10">
          What I've Built
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DATA.projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="reveal liquid-glass rounded-2xl p-6 text-left hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{p.icon}</span>
                <span
                  className="text-xs font-body uppercase tracking-wider"
                  style={{ color: STATUS_COLOR[p.status] || 'var(--muted)' }}
                >
                  {p.status}
                </span>
              </div>
              <div className="font-heading italic text-2xl text-white mb-2">{p.title}</div>
              <p className="text-white/65 font-body text-sm leading-relaxed line-clamp-3">
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[0.7rem] font-body px-2 py-1 rounded-full border border-white/10 text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
      <DetailPanel project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
