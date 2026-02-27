import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import NewsSection from "@/components/Home/News";
import NewsSkeleton from "@/components/Home/News/NewsSkeleton";
import PromoSection from "@/components/Home/Promo";
import PromoSkeleton from "@/components/Home/Promo/PromoSkeleton";
import prisma from "@/lib/db";
import { isMobile } from "@/lib/device";
import { Suspense } from "react";

export default async function Home() {
  const [promoData, newsData, mobileCheck] = await Promise.all([
    prisma.promo.findMany({
      where: {
        validUntil: {
          gte: new Date()
        }
      },
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        headline: true,
        description: true,
        CTA: true,
        PromoImages: {
          select: {
            imageUrl: true
          }
        }
      }
    }),
    prisma.news.findMany({
      where: {
        status: 'PUBLISHED'
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        content: true,
        publishedAt: true,
        tags: true,
        NewsImages: {
          select: {
            imageUrl: true
          }
        },
        Staff_News_authorIdToStaff: {
          select: {
            name: true
          }
        },
        Category: {
          select: {
            name: true
          }
        }
      }
    }),
    isMobile()
  ]);

  const news = newsData.map(item => ({
    ...item,
    author: item.Staff_News_authorIdToStaff as { name: string },
    images: item.NewsImages,
    category: [item.Category]
  }));

  const promo = promoData.map(item => ({
    ...item,
    images: item.PromoImages ? [item.PromoImages] : []
  }));

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section>
        <Suspense fallback={<PromoSkeleton />}>
          <PromoSection promo={promo} mobileCheck={mobileCheck} />
        </Suspense>
      </section>
      <section>
        <Hero />
      </section>
      <section>
        <Suspense fallback={<NewsSkeleton />}>
          <NewsSection news={news} />
        </Suspense>
      </section>
      <section>
        <About />
      </section>
    </main>
  );
}
