# AGENTS.md — dev369

Portfolio site for Himanshu Kumar (student engineer, robotics/embedded/web).

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` (uses **oxlint**, not eslint) |
| Preview build | `npm run preview` |

## Architecture

- **Entry**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **Framework**: React 19 + Vite 8 (plain JSX, no TypeScript)
- **Styling**: `src/index.css` is the only stylesheet actually imported — and it is imported by `main.jsx` **only** (not `App.jsx`). `src/App.css` exists but is **not imported** — all real styles live in `index.css` (CSS custom properties, dark theme).
- **Data**: All site content lives in `src/data/info.json`, imported as `DATA` in `App.jsx` **and** `components/Home.jsx` (`import DATA from './data/info.json'`). `src/data/portfolio.json` is **not used**.
- **Dead code in `src/components/`**: `ProceduralModels.jsx`, `SidebarDatasheet.jsx`, `TerminalPanel.jsx`, `WorkbenchCanvas.jsx` (plus `src/App.css`, `src/assets/{react,vite}.svg`, `src/assets/hero.png`) are **not imported** anywhere — leftover Vite-template / abandoned experiments. The live page files are `Home.jsx` (route `/`), `ServicesPage.jsx` (route `/services`), and `ChatPage.jsx` (route `/chat`). The rest of the UI (Nav, Cursor, Starfield, ProgressBar, terminal overlay) is defined inline in `App.jsx`.
- **Routing**: `react-router-dom` (v7). `src/main.jsx` wraps `<App />` in `<BrowserRouter>`. `App.jsx` is a layout (Cursor, Starfield, ProgressBar, Nav, terminal FAB/overlay, `<Routes>`). Routes: `/` → `src/components/Home.jsx` (all scroll sections), `/services` → `src/components/ServicesPage.jsx` (dedicated agency-style services/store page), `/preview/:id` → `src/components/preview/PreviewPage.jsx` (in-app free preview of a website template — keeps the customer on-site), `/chat` → `src/components/ChatPage.jsx` (Orion AI chat). Nav has a route-based **Services** link (`to="/services"`) plus hash section links (`to="/#<id>"`); clicking a hash link from another route triggers a hash-scroll effect in `App.jsx`. `vercel.json` rewrites all paths to `index.html` for SPA deep-links.
- **Services page data**: `src/data/info.json` → `services` block (`hero`, `websites` premade products with `preview` = `/preview/<id>`, `electronics` catalog with `video`/`images`/`components` (BOM), `process` steps, `ordering` notes). Enquiries/orders use `mailto` pre-fill via `src/lib/enquiry.js` (no backend). Websites: free in-app preview (`/preview/:id`, see `src/components/preview/*`) then buy. Electronics: 25% advance, or supply-your-own-components → pay total at end; custom requests go through the enquiry form.
- No tests, no test framework.
- Custom cursor, canvas starfield, intersection-observer scroll animations.
- **Gallery** (`GallerySection` in `App.jsx`) is a horizontally scrollable strip — click-drag to scroll (grab cursor). No auto-scroll. The site's custom cursor (`body { cursor: none }` + `Cursor` component) is suppressed while hovering the gallery so the native grab cursor shows.
- **Terminal search** (`TerminalWindow` in `App.jsx`): overlay toggled by the bottom-right FAB button or the `` ` `` (backtick) key; `Esc` closes. Searches `DATA` (info.json) — projects, skills, categories, gallery captions, contact, general info. Commands: `help`, `whoami`, `projects`, `project <id>`, `skills`, `contact`, `search <q>`, `clear`; any other text is treated as a site-wide search.

## Conventions

- Plain JSX — do not add TypeScript.
- Inline styles preferred over separate CSS files.
- Google Fonts loaded via `<link>` in `index.html`.
- Lint is **oxlint** (`.oxlintrc.json`): `react/rules-of-hooks` = error, `react/only-export-components` = warn. There is **no** typecheck and **no** test script (verified in `package.json`).
