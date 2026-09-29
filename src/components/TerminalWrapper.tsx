'use client';

import dynamic from 'next/dynamic';

// ✅ Dynamic import with ssr: false inside a Client Component
const TerminalComponent = dynamic(
  () => import('@/components/TerminalComponent'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full rounded-xl overflow-hidden border border-[#E2E8F0] bg-[#0B1120] h-[420px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#475569]">
          <div className="w-4 h-4 rounded-full border-2 border-[#E2E8F0] border-t-[#2563EB] animate-spin" />
          <span className="font-mono text-sm">Loading terminal...</span>
        </div>
      </div>
    ),
  }
);

export default function TerminalWrapper() {
  return <TerminalComponent />;
}