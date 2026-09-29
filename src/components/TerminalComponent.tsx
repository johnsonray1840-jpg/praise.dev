'use client';
import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';
import { fetchProjects } from '@/lib/api';

interface ProjectData {
  title: string;
  description: string;
  liveUrl: string;
}

// ASCII Logo
const ASCII_LOGO = `
\x1b[1;36m╔═══════════════════════════════════════════════════════════╗
║   ██████╗ ██████╗  █████╗ ██╗███████╗███████╗
║   ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██╔════╝
║   ██████╔╝██████╔╝███████║██║███████╗█████╗  
║   ██╔═══╝ ██╔══██╗██╔══██║██║╚════██║██╔══╝  
║   ██║     ██║  ██║██║  ██║██║███████║███████╗
║   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝
╚═══════════════════════════════════════════════════════════╝\x1b[0m
`;

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const initializedRef = useRef(false);

  // --- Boot Sequence ---
  const bootSequence = async (term: Terminal) => {
    try {
      term.clear();
      const lines = ASCII_LOGO.split('\n');
      for (const line of lines) {
        term.writeln(line);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      await new Promise((resolve) => setTimeout(resolve, 200));

      term.writeln('\x1b[36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
      term.writeln(`\x1b[36m║\x1b[0m  \x1b[1mSystem:\x1b[0m  Quantum OS v3.0                                    \x1b[36m║\x1b[0m`);
      term.writeln(`\x1b[36m║\x1b[0m  \x1b[1mKernel:\x1b[0m  xterm.js v5.3                                     \x1b[36m║\x1b[0m`);
      term.writeln(`\x1b[36m║\x1b[0m  \x1b[1mStatus:\x1b[0m  \x1b[32m● ONLINE\x1b[0m  `);
      term.writeln(`\x1b[36m║\x1b[0m  \x1b[1mWelcome:\x1b[0m  Praise Godswill — Software Engineer        \x1b[36m║\x1b[0m`);
      term.writeln('\x1b[36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
      await new Promise((resolve) => setTimeout(resolve, 300));
      term.writeln(
        '\n\x1b[90mType \x1b[1;36m"help"\x1b[0m\x1b[90m to see all commands. Press \x1b[1;36m↑\x1b[0m\x1b[90m/\x1b[1;36m↓\x1b[0m\x1b[90m for history.\x1b[0m\n'
      );
      term.write('\x1b[32m➜\x1b[0m ');
    } catch {
      // ignore
    }
  };

  // --- Command Handler ---
  const handleCommand = async (term: Terminal, command: string, history: string[]) => {
    const trimmed = command.trim();
    if (!trimmed) return;
    const args = trimmed.split(/\s+/);
    const mainCmd = args[0].toLowerCase();

    try {
      // Clear
      if (mainCmd === 'clear') {
        term.clear();
        term.write('\x1b[32m➜\x1b[0m ');
        return;
      }

      // Help
      if (mainCmd === 'help') {
        term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mCOMMAND\x1b[0m     \x1b[1mDESCRIPTION\x1b[0m                                    \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mabout\x1b[0m       Read my professional bio                         \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mskills\x1b[0m      View my full tech stack                          \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mprojects\x1b[0m    Fetch live projects from my API                \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mcontact\x1b[0m     Show my social links & email                    \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mcv\x1b[0m          Download my resume (PDF)                        \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mneofetch\x1b[0m    Display system information                       \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mstats\x1b[0m       Show terminal statistics                         \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mwhoami\x1b[0m      Display current user identity                    \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mdate\x1b[0m        Show current date and time                       \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mecho\x1b[0m        Repeat what you type                             \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36mclear\x1b[0m       Clear the terminal screen                        \x1b[36m║\x1b[0m');
        term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        return;
      }

      // About
      if (mainCmd === 'about') {
        term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mPraise Godswill\x1b[0m — Software Engineer                    \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m                                                                      \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[90mFull-stack architect with a passion for clean code,\x1b[0m  \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[90mscalable systems, and delivering exceptional user\x1b[0m  \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[90mexperiences. Building products that solve real\x1b[0m      \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[90mproblems with modern technology stacks.\x1b[0m              \x1b[36m║\x1b[0m');
        term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        return;
      }

      // Skills
      if (mainCmd === 'skills') {
        term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mTECH STACK\x1b[0m                                                    \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mFrontend:\x1b[0m  React, Next.js, TypeScript, HTML, CSS, JS  \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mStyling:\x1b[0m   TailwindCSS, Bootstrap                       \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mBackend:\x1b[0m   Node.js, Express, PHP                         \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mDatabase:\x1b[0m  MongoDB                                          \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mDevOps:\x1b[0m    Docker, AWS, Git, Postman, Render, Resend       \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m●\x1b[0m \x1b[1mArchitecture:\x1b[0m SaaS Development                              \x1b[36m║\x1b[0m');
        term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        return;
      }

      // Projects (live API)
      if (mainCmd === 'projects') {
        term.writeln('\x1b[90m⏳ Fetching live systems from the registry...\x1b[0m');
        try {
          const projects: ProjectData[] = await fetchProjects();
          term.writeln(`\x1b[32m✅ Found \x1b[1m${projects.length}\x1b[0m\x1b[32m systems\x1b[0m\n`);
          term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
          term.writeln('\x1b[36m║\x1b[0m  \x1b[1m#\x1b[0m  \x1b[1mPROJECT\x1b[0m                                   \x1b[1mSTATUS\x1b[0m        \x1b[36m║\x1b[0m');
          term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
          projects.forEach((p: ProjectData, i: number) => {
            const num = String(i + 1).padStart(2, ' ');
            const name = p.title.padEnd(30).slice(0, 30);
            term.writeln(`\x1b[36m║\x1b[0m  ${num}. ${name} \x1b[32m● ONLINE\x1b[0m  \x1b[36m║\x1b[0m`);
          });
          term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
          term.writeln('\n\x1b[90mType \x1b[36mprojects --detail\x1b[0m\x1b[90m for URLs and descriptions.\x1b[0m');
        } catch {
          term.writeln('\x1b[31m❌ Failed to connect to API. Is the backend running?\x1b[0m');
        }
        return;
      }

      // Projects --detail
      if (mainCmd === 'projects' && args[1] === '--detail') {
        try {
          const projects: ProjectData[] = await fetchProjects();
          term.writeln(`\n\x1b[1;36m${'='.repeat(60)}\x1b[0m`);
          projects.forEach((p: ProjectData, i: number) => {
            term.writeln(`\x1b[1m${String(i + 1).padStart(2, '0')}.\x1b[0m \x1b[1;36m${p.title}\x1b[0m`);
            term.writeln(`   \x1b[90m${p.description}\x1b[0m`);
            term.writeln(`   \x1b[36m→\x1b[0m \x1b[90m${p.liveUrl}\x1b[0m\n`);
          });
          term.writeln(`\x1b[1;36m${'='.repeat(60)}\x1b[0m`);
        } catch {
          term.writeln('\x1b[31m❌ Failed to fetch projects.\x1b[0m');
        }
        return;
      }

      // Contact
      if (mainCmd === 'contact') {
        term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[1mCONNECT WITH ME\x1b[0m                                              \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m✉\x1b[0m  \x1b[1mEmail:\x1b[0m   \x1b[90mPraisegodswill23@gmail.com\x1b[0m                             \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m🔗\x1b[0m  \x1b[1mLinkedIn:\x1b[0m \x1b[90mlinkedin.com/in/Praise-godswill\x1b[0m                \x1b[36m║\x1b[0m');
        term.writeln('\x1b[36m║\x1b[0m  \x1b[36m🐙\x1b[0m  \x1b[1mGitHub:\x1b[0m   \x1b[90mgithub.com/Praise-dev\x1b[0m                           \x1b[36m║\x1b[0m');
        term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        return;
      }

      // CV
      if (mainCmd === 'cv') {
        window.open('/cv.pdf', '_blank');
        term.writeln('\x1b[32m📄 Opening CV...\x1b[0m');
        return;
      }

      // Neofetch
      if (mainCmd === 'neofetch') {
        const neofetch = `
\x1b[36m       .__.\x1b[0m         \x1b[1m${'USER'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  \x1b[1mPraise Godswill\x1b[0m
\x1b[36m     .-'    '-.\x1b[0m     \x1b[1m${'OS'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  Quantum OS v3.0
\x1b[36m   .'          '.\x1b[0m   \x1b[1m${'UPTIME'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  42 days, 7 hours
\x1b[36m  /              \\\x1b[0m  \x1b[1m${'SHELL'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  xterm.js v5.3
\x1b[36m ;    ▄▄▄▄▄▄    ;\x1b[0m  \x1b[1m${'CPU'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  M2 Ultra
\x1b[36m ;   █ █▄█ █   ;\x1b[0m  \x1b[1m${'MEM'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  64GB DDR5
\x1b[36m ;    █▄█▄█    ;\x1b[0m  \x1b[1m${'TERMINAL'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  Quantum Terminal
\x1b[36m  \\              /\x1b[0m  \x1b[1m${'STATUS'.padEnd(12)}\x1b[0m \x1b[36m➜\x1b[0m  \x1b[32m● ONLINE\x1b[0m
\x1b[36m   '.          .'\x1b[0m   
\x1b[36m     '-......-'\x1b[0m     
`;
        term.writeln(neofetch);
        return;
      }

      // Stats
      if (mainCmd === 'stats') {
        const uptime = '42d 7h 23m';
        const commandsRun = history.length;
        const termRows = term.rows || 24;
        const termCols = term.cols || 80;
        term.writeln('\x1b[1;36m╔══════════════════════════════════════════════════════════════╗\x1b[0m');
        term.writeln(`\x1b[36m║\x1b[0m  \x1b[1mTERMINAL STATISTICS\x1b[0m                                        \x1b[36m║\x1b[0m`);
        term.writeln('\x1b[36m╠══════════════════════════════════════════════════════════════╣\x1b[0m');
        term.writeln(`\x1b[36m║\x1b[0m  \x1b[90mUptime:\x1b[0m        ${uptime.padEnd(46)}\x1b[36m║\x1b[0m`);
        term.writeln(`\x1b[36m║\x1b[0m  \x1b[90mCommands Run:\x1b[0m   ${String(commandsRun).padEnd(46)}\x1b[36m║\x1b[0m`);
        term.writeln(`\x1b[36m║\x1b[0m  \x1b[90mTerminal Size:\x1b[0m  ${String(termCols)}×${String(termRows).padEnd(43)}\x1b[36m║\x1b[0m`);
        term.writeln(`\x1b[36m║\x1b[0m  \x1b[90mHistory:\x1b[0m         ${String(history.length).padEnd(46)}\x1b[36m║\x1b[0m`);
        term.writeln('\x1b[1;36m╚══════════════════════════════════════════════════════════════╝\x1b[0m');
        return;
      }

      // whoami
      if (mainCmd === 'whoami') {
        term.writeln('\x1b[1;36mPraise\x1b[0m  \x1b[90m(Senior Software Engineer)\x1b[0m');
        return;
      }

      // date
      if (mainCmd === 'date') {
        const now = new Date();
        term.writeln(
          `\x1b[90m${now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}  \x1b[36m${now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}\x1b[0m`
        );
        return;
      }

      // echo
      if (mainCmd === 'echo') {
        const echoText = args.slice(1).join(' ');
        term.writeln(echoText || '\x1b[90m(empty)\x1b[0m');
        return;
      }

      // Unknown command
      term.writeln(`\x1b[31m✗ Command not found: \x1b[1m${mainCmd}\x1b[0m\x1b[31m. Type \x1b[36mhelp\x1b[0m\x1b[31m for options.\x1b[0m`);
    } catch {
      term.writeln('\x1b[31m⚠️ An error occurred while executing the command.\x1b[0m');
    }
  };

  // Only initialize after the component is mounted and the DOM is ready
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    requestAnimationFrame(() => {
      const container = terminalRef.current;
      if (!container) return;

      setTimeout(() => {
        try {
          const term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'bar',
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
            fontSize: typeof window !== 'undefined' && window.innerWidth < 480 ? 10.5 : typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 13.5,
            fontFamily: 'Menlo, Monaco, "JetBrains Mono", "Courier New", monospace',
            fontWeight: '400',
            letterSpacing: 0.3,
            lineHeight: 1.35,
            scrollback: 1000,
          });

          const fitAddon = new FitAddon();
          term.loadAddon(fitAddon);
          fitAddonRef.current = fitAddon;

          term.open(container);

          setTimeout(() => {
            try {
              fitAddon.fit();
            } catch {
              term.resize(80, 24);
            }
          }, 50);

          bootSequence(term);

          let currentLine = '';
          const localHistory: string[] = [];
          let historyNavIndex = -1;

          term.onData(async (data) => {
            // Handle enter key
            if (data === '\r') {
              term.write('\r\n');
              if (currentLine.trim().length > 0) {
                localHistory.push(currentLine.trim());
              }
              await handleCommand(term, currentLine, localHistory);
              currentLine = '';
              term.write('\x1b[32m➜\x1b[0m ');
              historyNavIndex = -1;
              return;
            }

            // Backspace
            if (data === '\x7f') {
              if (currentLine.length > 0) {
                currentLine = currentLine.slice(0, -1);
                term.write('\b \b');
              }
              return;
            }

            // Up arrow
            if (data === '\x1b[A') {
              if (localHistory.length > 0) {
                const newIndex = historyNavIndex < 0 ? localHistory.length - 1 : Math.max(0, historyNavIndex - 1);
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

            // Down arrow
            if (data === '\x1b[B') {
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

            // Regular input
            currentLine += data;
            term.write(data);
          });

          const handleResize = () => {
            if (fitAddonRef.current) {
              try {
                fitAddonRef.current.fit();
              } catch {
                // ignore
              }
            }
          };
          window.addEventListener('resize', handleResize);

          return () => {
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
    };
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl shadow-[#2563EB]/10 border border-[#E2E8F0] transition-all duration-300 hover:shadow-[#2563EB]/20">
      {/* Chrome Bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-[#FF5F56] rounded-full hover:bg-[#FF5F56]/80 transition-colors cursor-pointer" />
          <span className="w-3.5 h-3.5 bg-[#FFBD2E] rounded-full hover:bg-[#FFBD2E]/80 transition-colors cursor-pointer" />
          <span className="w-3.5 h-3.5 bg-[#27C93F] rounded-full hover:bg-[#27C93F]/80 transition-colors cursor-pointer" />
        </div>
        <span className="ml-4 text-[11px] font-mono text-[#94A3B8] font-medium tracking-[0.15em] uppercase select-none">
          Quantum Terminal
        </span>
        <div className="ml-auto flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-[#22C55E] font-bold tracking-wider uppercase select-none">
            ● Live
          </span>
          <span className="w-px h-5 bg-[#E2E8F0]" />
          <span className="text-[10px] font-mono text-[#94A3B8] select-none">v3.0.0</span>
        </div>
      </div>

      {/* Terminal Container */}
      <div ref={terminalRef} className="w-full h-[360px] sm:h-[400px] md:h-[430px] p-1 bg-[#0B1120]" />
    </div>
  );
}