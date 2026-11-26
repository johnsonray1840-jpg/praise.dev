import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { checkRateLimit } from '@/lib/serverAuth';
import {
  RTX256_SYSTEM_PROMPT,
  retrieveRelevantKnowledgeContext,
  generateRTX256Response,
  type ChatTurn,
} from '@/lib/rtx256Knowledge';

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

    // Ephemeral session ID only — visitor conversations are kept in-session
    // rather than persisted permanently, prioritizing privacy and minimal retention.
    const sessionIdValue =
      sessionId || `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    const sanitizedHistory: ChatTurn[] = Array.isArray(clientHistory)
      ? clientHistory
          .filter(
            (m): m is ChatTurn =>
              Boolean(m) &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string'
          )
          .slice(-12)
      : [];

    const historyTurns: ChatTurn[] = [
      ...sanitizedHistory,
      { role: 'user', content: message },
    ];

    let reply = '';
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (OPENAI_API_KEY && OPENAI_API_KEY.startsWith('sk-')) {
      try {
        const dynamicKnowledgeContext = retrieveRelevantKnowledgeContext(
          message,
          sanitizedHistory
        );
        const fullSystemPrompt = `${RTX256_SYSTEM_PROMPT}\n\n=== VERIFIED KNOWLEDGE BASE (CATEGORIES A-F) ===\n${dynamicKnowledgeContext}`;

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o-mini',
            messages: [{ role: 'system', content: fullSystemPrompt }, ...historyTurns],
            temperature: 0.6,
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
        reply = generateRTX256Response(message, sanitizedHistory);
      }
    } else {
      reply = generateRTX256Response(message, sanitizedHistory);
    }

    return NextResponse.json({ reply, sessionId: sessionIdValue });
  } catch (error) {
    console.error('RTX256 Chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
