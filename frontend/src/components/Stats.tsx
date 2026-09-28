'use client';
import { useEffect, useRef, useState } from 'react';
import { 
  Settings, 
  GitMerge, 
  Clock, 
  LayoutDashboard, 
  ShieldCheck, 
  Server 
} from 'lucide-react';

const stats = [
  {
    id: 'saas',
    number: '06',
    label: 'SAAS SYSTEMS',
    description: 'Production-grade platforms built from the ground up.',
    icon: Settings,
  },
  {
    id: 'crm',
    number: '08',
    label: 'CRM WORKFLOWS',
    description: 'Automated workflows for sales, support, and operations.',
    icon: GitMerge,
  },
  {
    id: 'automation',
    number: '24/7',
    label: 'AUTOMATION LOGIC',
    description: 'Continuous monitoring and event-driven automation.',
    icon: Clock,
  },
  {
    id: 'dashboards',
    number: '10+',
    label: 'ADMIN DASHBOARDS',
    description: 'Custom dashboards for monitoring and control.',
    icon: LayoutDashboard,
  },
  {
    id: 'security',
    number: 'SOC',
    label: 'SECURITY REPORTS',
    description: 'Security-aware engineering with actionable evidence.',
    icon: ShieldCheck,
  },
  {
    id: 'api',
    number: 'API',
    label: 'BACKEND SYSTEMS',
    description: 'Reliable, scalable API services for diverse clients.',
    icon: Server,
  },
];

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 max-w-6xl mx-auto border-t border-[#F1F5F9]">
      <div className="flex items-center gap-6 mb-16">
        <span className="text-5xl font-mono font-bold text-[#CBD5E1]">07</span>
        <span className="h-px flex-1 bg-[#E2E8F0]" />
        <span className="text-sm font-mono text-[#2563EB] font-semibold tracking-[0.3em] uppercase">
          Systems in numbers
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`text-center p-6 rounded-2xl bg-white border border-[#E2E8F0] transition-all duration-700 hover:shadow-xl hover:shadow-[#2563EB]/5 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Icon className="w-8 h-8 mx-auto mb-3 text-[#2563EB]" />
              <div className="text-3xl md:text-4xl font-mono font-bold text-[#0B1120] tracking-tight">{stat.number}</div>
              <div className="text-[10px] font-mono font-semibold text-[#2563EB] tracking-widest uppercase mt-2">{stat.label}</div>
              <div className="mt-3 text-xs text-[#94A3B8] leading-relaxed hidden md:block">{stat.description}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-[#94A3B8] font-mono">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
            Learning curve, documented.
          </span>
        </p>
      </div>
    </section>
  );
}