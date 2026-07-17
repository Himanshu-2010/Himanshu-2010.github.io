import React, { useState, useEffect, useRef } from 'react';
import DATA from '../data/info.json';
import { checkAiStatus } from '../aiClient';

const LINE_CLASS = {
  system: 'text-[var(--accent)]',
  result: 'text-white',
  muted: 'text-white/50',
  error: 'text-[#ff5470]',
  prompt: 'text-[var(--accent)]',
};

function TerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([
    {
      type: 'system',
      text: 'DEV369 TERMINAL v1.0 — type "help" for commands, or just type to search the site.',
    },
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === 'Escape') setOpen(false);
      if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const runSearch = (q) => {
    const query = q.toLowerCase();
    const results = [];
    DATA.projects.forEach((p) => {
      const hay = [p.title, p.summary, p.category, p.status, ...(p.tags || [])].join(' ').toLowerCase();
      if (hay.includes(query)) {
        results.push({ type: 'result', text: `▶ ${p.title}  [${p.category} / ${p.status}]` });
        results.push({ type: 'muted', text: `  ${p.summary}` });
        if (p.tags?.length) results.push({ type: 'muted', text: `  tags: ${p.tags.join(', ')}` });
      }
    });
    DATA.skills.forEach((s) => {
      if (s.label.toLowerCase().includes(query))
        results.push({ type: 'result', text: `▣ ${s.label}: ${s.level}%` });
    });
    DATA.skillCats.forEach((c) => {
      if ([c.name, ...c.items].join(' ').toLowerCase().includes(query))
        results.push({ type: 'result', text: `◆ ${c.name}: ${c.items.join(' · ')}` });
    });
    DATA.gallery.forEach((g) => {
      if (g.caption.toLowerCase().includes(query))
        results.push({ type: 'result', text: `🖼 ${g.caption} (${g.type || 'image'})` });
    });
    const contactHay = [DATA.contact.github, DATA.contact.email, DATA.contact.instagram, DATA.contact.site]
      .join(' ')
      .toLowerCase();
    if (contactHay.includes(query)) {
      results.push({ type: 'result', text: `✉ github: ${DATA.contact.github}` });
      results.push({ type: 'result', text: `✉ email: ${DATA.contact.email}` });
      results.push({ type: 'result', text: `✉ instagram: ${DATA.contact.instagram}` });
      results.push({ type: 'result', text: `✉ site: ${DATA.contact.site}` });
    }
    const gen = [DATA.name, DATA.tagline, DATA.subtitle, DATA.school, DATA.os, DATA.editor]
      .join(' ')
      .toLowerCase();
    if (gen.includes(query)) {
      results.push({ type: 'result', text: `${DATA.name} — ${DATA.tagline}` });
      results.push({ type: 'muted', text: `  ${DATA.subtitle}` });
    }
    if (results.length === 0) {
      setLines((prev) => [
        ...prev,
        { type: 'error', text: `No matches found for "${q}". Try "help" or "projects".` },
      ]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'system', text: `Found ${results.length} match(es) for "${q}":` },
        ...results,
      ]);
    }
  };

  const runCommand = async (raw) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines((prev) => [...prev, { type: 'prompt', text: `himanshu@dev369:~$ ${cmd}` }]);
    setInput('');
    const [name, ...rest] = cmd.toLowerCase().split(' ');
    const arg = rest.join(' ');

    switch (name) {
      case 'help':
        setLines((prev) => [
          ...prev,
          ...[
            { type: 'system', text: 'Commands:' },
            { type: 'system', text: '  help              show this help' },
            { type: 'system', text: '  whoami            about Himanshu' },
            { type: 'system', text: '  projects          list all projects' },
            { type: 'system', text: `  project <id>      details (e.g. project ${DATA.projects[0].id})` },
            { type: 'system', text: '  skills            list skills & categories' },
            { type: 'system', text: '  contact           show contact links' },
            { type: 'system', text: '  ai                check Orion AI model status' },
            { type: 'system', text: '  search <query>    search everything' },
            { type: 'system', text: '  clear             clear the screen' },
            { type: 'system', text: '  any other text    searched across the site' },
          ],
        ]);
        break;
      case 'whoami':
      case 'about':
        setLines((prev) => [
          ...prev,
          { type: 'result', text: `${DATA.name} — ${DATA.tagline}` },
          { type: 'muted', text: `  ${DATA.subtitle}` },
          { type: 'muted', text: `  School: ${DATA.school} | OS: ${DATA.os} | Editor: ${DATA.editor}` },
          ...DATA.bio.map((b) => ({ type: 'muted', text: `  ${b}` })),
        ]);
        break;
      case 'projects':
        setLines((prev) => [
          ...prev,
          { type: 'system', text: 'PROJECTS:' },
          ...DATA.projects.map((p) => ({
            type: 'result',
            text: `  ▶ ${p.title}  [${p.category} / ${p.status}]`,
          })),
        ]);
        break;
      case 'project': {
        const p = DATA.projects.find((x) => x.id === arg);
        if (!p) {
          setLines((prev) => [...prev, { type: 'error', text: `Project "${arg}" not found. Try "projects".` }]);
          break;
        }
        setLines((prev) => [
          ...prev,
          { type: 'result', text: `${p.title} [${p.category} / ${p.status}]` },
          { type: 'muted', text: `  ${p.summary}` },
          ...(p.tags?.length ? [{ type: 'muted', text: `  tags: ${p.tags.join(', ')}` }] : []),
        ]);
        break;
      }
      case 'skills':
        setLines((prev) => [
          ...prev,
          { type: 'system', text: 'SKILLS:' },
          ...DATA.skills.map((s) => ({ type: 'result', text: `  ▣ ${s.label}: ${s.level}%` })),
          { type: 'system', text: 'CATEGORIES:' },
          ...DATA.skillCats.map((c) => ({ type: 'result', text: `  ◆ ${c.name}: ${c.items.join(' · ')}` })),
        ]);
        break;
      case 'contact':
        setLines((prev) => [
          ...prev,
          { type: 'system', text: 'CONTACT:' },
          { type: 'result', text: `  github:    ${DATA.contact.github}` },
          { type: 'result', text: `  email:     ${DATA.contact.email}` },
          { type: 'result', text: `  instagram: ${DATA.contact.instagram}` },
          { type: 'result', text: `  site:      ${DATA.contact.site}` },
        ]);
        break;
      case 'ai': {
        const aiStatus = await checkAiStatus();
        if (aiStatus === 'online') {
          setLines((prev) => [...prev, { type: 'result', text: `✓ ${DATA.ai.label}: ONLINE — ${DATA.ai.endpoint}` }]);
        } else {
          setLines((prev) => [...prev, { type: 'error', text: `✕ ${DATA.ai.label}: OFFLINE / SLEEPING — ${DATA.ai.endpoint}` }]);
        }
        break;
      }
      case 'search':
        if (!arg) {
          setLines((prev) => [...prev, { type: 'error', text: 'Usage: search <query>' }]);
          break;
        }
        runSearch(arg);
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        runSearch(cmd);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') runCommand(input);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Open terminal (press `)"
        className="fixed bottom-6 right-6 z-[250] w-12 h-12 flex items-center justify-center liquid-glass-strong rounded-full text-[var(--accent)] hover:scale-110 transition"
      >
        <span className="font-mono font-bold">_</span>
        <span className="text-sm -ml-1">›_</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="liquid-glass-strong rounded-2xl w-full max-w-2xl max-h-[70vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="flex items-center gap-2">
                <span className="flex gap-1.5">
                  <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <i className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <i className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </span>
                <span className="font-mono text-xs text-white/60 ml-2">himanshu@dev369: ~</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1">
              {lines.map((l, i) => (
                <div key={i} className={LINE_CLASS[l.type] || 'text-white'}>
                  {l.text}
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[var(--accent)] font-mono text-sm">himanshu@dev369:~$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoFocus
                  spellCheck={false}
                  className="flex-1 bg-transparent outline-none text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TerminalOverlay;
