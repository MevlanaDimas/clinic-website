import prisma from "@/lib/db";
import { successResponse, errorResponse, apiHandler } from "@/lib/api-error";
import { rateLimiters } from "@/lib/rate-limit";
import { createRequestLogger } from "@/lib/request-logger";

const requestLog = createRequestLogger("GET /api/search");
const SEARCH_QUERY_MIN_LENGTH = 2;
const SEARCH_QUERY_MAX_LENGTH = 100;
const SEARCH_RESULTS_LIMIT = 6;

export const GET = apiHandler(async (request: Request) => {
  // Rate limiting - strict for search
  if (rateLimiters.strict.isLimited(request)) {
    const logger = requestLog(request);
    logger.finish(429);
    throw new Error("Too many requests");
  }

  const logger = requestLog(request);

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    // Validate query
    if (!query || query.length < SEARCH_QUERY_MIN_LENGTH || query.length > SEARCH_QUERY_MAX_LENGTH) {
      logger.finish(200);
      return successResponse({ news: [], promos: [], doctors: [] }, 200);
    }

    // Sanitize query - trim whitespace
    const sanitizedQuery = query.trim();

    // Parse date filter if applicable
    let dateFilter = null;
    const parsedDate = new Date(sanitizedQuery);
    if (!isNaN(parsedDate.getTime())) {
      const startOfDay = new Date(parsedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(parsedDate);
      endOfDay.setHours(23, 59, 59, 999);

      dateFilter = {
        gte: startOfDay,
        lt: endOfDay,
      };
    }

    // Execute parallel queries with timeouts
    const [news, promos, doctors] = await Promise.all([
      prisma.news.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: sanitizedQuery, mode: "insensitive" }},
            { content: { contains: sanitizedQuery, mode: "insensitive" }},
            { summary: { contains: sanitizedQuery, mode: "insensitive" }},
            { Category: {
              name: { contains: sanitizedQuery, mode: "insensitive" },
            }},
            { Staff_News_authorIdToStaff: {
              name: { contains: sanitizedQuery, mode: "insensitive" },
            }},
            { tags: { has: sanitizedQuery }},
            ...(dateFilter ? [{ publishedAt: dateFilter }] : []),
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedAt: true,
        },
        take: SEARCH_RESULTS_LIMIT,
      }),

      prisma.promo.findMany({
        where: {
          OR: [
            { code: { contains: sanitizedQuery, mode: "insensitive" }},
            { headline: { contains: sanitizedQuery, mode: "insensitive" }},
            { description: { contains: sanitizedQuery, mode: "insensitive" }},
            { category: { contains: sanitizedQuery, mode: "insensitive" }},
            { CTA: { contains: sanitizedQuery, mode: "insensitive" }},
            ...(dateFilter ? [{ validUntil: dateFilter }] : []),
          ],
        },
        select: {
          id: true,
          headline: true,
          code: true,
          validUntil: true,
        },
        take: SEARCH_RESULTS_LIMIT,
      }),

      prisma.staff.findMany({
        where: {
          title: "Doctor",
          OR: [
            { name: { contains: sanitizedQuery, mode: "insensitive" }},
            { email: { contains: sanitizedQuery, mode: "insensitive" }},
            {
              DoctorPracticeSchedule: {
                some: {
                  OR: [
                    { day: { contains: sanitizedQuery, mode: "insensitive" }},
                    { startTime: { contains: sanitizedQuery, mode: "insensitive" }},
                    { endTime: { contains: sanitizedQuery, mode: "insensitive" }},
                  ],
                },
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          DoctorPracticeSchedule: {
            select: {
              id: true,
              day: true,
              startTime: true,
              endTime: true,
              isAvailable: true,
            },
          },
        },
        take: SEARCH_RESULTS_LIMIT,
      }),
    ]);

    logger.finish(200);
    return successResponse({ news, promos, doctors }, 200);
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : "Database error";
    logger.finish(500, errorMsg);
    return errorResponse(e instanceof Error ? e : "Search failed", 500);
  }
});