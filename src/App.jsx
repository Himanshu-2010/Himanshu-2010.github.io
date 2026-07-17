import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import ChatPage from './components/ChatPage.jsx';
import ServicesPage from './components/ServicesPage.jsx';
import Nav from './components/Nav.jsx';
import TerminalOverlay from './components/TerminalOverlay.jsx';

// ─── STARFIELD (mouse-reactive particles) ─────────────────────────────────────
function Starfield() {
  const canvasRef = useRef();
  const mouse = useRef({ x: -9999, y: -9999 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const stars = [];
    const R = 150;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0,
        vy: 0,
        r: Math.random() * 1.4 + 0.3,
        drift: Math.random() * 0.25 + 0.05,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) onLeave();
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      stars.forEach((s) => {
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < R && dist > 0.01) {
          const force = ((R - dist) / R) * 1.6;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }
        s.vx *= 0.92;
        s.vy *= 0.92;
        s.x += s.vx;
        s.y += s.vy + s.drift;

        if (s.x < 0) s.x += canvas.width;
        if (s.x > canvas.width) s.x -= canvas.width;
        if (s.y < 0) s.y += canvas.height;
        if (s.y > canvas.height) s.y -= canvas.height;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,200,255,${s.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);
  return (
    <div className="starfield">
      <canvas ref={canvasRef} />
    </div>
  );
}

// ─── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor() {
  const cursorRef = useRef();
  const trailRef = useRef();
  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      if (trailRef.current) trailRef.current.style.transform = `translate(${x - 18}px, ${y - 18}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-trail" ref={trailRef} />
    </>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setWidth(total ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[400]"
      style={{ width: `${width}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
    />
  );
}

// ─── APP LAYOUT ──────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = location.hash.slice(1);
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <>
      <Cursor />
      <ProgressBar />
      <Starfield />
      <div className="noise-overlay" />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      <TerminalOverlay />
    </>
  );
}
