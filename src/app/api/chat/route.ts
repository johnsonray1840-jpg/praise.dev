import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { checkRateLimit } from '@/lib/serverAuth';
import {
  RTX256_SYSTEM_PROMPT,
  retrieveRelevantKnowledgeContext,
  generateRTX256Response,
  detectPromptInjection,
  PROMPT_INJECTION_REFUSAL,
  type ChatTurn,
} from '@/lib/rtx256Knowledge';

const MAX_MESSAGE_LENGTH = 1500;

function sanitizeText(input: string): string {
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

function sanitizeOutput(output: string): string {
  return output
    .replace(/sk-[a-zA-Z0-9_-]{16,}/g, '[redacted]')
    .replace(/mongodb\+srv:\/\/[^\s]+/gi, '[redacted]');
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
    const { message, sessionId, clientHistory } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const cleanMessage = sanitizeText(message);
    if (!cleanMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.` },
        { status: 400 }
      );
    }

    // Ephemeral session ID only — visitor conversations are kept in-session
    // rather than persisted permanently, prioritizing privacy and minimal retention.
    const sessionIdValue =
      typeof sessionId === 'string' && sessionId.length <= 64
        ? sanitizeText(sessionId)
        : `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

    // Server-side prompt-injection gate: intercept before any LLM call
    if (detectPromptInjection(cleanMessage)) {
      return NextResponse.json({
        reply: PROMPT_INJECTION_REFUSAL,
        sessionId: sessionIdValue,
      });
    }

    const sanitizedHistory: ChatTurn[] = Array.isArray(clientHistory)
      ? clientHistory
          .filter(
            (m): m is ChatTurn =>
              Boolean(m) &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string'
          )
          .slice(-12)
          .map((m) => ({
            role: m.role,
            content: sanitizeText(m.content).slice(0, MAX_MESSAGE_LENGTH),
          }))
      : [];

    const historyTurns: ChatTurn[] = [
      ...sanitizedHistory,
      { role: 'user', content: cleanMessage },
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
        reply = generateRTX256Response(cleanMessage, sanitizedHistory);
      }
    } else {
      reply = generateRTX256Response(cleanMessage, sanitizedHistory);
    }

    return NextResponse.json({ reply: sanitizeOutput(reply), sessionId: sessionIdValue });
  } catch {
    console.error('RTX256 Chat error: request processing failed');
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
