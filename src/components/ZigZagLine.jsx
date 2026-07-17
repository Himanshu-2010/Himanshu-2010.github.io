import { useEffect, useRef } from 'react';

const PATH =
  'M 15 0 L 6 8 L 24 16 L 6 24 L 24 32 L 6 40 L 24 48 L 6 56 L 24 64 L 6 72 L 24 80 L 15 100';

const BLUE = [0, 212, 255];
const RED = [255, 59, 59];

const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) =>
  `rgb(${Math.round(lerp(c1[0], c2[0], t))}, ${Math.round(lerp(c1[1], c2[1], t))}, ${Math.round(
    lerp(c1[2], c2[2], t)
  )})`;

export default function ZigZagLine() {
  const pathRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const about = document.getElementById('about');
      const start = about ? about.offsetTop : 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      let p = (y - start) / (max - start);
      p = Math.max(0, Math.min(1, p));

      const path = pathRef.current;
      if (path) {
        path.style.strokeDashoffset = String(1 - p);
        path.style.stroke = mix(BLUE, RED, p);
      }
      const head = headRef.current;
      if (head && path) {
        const len = path.getTotalLength();
        const pt = path.getPointAtLength(p * len);
        head.setAttribute('cx', pt.x);
        head.setAttribute('cy', pt.y);
        head.style.fill = mix(BLUE, RED, p);
        head.style.opacity = p > 0 && p < 1 ? '1' : '0';
      }
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      className="fixed inset-0 w-full h-full z-[5] pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref={pathRef}
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
        style={{ filter: 'drop-shadow(0 0 4px rgba(0,212,255,0.5))' }}
      />
      <circle ref={headRef} r="2.4" fill="#00d4ff" style={{ opacity: 0 }} />
    </svg>
  );
}
