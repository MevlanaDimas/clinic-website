'use client'

import Link from "next/link";
import ImagesVisual from "../Images";
import Image from 'next/image';
import { Variants } from 'framer-motion';
import { MotionDiv, MotionSection, MotionP, MotionH1 } from '@/lib/motion';

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    summary: string | null;
    content: string;
    publishedAt: Date | null;
    tags: string[];
    author: { name: string };
    images: { imageUrl: string }[];
    category: { name: string }[];
}

interface NewsSectionProps {
    news: NewsItem[];
}

const NewsSection = ({
    news
}: NewsSectionProps) => {
    if (!news || news.length === 0) {
        return (
            <div className="w-full py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Latest News</h1>
                    <p className="text-lg text-gray-600">No news available at the moment.</p>
                </div>
            </div>
        );
    };

    const featuredNews = news[0];
    const otherNews = news.slice(1,5);

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.06 } }
    };

    const itemVariant: Variants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
    };

    return (
        <MotionSection className="w-full py-20 px-10 bg-white" initial="hidden" animate="show" variants={container}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <MotionH1 variants={itemVariant} className="text-4xl font-bold text-gray-900 mb-4">Latest News</MotionH1>
                    <MotionDiv variants={itemVariant} className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto mb-6" />
                    <MotionP variants={itemVariant} className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest announcements, health tips, and community events from our clinic.
                    </MotionP>
                </div>
                
                {featuredNews && (
                    <MotionDiv variants={itemVariant} className="rounded-2xl overflow-hidden shadow-2xl bg-white mx-auto max-w-6xl border border-gray-100 mb-16 group">
                        {featuredNews.images && featuredNews.images.length > 0 &&
                            <ImagesVisual images={featuredNews.images.map(img => img.imageUrl)} className="h-64 md:h-96" sizes="(max-width: 768px) 100vw, 1200px" />
                        }
                        <div className="p-8 md:p-10">
                            <div className="flex items-center flex-wrap gap-x-2 text-sm text-blue-600 font-semibold mb-3 uppercase tracking-wide">
                                {featuredNews.category.map((cat, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span>{cat.name}</span>
                                        {index < featuredNews.category.length - 1 && <span>&bull;</span>}
                                    </div>
                                ))}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                <Link href={`/news/${featuredNews.slug}`}>
                                    {featuredNews.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-4">{featuredNews.summary || featuredNews.content.substring(0, 200) + '...'}</p>
                            <div className="text-sm text-gray-500 mb-5">
                                <span>By {featuredNews.author.name}</span>
                                {featuredNews.publishedAt && (
                                    <>
                                        <span className="mx-2">&bull;</span>
                                        <span>
                                            {new Date(featuredNews.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
                                {featuredNews.tags && featuredNews.tags.length > 0 && (
                                    featuredNews.tags.map((tag, index) => (
                                        <a 
                                            key={index} 
                                            href={`https://www.google.com/search?q=${encodeURIComponent(tag)}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="w-fit inline-block bg-blue-50 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-2 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                        >
                                            {tag}
                                        </a>
                                    ))
                                )}
                            </div>
                            <Link href={`/news/${featuredNews.slug}`} className="text-blue-600 font-semibold hover:text-blue-800 self-start mt-auto">Read More &rarr;</Link>
                        </div>
                    </MotionDiv>
                )}

                <div className="flex flex-col gap-10 justify-center items-center">
                    <MotionDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" variants={container}>
                        {otherNews.map((item: NewsItem) => (
                            <MotionDiv key={item.id} variants={itemVariant} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
                                <Link href={`/news/${item.slug}`} className="block relative h-56 w-full overflow-hidden">
                                    {item.images && item.images.length > 0 ? (
                                        <Image
                                            src={item.images[0]!.imageUrl}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </Link>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs text-gray-500 mb-2">
                                        {item.publishedAt && new Date(item.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        <Link href={`/news/${item.slug}`}>{item.title}</Link>
                                    </h2>
                                    <p className="text-gray-600 line-clamp-3 mb-4 flex-1">{item.summary || item.content.substring(0, 120) + '...'}</p>
                                    <Link href={`/news/${item.slug}`} className="text-blue-600 font-semibold hover:text-blue-800 self-start mt-auto">Read More &rarr;</Link>
                                </div>
                            </MotionDiv>
                        ))}
                    </MotionDiv>
                    {news.length >= 6 && (
                        <div className="mt-8">
                            <Link href="/news" className="text-blue-600 font-semibold hover:text-blue-800">
                                <span>See All News &rarr;</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </MotionSection>
    )
};

export default NewsSection;