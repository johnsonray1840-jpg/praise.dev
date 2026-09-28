'use client';
import { useState } from 'react';

export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/456-bytes',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/praise-godswill-85ab38205?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:Praisegodswill23@gmail.com',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: 'https://x.com/terry28347806?s=21',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  const techStack = [
    'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Docker'
  ];

  return (
    <footer className="border-t border-[#F1F5F9] bg-white/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-lg font-mono font-bold text-[#0B1120]">PG</span>
            <p className="text-sm text-[#475569] leading-relaxed max-w-xs">
              Building systems that connect interface, logic, workflow, 
              deployment, and operations into one coherent product.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-[#94A3B8] tracking-widest uppercase mb-3">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 text-[10px] font-mono font-medium text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold text-[#94A3B8] tracking-widest uppercase mb-3">
              Connect
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[#475569] hover:text-[#2563EB] transition-colors"
                >
                  {link.icon}
                  <span className="hidden sm:inline group-hover:underline">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8] font-mono">
            © {year} Praise Godswill. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#94A3B8] font-mono">
            {/* <span>● Systems Online</span>
            <span className="w-px h-3 bg-[#E2E8F0]" />
            <span>v3.0.0</span>
            <span className="w-px h-3 bg-[#E2E8F0]" /> */}
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}