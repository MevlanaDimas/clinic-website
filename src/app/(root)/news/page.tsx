import NewsSearchWrapper, { NewsItem } from "@/components/News/AllNews";
import { NewsListSkeleton } from "@/components/News/AllNews/NewsList/NewsListSkeleton";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "News"
}

export default async function AllNews({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; limit?: string; category?: string; year?: string; author?: string; sort?: string }>;
}) {
    const { query, page, limit, category: categoryId, year, author: authorId, sort } = await searchParams;

    const isViewAll = limit === 'all';
    const itemsPerPage = isViewAll ? undefined : (Number(limit) || 10);
    const currentPage = Number(page) || 1;
    const skip = isViewAll ? undefined : (currentPage - 1) * (itemsPerPage || 10);

    const queryDate = query ? new Date(query) : undefined;
    const isValidDate = queryDate && !isNaN(queryDate.getTime());

    const where: Prisma.NewsWhereInput = {
        status: 'PUBLISHED'
    };

    if (query) {
        where.AND = [
            ...(Array.isArray(where.AND) ? where.AND : []),
            {
                OR: [
                    { title: { contains: query, mode: 'insensitive' as const } },
                    { content: { contains: query, mode: 'insensitive' as const } },
                    { summary: { contains: query, mode: 'insensitive' as const } },
                    { Category: {
                        name: { contains: query, mode: 'insensitive' as const }
                    }},
                    { Staff_News_authorIdToStaff: {
                        name: { contains: query, mode: 'insensitive' as const }
                    }},
                    { tags: { has: query } },
                    ...(isValidDate ? [{
                        publishedAt: { equals: queryDate }
                    }] : [])
                ]
            }
        ];
    }

    if (categoryId) {
        const catIdInt = parseInt(categoryId);
        if (!isNaN(catIdInt)) {
            where.AND = [
                ...(Array.isArray(where.AND) ? where.AND : []),
                {
                    categoryId: catIdInt
                }
            ];
        }
    }

    if (authorId) {
        where.AND = [
            ...(Array.isArray(where.AND) ? where.AND : []),
            {
                authorId: authorId
            }
        ];
    }

    if (year && year !== 'all') {
        const yearNum = parseInt(year, 10);
        if (!isNaN(yearNum)) {
            where.AND = [
                ...(Array.isArray(where.AND) ? where.AND : []),
                {
                    publishedAt: { gte: new Date(yearNum, 0, 1), lt: new Date(yearNum + 1, 0, 1) }
                }
            ];
        }
    }

    let orderBy: Prisma.NewsOrderByWithRelationInput = { publishedAt: 'desc' };

    if (sort === 'oldest') {
        orderBy = { publishedAt: 'asc' };
    } else if (sort === 'title_asc') {
        orderBy = { title: 'asc' };
    } else if (sort === 'title_desc') {
        orderBy = { title: 'desc' };
    }

    const [rawNewsData, totalCount, categories, newsForYears, authors] = await Promise.all([
        prisma.news.findMany({
            where,
            include: {
                Staff_News_authorIdToStaff: {
                    select: {
                        name: true
                    }
                },
                Category: true,
                NewsImages: {
                    select: { imageUrl: true }
                }
            },
            orderBy,
            take: itemsPerPage,
            skip: skip
        }),
        prisma.news.count({ where }),
        prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        }),
        // This query is to get all unique years for the filter dropdown.
        // For better performance on large datasets, consider a raw SQL query
        // like: SELECT DISTINCT EXTRACT(YEAR FROM "publishedAt") as year FROM "News" ORDER BY year DESC;
        prisma.news.findMany({
            where: { status: 'PUBLISHED' },
            select: { publishedAt: true },
            orderBy: { publishedAt: 'desc' }
        }),
        prisma.staff.findMany({
            where: {
                News_News_authorIdToStaff: {
                    some: {
                        status: 'PUBLISHED'
                    }
                }
            },
            select: { id: true, name: true },
            orderBy: { name: 'asc' }
        })
    ]);

    const totalPages = isViewAll ? 1 : Math.ceil(totalCount / (itemsPerPage || 10));
    
    const years = Array.from(new Set(
        newsForYears
            .map(item => item.publishedAt ? new Date(item.publishedAt).getFullYear() : null)
            .filter((y): y is number => y !== null)
    )).sort((a, b) => b - a);

    const newsData: NewsItem[] = rawNewsData.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: item.content,
        publishedAt: item.publishedAt,
        tags: item.tags,
        images: item.NewsImages,
        category: item.Category,
        author: item.Staff_News_authorIdToStaff,
    }));

    return (
        <main className="flex flex-col w-full justify-center min-h-screen">
            <Suspense fallback={<NewsListSkeleton />}>
                <NewsSearchWrapper
                    newsData={newsData}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    query={query || ''}
                    limit={limit || '10'}
                    categories={categories}
                    years={years}
                    currentYear={year || null}
                    authors={authors}
                    currentAuthor={authorId || null}
                    currentSort={sort || null}
                />
            </Suspense>
        </main>
    )
}