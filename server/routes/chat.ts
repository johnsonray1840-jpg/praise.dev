import { Router } from 'express';
import ChatSession from '../models/ChatSession';
import axios from 'axios';
import { auth } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimiter';

const router = Router();

const chatLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: 'Chat rate limit exceeded. Please wait a moment before sending more messages.',
});

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// System prompt – your resume and background (Praise Godswill)
const SYSTEM_PROMPT = `You are an AI assistant for Praise Godswill, Software Engineer and Full-Stack Developer. 
Your role is to have natural, helpful conversations with visitors to his portfolio.

About Praise:
- Name: Praise Godswill
- Title: Software Engineer
- Tech Stack: Next.js, React, TypeScript, Node.js, Express, MongoDB, Docker, AWS, PHP, TailwindCSS, Bootstrap, Git, Postman, Render, Resend, SaaS Development.
- Experience: 5+ years building scalable SaaS platforms, real-time data pipelines, and production-grade infrastructure.
- Key Projects: Crisis Sentinel (real-time crisis reporting), Quantnoon (algorithmic trading), SchEase (school management), GoHunt (crypto exchange).
- Philosophy: "I don't just build websites. I build systems."
- Availability: Open to freelance, contract, and full-time opportunities. Available for remote work worldwide.

You are a friendly, conversational AI. You can talk about ANYTHING, not just Praise.
- If someone asks about Praise, answer with enthusiasm using the information above.
- If someone asks general questions (tech, life, jokes, advice), answer conversationally.
- If someone asks personal questions (like "where are you from?"), respond naturally.
- Always be helpful, warm, and professional.
- Be honest if you don't know something.
- Keep responses concise but informative.

Remember: You are a real conversational AI, not just a FAQ bot. Enjoy the conversation!`;

router.post('/', chatLimiter, async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const sessionIdValue = sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

  try {
    let session = await ChatSession.findOne({ sessionId: sessionIdValue });
    if (!session) {
      session = new ChatSession({ sessionId: sessionIdValue, messages: [] });
    }

    session.messages.push({ role: 'user', content: message });

    let reply = '';

    // ✅ If OpenAI key exists, use it
    if (OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')) {
      const conversation = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...session.messages.slice(-15).map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
      ];

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: conversation,
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
      } catch (openaiError) {
        console.error('OpenAI error:', openaiError);
        reply = fallbackReply(message);
      }
    } else {
      // ✅ If no OpenAI key, use enhanced fallback
      reply = fallbackReply(message);
    }

    session.messages.push({ role: 'assistant', content: reply });
    session.updatedAt = new Date();
    await session.save();

    res.json({ reply, sessionId: sessionIdValue });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

// ✅ Enhanced fallback with better question handling
function fallbackReply(message: string): string {
  const lower = message.toLowerCase();
  
  // Greetings
  if (lower.match(/^(hi|hello|hey|good morning|good afternoon|good evening|nice to meet you)/)) {
    return "Hello there! 👋 It's great to meet you too! I'm Praise's AI assistant. Ask me anything about his skills, projects, or experience — or just have a chat!";
  }

  // Personal questions
  if (lower.includes('where are you from') || lower.includes('where do you come from')) {
    return "I'm an AI assistant for Praise Godswill, so my virtual home is his portfolio! But I can chat about anything you like.";
  }

  if (lower.includes('how are you') || lower.includes('how do you do')) {
    return "I'm doing fantastic! Thanks for asking. It's always a pleasure to chat with visitors to Praise's portfolio. How can I help you today?";
  }

  // Availability & remote work
  if (lower.includes('remote') || lower.includes('available for remote') || lower.includes('can i hire')) {
    return "Absolutely! Praise is available for remote work worldwide. He's open to freelance, contract, and full-time opportunities. You can reach him via email at Praisegodswill23@gmail.com or through the contact form on this portfolio.";
  }

  if (lower.includes('work actively') || lower.includes('actively working') || lower.includes('currently working')) {
    return "Yes! Praise is actively working on building scalable SaaS platforms and innovative web systems. He's currently open to new opportunities as well. Check out his projects on the portfolio!";
  }

  // Location questions
  if (lower.includes('england') || lower.includes('uk') || lower.includes('united kingdom')) {
    return "Ah, you're from England! 🇬🇧 That's wonderful! Praise works with clients globally, and he's always happy to connect with people from all over the world.";
  }

  if (lower.includes('nigeria') || lower.includes('lagos') || lower.includes('abuja')) {
    return "Oh, you're from Nigeria! 🇳🇬 That's amazing! Praise is based in Nigeria and is proud to represent African talent in the global tech scene.";
  }

  // Skills questions
  if (lower.includes('skills') || lower.includes('stack') || lower.includes('tech') || lower.includes('technologies')) {
    return "Praise is proficient in Next.js, React, TypeScript, Node.js, Express, MongoDB, Docker, AWS, PHP, TailwindCSS, Bootstrap, and more. He specializes in building scalable SaaS platforms and production-grade infrastructure.";
  }

  // Projects questions
  if (lower.includes('project') || lower.includes('work') || lower.includes('build') || lower.includes('system')) {
    return "Praise has built several systems including Crisis Sentinel (real-time crisis reporting), Quantnoon (algorithmic trading platform), SchEase (school management system), and GoHunt (crypto exchange). You can explore all of them on his portfolio!";
  }

  // Experience questions
  if (lower.includes('experience') || lower.includes('background') || lower.includes('about') || lower.includes('who is')) {
    return "Praise is Software Engineer with over 5 years of experience building production-grade web applications. He's passionate about clean code, performance, and great UX. His philosophy is: 'I don't just build websites. I build systems.'";
  }

  // Contact & hiring
  if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach')) {
    return "You can contact Praise via email at Praisegodswill23@gmail.com or through the contact form on this portfolio. He's open to freelance, contract, and full-time opportunities!";
  }

  // General tech questions
  if (lower.includes('javascript') || lower.includes('python') || lower.includes('react') || lower.includes('next')) {
    return "Great question! Praise is an expert in JavaScript, TypeScript, React, Next.js, and many other modern web technologies. If you're interested in learning more, check out his projects on the portfolio!";
  }

  // Default response
  return "That's an interesting question! 🤔 I'm not sure I have the answer to that one, but I can tell you all about Praise's skills, projects, and experience. What would you like to know?";
}

// Admin routes to fetch chat sessions
router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await ChatSession.find().sort({ updatedAt: -1 }).limit(50);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

router.get('/sessions/:id', auth, async (req, res) => {
  try {
    const session = await ChatSession.findOne({ sessionId: req.params.id });
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

export default router;