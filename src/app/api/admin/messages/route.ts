import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import Message from '../../../../../server/models/Message';

export async function GET(req: NextRequest) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
