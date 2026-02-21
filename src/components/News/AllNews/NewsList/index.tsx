'use client'

import Image from "next/image";
import Link from "next/link";
import CustomPagination from "@/components/CustomPagination";
import { MotionDiv } from '@/lib/motion';
import { NewsItem } from "..";
import { Button } from "@/components/ui/button";


interface NewsListProps {
    data: NewsItem[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const NewsList = ({ data, totalPages, currentPage, onPageChange }: NewsListProps) => {

    if (data.length === 0) {
        return <div className="text-center py-10">No news found.</div>
    }

    const handleTagsClick = (e: React.MouseEvent, tag: string) => {
        e.stopPropagation();
        e.preventDefault();

        window.open(`https://www.google.com/search?q=${encodeURIComponent(tag)}`, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-10 mx-5">
                {data.map((newsItem, idx) => (
                    <MotionDiv key={newsItem.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: idx * 0.04 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <Link href={`/news/${newsItem.slug}`} className="flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-50 shrink-0">
                                <Image
                                    src={newsItem.images[0]?.imageUrl || '/placeholder-image.jpg'}
                                    alt={newsItem.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-between w-full">
                                <div>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">{newsItem.category?.name || 'Uncategorized'}</p>
                                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{newsItem.title}</h3>
                                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">{newsItem.summary}</p>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                                        {newsItem.author?.name && <span>{newsItem.author.name}</span>}
                                        {newsItem.author?.name && newsItem.publishedAt && <span className="mx-2">&bull;</span>}
                                        {newsItem.publishedAt ? (
                                            <time dateTime={new Date(newsItem.publishedAt).toISOString()}>
                                                {new Date(newsItem.publishedAt).toLocaleDateString()}
                                            </time>
                                        ) : !newsItem.author?.name ? 'Date not available' : null}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-5">
                                    {newsItem.tags && newsItem.tags.length > 0 && (
                                        newsItem.tags.map((tag, index) => (
                                            <Button 
                                                key={index} 
                                                type="button"
                                                onClick={(e) => handleTagsClick(e, tag)} 
                                                className="w-fit inline-block bg-blue-50 text-gray-600 text-xs font-semibold px-3 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                            >
                                                {tag}
                                            </Button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </Link>
                    </MotionDiv>
                ))}
            </div>
            <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
}

export default NewsList;