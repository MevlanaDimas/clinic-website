import prisma from "@/lib/db";
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';


export const revalidate = 3600;

export async function GET() {
    const productionUrl = process.env.NEXT_PUBLIC_API_URL || 'https://clinic.web.id';

    const newsItems = await prisma.news.findMany({
        select: {
            slug: true,
            updatedAt: true
        }
    });

    const promoItems = await prisma.promo.findMany({
        select: {
            headline: true,
            updatedAt: true
        }
    });

    const doctorItems = await prisma.staff.findMany({
        where: {
            title: 'Doctor'
        },
        include: {
            DoctorPracticeSchedule: true
        }
    })

    const doctorField: ISitemapField[] = doctorItems.map((item) => ({
        loc: `${productionUrl}/doctor/${encodeURIComponent(item.name)}`,
        changefreq: 'daily',
        priority: 0.7
    }));

    const newsField: ISitemapField[] = newsItems.map((item) => ({
        loc: `${productionUrl}/news/${item.slug}`,
        lastmod: item.updatedAt.toISOString(),
        changefreq: 'daily',
        priority: 0.7
    }));

    const promoField: ISitemapField[] = promoItems.map((item) => ({
        loc: `${productionUrl}/promo/${encodeURIComponent(item.headline)}`,
        lastmod: item.updatedAt.toISOString(),
        changefreq: 'daily',
        priority: 0.7
    }));

    return getServerSideSitemap([...newsField, ...promoField, ...doctorField])
}