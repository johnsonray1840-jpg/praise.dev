'use client';
import { useState, useRef, useEffect } from 'react';

interface Layer {
  id: string;
  title: string;
  subtitle: string;
  tools: string[];
  description: string;
  color: string;
}

const layers: Layer[] = [
  {
    id: 'interface',
    title: 'INTERFACE LAYER',
    subtitle: 'Frontend systems',
    tools: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Bootstrap'],
    description: 'Interfaces shaped by product intent, hierarchy, accessibility, and responsive behavior.',
    color: '#2563EB',
  },
  {
    id: 'core',
    title: 'CORE LAYER',
    subtitle: 'Backend & APIs',
    tools: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'PHP'],
    description: 'Reliable services, data models, permissions, and operational logic behind the interface.',
    color: '#3B82F6',
  },
  {
    id: 'operations',
    title: 'OPERATIONS LAYER',
    subtitle: 'Automation workflows',
    tools: ['CRM', 'Webhooks', 'n8n', 'Automation Logic'],
    description: 'Workflows that reduce manual movement and make ownership, follow-up, and status visible.',
    color: '#60A5FA',
  },
  {
    id: 'deployment',
    title: 'DEPLOYMENT LAYER',
    subtitle: 'Infrastructure',
    tools: ['Docker', 'Render', 'CI/CD', 'AWS'],
    description: 'Deployment paths designed for maintainability, observability, and sensible operating cost.',
    color: '#06B6D4',
  },
  {
    id: 'trust',
    title: 'TRUST LAYER',
    subtitle: 'Security-aware systems',
    tools: ['SOC', 'Reporting', 'Access control', 'Security audits'],
    description: 'Security-aware engineering translated into readable evidence, escalation context, and action.',
    color: '#8B5CF6',
  },
];

export default function Stack() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
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

    const items = containerRef.current?.querySelectorAll('.layer-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-6 mb-16">
        <span className="text-5xl font-mono font-bold text-[#CBD5E1]">06</span>
        <span className="h-px flex-1 bg-[#E2E8F0]" />
        <span className="text-sm font-mono text-[#2563EB] font-semibold tracking-[0.3em] uppercase">
          The Stack
        </span>
      </div>

      {/* Intro Text */}
      <div className="mb-12 max-w-3xl">
        <p className="text-lg text-[#475569] leading-relaxed">
          A control panel of tools chosen for products that need{' '}
          <span className="text-[#0B1120] font-semibold">logic</span>,{' '}
          <span className="text-[#0B1120] font-semibold">speed</span>,{' '}
          <span className="text-[#0B1120] font-semibold">workflows</span>, and{' '}
          <span className="text-[#0B1120] font-semibold">operational clarity</span>.
        </p>
      </div>

      {/* Layers Grid */}
      <div ref={containerRef} className="grid md:grid-cols-2 gap-4">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className="layer-item opacity-0 translate-y-8 transition-all duration-700 group"
            style={{ transitionDelay: `${index * 80}ms` }}
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            <div 
              className="relative p-6 rounded-2xl bg-white border border-[#E2E8F0] transition-all duration-300 hover:shadow-xl hover:shadow-[#2563EB]/5 hover:-translate-y-1"
              style={{
                borderLeftColor: activeLayer === layer.id ? layer.color : '#E2E8F0',
                borderLeftWidth: '4px',
              }}
            >
              {/* Layer Number */}
              <div className="flex items-center gap-3 mb-3">
                <span 
                  className="text-[10px] font-mono font-bold tracking-widest"
                  style={{ color: layer.color }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-[#E2E8F0]" />
              </div>

              {/* Title */}
              <h3 
                className="text-xs font-mono font-bold tracking-[0.15em] uppercase mb-1"
                style={{ color: layer.color }}
              >
                {layer.title}
              </h3>
              
              {/* Subtitle */}
              <h4 className="text-lg font-bold text-[#0B1120] mb-2">
                {layer.subtitle}
              </h4>
              
              {/* Tools */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {layer.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-0.5 text-[9px] font-mono font-medium rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#475569]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {layer.description}
              </p>

              {/* Hover indicator line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all duration-300 scale-x-0 group-hover:scale-x-100"
                style={{ backgroundColor: layer.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Control Signal */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#EFF6FF] to-[#F0F9FF] border border-[#BFDBFE]">
        <div className="flex items-center gap-4">
          <span className="text-2xl">⚡</span>
          <div>
            <h4 className="text-sm font-mono font-bold text-[#2563EB] tracking-widest uppercase">
              Control Signal
            </h4>
            <p className="text-sm text-[#475569] mt-1">
              Builds that connect interface, logic, workflow, deployment, and operations into one system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}