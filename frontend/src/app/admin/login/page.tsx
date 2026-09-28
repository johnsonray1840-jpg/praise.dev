'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F0F7FF] to-white px-4">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-2xl border border-[#E2E8F0] shadow-2xl shadow-[#2563EB]/10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0B1120]">Admin Access</h1>
          <p className="text-sm text-[#475569] mt-1">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#475569] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-[#EF4444] bg-[#FEF2F2] p-3 rounded-xl border border-[#FECACA]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2563EB] text-white font-semibold rounded-xl hover:bg-[#1D4ED8] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>

          <div className="text-center text-xs text-[#94A3B8]">
            <Link href="/" className="hover:text-[#2563EB] transition">← Return to site</Link>
          </div>
        </form>
      </div>
    </div>
  );
}