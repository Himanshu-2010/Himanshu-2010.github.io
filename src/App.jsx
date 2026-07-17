import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import ChatPage from './components/ChatPage.jsx';
import Nav from './components/Nav.jsx';
import TerminalOverlay from './components/TerminalOverlay.jsx';

// ─── STARFIELD ────────────────────────────────────────────────────────────────
function Starfield() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    const stars = [];
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
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.6 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,200,255,${s.opacity})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
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
    }, 50);
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
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      <TerminalOverlay />
    </>
  );
}
