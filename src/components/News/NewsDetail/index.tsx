"use client"

import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, Link as LinkIcon, Twitter, Calendar, User, ChevronLeft } from "lucide-react";
import React, { useState, useMemo } from "react";
import { MotionArticle } from '@/lib/motion';
import { Button } from "@/components/ui/button";
import SlugLink from "./SlugLink";

interface NewsDetailProps {
    title: string;
    content: string;
    publishedAt: Date | string | null;
    author: { name: string } | null;
    images: { imageUrl: string; imageName: string }[];
    tags: string[];
    category: { id: number; name: string } | null;
}

const NewsDetail = ({
    title,
    content,
    publishedAt,
    author,
    images,
    tags,
    category
}: NewsDetailProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = async () => {
        try {
            const url = typeof window !== 'undefined' ? window.location.href : '';
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    const paragraphs = useMemo(() => content.split('\n').filter(p => p.trim()), [content]);
    const contentImages = useMemo(() => images && images.length > 1 ? images.slice(1) : [], [images]);
    
    const insertionMap = useMemo(() => {
        const map = new Map<number, typeof images[0]>();
        if (contentImages.length > 0 && paragraphs.length > 0) {
            const interval = paragraphs.length / (contentImages.length + 1);
            contentImages.forEach((img, i) => {
                let insertAfterIndex = Math.floor((i + 1) * interval) - 1;
                insertAfterIndex = Math.max(0, Math.min(insertAfterIndex, paragraphs.length - 1));
                
                while (map.has(insertAfterIndex) && insertAfterIndex < paragraphs.length - 1) {
                    insertAfterIndex++;
                }
                map.set(insertAfterIndex, img);
            });
        }
        return map;
    }, [contentImages, paragraphs.length]);

    const parseInline = (text: string) => {
        const linkParts = text.split('##');
        return linkParts.map((part, index) => {
            const boldParts = part.split('**');
            const content = boldParts.map((subPart, i) => {
                if (i % 2 === 1) {
                    return <strong key={i} className="font-bold">{subPart}</strong>;
                }
                return subPart;
            });

            if (index === 0) {
                return <React.Fragment key={index}>{content}</React.Fragment>;
            }
            
            // Clean the title for the search query
            const searchTitle = part.replace(/\*\*/g, '').trim();

            // Return the component that handles the API call
            return (
                <SlugLink key={index} title={searchTitle}>
                    {content}
                </SlugLink>
            );
        });
    };

    const renderBlock = (text: string) => {
        const trimmed = text.trim();
        
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length >= 4) {
             return <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{parseInline(trimmed.slice(2, -2))}</h2>;
        }

        if (trimmed.startsWith('* ')) {
            return (
                <ul className="list-disc list-inside mb-4 ml-4">
                    <li className="text-justify">{parseInline(trimmed.slice(2))}</li>
                </ul>
            );
        }

        if (trimmed.length < 100 && !trimmed.endsWith('.') && !trimmed.includes('##')) {
            return <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">{parseInline(trimmed)}</h3>;
        }

        return <p className="mb-6 text-justify">{parseInline(trimmed)}</p>;
    };

    return (
        <MotionArticle className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {/* Breadcrumb */}
            <div className="mb-8">
                <Link href="/news" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <ChevronLeft size={16} className="mr-1" />
                    Back to News
                </Link>
            </div>

            {/* Header Section */}
            <header className="max-w-4xl mx-auto text-center mb-12">
                {category && (
                    <Link href={`/news?category=${category.id}`} className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors">
                        {category.name}
                    </Link>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                    {title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm md:text-base">
                    <div className="flex items-center">
                        <User size={18} className="mr-2 text-gray-400" />
                        <span className="font-medium text-gray-900">{author?.name || 'Unknown Author'}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-gray-400" />
                        <time dateTime={publishedAt ? new Date(publishedAt).toISOString() : ''}>
                            {publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Draft'}
                        </time>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {images && images.length > 0 && images[0] && (
                <div className="max-w-5xl mx-auto mb-16">
                    <figure className="relative aspect-21/9 w-full overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                        <Image
                            src={images[0].imageUrl}
                            alt={images[0].imageName || title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority
                        />
                    </figure>
                    {images[0].imageName && (
                        <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
                            {images[0].imageName}
                        </figcaption>
                    )}
                </div>
            )}

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* Share Sidebar */}
                <aside className="lg:w-24 shrink-0">
                    <div className="sticky top-32 flex lg:flex-col gap-4 items-center lg:items-start">
                        <span className="text-xs font-bold text-gray-400 uppercase hidden lg:block mb-2">Share</span>
                        
                        <div className="relative">
                            <Button variant="outline" size="icon" onClick={handleCopyLink} className="rounded-full w-10 h-10 hover:text-indigo-600 hover:border-indigo-600 transition-colors cursor-pointer">
                                <LinkIcon size={18} />
                            </Button>
                            {copied && (
                                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50">
                                    Copied!
                                </div>
                            )}
                        </div>

                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 hover:text-blue-600 hover:border-blue-600 transition-colors cursor-pointer">
                                <Facebook size={18} />
                            </Button>
                        </Link>

                        <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer">
                                <Twitter size={18} />
                            </Button>
                        </Link>

                        <Link href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer">
                                <Mail size={18} />
                            </Button>
                        </Link>
                    </div>
                </aside>

                {/* Article Content */}
                <div className="flex-1 max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 text-gray-800 leading-relaxed">
                        {paragraphs.map((paragraph, index) => {
                            const image = insertionMap.get(index);
                            return (
                                <React.Fragment key={index}>
                                    {renderBlock(paragraph)}
                                    {image && (
                                        <figure className="my-8">
                                            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-md bg-gray-100">
                                                <Image
                                                    src={image.imageUrl}
                                                    alt={image.imageName || title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 768px"
                                                />
                                            </div>
                                            {image.imageName && (
                                                <figcaption className="mt-3 text-center text-sm text-gray-500 italic">
                                                    {image.imageName}
                                                </figcaption>
                                            )}
                                        </figure>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Related Topics</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <Link 
                                        href={`/news?query=${encodeURIComponent(tag)}`} 
                                        key={index} 
                                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Right Spacer for centering alignment on large screens */}
                <div className="hidden xl:block w-24 shrink-0"></div>
            </div>
        </MotionArticle>
    )
};

export default NewsDetail;