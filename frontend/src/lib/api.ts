/**
 * Robust base URL normalization for API and WebSockets.
 * Handles cases with/without trailing slashes and with/without '/api'.
 */
const getNormalizedApiBase = (): string => {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api').trim().replace(/\/+$/, '');
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const getNormalizedSocketBase = (): string => {
  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL.trim().replace(/\/+$/, '');
  }
  return getNormalizedApiBase().replace(/\/api$/, '');
};

export const API_BASE = getNormalizedApiBase();
export const SOCKET_BASE = getNormalizedSocketBase();

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchSkills() {
  const res = await fetch(`${API_BASE}/skills`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}

export async function sendContact(data: { name: string; email: string; body: string }) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res;
}

export async function sendChat(message: string, sessionId?: string) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });
  if (!res.ok) throw new Error('Chat request failed');
  return res.json();
}
