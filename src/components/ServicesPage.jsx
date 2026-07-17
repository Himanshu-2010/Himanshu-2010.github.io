import { useState } from 'react';
import { useScrollReveal } from '../lib/motion';
import DATA from '../data/info.json';

const EMAIL = DATA.contact.email;
const SERVICES = DATA.services;

function mailto(subject, body) {
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function MediaSlot({ video, images, label }) {
  const src = images && images[0];
  if (video) {
    return (
      <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 bg-black/40">
        <video src={video} controls className="w-full h-full object-cover" />
      </div>
    );
  }
  if (src) {
    return (
      <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 bg-black/40">
        <img src={src} alt={label} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
      <span className="font-body text-white/30 text-xs uppercase tracking-widest">
        Media soon
      </span>
    </div>
  );
}

const inputCls =
  'bg-black/25 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm outline-none focus:border-[var(--accent)] placeholder:text-white/30';

export default function ServicesPage() {
  const heroRef = useScrollReveal();
  const webRef = useScrollReveal();
  const elecRef = useScrollReveal();
  const procRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'website',
    budget: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submitEnquiry = (e) => {
    e.preventDefault();
    const subject = `Project enquiry (${form.type}) — ${form.name || 'anonymous'}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Type: ${form.type}`,
      `Budget: ${form.budget || 'not specified'}`,
      '',
      form.message,
    ].join('\n');
    mailto(subject, body);
    setSent(true);
  };

  const orderWebsite = (w) => {
    mailto(
      `Website order: ${w.title}`,
      `Hi Himanshu,\n\nI'd like to order the "${w.title}" website (${w.price}).\n\nMy details:\n- Name:\n- Email:\n- Notes:\n`
    );
  };

  const orderElectronics = (p) => {
    mailto(
      `Electronics order: ${p.title}`,
      `Hi Himanshu,\n\nI'd like to order the "${p.title}" (${p.price}).\n${SERVICES.ordering.electronicNote}\n\nMy details:\n- Name:\n- Email:\n- Shipping address:\n- Sending my own components? (yes/no):\n`
    );
  };

  const requestBuild = () => {
    setForm((f) => ({ ...f, type: 'electronics' }));
    setSent(false);
    const el = document.getElementById('enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      {/* HERO */}
      <section
        id="services-hero"
        className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 md:px-16 overflow-hidden"
      >
        <div className="grid-bg" />
        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto w-full text-center">
          <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            {SERVICES.hero.eyebrow}
          </div>
          <h1 className="reveal font-heading italic text-white text-5xl md:text-7xl mb-6">
            {SERVICES.hero.title}
          </h1>
          <p className="reveal font-body text-white/65 text-lg max-w-2xl mx-auto mb-10">
            {SERVICES.hero.subtitle}
          </p>
          <div className="reveal flex gap-4 justify-center flex-wrap">
            <a
              href="#websites"
              className="bg-white text-black text-sm font-body font-medium rounded px-6 py-3 hover:scale-[1.03] transition active:scale-95"
            >
              Browse websites
            </a>
            <button
              onClick={requestBuild}
              className="liquid-glass-strong text-sm font-body font-medium text-white rounded px-6 py-3 hover:scale-[1.03] transition active:scale-95"
            >
              Request a build
            </button>
          </div>
        </div>
      </section>

      {/* WEBSITES */}
      <section
        id="websites"
        className="relative min-h-screen w-full py-28 px-6 md:px-16 overflow-hidden"
      >
        <div className="grid-bg" />
        <div ref={webRef} className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            Premade Websites
          </div>
          <h2 className="reveal font-heading italic text-white text-4xl md:text-6xl mb-4">
            Websites, ready to ship
          </h2>
          <p className="reveal font-body text-white/60 mb-10 max-w-xl">
            Preview any site free. Pay once for the full source and deployment.
          </p>
          <div className="reveal grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.websites.map((w) => (
              <div key={w.id} className="liquid-glass rounded-2xl p-6 flex flex-col">
                <div className="font-heading italic text-2xl text-white mb-2">{w.title}</div>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4 flex-1">
                  {w.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[0.7rem] font-body px-2 py-1 rounded-full border border-white/10 text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="font-body text-white text-lg mb-4">{w.price}</div>
                <div className="flex gap-2">
                  <a
                    href={w.preview}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center liquid-glass-strong rounded px-3 py-2 text-sm font-body text-white hover:scale-105 transition"
                  >
                    Free preview
                  </a>
                  <button
                    onClick={() => orderWebsite(w)}
                    className="flex-1 text-center bg-white text-black rounded px-3 py-2 text-sm font-body font-medium hover:scale-105 transition active:scale-95"
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELECTRONICS */}
      <section
        id="electronics"
        className="relative min-h-screen w-full py-28 px-6 md:px-16 overflow-hidden"
      >
        <div className="grid-bg" />
        <div ref={elecRef} className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent4)] mb-4">
            Made-to-order Hardware
          </div>
          <h2 className="reveal font-heading italic text-white text-4xl md:text-6xl mb-4">
            Robotics &amp; Electronics
          </h2>
          <p className="reveal font-body text-white/60 mb-10 max-w-xl">
            Approved builds you can order as-is, or describe your own project and I'll see if
            it's possible.
          </p>
          <div className="reveal grid md:grid-cols-2 gap-6 mb-10">
            {SERVICES.electronics.map((p) => (
              <div key={p.id} className="liquid-glass rounded-2xl p-6">
                <MediaSlot video={p.video} images={p.images} label={p.title} />
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div className="font-heading italic text-2xl text-white">{p.title}</div>
                  <span
                    className="text-xs font-body uppercase tracking-wider"
                    style={{ color: 'var(--accent4)' }}
                  >
                    {p.category}
                  </span>
                </div>
                <p className="font-body text-white/60 text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[0.7rem] font-body px-2 py-1 rounded-full border border-white/10 text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="font-body text-white text-lg">{p.price}</div>
                  <button
                    onClick={() => orderElectronics(p)}
                    className="bg-white text-black rounded px-4 py-2 text-sm font-body font-medium hover:scale-105 transition active:scale-95"
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal liquid-glass-strong rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-heading italic text-2xl text-white mb-1">
                Have a custom idea?
              </div>
              <p className="font-body text-white/60 text-sm max-w-md">
                Describe your project and I'll evaluate if it's possible, then send you the
                details.
              </p>
            </div>
            <button
              onClick={requestBuild}
              className="bg-white text-black rounded px-6 py-3 text-sm font-body font-medium hover:scale-105 transition active:scale-95 whitespace-nowrap"
            >
              Describe your project →
            </button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="relative min-h-screen w-full py-28 px-6 md:px-16 overflow-hidden"
      >
        <div className="grid-bg" />
        <div ref={procRef} className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent2)] mb-4">
            How it works
          </div>
          <h2 className="reveal font-heading italic text-white text-4xl md:text-6xl mb-10">
            The Process
          </h2>
          <div className="reveal relative border-l border-white/10 pl-8 ml-2 space-y-10">
            {SERVICES.process.map((s) => (
              <div key={s.step} className="relative">
                <div className="absolute -left-[42px] top-1 w-5 h-5 rounded-full border border-[var(--accent2)] bg-[var(--bg)]" />
                <div className="font-mono text-sm" style={{ color: 'var(--accent2)' }}>
                  {s.step}
                </div>
                <div className="font-heading italic text-2xl text-white mt-1 mb-2">
                  {s.title}
                </div>
                <p className="font-body text-white/60 text-sm max-w-xl">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS + ORDERING + ENQUIRY */}
      <section
        id="enquiry"
        className="relative min-h-screen w-full py-28 px-6 md:px-16 overflow-hidden"
      >
        <div className="grid-bg" />
        <div ref={ctaRef} className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {DATA.stats.map((st) => (
              <div key={st.label} className="liquid-glass rounded-2xl p-6 text-center">
                <div className="font-heading italic text-4xl text-white">{st.value}</div>
                <div className="font-body text-white/50 text-xs uppercase tracking-wider mt-2">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          <div className="reveal grid md:grid-cols-2 gap-5 mb-16">
            <div className="liquid-glass rounded-2xl p-6">
              <div className="font-body text-xs tracking-widest uppercase text-[var(--accent)] mb-2">
                Websites
              </div>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                {SERVICES.ordering.websiteNote}
              </p>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <div className="font-body text-xs tracking-widest uppercase text-[var(--accent4)] mb-2">
                Robotics &amp; Electronics
              </div>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                {SERVICES.ordering.electronicNote}
              </p>
            </div>
          </div>

          <div className="reveal font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4">
            Start a project
          </div>
          <h2 className="reveal font-heading italic text-white text-4xl md:text-6xl mb-6">
            Tell me what you need
          </h2>
          <form
            onSubmit={submitEnquiry}
            className="reveal liquid-glass-strong rounded-2xl p-6 max-w-2xl grid gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                className={inputCls}
                placeholder="Your name"
                value={form.name}
                onChange={update('name')}
              />
              <input
                className={inputCls}
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={update('email')}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <select className={inputCls} value={form.type} onChange={update('type')}>
                <option value="website">Website</option>
                <option value="electronics">Robotics / Electronics</option>
              </select>
              <input
                className={inputCls}
                placeholder="Budget (optional)"
                value={form.budget}
                onChange={update('budget')}
              />
            </div>
            <textarea
              className={`${inputCls} min-h-[120px] resize-y`}
              placeholder="Describe your project…"
              value={form.message}
              onChange={update('message')}
            />
            <button
              type="submit"
              className="bg-white text-black text-sm font-body font-medium rounded-xl px-6 py-3 hover:scale-[1.03] transition active:scale-95 justify-self-start"
            >
              Send enquiry
            </button>
            {sent && (
              <div className="font-mono text-xs" style={{ color: 'var(--accent4)' }}>
                Opening your email client…
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
