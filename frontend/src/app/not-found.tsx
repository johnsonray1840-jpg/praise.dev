'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Simple mouse trail for fun
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#F0F7FF] to-white">
      {/* Animated background blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-[#06B6D4]/5 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Mouse follower */}
      <div 
        className="fixed w-8 h-8 pointer-events-none rounded-full bg-[#2563EB]/10 blur-xl transition-all duration-300"
        style={{ 
          left: position.x - 16, 
          top: position.y - 16,
        }} 
      />

      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Large 404 */}
        <div className="relative">
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none tracking-tighter select-none">
            <span className="text-gradient-blue">404</span>
          </h1>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent rounded-full" />
        </div>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1120]">Page Not Found</h2>
          <p className="text-[#475569] max-w-sm mx-auto">
            The system you&apos;re looking for doesn&apos;t exist in this namespace.
            Let&apos;s get you back to the main interface.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-xl shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <span className="mr-2">←</span>
            Return Home
          </Link>
          <Link
            href="#terminal"
            className="inline-flex items-center px-8 py-4 border-2 border-[#E2E8F0] text-[#0B1120] font-semibold rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-all duration-300"
          >
            Open Terminal
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Easter egg */}
        <div className="mt-8 text-xs font-mono text-[#94A3B8]">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
            Systems online. Redirecting...
          </span>
        </div>
      </div>
    </div>
  );
}