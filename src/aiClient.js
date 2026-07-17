import DATA from './data/info.json';

export const AI_ENDPOINT = (DATA.ai && DATA.ai.endpoint) || 'https://mors369-hermes-model.hf.space';
export const AI_MODEL = (DATA.ai && DATA.ai.model) || 'orion';
export const AI_LABEL = (DATA.ai && DATA.ai.label) || 'Orion AI';

function withTimeout(ms) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, clear: () => clearTimeout(id) };
}

export async function checkAiStatus() {
  const { signal, clear } = withTimeout(6000);
  try {
    const res = await fetch(`${AI_ENDPOINT}/health`, { signal });
    if (!res.ok) return 'offline';
    const data = await res.json().catch(() => ({}));
    return data.status === 'healthy' ? 'online' : 'offline';
  } catch {
    return 'offline';
  } finally {
    clear();
  }
}

export async function sendMessage(messages) {
  const { signal, clear } = withTimeout(120000);
  try {
    const res = await fetch(`${AI_ENDPOINT}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.95,
        model: AI_MODEL,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response');
    return content;
  } finally {
    clear();
  }
}
