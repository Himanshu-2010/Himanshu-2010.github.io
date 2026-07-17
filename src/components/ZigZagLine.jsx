import { useEffect, useRef } from 'react';

// Full-width zig-zag: swings left <-> right while descending.
const PATH =
  'M 8 0 L 92 10 L 8 20 L 92 30 L 8 40 L 92 50 L 8 60 L 92 70 L 8 80 L 92 90 L 50 100';

const BLUE = [0, 212, 255];
const RED = [255, 59, 59];

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) =>
  `rgb(${Math.round(lerp(c1[0], c2[0], t))}, ${Math.round(lerp(c1[1], c2[1], t))}, ${Math.round(
    lerp(c1[2], c2[2], t)
  )})`;

export default function ZigZagLine() {
  const mainRef = useRef(null);
  const glowRef = useRef(null);
  const headRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const about = document.getElementById('about');
      const start = about ? about.offsetTop : 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      let p = (window.scrollY - start) / (max - start);
      p = Math.max(0, Math.min(1, p));

      const col = mix(BLUE, RED, p);

      [mainRef.current, glowRef.current].forEach((pth) => {
        if (!pth) return;
        pth.style.stroke = col;
        pth.style.strokeDashoffset = String(1 - p);
        const blur = pth === glowRef.current ? 14 : 7;
        pth.style.filter = `drop-shadow(0 0 ${blur}px ${col})`;
      });

      const main = mainRef.current;
      if (main) {
        const len = main.getTotalLength();
        const pt = main.getPointAtLength(p * len);
        const pulse = 2.6 + Math.sin(performance.now() / 160) * 1.1;
        [headRef.current, coreRef.current].forEach((c) => {
          if (!c) return;
          c.setAttribute('cx', pt.x);
          c.setAttribute('cy', pt.y);
        });
        if (headRef.current) {
          headRef.current.setAttribute('r', String(pulse));
          headRef.current.style.fill = col;
          headRef.current.style.opacity = p > 0 && p < 1 ? '1' : '0';
          headRef.current.style.filter = `drop-shadow(0 0 10px ${col})`;
        }
        if (coreRef.current) {
          coreRef.current.setAttribute('r', String(pulse * 0.45));
          coreRef.current.style.fill = '#ffffff';
          coreRef.current.style.opacity = p > 0 && p < 1 ? '0.9' : '0';
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      className="fixed inset-0 w-full h-full z-[5] pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={glowRef}
        d={PATH}
        fill="none"
        stroke="#00d4ff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        opacity="0.55"
      />
      <path
        ref={mainRef}
        d={PATH}
        fill="none"
        stroke="#00d4ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
      />
      <circle ref={headRef} r="2.6" fill="#00d4ff" style={{ opacity: 0 }} />
      <circle ref={coreRef} r="1.2" fill="#ffffff" style={{ opacity: 0 }} />
    </svg>
  );
}
