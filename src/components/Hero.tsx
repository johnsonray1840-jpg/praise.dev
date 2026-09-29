'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ParticleCanvas from './ParticleCanvas';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Premium 3D tilt effect on the image container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (y / rect.height) * 8;
      const rotateY = (x / rect.width) * -8;
      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 max-w-7xl mx-auto py-12 md:py-20 overflow-hidden bg-mesh">
      {/* Particle Canvas Background */}
      <ParticleCanvas />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Left: Text Content */}
      <div className="relative z-10 w-full md:w-1/2 text-center md:text-left space-y-6 animate-fade-in">
        <p className="text-sm font-mono text-[#2563EB] font-semibold tracking-[0.3em] uppercase">
          Software Engineer
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          I don&apos;t just build
          <br />
          <span className="text-gradient-blue">websites.</span>
          <br />
          <span className="text-[#0B1120] relative">
            I build systems.
            <span className="absolute -bottom-2 left-0 w-24 h-1 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full md:left-0" />
          </span>
        </h1>
        <p className="text-lg text-[#475569] max-w-md leading-relaxed">
          SaaS platforms, real-time data pipelines, and production-grade infrastructure
          designed to scale with precision.
        </p>
        <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
          <a
            href="/cv.pdf"
            download
            className="group inline-flex items-center px-8 py-4 bg-[#2563EB] text-white font-semibold rounded-xl shadow-lg shadow-[#2563EB]/30 hover:shadow-[#2563EB]/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Download CV
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#projects"
            className="group inline-flex items-center px-8 py-4 border-2 border-[#E2E8F0] text-[#0B1120] font-semibold rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/5 transition-all duration-300"
          >
            View Work
          </a>
        </div>
      </div>

      {/* Right: Face Container – FULL IMAGE, NO SPLIT */}
      <div
        ref={containerRef}
        className="relative z-10 w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] md:w-[450px] md:h-[550px] lg:w-[550px] lg:h-[650px] shrink-0 mb-8 md:mb-0 transition-transform duration-100 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Inner container */}
        <div className="relative w-full h-full overflow-hidden bg-transparent">
          <Image
            src="/your-face.jpg"
            alt="Praise Godswill — Software Engineer"
            fill
            className="object-cover object-center transition-all duration-1000 ease-out"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Premium Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2563EB]/5 pointer-events-none" />

          {/* Corner brackets */}
          <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-[#2563EB]/30 pointer-events-none" />
          <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-[#2563EB]/30 pointer-events-none" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#2563EB]/15 pointer-events-none" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#2563EB]/15 pointer-events-none" />

          {/* Status badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-[#E2E8F0] shadow-lg flex items-center gap-2 pointer-events-none">
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#475569] font-medium tracking-wider uppercase">
              Available for hire
            </span>
          </div>
        </div>
      </div>

      {/* Custom keyframes for fade-in */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}