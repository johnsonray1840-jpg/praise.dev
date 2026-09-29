/**
 * Unified Base URL resolver for API and WebSockets.
 * When frontend and backend are unified on the same server,
 * relative paths work automatically in the browser, and direct localhost works during SSR.
 */
const getNormalizedApiBase = (): string => {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  const port = process.env.PORT || '4000';
  const customUrl = process.env.NEXT_PUBLIC_API_URL || process.env.INTERNAL_API_URL;
  if (customUrl) {
    const clean = customUrl.trim().replace(/\/+$/, '');
    return clean.endsWith('/api') ? clean : `${clean}/api`;
  }
  return `http://127.0.0.1:${port}/api`;
};

const getNormalizedSocketBase = (): string => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_SOCKET_URL || '';
  }
  const port = process.env.PORT || '4000';
  return process.env.NEXT_PUBLIC_SOCKET_URL || `http://127.0.0.1:${port}`;
};

export const API_BASE = getNormalizedApiBase();
export const SOCKET_BASE = getNormalizedSocketBase();

export async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error('Error fetching projects:', err);
    return [];
  }
}

export async function fetchSkills() {
  try {
    const res = await fetch(`${API_BASE}/skills`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error('Error fetching skills:', err);
    return [];
  }
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
