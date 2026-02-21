/**
 * Request logging and monitoring utilities
 * Track API performance, errors, and usage patterns
 */

export interface RequestLog {
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  duration: number;
  ip: string;
  userAgent: string;
  errorMessage?: string;
}

class RequestLogger {
  private logs: RequestLog[] = [];
  private maxLogs = 1000;

  /**
   * Log a request
   */
  log(requestLog: RequestLog) {
    this.logs.push(requestLog);

    // Keep only recent logs in memory
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[${requestLog.timestamp}] ${requestLog.method} ${requestLog.path} - ${requestLog.statusCode} (${requestLog.duration}ms)`
      );
    }
  }

  /**
   * Get client IP from request
   */
  getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (!forwarded) return "unknown";
    const ip = forwarded.split(",")[0];
    return ip ? ip.trim() : "unknown";
  }

  /**
   * Get recent logs
   */
  getLogs(limit: number = 100): RequestLog[] {
    return this.logs.slice(-limit);
  }

  /**
   * Get logs by path pattern
   */
  getLogsByPath(pathPattern: string | RegExp): RequestLog[] {
    const regex = typeof pathPattern === "string" ? new RegExp(pathPattern) : pathPattern;
    return this.logs.filter((log) => regex.test(log.path));
  }

  /**
   * Get error logs
   */
  getErrorLogs(limit: number = 100): RequestLog[] {
    return this.logs
      .filter((log) => log.statusCode >= 400)
      .slice(-limit);
  }

  /**
   * Clear logs
   */
  clear() {
    this.logs = [];
  }
}

export const requestLogger = new RequestLogger();

/**
 * Middleware to track request metrics
 */
export function createRequestLogger(label: string) {
  return (request: Request) => {
    const startTime = Date.now();
    const method = request.method;
    const url = new URL(request.url);
    const path = url.pathname + url.search;
    const ip = requestLogger.getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    return {
      startTime,
      method,
      path,
      ip,
      userAgent,
      label,
      finish: (statusCode: number, errorMessage?: string) => {
        const duration = Date.now() - startTime;
        requestLogger.log({
          timestamp: new Date().toISOString(),
          method,
          path,
          statusCode,
          duration,
          ip,
          userAgent,
          errorMessage,
        });
      },
    };
  };
}

/**
 * Performance metrics collector
 */
export class PerformanceMetrics {
  private metrics: Record<string, { count: number; totalTime: number; slowest: number }> = {};

  record(label: string, duration: number) {
    if (!this.metrics[label]) {
      this.metrics[label] = { count: 0, totalTime: 0, slowest: 0 };
    }

    this.metrics[label].count++;
    this.metrics[label].totalTime += duration;
    this.metrics[label].slowest = Math.max(this.metrics[label].slowest, duration);
  }

  getMetrics(label?: string) {
    if (label) {
      const metric = this.metrics[label];
      return metric ? {
        label,
        count: metric.count,
        average: Math.round(metric.totalTime / metric.count),
        slowest: metric.slowest,
      } : null;
    }

    return Object.entries(this.metrics).map(([key, value]) => ({
      label: key,
      count: value.count,
      average: Math.round(value.totalTime / value.count),
      slowest: value.slowest,
    }));
  }

  clear() {
    this.metrics = {};
  }
}

export const performanceMetrics = new PerformanceMetrics();
