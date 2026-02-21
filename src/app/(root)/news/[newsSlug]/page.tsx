import NewsCardSkeleton from "@/components/Home/News/NewsCardSkeleton";
import NewsDetail from "@/components/News/NewsDetail";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export async function generateMetadata({
    params
}: {
    params: Promise<{ newsSlug: string }>;
}): Promise<Metadata> {
    const { newsSlug } = await params;

    const news = await prisma.news.findUnique({
        where: {
            slug: newsSlug
        },
        select: {
            title: true
        }
    });

    return {
        title: news?.title
    };
}

export default async function News({
    params
}: {
    params: Promise<{ newsSlug: string }>;
}) {
    const { newsSlug } = await params;

    const news = await prisma.news.findUnique({
        where: {
            slug: newsSlug
        },
        include: {
            NewsImages: true,
            Staff_News_authorIdToStaff: true,
            Category: true
        }
    });

    if (!news) redirect('/news');

    const formattedNews = {
        ...news,
        author: news.Staff_News_authorIdToStaff,
        category: news.Category,
        images: news.NewsImages
    };

    return (
        <main className="flex flex-col w-full min-h-screen bg-white">
            <Suspense fallback={<NewsCardSkeleton />}>
                <NewsDetail {...formattedNews} />
            </Suspense>
        </main>
    )
}