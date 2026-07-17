import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Animates direct children / matched `.reveal` elements inside the ref on scroll.
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll('.reveal');
    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
          ...options,
        });
      });
    }, root);
    return () => ctx.revert();
  }, [options]);
  return ref;
}
