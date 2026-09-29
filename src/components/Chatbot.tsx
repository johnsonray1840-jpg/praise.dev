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

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // ✅ Single handler for both input and quick replies
  const handleSend = async (text?: string) => {
    const message = text || input.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      // ✅ Pass sessionId to the API
      const data = await sendChat(message, sessionId);
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply || "I'm here to help! What would you like to know?" }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-[380px] sm:w-[420px] h-[520px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#2563EB]/15 border border-white/80 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#2563EB] to-[#06B6D4]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/80 font-mono">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-[#F8FAFC] to-white">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-3">
                    <MessageSquare className="w-8 h-8 text-[#2563EB]" />
                  </div>
                  <p className="text-sm text-[#475569] font-medium">Ask me anything</p>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-[200px]">
                    About skills, projects, experience, or hiring
                  </p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-[#2563EB] text-white rounded-br-sm'
                          : 'bg-white border border-[#E2E8F0] text-[#0B1120] rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <span className="text-sm leading-relaxed">{msg.text}</span>
                    </div>
                  </motion.div>
                ))
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[#E2E8F0] px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#60A5FA] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length > 0 && !loading && (
              <div className="px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply.label}
                      onClick={() => handleSend(reply.value)}
                      className="px-3 py-1 text-[10px] font-mono text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all duration-200 whitespace-nowrap"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-white border-t border-[#E2E8F0] flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-all text-[#0B1120] placeholder:text-[#94A3B8]"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-5 py-2.5 bg-[#2563EB] text-white font-medium rounded-xl hover:bg-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-[#2563EB]/25 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 ${
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
          {open ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
        </span>
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white shadow-md" />
        )}
      </motion.button>
    </div>
  );
}