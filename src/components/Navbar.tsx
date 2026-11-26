'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Terminal, FolderGit2, Cpu, Mail, FileText, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['terminal', 'projects', 'skills', 'contact'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#terminal', label: 'Terminal', icon: Terminal, isExternalPage: false },
    { href: '#projects', label: 'Projects', icon: FolderGit2, isExternalPage: false },
    { href: '#skills', label: 'Skills', icon: Cpu, isExternalPage: false },
    { href: '#contact', label: 'Contact', icon: Mail, isExternalPage: false },
    { href: '/cv', label: 'CV', icon: FileText, isExternalPage: true },
  ];

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternalPage: boolean) => {
    setMobileMenuOpen(false);
    if (!isExternalPage && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0] shadow-sm'
            : 'bg-white/70 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2 font-mono font-bold text-[#0B1120] hover:text-[#2563EB] transition-colors"
          >
            <span className="text-xl tracking-tight">PG</span>
            <span className="text-[10px] text-[#94A3B8] font-medium tracking-widest uppercase hidden sm:inline">
              Full-Stack Software Engineer
            </span>
            <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isExternalPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-mono font-semibold text-white bg-[#0B1120] hover:bg-[#2563EB] rounded-lg transition-all duration-200 shadow-sm"
                >
                  {link.label}
                </Link>
              ) : (
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
              )
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="relative z-50 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0B1120] hover:bg-[#EFF6FF] hover:border-[#BFDBFE] hover:text-[#2563EB] active:scale-95 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href, link.isExternalPage)}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      link.isExternalPage
                        ? 'mt-2 bg-[#2563EB] text-white font-semibold shadow-md shadow-[#2563EB]/20'
                        : isActive
                        ? 'bg-[#EFF6FF] text-[#2563EB] font-semibold border border-[#BFDBFE]'
                        : 'text-[#334155] hover:bg-[#F8FAFC] active:bg-[#F1F5F9]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${link.isExternalPage ? 'text-white' : 'text-[#2563EB]'}`} />
                      <span>{link.isExternalPage ? 'View & Download CV' : link.label}</span>
                    </span>
                    <ArrowRight className={`w-4 h-4 ${link.isExternalPage ? 'text-white' : 'text-[#94A3B8]'}`} />
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Backdrop Overlay to close menu when tapping outside */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-[#0B1120]/20 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
