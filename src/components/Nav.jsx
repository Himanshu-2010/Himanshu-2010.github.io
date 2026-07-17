import { Link } from 'react-router-dom';

function LogoMark() {
  return (
    <svg width="44" height="26" viewBox="0 0 44 26" fill="none" aria-label="logo">
      <rect x="0" y="3" width="14" height="20" rx="3" fill="white" />
      <rect x="16" y="3" width="12" height="20" rx="3" fill="white" opacity="0.85" />
      <rect x="30" y="3" width="14" height="20" rx="3" fill="white" />
    </svg>
  );
}

const NAV_LINKS = ['About', 'Projects', 'Skills', 'Gallery', 'Contact'];

export default function Nav() {
  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap">
      <div className="liquid-glass flex items-center gap-6 rounded px-4 py-2.5">
        <LogoMark />
        <div className="flex items-center gap-5">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={go(l.toLowerCase())}
              className="text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 ml-4">
          <a
            href="#contact"
            onClick={go('contact')}
            className="text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200"
          >
            Sign in
          </a>
          <Link
            to="/chat"
            className="liquid-glass-strong text-sm font-body font-medium text-white rounded px-4 py-1.5 transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_16px_2px_rgba(255,255,255,0.12)] active:scale-[0.97]"
          >
            Try it free
          </Link>
        </div>
      </div>
    </nav>
  );
}
