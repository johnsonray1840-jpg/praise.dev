'use client';
import { useEffect, useRef, useState } from 'react';

interface Pillar {
  id: string;
  number: string;
  title: string;
  description: string;
  color: string;
}

const pillars: Pillar[] = [
  {
    id: 'foundation',
    number: '01 / FOUNDATION',
    title: 'Frontend engineering',
    description: 'Interfaces shaped by product intent, hierarchy, accessibility, and responsive behavior.',
    color: '#2563EB',
  },
  {
    id: 'systems',
    number: '02 / SYSTEMS',
    title: 'Backend API systems',
    description: 'Reliable services, data models, permissions, and operational logic behind the interface.',
    color: '#3B82F6',
  },
  {
    id: 'operations',
    number: '03 / OPERATIONS',
    title: 'Automation workflows',
    description: 'Workflows that reduce manual movement and make ownership, follow-up, and status visible.',
    color: '#60A5FA',
  },
  {
    id: 'delivery',
    number: '04 / DELIVERY',
    title: 'Infrastructure & deployment',
    description: 'Deployment paths designed for maintainability, observability, and sensible operating cost.',
    color: '#06B6D4',
  },
  {
    id: 'trust',
    number: '05 / TRUST',
    title: 'Security & SOC reporting',
    description: 'Security-aware engineering translated into readable evidence, escalation context, and action.',
    color: '#8B5CF6',
  },
  {
    id: 'product',
    number: '06 / PRODUCT',
    title: 'Product and business systems thinking',
    description: 'Product sense connects interface, logic, operations, and business reality into one coherent build.',
    color: '#F59E0B',
  },
];

export default function Pillars() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const items = sectionRef.current?.querySelectorAll('.pillar-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 px-6 max-w-5xl mx-auto border-t border-[#F1F5F9]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-5xl font-mono font-bold text-[#CBD5E1]">08</span>
        <span className="h-px flex-1 bg-[#E2E8F0]" />
        <span className="text-sm font-mono text-[#2563EB] font-semibold tracking-[0.3em] uppercase">
          Product & engineering pillars
        </span>
      </div>

      {/* Pillars List */}
      <div className="space-y-6">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.id}
            className="pillar-item opacity-0 translate-y-8 transition-all duration-700 group"
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => setActivePillar(pillar.id)}
            onMouseLeave={() => setActivePillar(null)}
          >
            <div 
              className="flex flex-col md:flex-row md:items-start gap-4 p-6 rounded-2xl bg-white border border-[#E2E8F0] transition-all duration-300 hover:shadow-lg hover:shadow-[#2563EB]/5 hover:border-[#2563EB]/20"
              style={{
                borderLeftColor: activePillar === pillar.id ? pillar.color : '#E2E8F0',
                borderLeftWidth: '4px',
              }}
            >
              {/* Number */}
              <div className="shrink-0 w-40">
                <span 
                  className="text-xs font-mono font-bold tracking-widest"
                  style={{ color: pillar.color }}
                >
                  {pillar.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#0B1120] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed max-w-2xl">
                  {pillar.description}
                </p>
              </div>

              {/* Hover indicator */}
              <div 
                className="hidden md:block w-1 h-12 rounded-full transition-all duration-300 scale-y-0 group-hover:scale-y-100 origin-top"
                style={{ backgroundColor: pillar.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}