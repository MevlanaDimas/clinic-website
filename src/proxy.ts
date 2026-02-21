import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createRequestLogger } from '@/lib/request-logger';

const requestLog = createRequestLogger("PROXY");

export default clerkMiddleware(async (_, request: NextRequest) => {
  const logger = requestLog(request);

  // Clone response to add headers
  const response = NextResponse.next();

  // Add security and tracking headers
  response.headers.set("X-Request-ID", crypto.randomUUID());
  response.headers.set("X-Processing-Time", `${Date.now()}ms`);

  // Redirect HTTP to HTTPS in production
  if (process.env.NODE_ENV === "production" && request.headers.get("x-forwarded-proto") === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    logger.finish(308);
    return NextResponse.redirect(url);
  }

  logger.finish(200);
  return response;
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ]
}