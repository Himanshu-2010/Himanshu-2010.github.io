import { Link } from 'react-router-dom';
import DATA from '../data/info.json';

const CHAPTERS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];

const CONNECT = [
  { label: 'GitHub', href: DATA.contact.github },
  { label: 'Instagram', href: DATA.contact.instagram },
  { label: 'Email', href: `mailto:${DATA.contact.email}` },
  { label: 'Portfolio', href: DATA.contact.site },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[var(--bg2)]/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-heading italic text-3xl text-white">{DATA.name}</div>
            <p className="font-body text-white/60 mt-3 max-w-xs leading-relaxed">{DATA.subtitle}</p>
          </div>

          <div>
            <div className="font-body text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
              Chapters
            </div>
            <ul className="space-y-2 font-body text-white/70">
              {CHAPTERS.map((c) => (
                <li key={c.id}>
                  <Link to={`/#${c.id}`} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-body text-xs uppercase tracking-widest text-[var(--accent)] mb-4">
              Connect
            </div>
            <ul className="space-y-2 font-body text-white/70">
              {CONNECT.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 font-mono text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} {DATA.name}. Built with React + GSAP.
          </span>
          <span>Class 10 · India</span>
        </div>
      </div>
    </footer>
  );
}
