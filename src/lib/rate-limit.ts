/**
 * Rate limiting middleware for API routes
 * Simple in-memory rate limiter for development, consider external service for production
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(private windowMs: number = 60000, private maxRequests: number = 100) {
    // Clean up expired entries every 5 minutes
    if (typeof global !== "undefined") {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
  }

  private getClientKey(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    return `${ip}:${userAgent.substring(0, 20)}`;
  }

  private cleanup() {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      const entry = this.store[key];
      if (entry && entry.resetTime < now) {
        delete this.store[key];
      }
    });
  }

  isLimited(request: Request): boolean {
    const key = this.getClientKey(request);
    const now = Date.now();

    if (!this.store[key]) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return false;
    }

    if (now > this.store[key].resetTime) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return false;
    }

    this.store[key].count++;
    return this.store[key].count > this.maxRequests;
  }

  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}

// Export singleton instances for different endpoints
export const createRateLimiter = (windowMs?: number, maxRequests?: number) => {
  return new RateLimiter(windowMs, maxRequests);
};

// Predefined rate limiters for common scenarios
export const rateLimiters = {
  standard: new RateLimiter(60000, 100), // 100 requests per minute
  strict: new RateLimiter(60000, 10), // 10 requests per minute
  loose: new RateLimiter(60000, 500), // 500 requests per minute
};
