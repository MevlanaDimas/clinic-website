/**
 * In-memory caching utility for performance optimization
 * Useful for caching database queries and API responses
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class Cache<T = unknown> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private defaultTTL: number; // Time to live in milliseconds

  constructor(defaultTTL: number = 5 * 60 * 1000) {
    // Default 5 minutes
    this.defaultTTL = defaultTTL;

    // Cleanup expired entries every minute
    if (typeof global !== "undefined") {
      setInterval(() => this.cleanup(), 60 * 1000);
    }
  }

  /**
   * Set a value in cache
   */
  set(key: string, value: T, ttl: number = this.defaultTTL): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttl,
    });
  }

  /**
   * Get a value from cache
   */
  get(key: string): T | undefined {
    const entry = this.store.get(key);

    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    const entry = this.store.get(key);
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a key from cache
   */
  delete(key: string): boolean {
    return this.store.delete(key);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Get or compute value
   */
  async getOrCompute<R>(
    key: string,
    compute: () => Promise<R>,
    ttl: number = this.defaultTTL
  ): Promise<R> {
    const cached = this.get(key);
    if (cached !== undefined) return cached as unknown as R;

    const value = await compute();
    this.set(key, value as unknown as T, ttl);
    return value;
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.store.delete(key));
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.store.size;
  }

  /**
   * Get cache stats
   */
  stats(): {
    size: number;
    keys: string[];
  } {
    return {
      size: this.store.size,
      keys: Array.from(this.store.keys()),
    };
  }
}

// Export singleton cache instances for common use cases
export const queryCache = new Cache(5 * 60 * 1000); // 5 minutes
export const apiCache = new Cache(10 * 60 * 1000); // 10 minutes
export const imageCache = new Cache(24 * 60 * 60 * 1000); // 24 hours

/**
 * Create a cached version of a function
 */
export function memoize<Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>,
  ttl: number = 5 * 60 * 1000,
  cache: Cache = queryCache
) {
  return async (...args: Args): Promise<R> => {
    const key = `${fn.name}:${JSON.stringify(args)}`;
    return cache.getOrCompute(key, () => fn(...args), ttl);
  };
}
