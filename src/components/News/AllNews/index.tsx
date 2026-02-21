'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MotionDiv } from '@/lib/motion';
import { Category } from "@/generated/prisma/client";
import NewsList from "./NewsList";
import MediaFilters from "@/components/Filters/Media";

export interface NewsItem {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    content: string;
    publishedAt: Date | null;
    tags: string[];
    images: { imageUrl: string }[];
    category: { id: number; name: string } | null;
    author: { name: string | null } | null;
}
interface NewsSearchWrapperProps {
    newsData: NewsItem[];
    totalPages: number;
    currentPage: number;
    query: string;
    limit: string;
    categories: Category[];
    years: number[];
    authors: { id: string; name: string }[];
    currentYear: string | null;
    currentAuthor: string | null;
    currentSort: string | null;
}

const NewsSearchWrapper = ({ newsData, totalPages, currentPage, query, limit, categories, years, authors, currentYear, currentAuthor, currentSort }: NewsSearchWrapperProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const promoPage = false;

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
        author: string;
        sort: string;
    }) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (filters.query) params.set('query', filters.query); else params.delete('query');
        if (filters.category) params.set('category', filters.category); else params.delete('category');
        if (filters.limit) params.set('limit', filters.limit); else params.delete('limit');
        if (filters.year) params.set('year', filters.year); else params.delete('year');
        if (filters.author) params.set('author', filters.author); else params.delete('author');
        if (filters.sort) params.set('sort', filters.sort); else params.delete('sort');
        
        params.set('page', '1');
        router.push(pathname + '?' + params.toString());
    };

    const handleClearFilters = () => {
        router.push(pathname);
    };

    return (
        <MotionDiv className="container mx-auto px-10 py-15 mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <MediaFilters
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                categories={categories}
                years={years}
                authors={authors}
                currentQuery={query}
                currentLimit={limit}
                currentCategory={searchParams.get('category')}
                currentYear={currentYear}
                currentAuthor={currentAuthor}
                currentSort={currentSort}
                promoPage={promoPage}
            />
            <NewsList
                data={newsData}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </MotionDiv>
    );
}

export default NewsSearchWrapper;
