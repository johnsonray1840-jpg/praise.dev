'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, X, Sparkles, RotateCcw } from 'lucide-react';
import { sendChat } from '@/lib/api';

const QUICK_REPLIES = [
  { label: 'Who is Praise?', value: 'Who is Praise?' },
  { label: 'What kind of engineer is he?', value: 'What kind of engineer is he?' },
  { label: 'Show me his projects', value: 'Show me his projects.' },
  { label: 'Engineering approach', value: 'How does he approach programming?' },
  { label: 'Can I work with him?', value: 'Can I work with him?' },
];

const WELCOME_MESSAGE = {
  role: 'ai' as const,
  text: "Hello! I'm **RTX256**, Praise Godswill's portfolio assistant.\n\nI can walk you through his **backend & full-stack systems**, explain projects like **Jay's Food Court**, or share his **engineering philosophy** and experience. Where would you like to start?",
};

/**
 * Formats bold (**text**), inline code (`code`), and clickable URLs cleanly inside chat bubbles.
 */
function renderFormattedMessage(text: string, isUser = false) {
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    if (!line.trim()) {
      return <div key={lineIdx} className="h-2" />;
    }
    const tokens = line.split(/(\*\*.*?\*\*|`[^`]+`|https?:\/\/[^\s)]+)/g);
    return (
      <div key={lineIdx} className={lineIdx > 0 ? 'mt-1' : ''}>
        {tokens.map((token, tokenIdx) => {
          if (token.startsWith('**') && token.endsWith('**')) {
            return (
              <strong key={tokenIdx} className="font-semibold">
                {token.slice(2, -2)}
              </strong>
            );
          }
          if (token.startsWith('`') && token.endsWith('`')) {
            return (
              <code
                key={tokenIdx}
                className={`px-1 py-0.5 rounded text-[11px] font-mono ${
                  isUser ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#0F172A]'
                }`}
              >
                {token.slice(1, -1)}
              </code>
            );
          }
          if (/^https?:\/\/[^\s)]+$/.test(token)) {
            return (
              <a
                key={tokenIdx}
                href={token}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline underline-offset-2 break-all ${
                  isUser ? 'text-white/95 hover:text-white' : 'text-[#2563EB] hover:text-[#1D4ED8]'
                }`}
              >
                {token}
              </a>
            );
          }
          return <span key={tokenIdx}>{token}</span>;
        })}
      </div>
    );
  });
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    WELCOME_MESSAGE,
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    }
    return '';
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('chatbot-toggle', { detail: { open } }));
    }
    if (open && typeof window !== 'undefined' && window.innerWidth >= 640) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleReset = () => {
    if (loading) return;
    setMessages([WELCOME_MESSAGE]);
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`);
    setInput('');
    inputRef.current?.focus();
  };

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const historyPayload = messages.slice(-10).map((m) => ({
        role: m.role === 'ai' ? ('assistant' as const) : ('user' as const),
        content: m.text,
      }));
      const data = await sendChat(message, sessionId, historyPayload);
      await new Promise((resolve) => setTimeout(resolve, 250));
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: data.reply || "I'm here to help! What would you like to know about Praise?" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            role="dialog"
            aria-modal="false"
            aria-label="RTX256 Portfolio AI Assistant"
            className="w-[calc(100vw-2rem)] max-w-[380px] sm:w-[400px] sm:max-w-none h-[min(510px,78dvh)] sm:h-[540px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-[#2563EB]/20 border border-[#E2E8F0] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 bg-gradient-to-r from-[#0B1120] via-[#1E3A8A] to-[#2563EB] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-tight font-mono tracking-wide">
                      RTX256
                    </h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-white/15 text-white/90 rounded border border-white/10">
                      Portfolio AI
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/80 font-mono">
                      Praise Godswill • Knowledge Engine
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {messages.length > 1 && (
                  <button
                    onClick={handleReset}
                    disabled={loading}
                    aria-label="Reset conversation"
                    title="New conversation"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center text-white/90 hover:text-white cursor-pointer disabled:opacity-40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              aria-live="polite"
              className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-gradient-to-b from-[#F8FAFC] to-white"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'ai' && (
                    <div
                      aria-hidden="true"
                      className="w-6 h-6 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0 mb-0.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-[13.5px] leading-relaxed break-words ${
                      msg.role === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-sm'
                        : 'bg-white border border-[#E2E8F0] text-[#0B1120] rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {renderFormattedMessage(msg.text, msg.role === 'user')}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[#E2E8F0] px-3.5 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length > 0 && !loading && (
              <div className="px-3.5 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0] shrink-0 overflow-x-auto">
                <div className="flex items-center gap-1.5 no-scrollbar">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleSend(reply.value)}
                      className="px-2.5 py-1 text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-2.5 sm:p-3 bg-white border-t border-[#E2E8F0] flex gap-2 shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask RTX256 about Praise..."
                className="flex-1 min-w-0 px-3.5 py-2 text-base sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all text-[#0B1120] placeholder:text-[#94A3B8]"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="px-4 py-2 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Only shown when chat is closed) */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open RTX256 AI chat"
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:shadow-[#2563EB]/40 shadow-[#2563EB]/30 cursor-pointer"
        >
          <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-20" />
          <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-pulse opacity-30" />
          <span className="relative z-10">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </span>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22C55E] rounded-full border-2 border-white shadow-md" />
        </motion.button>
      )}
    </div>
  );
}
