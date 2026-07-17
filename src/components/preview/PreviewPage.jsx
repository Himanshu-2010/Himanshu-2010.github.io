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
    <main className="relative min-h-screen">
      <div
        className="sticky top-0 z-40 w-full liquid-glass border-b border-white/10"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link
            to="/services"
            className="text-sm font-body text-white/70 hover:text-white transition whitespace-nowrap"
          >
            ← Back to Services
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-heading italic text-white truncate">
              {product ? product.title : 'Preview'}
            </span>
            <span className="hidden sm:inline-block text-[0.65rem] font-body uppercase tracking-widest px-2 py-0.5 rounded-full border border-[var(--accent3)] text-[var(--accent3)] whitespace-nowrap">
              Free preview
            </span>
          </div>
          {product && (
            <button
              onClick={() => orderWebsiteMailto(product)}
              className="bg-white text-black text-sm font-body font-medium rounded px-4 py-1.5 hover:scale-[1.04] transition active:scale-95 whitespace-nowrap"
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
