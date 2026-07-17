import { useScrollReveal } from '../../lib/motion';
import { useRef, useState } from 'react';
import DATA from '../../data/info.json';

export default function GalleryChapter() {
  const ref = useScrollReveal();
  const trackRef = useRef();
  const [lightbox, setLightbox] = useState(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0 });

  const onDown = (e) => {
    drag.current = {
      active: true,
      startX: e.pageX - trackRef.current.offsetLeft,
      scroll: trackRef.current.scrollLeft,
    };
  };
  const onMove = (e) => {
    if (!drag.current.active) return;
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = drag.current.scroll - (x - drag.current.startX) * 1.5;
  };
  const onUp = () => {
    drag.current.active = false;
  };

  return (
    <section
      id="gallery"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 overflow-hidden"
    >
      <div className="grid-bg" />
      <div ref={ref} className="relative z-10 w-full">
        <div className="reveal px-6 md:px-16 font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
          04 — The Lab
        </div>
        <h2 className="reveal px-6 md:px-16 font-heading italic text-white text-5xl md:text-7xl mb-4">
          In the Lab & Field
        </h2>
        <p className="reveal px-6 md:px-16 font-body text-white/60 mb-8">Click & drag to explore.</p>

        <div
          ref={trackRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          className="flex gap-5 overflow-x-auto pb-6 px-6 md:px-16 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none' }}
        >
          {DATA.gallery.map((item, i) => (
            <div
              key={i}
              onClick={() => !drag.current.active && setLightbox(item)}
              className="reveal shrink-0 liquid-glass rounded-2xl overflow-hidden w-[320px] h-[240px] relative group"
            >
              {item.type === 'video' ? (
                <video src={item.src} muted loop className="w-full h-full object-cover" />
              ) : (
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent font-mono text-xs text-white">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white text-2xl hover:text-[var(--accent)]"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          {lightbox.type === 'video' ? (
            <video src={lightbox.src} controls autoPlay className="max-w-[90vw] max-h-[85vh]" />
          ) : (
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
          )}
        </div>
      )}
    </section>
  );
}
