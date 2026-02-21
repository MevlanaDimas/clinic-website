import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import PromoSearchWrapper from "@/components/Promo/AllPromo";
import { Metadata } from "next";
import { Suspense } from "react";
import { PromoListSkeleton } from "@/components/Promo/AllPromo/PromoList/PromoListSkeleton";


export const metadata: Metadata = {
    title: "Promos"
}

export default async function AllPromo({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string; limit?: string; category?: string; year?: string; sort?: string}>;
}) {
    const { query, page, limit, category, year, sort } = await searchParams;

    const isViewAll = limit === 'all';
    const itemsPerPage = isViewAll ? undefined : (Number(limit) || 10);
    const currentPage = Number(page) || 1;
    const skip = isViewAll ? undefined : (currentPage - 1) * (itemsPerPage || 10);

    const queryDate = query ? new Date(query) : undefined;
    const isValidDate = queryDate && !isNaN(queryDate.getTime());

    const where: Prisma.PromoWhereInput = {};

    if (query) {
        where.AND = [
            ...(Array.isArray(where.AND) ? where.AND : []),
            {
                OR: [
                    { code: { contains: query, mode: 'insensitive' as const } },
                    { headline: { contains: query, mode: 'insensitive' as const } },
                    { description: { contains: query, mode: 'insensitive' as const } },
                    { category: { contains: query, mode: 'insensitive' as const } },
                    { CTA: { contains: query, mode: 'insensitive' as const } },
                    ...(isValidDate ? [{ validUntil: { equals: queryDate } }] : [])
                ]
            }
        ];
    }

    if (category && category !== 'all') {
        where.AND = [
            ...(Array.isArray(where.AND) ? where.AND : []),
            {
                category: { equals: category, mode: 'insensitive' as const }
            }
        ];
    }

    if (year === 'valid') {
        where.AND = [
            ...(Array.isArray(where.AND) ? where.AND : []),
            {
                validUntil: { gte: new Date() }
            }
        ];
    } else if (year === 'expired') {
        where.AND = [
            ...(Array.isArray(where.AND) ? where.AND : []),
            {
                validUntil: { lt: new Date() }
            }
        ];
    } else if (year && year !== 'all') {
        const yearNum = parseInt(year, 10);
        if (!isNaN(yearNum)) {
            where.AND = [
                ...(Array.isArray(where.AND) ? where.AND : []),
                {
                    validUntil: { gte: new Date(yearNum, 0, 1), lt: new Date(yearNum + 1, 0, 1) }
                }
            ];
        }
    }

    let orderBy: Prisma.PromoOrderByWithRelationInput = { validUntil: 'desc' };

    if (sort === 'oldest') {
        orderBy = { validUntil: 'asc' };
    } else if (sort === 'title_asc') {
        orderBy = { headline: 'asc' };
    } else if (sort === 'title_desc') {
        orderBy = { headline: 'desc' };
    }

    const [rawPromoData, totalCount, uniqueCategories] = await Promise.all([
        prisma.promo.findMany({
            where,
            include: { PromoImages: true },
            orderBy,
            take: itemsPerPage,
            skip: skip
        }),
        prisma.promo.count({ where }),
        prisma.promo.findMany({
            select: { category: true },
            distinct: ['category'],
            where: { category: { not: null } },
            orderBy: { category: 'asc' }
        })
    ]);

    const totalPages = isViewAll ? 1 : Math.ceil(totalCount / (itemsPerPage || 10));
    
    const categories = uniqueCategories
        .filter(c => c.category !== null)
        .map((c) => ({ id: c.category!, name: c.category! }));

    const timeFilterOptions = [
        { label: 'Still Valid', value: 'valid' },
        { label: 'Expired', value: 'expired' }
    ];

    const promoData = rawPromoData.map(item => ({
        ...item,
        images: item.PromoImages ? [item.PromoImages] : []
    }));

    return (
        <main className="flex flex-col w-full justify-center min-h-screen">
            <Suspense fallback={<PromoListSkeleton />}>
                <PromoSearchWrapper
                    promoData={promoData}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    query={query || ''}
                    limit={limit || '10'}
                    categories={categories}
                    timeFilterOptions={timeFilterOptions}
                    currentYear={year || null}
                    currentCategory={category || null}
                    currentSort={sort || null}
                    />
            </Suspense>
        </main>
    );
}