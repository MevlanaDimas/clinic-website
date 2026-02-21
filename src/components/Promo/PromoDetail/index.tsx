'use client'

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag } from "lucide-react";
import { PromoImages } from "@/generated/prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ExpiredCountdown from "./ExpiredCountdown";
import { FaWhatsapp } from "react-icons/fa";
import { MotionDiv } from "@/lib/motion";

interface PromoDetailProps {
    category: string | null;
    code: string;
    CTA: string | null;
    description: string;
    headline: string;
    validUntil: Date | string | null;
    images?: PromoImages | null;
}

const PromoDetail = ({
    category,
    code,
    CTA,
    description,
    headline,
    validUntil,
    images
}: PromoDetailProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        } catch {
            console.error('Failed to copy code to clipboard.');
        }
    };

    const onWhatsappClick = () => {
        const encodedMessage = encodeURIComponent(`Hello I want to ask about ${code} promo`);

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }
 
    return (
        <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-20 dark:text-gray-200">
            <div className="mb-8">
                <Link href="/promo" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <ChevronLeft size={16} className="mr-1" />
                    Back to Promos
                </Link>
            </div>
            
            <header className="max-w-4xl mx-auto text-center mb-12">
                {category && (
                    <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full">
                        {category}
                    </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
                    {headline}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm md:text-base">
                    <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-gray-400" />
                        <span>Valid until: {validUntil ? new Date(validUntil).toLocaleDateString() : 'N/A'}</span>
                    </div>
                </div>
            </header>
            
            {images && (
                <div className="max-w-5xl mx-auto mb-16">
                    <MotionDiv className="relative" initial={{ opacity: 0, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <figure className="relative aspect-21/9 w-full overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                            <Image src={images.imageUrl} alt={headline} fill className="object-cover" sizes="100vw" priority />
                        </figure>
                    </MotionDiv>
                </div>
            )}
            
            <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-gray-800 dark:text-gray-300">
                    <p>{description}</p>
                </div>

                <MotionDiv className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Use this promo code:</p>
                            <div className="relative flex items-center justify-center sm:justify-start gap-2 mt-1">
                                <span className="font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-widest">{code}</span>
                                <Button onClick={handleCopyCode} variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-copy">
                                    <Tag size={16} />
                                </Button>
                                {isCopied && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap z-10">
                                        Copied!
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button asChild className="w-full sm:w-auto">
                            <MotionDiv onClick={onWhatsappClick} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="bg-green-500 hover:bg-green-600 text-white font-semibold h-12 px-6 rounded-lg text-lg cursor-pointer flex items-center justify-center gap-3">
                                <FaWhatsapp size={24} />
                                {CTA || 'Ask this promo'}
                            </MotionDiv>
                        </Button>
                    </div>

                    <div className="mt-6 py-6 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Expires in:</p>
                        <ExpiredCountdown validUntil={validUntil} />
                    </div>
                </MotionDiv>
            </div>

        </MotionDiv>
    );
}

export default PromoDetail;