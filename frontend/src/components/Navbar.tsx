'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';  

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['terminal', 'projects', 'skills', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#terminal', label: 'Terminal' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-[#F1F5F9] shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-2 font-mono font-bold text-[#0B1120] hover:text-[#2563EB] transition-colors"
        >
          <span className="text-xl tracking-tight">PG</span>
          <span className="text-[10px] text-[#94A3B8] font-medium tracking-widest uppercase hidden sm:inline">
            Systems Architect
          </span>
          <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 relative ${
                activeSection === link.href.replace('#', '')
                  ? 'text-[#2563EB]'
                  : 'text-[#475569] hover:text-[#0B1120]'
              }`}
            >
              {link.label}
              {activeSection === link.href.replace('#', '') && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#2563EB] rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Right side: Theme toggle */}
        <div className="flex items-center gap-4">
          {/* ✅ Replace placeholder with actual ThemeToggle */}
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-[#0B1120]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}