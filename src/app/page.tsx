import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import TerminalWrapper from '@/components/TerminalWrapper';
import Projects from '@/components/Projects';
import SkillsGlobe from '@/components/SkillsGlobe';
import Stack from '@/components/Stack';
import Stats from '@/components/Stats';
import Pillars from '@/components/Pillars';
import ContactForm from '@/components/ContactForm';
import Chatbot from '@/components/Chatbot';
import VisitorPulse from '@/components/VisitorPulse';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* 02. Terminal */}
      <section id="terminal" className="px-4 sm:px-6 max-w-5xl mx-auto py-16 md:py-28 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <span className="text-4xl sm:text-5xl font-mono font-bold text-[#CBD5E1]">02</span>
          <span className="h-px flex-1 bg-[#E2E8F0]" />
          <span className="text-xs sm:text-sm font-mono text-[#2563EB] font-semibold tracking-widest uppercase">
            Interactive Engine
          </span>
        </div>
        <div className="glass-premium rounded-2xl p-1.5 sm:p-2 shadow-xl shadow-blue-500/5">
          <TerminalWrapper />
        </div>
      </section>

      {/* 03. Projects */}
      <div className="py-16 md:py-28 border-t border-[#F1F5F9]">
        <Projects />
      </div>

      {/* 04. Skills Globe */}
      <section id="skills" className="px-4 sm:px-6 max-w-5xl mx-auto py-16 md:py-28 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-16">
          <span className="text-4xl sm:text-5xl font-mono font-bold text-[#CBD5E1]">04</span>
          <span className="h-px flex-1 bg-[#E2E8F0]" />
          <span className="text-xs sm:text-sm font-mono text-[#2563EB] font-semibold tracking-widest uppercase">
            The Arsenal
          </span>
        </div>
        <div className="glass-premium rounded-2xl p-4 sm:p-8 shadow-xl shadow-blue-500/5">
          <SkillsGlobe />
        </div>
      </section>

      {/* 05. Stack */}
      <Stack />

      {/* 06. Stats */}
      <Stats />

      {/* 07. Pillars */}
      <Pillars />

      {/* 08. Contact */}
      <section id="contact" className="px-4 sm:px-6 max-w-3xl mx-auto py-16 md:py-28 border-t border-[#F1F5F9]">
        <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-16">
          <span className="text-4xl sm:text-5xl font-mono font-bold text-[#CBD5E1]">08</span>
          <span className="h-px flex-1 bg-[#E2E8F0]" />
          <span className="text-xs sm:text-sm font-mono text-[#2563EB] font-semibold tracking-widest uppercase">
            Connect
          </span>
        </div>
        <div className="glass-premium rounded-2xl p-5 sm:p-8 shadow-xl shadow-blue-500/5">
          <ContactForm />
        </div>
      </section>

      {/* Floating Widgets */}
      <Chatbot />
      <VisitorPulse />
      <KeyboardShortcuts />

      {/* Footer */}
      <Footer />
    </main>
  );
}
