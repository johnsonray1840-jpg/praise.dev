'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, X } from 'lucide-react';
import { sendChat } from '@/lib/api';

const QUICK_REPLIES = [
  { label: 'Skills', value: 'What are your skills?' },
  { label: 'Projects', value: 'Tell me about your projects' },
  { label: 'Experience', value: 'What is your experience?' },
  { label: 'Contact', value: 'How can I contact you?' },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    {
      role: 'ai',
      text: "👋 Hi there! I'm Praise's AI assistant. Ask me about skills, projects, experience, or anything else!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      let storedSession = localStorage.getItem('chatSessionId');
      if (!storedSession) {
        storedSession = `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        localStorage.setItem('chatSessionId', storedSession);
      }
      return storedSession;
    }
    return '';
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Notify VisitorPulse when chat is open so they never collide on mobile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('chatbot-toggle', { detail: { open } }));
    }
    if (open && typeof window !== 'undefined' && window.innerWidth >= 640) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const data = await sendChat(message, sessionId);
      await new Promise((resolve) => setTimeout(resolve, 350));
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: data.reply || "I'm here to help! What would you like to know?" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: "Sorry, I'm having trouble connecting. Please try again." },
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
            className="mb-3 w-[calc(100vw-2rem)] max-w-[380px] sm:w-[390px] sm:max-w-none h-[min(460px,72dvh)] sm:h-[510px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-[#2563EB]/20 border border-[#E2E8F0] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Praise&apos;s AI Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/90 font-mono">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition-colors flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3 bg-gradient-to-b from-[#F8FAFC] to-white">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[86%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed break-words ${
                      msg.role === 'user'
                        ? 'bg-[#2563EB] text-white rounded-br-sm'
                        : 'bg-white border border-[#E2E8F0] text-[#0B1120] rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
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
                      className="px-2.5 py-1 text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-200 whitespace-nowrap shrink-0"
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
                placeholder="Type a message..."
                className="flex-1 min-w-0 px-3.5 py-2 text-base sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all text-[#0B1120] placeholder:text-[#94A3B8]"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="px-4 py-2 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-[#EF4444] hover:bg-[#DC2626] shadow-[#EF4444]/30'
            : 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] hover:shadow-[#2563EB]/40 shadow-[#2563EB]/30'
        }`}
      >
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-20" />
            <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-pulse opacity-30" />
          </>
        )}
        <span className="relative z-10">
          {open ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}
        </span>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22C55E] rounded-full border-2 border-white shadow-md" />
        )}
      </motion.button>
    </div>
  );
}
