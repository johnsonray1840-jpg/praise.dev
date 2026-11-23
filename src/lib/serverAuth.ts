import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return 'dev-secret-key-change-in-production';
  }
  return secret;
};

export const getAdminPassword = (): string => {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return 'admin123';
  }
  return password;
};

export function verifyAdminRequest(req: NextRequest): { valid: boolean; response?: NextResponse } {
  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return {
      valid: false,
      response: NextResponse.json({ error: 'No token provided' }, { status: 401 }),
    };
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return {
      valid: false,
      response: NextResponse.json({ error: 'Invalid token format' }, { status: 401 }),
    };
  }

  try {
    jwt.verify(token, getJwtSecret());
    return { valid: true };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        response: NextResponse.json({ error: 'Token expired' }, { status: 401 }),
      };
    }
    return {
      valid: false,
      response: NextResponse.json({ error: 'Invalid token' }, { status: 403 }),
    };
  }
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStores: Record<string, Record<string, RateLimitEntry>> = {};

export function checkRateLimit(
  req: NextRequest,
  namespace: string,
  max: number,
  windowMs: number,
  message = 'Too many requests, please try again later.'
): NextResponse | null {
  if (!rateLimitStores[namespace]) {
    rateLimitStores[namespace] = {};
  }
  const store = rateLimitStores[namespace];

  const forwarded = req.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const now = Date.now();

  if (!store[clientIp] || store[clientIp].resetTime <= now) {
    store[clientIp] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return null;
  }

  store[clientIp].count += 1;

  if (store[clientIp].count > max) {
    const retryAfterSeconds = Math.ceil((store[clientIp].resetTime - now) / 1000);
    return NextResponse.json(
      { error: message, retryAfterSeconds },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  return null;
}
