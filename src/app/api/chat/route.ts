import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { connectDB } from '@/lib/mongodb';
import { checkRateLimit } from '@/lib/serverAuth';
import ChatSession from '../../../../server/models/ChatSession';

const SYSTEM_PROMPT = `You are an AI assistant for Praise Godswill, Software Engineer and Full-Stack Developer. 
Your role is to have natural, helpful conversations with visitors to his portfolio.

About Praise:
- Name: Praise Godswill
- Title: Full-Stack Software Engineer
- Bio: "I design and build full-stack web applications and backend systems that handle real users, real payments, and complex workflows. With 4+ years of hands-on experience in Node.js, TypeScript, React, Next.js, and PostgreSQL, I’ve contributed to remote startup engineering teams like Lazerpay and architected complete multi-role platforms—from logistics marketplaces to fintech and administrative systems. I value clear communication, end-to-end ownership, and shipping clean, reliable code without unnecessary complexity."
- Tech Stack: Next.js, React, TypeScript, Node.js, Express, PostgreSQL (Neon, Supabase), MongoDB, Docker, AWS, PHP, TailwindCSS, Git, Postman, Render, Vercel, Resend, SaaS Development.
- Experience: 4+ years building scalable web applications, backend APIs, and production-grade infrastructure (Confidential Technology Company, Lazerpay, and Independent Full-Stack Engineering).
- Key Projects: Jay's Food Court (https://jays-food-court.vercel.app - 4-sided full-stack restaurant ordering, delivery & logistics marketplace with Next.js, TypeScript, Supabase, PostgreSQL), Global Citizen Immigration Platform (https://global-immigration-platform.vercel.app/ - immigration, travel eligibility checker, crypto wallet & 3D WebGL AI guidance platform), Lone Star Autos (full-stack automotive dealership platform with Node.js, Express, MongoDB, Socket.IO, Cloudinary), ORC Investment Platform (investment programme management system with Node.js, Neon PostgreSQL, Resend/Nodemailer, Vercel Serverless & Cron).
- Philosophy: "Thoughtfully engineered. Intentionally built."
- Availability: Open to freelance, contract, and full-time opportunities. Available for remote work worldwide.

You are a friendly, conversational AI. You can talk about ANYTHING, not just Praise.
- If someone asks about Praise, answer with enthusiasm using the information above.
- If someone asks general questions (tech, life, jokes, advice), answer conversationally.
- Always be helpful, warm, and professional.
- Keep responses concise but informative.`;

function fallbackReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.match(/^(hi|hello|hey|good morning|good afternoon|good evening|nice to meet you)/)) {
    return "Hello there! 👋 It's great to meet you! I'm Praise's AI assistant. Ask me anything about his skills, projects, or experience — or just have a chat!";
  }
  if (lower.includes('where are you from') || lower.includes('where do you come from')) {
    return "I'm an AI assistant for Praise Godswill, so my virtual home is his portfolio! But I can chat about anything you like.";
  }
  if (lower.includes('how are you') || lower.includes('how do you do')) {
    return "I'm doing fantastic! Thanks for asking. How can I help you explore Praise's work today?";
  }
  if (lower.includes('remote') || lower.includes('available for remote') || lower.includes('can i hire')) {
    return "Absolutely! Praise is available for remote work worldwide. He's open to freelance, contract, and full-time opportunities. You can reach him at Praisegodswill23@gmail.com or through the contact form.";
  }
  if (lower.includes('skills') || lower.includes('stack') || lower.includes('tech') || lower.includes('technologies')) {
    return "Praise is proficient in Next.js, React, TypeScript, Three.js, Node.js, Express, MongoDB, Docker, AWS, PHP, and TailwindCSS. He specializes in building scalable SaaS platforms and production-grade infrastructure.";
  }
  if (lower.includes('project') || lower.includes('work') || lower.includes('build') || lower.includes('system') || lower.includes('food') || lower.includes('jay') || lower.includes('immigration') || lower.includes('auto') || lower.includes('orc')) {
    return "Praise has engineered several production systems: 1) Jay's Food Court (https://jays-food-court.vercel.app — full-stack restaurant ordering, kitchen operations & delivery platform built with Next.js, TypeScript, Supabase & PostgreSQL), 2) Global Citizen Immigration Platform (https://global-immigration-platform.vercel.app/ — interactive 3D globe & AI immigration assistant), 3) Lone Star Autos (full-stack automotive dealership platform with Node.js, Express, MongoDB, Socket.IO & Cloudinary), and 4) ORC Investment Platform (investment programme management & admin CRUD platform built with Node.js, Neon PostgreSQL & Vercel Serverless Cron).";
  }
  if (lower.includes('experience') || lower.includes('background') || lower.includes('about') || lower.includes('who is') || lower.includes('philosophy')) {
    return "Praise designs and builds full-stack web applications and backend systems that handle real users, real payments, and complex workflows. With 4+ years of hands-on experience in Node.js, TypeScript, React, Next.js, and PostgreSQL, he has contributed to remote startup engineering teams like Lazerpay and architected complete multi-role platforms—from logistics marketplaces to fintech and administrative systems. He values clear communication, end-to-end ownership, and shipping clean, reliable code without unnecessary complexity. Philosophy: 'Thoughtfully engineered. Intentionally built.'";
  }
  if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach')) {
    return "You can contact Praise via email at Praisegodswill23@gmail.com or directly through the contact form on this page!";
  }
  return "That's a great question! Praise specializes in full-stack engineering with Next.js, TypeScript, Node.js, and cloud infrastructure. Would you like to hear about his projects, skills, or availability?";
}

export async function POST(req: NextRequest) {
  const rateLimitResponse = checkRateLimit(
    req,
    'chat',
    30,
    60 * 1000,
    'Chat rate limit exceeded. Please wait a moment before sending more messages.'
  );
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { message, sessionId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const sessionIdValue = sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const db = await connectDB();

    let session = null;
    if (db) {
      session = await ChatSession.findOne({ sessionId: sessionIdValue });
      if (!session) {
        session = new ChatSession({ sessionId: sessionIdValue, messages: [] });
      }
      session.messages.push({ role: 'user', content: message });
    }

    let reply = '';
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')) {
      const history = session
        ? session.messages.slice(-15).map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          }))
        : [{ role: 'user', content: message }];

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
            temperature: 0.8,
            max_tokens: 500,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
        reply = response.data.choices[0].message.content.trim();
      } catch {
        reply = fallbackReply(message);
      }
    } else {
      reply = fallbackReply(message);
    }

    if (db && session) {
      session.messages.push({ role: 'assistant', content: reply });
      session.updatedAt = new Date();
      await session.save().catch(() => {});
    }

    return NextResponse.json({ reply, sessionId: sessionIdValue });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
