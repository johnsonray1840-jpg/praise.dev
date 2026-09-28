'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-0 transition-transform duration-100 ease-out"
      style={{
        background: 'radial-gradient(circle, rgba(187, 255, 45, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
      }}
    />
  );
}