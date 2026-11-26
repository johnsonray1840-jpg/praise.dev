'use client';
import { useEffect, useRef, useCallback } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';
import { fetchProjects } from '@/lib/api';

interface ProjectData {
  title: string;
  description: string;
  liveUrl: string;
}

const ASCII_LOGO_DESKTOP = `
\x1b[1;36m╔═══════════════════════════════════════════════════════════╗
║   ██████╗ ██████╗  █████╗ ██╗███████╗███████╗
║   ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██╔════╝
║   ██████╔╝██████╔╝███████║██║███████╗█████╗  
║   ██╔═══╝ ██╔══██╗██╔══██║██║╚════██║██╔══╝  
║   ██║     ██║  ██║██║  ██║██║███████║███████╗
║   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
╚═══════════════════════════════════════════════════════════╝\x1b[0m`;

const QUICK_COMMANDS = ['help', 'about', 'skills', 'projects', 'contact', 'cv', 'clear'];

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstanceRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const initializedRef = useRef(false);
  const historyRef = useRef<string[]>([]);

  const isCompact = (term: Terminal) => (term.cols || 80) < 58;

  // --- Boot Sequence ---
  const bootSequence = useCallback(async (term: Terminal) => {
    try {
      term.clear();
      const compact = isCompact(term);

      if (compact) {
        term.writeln('\x1b[1;36m━━━ PRAISE GODSWILL // QUANTUM OS v3.0 ━━━\x1b[0m');
        term.writeln('\x1b[90mRole:\x1b[0m   Full-Stack Software Engineer');
        term.writeln('\x1b[90mStatus:\x1b[0m \x1b[32m● ONLINE\x1b[0m');
        term.writeln('\x1b[90mMotto:\x1b[0m  "Thoughtfully engineered. Intentionally built."');
        term.writeln('\x1b[1;36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
        term.writeln('\x1b[90mTap a command above or type \x1b[1;36mhelp\x1b[0m\n');
      } else {
        const lines = ASCII_LOGO_DESKTOP.split('\n');
        for (const line of lines) {
          if (line.trim()) term.writeln(line);
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        await new Promise((resolve) => setTimeout(resolve, 120));

        term.writeln('\x1b[36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mSystem:\x1b[0m   Quantum OS v3.0                                   \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mStatus:\x1b[0m   \x1b[32m● ONLINE\x1b[0m                                          \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mEngineer:\x1b[0m Praise Godswill — Full-Stack Software Engineer    \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        term.writeln(
          '\n\x1b[90mType \x1b[1;36m"help"\x1b[0m\x1b[90m or tap a command chip above. Press \x1b[1;36m↑\x1b[0m\x1b[90m/\x1b[1;36m↓\x1b[0m\x1b[90m for history.\x1b[0m\n'
        );
      }

      term.write('\x1b[32m➜\x1b[0m ');
    } catch {
      // ignore
    }
  }, []);

  // --- Command Handler ---
  const handleCommand = useCallback(async (term: Terminal, command: string, history: string[]) => {
    const trimmed = command.trim();
    if (!trimmed) return;
    const args = trimmed.split(/\s+/);
    const mainCmd = args[0].toLowerCase();
    const compact = isCompact(term);

    try {
      if (mainCmd === 'clear') {
        term.clear();
        return;
      }

      if (mainCmd === 'help') {
        if (compact) {
          term.writeln('\x1b[1;36m━━━ AVAILABLE COMMANDS ━━━\x1b[0m');
          term.writeln(' \x1b[36mabout\x1b[0m     Professional bio');
          term.writeln(' \x1b[36mskills\x1b[0m    Core engineering stack');
          term.writeln(' \x1b[36mprojects\x1b[0m  Live production systems');
          term.writeln(' \x1b[36mcontact\x1b[0m   Email, phone & socials');
          term.writeln(' \x1b[36mcv\x1b[0m        Open CV & PDF download');
          term.writeln(' \x1b[36mwhoami\x1b[0m    Engineer identity');
          term.writeln(' \x1b[36mclear\x1b[0m     Clear terminal');
        } else {
          term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[1mCOMMAND\x1b[0m     \x1b[1mDESCRIPTION\x1b[0m                                    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mabout\x1b[0m       Read my professional bio                         \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mskills\x1b[0m      View my full tech stack                          \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mprojects\x1b[0m    Fetch live projects from my API                \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mcontact\x1b[0m     Show my social links & email                    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mcv\x1b[0m          View & download my CV (PDF)                    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mneofetch\x1b[0m    Display system information                       \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mstats\x1b[0m       Show terminal statistics                         \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mwhoami\x1b[0m      Display current user identity                    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mdate\x1b[0m        Show current date and time                       \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mclear\x1b[0m       Clear the terminal screen                        \x1b[36m║\x1b[0m');
          term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        }
        return;
      }

      if (mainCmd === 'about') {
        if (compact) {
          term.writeln('\x1b[1;36m━━━ PRAISE GODSWILL ━━━\x1b[0m');
          term.writeln('\x1b[1mFull-Stack Software Engineer\x1b[0m\n');
          term.writeln('\x1b[90mI design and build full-stack web applications');
          term.writeln('and backend systems that handle real users,');
          term.writeln('real payments, and complex workflows.');
          term.writeln('With 4+ years of hands-on experience in');
          term.writeln('Node.js, TypeScript, React, Next.js, and');
          term.writeln('PostgreSQL, I\'ve contributed to remote');
          term.writeln('startup engineering teams like Lazerpay and');
          term.writeln('architected complete multi-role platforms—from');
          term.writeln('logistics marketplaces to fintech and');
          term.writeln('administrative systems. I value clear');
          term.writeln('communication, end-to-end ownership, and');
          term.writeln('shipping clean, reliable code without');
          term.writeln('unnecessary complexity.\x1b[0m\n');
          term.writeln('\x1b[36mPhilosophy: "Thoughtfully engineered. Intentionally built."\x1b[0m');
        } else {
          term.writeln('\x1b[1;36m╔════════════════════════════════════════════════════════════════════╗\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[1mPraise Godswill\x1b[0m — Full-Stack Software Engineer                    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m╠════════════════════════════════════════════════════════════════════╣\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mI design and build full-stack web applications and backend\x1b[0m        \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90msystems that handle real users, real payments, and complex\x1b[0m        \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mworkflows. With 4+ years of hands-on experience in Node.js,\x1b[0m       \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mTypeScript, React, Next.js, and PostgreSQL, I\'ve contributed\x1b[0m      \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mto remote startup engineering teams like Lazerpay and\x1b[0m             \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90marchitected complete multi-role platforms—from logistics\x1b[0m          \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mmarketplaces to fintech and administrative systems. I value\x1b[0m       \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mclear communication, end-to-end ownership, and shipping clean,\x1b[0m    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[90mreliable code without unnecessary complexity.\x1b[0m                     \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m                                                                    \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36mPhilosophy: "Thoughtfully engineered. Intentionally built."\x1b[0m       \x1b[36m║\x1b[0m');
          term.writeln('\x1b[1;36m╚════════════════════════════════════════════════════════════════════╝\x1b[0m');
        }
        return;
      }

      if (mainCmd === 'skills') {
        if (compact) {
          term.writeln('\x1b[1;36m━━━ TECHNICAL ARSENAL ━━━\x1b[0m');
          term.writeln('\x1b[36m● Backend:\x1b[0m  Node.js, Express, REST, Socket.IO');
          term.writeln('\x1b[36m● Frontend:\x1b[0m React, Next.js, TypeScript, Tailwind');
          term.writeln('\x1b[36m● Database:\x1b[0m PostgreSQL (Neon/Supabase), MongoDB');
          term.writeln('\x1b[36m● Security:\x1b[0m JWT, OAuth, RBAC, Rate Limiting');
          term.writeln('\x1b[36m● DevOps:\x1b[0m   Docker, Vercel, Render, Git/CI-CD');
        } else {
          term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[1mTECH STACK\x1b[0m                                                  \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mBackend:\x1b[0m   Node.js, Express.js, REST APIs, Socket.IO      \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mFrontend:\x1b[0m  React, Next.js, TypeScript, Tailwind CSS       \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mDatabase:\x1b[0m  PostgreSQL (Neon/Supabase), MongoDB, MySQL     \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mSecurity:\x1b[0m  JWT, OAuth, RBAC, Session Management           \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mDevOps:\x1b[0m    Docker, Vercel, Render, AWS, Git, Postman      \x1b[36m║\x1b[0m');
          term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        }
        return;
      }

      if (mainCmd === 'projects') {
        term.writeln('\x1b[90m⏳ Fetching live systems...\x1b[0m');
        try {
          const projects: ProjectData[] = await fetchProjects();
          term.writeln(`\x1b[32m✅ Loaded ${projects.length} production systems:\x1b[0m`);
          projects.forEach((p: ProjectData, i: number) => {
            const num = String(i + 1).padStart(2, '0');
            term.writeln(` \x1b[1;36m${num}.\x1b[0m \x1b[1m${p.title}\x1b[0m \x1b[32m● ONLINE\x1b[0m`);
            if (!compact && p.liveUrl) {
              term.writeln(`     \x1b[90m→ ${p.liveUrl}\x1b[0m`);
            }
          });
        } catch {
          term.writeln('\x1b[31m❌ Failed to load projects.\x1b[0m');
        }
        return;
      }

      if (mainCmd === 'contact') {
        term.writeln('\x1b[1;36m━━━ CONNECT WITH ME ━━━\x1b[0m');
        term.writeln(' \x1b[36m✉ Email:\x1b[0m    praisegodswill23@gmail.com');
        term.writeln(' \x1b[36m☎ Phone:\x1b[0m    09018403385');
        term.writeln(' \x1b[36m🔗 LinkedIn:\x1b[0m linkedin.com/in/praise-godswill-85ab38205');
        term.writeln(' \x1b[36m🐙 GitHub:\x1b[0m   github.com/456-bytes');
        return;
      }

      if (mainCmd === 'cv') {
        window.open('/cv', '_blank');
        term.writeln('\x1b[32m📄 Opening interactive CV & PDF download (/cv)...\x1b[0m');
        return;
      }

      if (mainCmd === 'neofetch') {
        term.writeln('\x1b[1;36mUSER\x1b[0m     ➜ Praise Godswill');
        term.writeln('\x1b[1;36mOS\x1b[0m       ➜ Quantum OS v3.0');
        term.writeln('\x1b[1;36mKERNEL\x1b[0m   ➜ Next.js 16 + Node.js');
        term.writeln('\x1b[1;36mSHELL\x1b[0m    ➜ xterm.js v5.3');
        term.writeln('\x1b[1;36mSTATUS\x1b[0m   ➜ \x1b[32m● ONLINE\x1b[0m');
        return;
      }

      if (mainCmd === 'stats') {
        const termRows = term.rows || 24;
        const termCols = term.cols || 80;
        term.writeln('\x1b[1;36m━━━ TERMINAL STATS ━━━\x1b[0m');
        term.writeln(` Commands Run:  ${history.length}`);
        term.writeln(` Viewport Grid: ${termCols} cols × ${termRows} rows`);
        term.writeln(' Status:        \x1b[32m● ONLINE\x1b[0m');
        return;
      }

      if (mainCmd === 'whoami') {
        term.writeln('\x1b[1;36mPraise Godswill\x1b[0m \x1b[90m— Full-Stack Software Engineer\x1b[0m');
        return;
      }

      if (mainCmd === 'date') {
        term.writeln(`\x1b[90m${new Date().toUTCString()}\x1b[0m`);
        return;
      }

      if (mainCmd === 'echo') {
        const echoText = args.slice(1).join(' ');
        term.writeln(echoText || '\x1b[90m(empty)\x1b[0m');
        return;
      }

      term.writeln(
        `\x1b[31m✗ Unknown command: \x1b[1m${mainCmd}\x1b[0m\x1b[31m. Tap or type \x1b[36mhelp\x1b[0m\x1b[31m.\x1b[0m`
      );
    } catch {
      term.writeln('\x1b[31m⚠️ Error executing command.\x1b[0m');
    }
  }, []);

  // Trigger a command when user taps a mobile quick-command pill
  const runQuickCommand = async (cmd: string) => {
    const term = termInstanceRef.current;
    if (!term) return;
    term.write(`${cmd}\r\n`);
    historyRef.current.push(cmd);
    await handleCommand(term, cmd, historyRef.current);
    if (cmd !== 'clear') {
      term.write('\x1b[32m➜\x1b[0m ');
    } else {
      term.write('\x1b[32m➜\x1b[0m ');
    }
  };

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let cleanupResize: (() => void) | null = null;

    requestAnimationFrame(() => {
      const container = terminalRef.current;
      if (!container) return;

      setTimeout(() => {
        try {
          const isMobileScreen = typeof window !== 'undefined' && window.innerWidth < 640;
          const term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'bar',
            convertEol: true,
            theme: {
              background: '#0B1120',
              foreground: '#E8EDF5',
              cursor: '#3B82F6',
              black: '#1E293B',
              red: '#F87171',
              green: '#34D399',
              yellow: '#FBBF24',
              blue: '#60A5FA',
              magenta: '#A78BFA',
              cyan: '#22D3EE',
              white: '#F1F5F9',
              brightBlack: '#64748B',
              brightRed: '#FCA5A5',
              brightGreen: '#6EE7B7',
              brightYellow: '#FCD34D',
              brightBlue: '#93C5FD',
              brightMagenta: '#C4B5FD',
              brightCyan: '#67E8F9',
              brightWhite: '#FFFFFF',
            },
            fontSize: isMobileScreen ? 11.5 : 13.5,
            fontFamily: 'Menlo, Monaco, "JetBrains Mono", "Courier New", monospace',
            fontWeight: '400',
            letterSpacing: 0,
            lineHeight: 1.35,
            scrollback: 1000,
          });

          const fitAddon = new FitAddon();
          term.loadAddon(fitAddon);
          fitAddonRef.current = fitAddon;
          termInstanceRef.current = term;

          term.open(container);

          setTimeout(() => {
            try {
              fitAddon.fit();
            } catch {
              term.resize(isMobileScreen ? 40 : 80, 20);
            }
            bootSequence(term);
          }, 60);

          let currentLine = '';
          let historyNavIndex = -1;

          term.onData(async (data) => {
            if (data === '\r') {
              term.write('\r\n');
              if (currentLine.trim().length > 0) {
                historyRef.current.push(currentLine.trim());
              }
              await handleCommand(term, currentLine, historyRef.current);
              currentLine = '';
              term.write('\x1b[32m➜\x1b[0m ');
              historyNavIndex = -1;
              return;
            }

            if (data === '\x7f') {
              if (currentLine.length > 0) {
                currentLine = currentLine.slice(0, -1);
                term.write('\b \b');
              }
              return;
            }

            if (data === '\x1b[A') {
              const localHistory = historyRef.current;
              if (localHistory.length > 0) {
                const newIndex =
                  historyNavIndex < 0 ? localHistory.length - 1 : Math.max(0, historyNavIndex - 1);
                historyNavIndex = newIndex;
                while (currentLine.length > 0) {
                  term.write('\b \b');
                  currentLine = currentLine.slice(0, -1);
                }
                const cmd = localHistory[newIndex];
                currentLine = cmd;
                term.write(cmd);
              }
              return;
            }

            if (data === '\x1b[B') {
              const localHistory = historyRef.current;
              if (localHistory.length > 0) {
                const newIndex = Math.min(localHistory.length - 1, historyNavIndex + 1);
                if (newIndex >= localHistory.length) {
                  historyNavIndex = -1;
                  while (currentLine.length > 0) {
                    term.write('\b \b');
                    currentLine = currentLine.slice(0, -1);
                  }
                  return;
                }
                historyNavIndex = newIndex;
                while (currentLine.length > 0) {
                  term.write('\b \b');
                  currentLine = currentLine.slice(0, -1);
                }
                const cmd = localHistory[newIndex];
                currentLine = cmd;
                term.write(cmd);
              }
              return;
            }

            currentLine += data;
            term.write(data);
          });

          const handleResize = () => {
            if (fitAddonRef.current && termInstanceRef.current) {
              try {
                const mobile = window.innerWidth < 640;
                termInstanceRef.current.options.fontSize = mobile ? 11.5 : 13.5;
                fitAddonRef.current.fit();
              } catch {
                // ignore
              }
            }
          };
          window.addEventListener('resize', handleResize, { passive: true });
          cleanupResize = () => {
            window.removeEventListener('resize', handleResize);
            term.dispose();
          };
        } catch {
          // ignore
        }
      }, 20);
    });

    return () => {
      initializedRef.current = false;
      if (cleanupResize) cleanupResize();
    };
  }, [bootSequence, handleCommand]);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-[#2563EB]/10 border border-[#E2E8F0] transition-all duration-300 hover:shadow-[#2563EB]/20 bg-[#0B1120]">
      {/* Window Chrome Bar */}
      <div className="flex items-center gap-2 px-3.5 sm:px-5 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#FF5F56] rounded-full" />
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#FFBD2E] rounded-full" />
          <span className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#27C93F] rounded-full" />
        </div>
        <span className="ml-2 sm:ml-4 text-[10px] sm:text-[11px] font-mono text-[#64748B] font-medium tracking-[0.12em] uppercase select-none truncate">
          Quantum Terminal
        </span>
        <div className="ml-auto flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-[#22C55E] font-bold tracking-wider uppercase select-none">
            Live
          </span>
          <span className="hidden sm:inline w-px h-4 bg-[#E2E8F0]" />
          <span className="hidden sm:inline text-[10px] font-mono text-[#94A3B8] select-none">
            v3.0.0
          </span>
        </div>
      </div>

      {/* Interactive Touch Command Bar (Works on both Mobile & Desktop) */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111827] border-b border-[#1E293B] overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider mr-1 shrink-0">
          Run:
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => runQuickCommand(cmd)}
            className="px-2.5 py-1 text-[11px] font-mono text-[#60A5FA] bg-[#1E293B]/80 hover:bg-[#2563EB] hover:text-white active:scale-95 rounded-md border border-[#334155]/60 transition-all shrink-0 cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Canvas Container */}
      <div
        ref={terminalRef}
        className="w-full h-[300px] sm:h-[380px] md:h-[420px] p-2 sm:p-3 bg-[#0B1120] overflow-hidden"
      />
    </div>
  );
}
