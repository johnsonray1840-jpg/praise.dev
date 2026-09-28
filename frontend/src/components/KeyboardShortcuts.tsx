'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore shortcuts if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      // ⌘K or Ctrl+K → Scroll to terminal
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const terminal = document.getElementById('terminal');
        if (terminal) {
          terminal.scrollIntoView({ behavior: 'smooth', block: 'start' });
          toast.success('⚡ Terminal activated', { duration: 1500 });
        }
        return;
      }

      // C → Scroll to contact
      if (e.key === 'c' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const contact = document.getElementById('contact');
        if (contact) {
          contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
          toast.success('📬 Contact section', { duration: 1500 });
        }
        return;
      }

      // D → Download CV
      if (e.key === 'd' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        window.open('/cv.pdf', '_blank');
        toast.success('📄 Opening CV...', { duration: 1500 });
        return;
      }

      // P → Scroll to projects
      if (e.key === 'p' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const projects = document.getElementById('projects');
        if (projects) {
          projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
          toast.success('📦 Projects loaded', { duration: 1500 });
        }
        return;
      }

      // S → Scroll to skills
      if (e.key === 's' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const skills = document.getElementById('skills');
        if (skills) {
          skills.scrollIntoView({ behavior: 'smooth', block: 'start' });
          toast.success('🎯 Skills arsenal', { duration: 1500 });
        }
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div 
      className={`fixed bottom-24 left-6 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-50 hover:opacity-100' : 'opacity-0 hover:opacity-100'
      }`}
    >
      <div className="flex flex-col gap-1 text-[10px] font-mono text-[#94A3B8] select-none">
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 text-[9px] bg-[#F1F5F9] border border-[#E2E8F0] rounded">⌘K</kbd>
          <span>Terminal</span>
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 text-[9px] bg-[#F1F5F9] border border-[#E2E8F0] rounded">C</kbd>
          <span>Contact</span>
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 text-[9px] bg-[#F1F5F9] border border-[#E2E8F0] rounded">D</kbd>
          <span>CV</span>
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 text-[9px] bg-[#F1F5F9] border border-[#E2E8F0] rounded">P</kbd>
          <span>Projects</span>
        </span>
        <span className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 text-[9px] bg-[#F1F5F9] border border-[#E2E8F0] rounded">S</kbd>
          <span>Skills</span>
        </span>
      </div>
    </div>
  );
}