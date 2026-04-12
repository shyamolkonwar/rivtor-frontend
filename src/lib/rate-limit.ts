import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed
   */
  limit: number;

  /**
   * Time window in seconds
   */
  window: number;

  /**
   * Unique identifier for this rate limit
   */
  key: string;
}

/**
 * Rate limiter using Upstash Redis
 *
 * Uses sliding window algorithm for accurate rate limiting
 */
export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if the request should be rate limited
   *
   * @param identifier - Unique identifier (IP address, user ID, etc.)
   * @returns Object with { success: boolean, limit: number, remaining: number, reset: number }
   */
  async check(identifier: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const now = Date.now();
    const windowStart = now - this.config.window * 1000;
    const key = `ratelimit:${this.config.key}:${identifier}`;

    try {
      // Remove old entries outside the current window
      await redis.zremrangebyscore(key, 0, windowStart);

      // Count requests in current window
      const requests = await redis.zcard(key);

      if (requests >= this.config.limit) {
        // Rate limited - get the oldest request to calculate reset time
        const oldestRequest = await redis.zrange(key, 0, 0, { withScores: true }) as Array<[string, number]>;
        const resetTime = oldestRequest.length > 0
          ? Math.ceil((oldestRequest[0][1] + this.config.window * 1000) / 1000)
          : Math.ceil((now + this.config.window * 1000) / 1000);

        return {
          success: false,
          limit: this.config.limit,
          remaining: 0,
          reset: resetTime,
        };
      }

      // Add current request
      await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` });

      // Set expiry for the key
      await redis.expire(key, this.config.window + 1);

      return {
        success: true,
        limit: this.config.limit,
        remaining: this.config.limit - requests - 1,
        reset: Math.ceil((now + this.config.window * 1000) / 1000),
      };
    } catch (error) {
      // If Redis is unavailable, allow the request (fail open)
      console.error('Rate limiter error:', error);
      return {
        success: true,
        limit: this.config.limit,
        remaining: this.config.limit,
        reset: Math.ceil((now + this.config.window * 1000) / 1000),
      };
    }
  }
}

/**
 * Extract identifier from request
 *
 * Priority: User ID > IP address
 */
export function getIdentifier(request: NextRequest): string {
  // Try to get user ID from header (if authenticated)
  const userId = request.headers.get('x-user-id');
  if (userId) return `user:${userId}`;

  // Fall back to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim()
    : request.headers.get('x-real-ip')
    || 'unknown';

  return `ip:${ip}`;
}

/**
 * Rate limit middleware for Next.js API routes
 *
 * Usage:
 * ```ts
 * import { rateLimit } from '@/lib/rate-limit';
 *
 * export async function POST(request: NextRequest) {
 *   const rateLimitResult = await rateLimit({
 *     limit: 10,
 *     window: 60,
 *     key: 'api:submit-application',
 *   })(request);
 *
 *   if (!rateLimitResult.success) {
 *     return NextResponse.json(
 *       { error: 'Too many requests', retryAfter: rateLimitResult.reset },
 *       { status: 429 }
 *     );
 *   }
 *
 *   // Your API logic here
 * }
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  const limiter = new RateLimiter(config);

  return async (request: NextRequest) => {
    const identifier = getIdentifier(request);
    return await limiter.check(identifier);
  };
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const rateLimiters = {
  /**
   * Application submission: 3 submissions per hour per IP
   */
  applicationSubmit: new RateLimiter({
    limit: 3,
    window: 3600, // 1 hour
    key: 'api:submit-application',
  }),

  /**
   * General API: 60 requests per minute per IP
   */
  generalApi: new RateLimiter({
    limit: 60,
    window: 60, // 1 minute
    key: 'api:general',
  }),

  /**
   * Status check: 10 requests per minute per IP
   */
  statusCheck: new RateLimiter({
    limit: 10,
    window: 60, // 1 minute
    key: 'api:status',
  }),
};
