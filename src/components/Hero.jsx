import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from './HeroBackground';
import { gsap } from '../lib/motion';
import DATA from '../data/info.json';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const bgRef = useRef();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      xTo(((e.clientX - cx) / cx) * 20);
      yTo(((e.clientY - cy) / cy) * 20);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const toProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div ref={bgRef} className="absolute inset-0 scale-[1.08] origin-center">
        <HeroBackground />
      </div>

      <div
        className={`relative z-20 w-full px-4 text-center transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="font-body text-xs tracking-[0.3em] uppercase text-white/60 mb-4">
          {DATA.tagline}
        </div>
        <h1 className="hero-title select-none">{DATA.name}</h1>
        <p className="font-body text-white/70 mt-2 text-lg max-w-xl mx-auto">{DATA.subtitle}</p>
      </div>

      <div
        className={`absolute bottom-12 left-0 right-0 px-10 flex items-end justify-between z-20 transition-all duration-1000 delay-300 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-sm font-body font-light text-white/75 max-w-[220px] leading-relaxed">
          {DATA.subtitle}
        </p>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex items-center gap-3">
          <Link
            to="/chat"
            className="group relative bg-white text-black text-sm font-body font-medium rounded px-6 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03]"
          >
            <span className="relative z-10">Talk to the AI</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
          <a
            href="#projects"
            onClick={toProjects}
            className="liquid-glass group text-white text-sm font-body font-medium rounded px-6 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)]"
          >
            See projects
          </a>
        </div>
        <p className="text-sm font-body font-light text-white/75 max-w-[220px] leading-relaxed text-right">
          Autonomous robots, low-level firmware, and on-device AI — built and tested by hand.
        </p>
      </div>
    </section>
  );
}
