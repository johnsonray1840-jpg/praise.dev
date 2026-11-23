import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { connectDB } from '@/lib/mongodb';
import { checkRateLimit } from '@/lib/serverAuth';
import Message from '../../../../server/models/Message';

export async function POST(req: NextRequest) {
  const rateLimitResponse = checkRateLimit(
    req,
    'contact',
    5,
    10 * 60 * 1000,
    'Too many contact messages sent. Please wait a few minutes before trying again.'
  );
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { name, email, body } = await req.json();

    if (!name || !email || !body) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, body' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    if (db) {
      await Message.create({ name, email, body });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'praisegodswill23@gmail.com',
          subject: `New Portfolio Message from ${name}`,
          text: `${body}\n\nReply to: ${email}`,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
