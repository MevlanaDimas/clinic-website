import PromoDetail from "@/components/Promo/PromoDetail";
import PromoDetailSkeleton from "@/components/Promo/PromoDetail/PromoDetailSkeleton";
import prisma from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";


export async function generateMetadata({
    params
}: {
    params: Promise<{ promoHeadline: string }>;
}): Promise<Metadata> {
    const { promoHeadline } = await params;
    const decodedHeadline = decodeURIComponent(promoHeadline);

    const promo = await prisma.promo.findFirst({
        where: {
            headline: decodedHeadline
        },
        select: {
            headline: true
        }
    });

    return {
        title: "Promo: " + promo?.headline
    };
}

export default async function Promo({
    params
}: {
    params: Promise<{ promoHeadline: string }>;
}) {
    const { promoHeadline } = await params;
    const decodedHeadline = decodeURIComponent(promoHeadline);
    
    const promo = await prisma.promo.findFirst({
        where: {
            headline: decodedHeadline
        },
        include: {
            PromoImages: true,
        }
    });

    if (!promo) {
        redirect('/promo');
    }

    return (
        <main className="flex flex-col w-full min-h-screen bg-white">
            <Suspense fallback={<PromoDetailSkeleton />}>
                <PromoDetail 
                    {...promo}
                    images={promo.PromoImages} 
                />
            </Suspense>
        </main>
    )
}