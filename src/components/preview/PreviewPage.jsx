import { Link, useParams } from 'react-router-dom';
import DATA from '../../data/info.json';
import { orderWebsiteMailto } from '../../lib/enquiry';
import PortfolioDemo from './PortfolioDemo';
import LandingDemo from './LandingDemo';
import WebAppDemo from './WebAppDemo';
import BlogDemo from './BlogDemo';

const DEMOS = {
  portfolio: PortfolioDemo,
  landing: LandingDemo,
  webapp: WebAppDemo,
  blog: BlogDemo,
};

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="font-heading italic text-4xl text-white mb-3">Preview not found</div>
      <p className="text-white/60 mb-6">That template doesn't exist (yet).</p>
      <Link
        to="/services"
        className="bg-white text-black text-sm font-medium rounded px-6 py-3 hover:scale-[1.03] transition"
      >
        ← Back to Services
      </Link>
    </div>
  );
}

export default function PreviewPage() {
  const { id } = useParams();
  const product = DATA.services.websites.find((w) => w.id === id);
  const Demo = product && DEMOS[id];

  return (
    <main className="relative min-h-screen pt-16">
      <div
        className="fixed top-0 left-0 right-0 z-40 w-full border-b border-white/10 bg-[var(--bg)]/70"
        style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link
            to="/services"
            className="group flex items-center gap-2 text-sm font-body text-white/70 hover:text-white transition whitespace-nowrap"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/15 group-hover:border-white/40 transition">
              ←
            </span>
            <span className="hidden sm:inline">Back to Services</span>
          </Link>
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-heading italic text-lg text-white truncate">
              {product ? product.title : 'Preview'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-body uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--accent3)]/50 text-[var(--accent3)] bg-[var(--accent3)]/10 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)]" />
              Free preview
            </span>
          </div>
          {product && (
            <button
              onClick={() => orderWebsiteMailto(product)}
              className="bg-white text-black text-sm font-body font-medium rounded-full px-5 py-2 hover:scale-[1.05] transition active:scale-95 whitespace-nowrap shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
            >
              Order this →
            </button>
          )}
        </div>
      </div>

      {Demo ? (
        <div className="relative z-10">
          <Demo />
        </div>
      ) : (
        <NotFound />
      )}
    </main>
  );
}
