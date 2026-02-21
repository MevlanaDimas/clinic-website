'use client'

import MediaFilters from "@/components/Filters/Media";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Promo, PromoImages } from "@/generated/prisma/client"
import { MotionDiv } from '@/lib/motion';
import PromoList from "./PromoList";


interface PromoSearchWrapperProps {
    promoData: (Promo & {
        images: PromoImages[];
    })[];
    totalPages: number;
    currentPage: number;
    query: string;
    limit: string;
    categories: { id: string | number; name: string }[];
    timeFilterOptions: { label: string; value: string }[];
    currentYear: string | null;
    currentCategory: string | null;
    currentSort: string | null;
}

const PromoSearchWrapper = ({ promoData, totalPages, currentPage, query, limit, categories, timeFilterOptions, currentYear, currentCategory, currentSort }: PromoSearchWrapperProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const promoPage = true;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(pathname + '?' + params.toString());
    };

    const handleApplyFilters = (filters: {
        query: string;
        category: string;
        limit: string;
        year: string;
        sort: string;
    }) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (filters.query) params.set('query', filters.query); else params.delete('query');
        if (filters.category) params.set('category', filters.category); else params.delete('category');
        if (filters.limit) params.set('limit', filters.limit); else params.delete('limit');
        if (filters.year) params.set('year', filters.year); else params.delete('year');
        if (filters.sort) params.set('sort', filters.sort); else params.delete('sort');
        
        params.set('page', '1');
        router.push(pathname + '?' + params.toString());
    };

    const handleClearFilters = () => {
        router.push(pathname);
    };

    return (
        <MotionDiv className="container mx-auto px-10 py-15 mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <MediaFilters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} categories={categories} timeFilterOptions={timeFilterOptions} timeFilterLabel="Status" timeFilterAllLabel="All Statuses" currentQuery={query} currentLimit={limit} currentCategory={currentCategory} currentYear={currentYear} currentAuthor={null} currentSort={currentSort} promoPage={promoPage} />
            <PromoList 
                data={promoData}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </MotionDiv>
    )
}

export default PromoSearchWrapper;