'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendContact } from '@/lib/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  body: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await sendContact(data);
      if (res.ok) {
        toast.success('Message sent successfully! 🚀');
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try later.');
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <motion.div variants={fieldVariants} className="relative">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
          <input
            {...register('name')}
            placeholder="Full Name"
            className={`w-full pl-11 pr-5 pt-6 pb-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 text-[#0B1120] placeholder:text-[#94A3B8] focus:outline-none ${
              errors.name && touchedFields.name
                ? 'border-[#EF4444] focus:border-[#EF4444] shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
                : 'border-[#E2E8F0] focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'
            }`}
          />
        </div>
        <AnimatePresence>
          {errors.name && touchedFields.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1.5 text-xs font-mono text-[#EF4444] flex items-center gap-1.5"
            >
              <span>✗</span> {errors.name.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={fieldVariants} className="relative">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
          <input
            {...register('email')}
            placeholder="Email Address"
            type="email"
            className={`w-full pl-11 pr-5 pt-6 pb-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 text-[#0B1120] placeholder:text-[#94A3B8] focus:outline-none ${
              errors.email && touchedFields.email
                ? 'border-[#EF4444] focus:border-[#EF4444] shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
                : 'border-[#E2E8F0] focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'
            }`}
          />
        </div>
        <AnimatePresence>
          {errors.email && touchedFields.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1.5 text-xs font-mono text-[#EF4444] flex items-center gap-1.5"
            >
              <span>✗</span> {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={fieldVariants} className="relative">
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#94A3B8] pointer-events-none" />
          <textarea
            {...register('body')}
            placeholder="Your Message"
            rows={5}
            className={`w-full pl-11 pr-5 pt-6 pb-2 rounded-xl bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 text-[#0B1120] placeholder:text-[#94A3B8] focus:outline-none resize-none min-h-[140px] ${
              errors.body && touchedFields.body
                ? 'border-[#EF4444] focus:border-[#EF4444] shadow-[0_0_0_4px_rgba(239,68,68,0.1)]'
                : 'border-[#E2E8F0] focus:border-[#2563EB] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)]'
            }`}
          />
        </div>
        <AnimatePresence>
          {errors.body && touchedFields.body && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1.5 text-xs font-mono text-[#EF4444] flex items-center gap-1.5"
            >
              <span>✗</span> {errors.body.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={fieldVariants} className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="group relative w-full py-4 px-6 bg-[#2563EB] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#2563EB]/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span className="font-mono text-sm">SENDING...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="text-lg">✓</span>
                <span className="font-mono text-sm">SENT SUCCESSFULLY</span>
              </>
            ) : (
              <>
                <span className="font-mono text-sm tracking-wider uppercase">Send Message</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>

        <p className="mt-4 text-center text-[10px] font-mono text-[#94A3B8]">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#2563EB]">🔒</span>
            Your message is encrypted and securely delivered
          </span>
        </p>
      </motion.div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-[#2563EB]/20 border border-[#E2E8F0] text-center pointer-events-auto max-w-sm mx-4">
              <div className="text-5xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-[#0B1120]">Message Sent!</h3>
              <p className="text-sm text-[#475569] mt-1">I&apos;ll get back to you soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}