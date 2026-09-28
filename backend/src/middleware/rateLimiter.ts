import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

export const createRateLimiter = (options: {
  windowMs: number;
  max: number;
  message?: string;
}) => {
  const store: RateLimitStore = {};
  const { windowMs, max, message = 'Too many requests, please try again later.' } = options;

  // Cleanup old entries every minute
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime <= now) {
        delete store[key];
      }
    }
  }, 60000).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIp = requestIp.getClientIp(req) || req.ip || 'unknown';
    const now = Date.now();

    if (!store[clientIp] || store[clientIp].resetTime <= now) {
      store[clientIp] = {
        count: 1,
        resetTime: now + windowMs,
      };
      next();
      return;
    }

    store[clientIp].count += 1;

    if (store[clientIp].count > max) {
      const retryAfterSeconds = Math.ceil((store[clientIp].resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      res.status(429).json({ error: message, retryAfterSeconds });
      return;
    }

    next();
  };
};
