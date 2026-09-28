'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import io, { Socket } from 'socket.io-client';
import { SOCKET_BASE } from '@/lib/api';

export default function VisitorPulse() {
  const [count, setCount] = useState(0);
  const [peakCount, setPeakCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uptime, setUptime] = useState('0m');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const startTime = Date.now();

    const updateUptime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      if (hours > 0) {
        setUptime(`${hours}h ${minutes}m`);
      } else {
        setUptime(`${minutes}m`);
      }
    };

    updateUptime();
    const uptimeInterval = setInterval(updateUptime, 30000);

    const socket = io(SOCKET_BASE);
    socketRef.current = socket;

    socket.on('visitor-count', (c: number) => {
      setCount(c);
      setPeakCount((prev) => Math.max(prev, c));
    });

    return () => {
      socket.disconnect();
      clearInterval(uptimeInterval);
    };
  }, []);

  // Determine status based on count
  const getStatus = () => {
    if (count === 0) return { label: 'Connecting...', color: '#94A3B8' };
    if (count <= 2) return { label: `${count} online now`, color: '#22C55E' };
    if (count <= 5) return { label: `${count} people online`, color: '#3B82F6' };
    return { label: `🔥 ${count} active`, color: '#F59E0B' };
  };

  const status = getStatus();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="relative"
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Main Card */}
        <motion.div
          className="flex items-center gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-xl rounded-full border border-white/80 shadow-xl shadow-[#2563EB]/10 cursor-pointer transition-all duration-300 hover:shadow-[#2563EB]/20 hover:border-[#2563EB]/20"
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Radar Pulse Animation */}
          <div className="relative flex items-center justify-center w-8 h-8">
            {/* Outer pulse rings */}
            <div className="absolute inset-0 rounded-full border-2 border-[#2563EB]/20 animate-ping" />
            <div className="absolute inset-1 rounded-full border-2 border-[#2563EB]/15 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-[#2563EB]/5" />

            {/* Inner dot with glow */}
            <div className="relative w-3 h-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] shadow-lg shadow-[#2563EB]/40">
              <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-75" />
            </div>
          </div>

          {/* Visitor Count */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#0B1120]">
                {count > 0 ? (
                  <motion.span
                    key={count}
                    initial={{ scale: 1.3, color: '#2563EB' }}
                    animate={{ scale: 1, color: '#0B1120' }}
                    transition={{ duration: 0.3 }}
                  >
                    {count}
                  </motion.span>
                ) : (
                  '0'
                )}
              </span>
              <span className="text-xs text-[#475569] font-medium">{status.label}</span>
            </div>
          </div>

          {/* Status Dot */}
          <div className="flex items-center gap-1.5 ml-1">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: status.color }}
            />
            <span className="text-[9px] font-mono text-[#94A3B8] tracking-wider uppercase">
              Live
            </span>
          </div>

          {/* Expand Arrow */}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#94A3B8] text-xs ml-1"
          >
            ▾
          </motion.div>
        </motion.div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-3 left-0 min-w-[200px] bg-white/90 backdrop-blur-xl rounded-xl border border-[#E2E8F0] shadow-2xl shadow-[#2563EB]/10 p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider uppercase">
                    Current
                  </span>
                  <span className="text-sm font-bold text-[#0B1120]">{count}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-2">
                  <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider uppercase">
                    Peak
                  </span>
                  <span className="text-sm font-bold text-[#2563EB]">{peakCount}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-2">
                  <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider uppercase">
                    Uptime
                  </span>
                  <span className="text-sm font-mono text-[#475569]">{uptime}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-2">
                  <span className="text-[10px] font-mono text-[#94A3B8] tracking-wider uppercase">
                    Status
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#22C55E]">
                    <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heat Ring - Outer glow on high traffic */}
        {count > 0 && (
          <div className="absolute -inset-1 rounded-full border border-[#2563EB]/10 animate-pulse pointer-events-none" />
        )}
      </motion.div>
    </div>
  );
}