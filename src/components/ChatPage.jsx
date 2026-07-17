import React, { useState, useEffect, useRef } from 'react';
import { AI_LABEL, checkAiStatus, sendMessage } from '../aiClient';

const STATUS_META = {
  checking: { color: 'var(--accent2)', text: 'Checking…' },
  online: { color: 'var(--accent4)', text: 'Online' },
  warming: { color: 'var(--accent3)', text: 'Warming up…' },
  offline: { color: '#ff5470', text: 'Offline / asleep' },
};

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('checking');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    checkAiStatus().then(setStatus);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setError(null);
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    setStatus('warming');
    try {
      const reply = await sendMessage(next);
      setMessages([...next, { role: 'assistant', content: reply }]);
      setStatus('online');
    } catch {
      setStatus('offline');
      setError('Model may be sleeping or unreachable — try again in a moment.');
    } finally {
      setBusy(false);
    }
  };

  const meta = STATUS_META[status] || STATUS_META.offline;

  return (
    <section
      id="chat"
      className="relative min-h-screen w-full flex items-center justify-center py-28 px-4 overflow-hidden"
    >
      <div className="grid-bg" />
      <div className="relative z-10 w-full max-w-3xl">
        <div className="font-body text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-3 text-center">
          07 — Live Chat
        </div>
        <h2 className="font-heading italic text-white text-4xl md:text-6xl text-center mb-3">
          Chat with {AI_LABEL}
        </h2>
        <p className="font-body text-white/60 text-center mb-6 max-w-xl mx-auto">
          Powered by{' '}
          <a
            href="https://huggingface.co/spaces/mors369/hermes-model"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--accent)]"
          >
            mors369/hermes-model
          </a>{' '}
          — an on-device LLM on Hugging Face. First message may take a moment while the model wakes up.
        </p>

        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
          style={{ borderColor: meta.color, background: 'rgba(255,255,255,0.03)' }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}
          />
          <span
            className="font-mono text-xs"
            style={{ color: meta.color, letterSpacing: '0.08em' }}
          >
            {AI_LABEL}: {meta.text}
          </span>
        </div>

        <div className="liquid-glass-strong rounded-2xl overflow-hidden flex flex-col" style={{ height: '60vh' }}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            {messages.length === 0 && (
              <div className="m-auto font-mono text-sm text-white/40">Say hi to start the conversation.</div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  m.role === 'user'
                    ? 'self-end bg-white text-black rounded-br-sm'
                    : 'self-start bg-white/5 border border-white/10 text-white rounded-bl-sm'
                }`}
              >
                {m.content}
              </div>
            ))}
            {busy && <div className="self-start px-4 py-3 rounded-2xl text-sm text-white/50 italic bg-white/5 border border-white/10">…</div>}
          </div>

          {error && (
            <div className="px-5 pb-2 font-mono text-xs" style={{ color: '#ff5470' }}>
              {error}
            </div>
          )}

          <div className="flex gap-2 p-3 border-t border-white/10 bg-white/[0.02]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={busy ? 'Waiting for response…' : 'Type a message…'}
              disabled={busy}
              spellCheck={false}
              className="flex-1 bg-black/25 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm outline-none focus:border-[var(--accent)] disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={busy || !input.trim()}
              className="bg-white text-black text-sm font-body font-medium rounded-xl px-5 py-2.5 active:scale-95 transition disabled:opacity-40"
            >
              {busy ? '…' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
