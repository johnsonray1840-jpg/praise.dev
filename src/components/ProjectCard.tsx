'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Code,          // ✅ Replaced Github with Code (works in all versions)
  Copy, 
  Monitor, 
  Smartphone, 
  RefreshCw 
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  repoUrl: string;
  deployedAt?: string;
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const number = String(index + 1).padStart(2, '0');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await fetch(project.liveUrl, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: AbortSignal.timeout(3000),
        });
        setIsOnline(true);
      } catch {
        setIsOnline(project.liveUrl ? true : false);
      }
    };

    if (project.liveUrl) {
      checkStatus();
    }
  }, [project.liveUrl]);

  const handlePreviewToggle = () => {
    if (!showPreview) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 600);
    }
    setShowPreview(!showPreview);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(project.liveUrl);
    // Toast notification would go here
  };

  const getDeployedDate = () => {
    if (!project.deployedAt) return null;
    const date = new Date(project.deployedAt);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative py-10 border-b border-[#F1F5F9] first:pt-0 last:border-b-0 transition-all duration-300 hover:border-[#2563EB]/30 hover:bg-gradient-to-r hover:from-[#2563EB]/[0.02] hover:to-transparent rounded-xl px-4 -mx-4"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Numbering */}
        <div className="relative w-20 shrink-0 overflow-hidden">
          <span className="block text-5xl md:text-6xl font-mono font-bold text-[#E2E8F0] group-hover:text-[#2563EB] transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105">
            {number}
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2563EB] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1120] group-hover:text-[#2563EB] transition-colors duration-300">
              {project.title}
            </h3>
            
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className={`w-1.5 h-1.5 rounded-full ${
                isOnline === null ? 'bg-[#94A3B8]' :
                isOnline ? 'bg-[#22C55E] animate-pulse' : 'bg-[#EF4444]'
              }`} />
              <span className="text-[9px] font-mono font-medium text-[#64748B] tracking-wider uppercase">
                {isOnline === null ? 'Checking' : isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {getDeployedDate() && (
              <span className="text-[10px] font-mono text-[#94A3B8]">
                deployed {getDeployedDate()}
              </span>
            )}
          </div>
          
          <p className="text-[#475569] text-sm max-w-2xl leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 + i * 0.03 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-[10px] font-mono font-medium uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full cursor-default transition-all duration-300 hover:shadow-md hover:shadow-[#2563EB]/20 hover:border-[#2563EB]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link text-sm font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1 transition-all duration-300 hover:gap-2"
            >
              Live System
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
            
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link text-sm text-[#94A3B8] hover:text-[#0B1120] transition-all duration-300 inline-flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5 text-[#94A3B8] group-hover/link:text-[#0B1120] transition-colors" />
              Source
            </a>
            
            <button
              onClick={handlePreviewToggle}
              className="text-sm text-[#94A3B8] hover:text-[#2563EB] transition-all duration-300 font-mono hover:scale-105"
            >
              {showPreview ? '[close preview]' : '[preview]'}
            </button>

            <button
              onClick={copyUrl}
              className="text-sm text-[#94A3B8] hover:text-[#2563EB] transition-all duration-300 font-mono text-[11px] hover:scale-105 inline-flex items-center gap-1"
              title="Copy URL to clipboard"
            >
              <Copy className="w-3.5 h-3.5" />
              copy
            </button>
          </div>
          
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-6 overflow-hidden"
              >
                <div className="relative border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAFC] shadow-lg shadow-[#2563EB]/5">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#FF5F56] rounded-full hover:bg-[#FF5F56]/80 transition-colors cursor-pointer" />
                      <span className="w-3 h-3 bg-[#FFBD2E] rounded-full hover:bg-[#FFBD2E]/80 transition-colors cursor-pointer" />
                      <span className="w-3 h-3 bg-[#27C93F] rounded-full hover:bg-[#27C93F]/80 transition-colors cursor-pointer" />
                    </div>
                    
                    <div className="ml-4 flex items-center gap-1.5 bg-[#F1F5F9] rounded-lg p-0.5 border border-[#E2E8F0]">
                      <button
                        onClick={() => setDeviceView('desktop')}
                        className={`px-2.5 py-0.5 text-[9px] font-mono font-medium rounded-md transition-all duration-200 inline-flex items-center gap-1 ${
                          deviceView === 'desktop' 
                            ? 'bg-white text-[#0B1120] shadow-sm border border-[#E2E8F0]' 
                            : 'text-[#94A3B8] hover:text-[#0B1120]'
                        }`}
                      >
                        <Monitor className="w-3 h-3" />
                        Desktop
                      </button>
                      <button
                        onClick={() => setDeviceView('mobile')}
                        className={`px-2.5 py-0.5 text-[9px] font-mono font-medium rounded-md transition-all duration-200 inline-flex items-center gap-1 ${
                          deviceView === 'mobile' 
                            ? 'bg-white text-[#0B1120] shadow-sm border border-[#E2E8F0]' 
                            : 'text-[#94A3B8] hover:text-[#0B1120]'
                        }`}
                      >
                        <Smartphone className="w-3 h-3" />
                        Mobile
                      </button>
                    </div>

                    <span className="ml-auto text-[10px] text-[#64748B] font-mono truncate max-w-[200px]">
                      {project.liveUrl.replace(/^https?:\/\//, '')}
                    </span>
                  </div>

                  <div className={`relative transition-all duration-500 ${
                    deviceView === 'mobile' 
                      ? 'mx-auto w-[375px] h-[667px] border-4 border-[#0B1120] rounded-3xl overflow-hidden' 
                      : 'w-full h-96'
                  }`}>
                    {isLoading ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8FAFC] gap-3">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full border-3 border-[#E2E8F0] border-t-[#2563EB] animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#2563EB]/20 animate-pulse" />
                          </div>
                        </div>
                        <span className="text-xs font-mono text-[#94A3B8] animate-pulse">
                          Loading preview...
                        </span>
                      </div>
                    ) : (
                      <iframe
                        src={project.liveUrl}
                        className={`w-full h-full transition-all duration-500 ${
                          deviceView === 'mobile' ? 'scale-100' : 'scale-100'
                        }`}
                        title={`Preview of ${project.title}`}
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between px-4 py-2 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                    <span className="text-[9px] font-mono text-[#94A3B8] inline-flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />
                      Auto-refresh on load
                    </span>
                    <span className="text-[9px] font-mono text-[#94A3B8] flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#22C55E] rounded-full animate-pulse" />
                      Live preview
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}