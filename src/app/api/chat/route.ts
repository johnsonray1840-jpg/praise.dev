import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { connectDB } from '@/lib/mongodb';
import { checkRateLimit } from '@/lib/serverAuth';
import {
  RTX256_SYSTEM_PROMPT,
  generateRTX256Response,
  type ChatTurn,
} from '@/lib/rtx256Knowledge';
import ChatSession from '../../../../server/models/ChatSession';

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
    const { message, sessionId, clientHistory } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const sessionIdValue =
      sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const db = await connectDB();

    let session = null;
    if (db) {
      session = await ChatSession.findOne({ sessionId: sessionIdValue });
      if (!session) {
        session = new ChatSession({ sessionId: sessionIdValue, messages: [] });
      }
      session.messages.push({ role: 'user', content: message });
    }

    const historyTurns: ChatTurn[] = session
      ? session.messages.slice(-16).map((m: { role: 'user' | 'assistant' | 'system'; content: string }) => ({
          role: m.role,
          content: m.content,
        }))
      : Array.isArray(clientHistory)
      ? clientHistory.slice(-10)
      : [{ role: 'user', content: message }];

    let reply = '';
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: RTX256_SYSTEM_PROMPT }, ...historyTurns],
            temperature: 0.65,
            max_tokens: 650,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            timeout: 12000,
          }
        );
        reply = response.data.choices[0].message.content.trim();
      } catch {
        reply = generateRTX256Response(message, historyTurns.slice(0, -1));
      }
    } else {
      reply = generateRTX256Response(message, historyTurns.slice(0, -1));
    }

    if (db && session) {
      session.messages.push({ role: 'assistant', content: reply });
      session.updatedAt = new Date();
      await session.save().catch(() => {});
    }

    return NextResponse.json({ reply, sessionId: sessionIdValue });
  } catch (error) {
    console.error('RTX256 Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
