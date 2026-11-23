import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getAdminPassword, getJwtSecret } from '@/lib/serverAuth';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (password === getAdminPassword()) {
      const token = jwt.sign(
        { role: 'admin', timestamp: Date.now() },
        getJwtSecret(),
        { expiresIn: '24h' }
      );
      return NextResponse.json({
        token,
        expiresIn: '24h',
        message: 'Authentication successful',
      });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
