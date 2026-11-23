import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdminRequest } from '@/lib/serverAuth';
import ChatSession from '../../../../../server/models/ChatSession';

export async function GET(req: NextRequest) {
  const authCheck = verifyAdminRequest(req);
  if (!authCheck.valid) return authCheck.response!;

  try {
    const db = await connectDB();
    if (!db) return NextResponse.json([]);
    const sessions = await ChatSession.find().sort({ updatedAt: -1 }).limit(50);
    return NextResponse.json(sessions);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
