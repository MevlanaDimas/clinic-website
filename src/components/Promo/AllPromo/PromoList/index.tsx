"use client"

import CustomPagination from "@/components/CustomPagination";
import { Promo, PromoImages } from "@/generated/prisma/client"
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "@/lib/motion"
import { Variants } from "framer-motion";


interface PromoListProps {
    data: (Promo & {
        images: PromoImages[];
    })[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PromoList = ({ data, totalPages, currentPage, onPageChange }: PromoListProps) => {
    if (data.length === 0) {
        return <div className="text-center py-10">No promos found.</div>
    }

    const itemVariant: Variants = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 mx-5">
                {data.map((promo) => (
                    <MotionDiv key={promo.id} variants={itemVariant} initial="initial" animate="animate" whileHover={{ scale: 1.01, y: -4 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-300">
                        <Link href={`/promo/${encodeURIComponent(promo.headline)}`} className="flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-50 shrink-0">
                                <Image
                                    src={promo.images[0]?.imageUrl || '/placeholder-image.jpg'}
                                    alt={promo.headline}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-between w-full">
                                <div>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{promo.category || 'General'}</p>
                                    <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{promo.headline}</h3>
                                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">{promo.description}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        Valid until: <time dateTime={new Date(promo.validUntil).toISOString()}>{new Date(promo.validUntil).toLocaleDateString()}</time>
                                    </p>
                                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">{promo.code}</span>
                                </div>
                            </div>
                        </Link>
                    </MotionDiv>
                ))}
            </div>
            <CustomPagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        </div>
    )
}

export default PromoList;