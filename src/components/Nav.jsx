import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LogoMark() {
  return (
    <svg width="44" height="26" viewBox="0 0 44 26" fill="none" aria-label="logo">
      <rect x="0" y="3" width="14" height="20" rx="3" fill="white" />
      <rect x="16" y="3" width="12" height="20" rx="3" fill="white" opacity="0.85" />
      <rect x="30" y="3" width="14" height="20" rx="3" fill="white" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [active, setActive] = useState('');
  const location = useLocation();

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [location.pathname]);

  const logoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50">
      <div className="liquid-glass flex items-center gap-3 sm:gap-6 rounded px-3 sm:px-4 py-2 max-w-[94vw]">
        <Link to="/" onClick={logoClick} aria-label="Home">
          <LogoMark />
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.id}
              to={`/#${l.id}`}
              className={`text-xs sm:text-sm font-body font-light transition-colors duration-200 ${
                active === l.id
                  ? 'text-white underline decoration-[var(--accent)] decoration-2 underline-offset-4'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          to="/chat"
          className="liquid-glass-strong text-xs sm:text-sm font-body font-medium text-white rounded px-3 sm:px-4 py-1.5 transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_16px_2px_rgba(255,255,255,0.12)] active:scale-[0.97]"
        >
          Try it free
        </Link>
      </div>
    </nav>
  );
}
