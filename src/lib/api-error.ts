/**
 * Centralized error handling for API routes
 * Provides type-safe responses and consistent error formatting
 */

import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, statusCode: number = 200): ApiResponse<T> {
  return {
    success: true,
    data,
    statusCode,
  };
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string | AppError | ZodError | Error,
  statusCode: number = 500
): ApiResponse {
  if (error instanceof ZodError) {
    return {
      success: false,
      error: "Validation error",
      errors: error.flatten().fieldErrors as Record<string, string[]>,
      statusCode: 400,
    };
  }

  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    };
  }

  const message = error instanceof Error ? error.message : String(error);
  return {
    success: false,
    error: message,
    statusCode,
  };
}

/**
 * Send HTTP response with proper error handling
 */
export function sendResponse<T>(response: ApiResponse<T>) {
  return NextResponse.json(
    { success: response.success, data: response.data, error: response.error, errors: response.errors },
    { status: response.statusCode }
  );
}

/**
 * Wrapper for safe async API route handlers
 */
export async function apiHandler<T>(
  handler: (request: Request) => Promise<ApiResponse<T>>
) {
  return async (request: Request) => {
    try {
      const response = await handler(request);
      return sendResponse(response);
    } catch (error) {
      console.error("[API Error]", error);

      if (error instanceof AppError) {
        return sendResponse(errorResponse(error, error.statusCode));
      }

      if (error instanceof ZodError) {
        return sendResponse(errorResponse(error, 400));
      }

      const message = error instanceof Error ? error.message : "Unknown error";
      return sendResponse(errorResponse(message, 500));
    }
  };
}

/**
 * Common API errors
 */
export const ApiErrors = {
  UNAUTHORIZED: new AppError(401, "Unauthorized"),
  FORBIDDEN: new AppError(403, "Forbidden"),
  NOT_FOUND: new AppError(404, "Not found"),
  BAD_REQUEST: new AppError(400, "Bad request"),
  CONFLICT: new AppError(409, "Conflict"),
  INTERNAL_SERVER_ERROR: new AppError(500, "Internal server error"),
  SERVICE_UNAVAILABLE: new AppError(503, "Service unavailable"),
  TOO_MANY_REQUESTS: new AppError(429, "Too many requests"),
};
