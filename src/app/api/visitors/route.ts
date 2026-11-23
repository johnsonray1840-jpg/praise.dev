import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Visitor from '../../../../server/models/Visitor';

// In-memory active visitor heartbeat map for serverless real-time pulse
const activeHeartbeats = new Map<string, number>();
const HEARTBEAT_TTL_MS = 45000; // 45 seconds

function cleanupAndCount(clientId?: string): number {
  const now = Date.now();
  if (clientId) {
    activeHeartbeats.set(clientId, now);
  }
  for (const [id, lastSeen] of activeHeartbeats.entries()) {
    if (now - lastSeen > HEARTBEAT_TTL_MS) {
      activeHeartbeats.delete(id);
    }
  }
  return Math.max(1, activeHeartbeats.size);
}

export async function GET(req: NextRequest) {
  const clientId = req.nextUrl.searchParams.get('clientId') || undefined;
  const activeCount = cleanupAndCount(clientId);
  return NextResponse.json({ activeCount });
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'Unknown';
    const body = await req.json().catch(() => ({}));
    const clientId = body.clientId || ip;

    const activeCount = cleanupAndCount(clientId);

    const db = await connectDB();
    if (db && body.recordVisit) {
      await Visitor.create({
        ip,
        country: req.headers.get('x-vercel-ip-country') || 'Unknown',
        city: req.headers.get('x-vercel-ip-city') || 'Unknown',
      }).catch(() => {});
    }

    return NextResponse.json({ recorded: true, activeCount });
  } catch {
    return NextResponse.json({ recorded: false, activeCount: 1 });
  }
}
