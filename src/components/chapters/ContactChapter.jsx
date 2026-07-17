import { useScrollReveal } from '../../lib/motion';
import { Link } from 'react-router-dom';
import DATA from '../../data/info.json';

export default function ContactChapter() {
  const ref = useScrollReveal();
  const contacts = [
    { icon: '⭐', label: 'GitHub', value: 'himanshu-2010', href: DATA.contact.github },
    { icon: '📸', label: 'Instagram', value: '@mors__369', href: DATA.contact.instagram },
    { icon: '✉️', label: 'Email', value: DATA.contact.email, href: `mailto:${DATA.contact.email}` },
    { icon: '🌐', label: 'Portfolio', value: 'himanshu-port.vercel.app', href: DATA.contact.site },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="grid-bg" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          05 — The Signal
        </div>
        <h2 className="reveal font-heading italic text-white text-5xl md:text-7xl mb-6">
          Let's Connect
        </h2>
        <p className="reveal font-body text-white/65 text-lg mb-10 max-w-xl">
          Student engineer looking for collaborations, mentorship, and cool project ideas.
        </p>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="liquid-glass rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform"
            >
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="font-body text-white/50 text-xs uppercase tracking-wider">
                  {c.label}
                </div>
                <div className="font-body text-white">{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="reveal flex items-center gap-4 flex-wrap">
          <Link
            to="/chat"
            className="group relative bg-white text-black text-sm font-body font-medium rounded px-6 py-3 overflow-hidden active:scale-[0.97] transition-all hover:scale-[1.03]"
          >
            <span className="relative z-10">Talk to the AI</span>
          </Link>
          <span className="font-body text-white/50 text-sm">
            Ask Orion about my projects, skills, or how I build.
          </span>
        </div>
      </div>

      <footer className="relative z-10 mt-24 text-center font-mono text-xs text-white/40 border-t border-white/10 pt-8">
        Built by {DATA.name} · Class 10 · India · {new Date().getFullYear()}
      </footer>
    </section>
  );
}
