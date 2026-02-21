'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, Link as LinkIcon, Twitter, ChevronLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DoctorPracticeSchedule, Staff } from "@/generated/prisma/client";
import { FaWhatsapp } from "react-icons/fa";
import { MotionDiv } from "@/lib/motion";

interface DoctorDetailProps extends Staff {
    imageUrl?: string;
    DoctorPracticeSchedule: DoctorPracticeSchedule[];
}

const DoctorDetail = ({
    name,
    bio,
    title,
    email,
    imageUrl,
    DoctorPracticeSchedule
}: DoctorDetailProps) => {
    const [copied, setCopied] = useState(false);

    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

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

    const onWhatsappClick = () => {
        const encodedMessage = encodeURIComponent(`Hello I want to ask about dr. ${name}`);

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }

    const paragraphs = bio?.split('\n').filter(p => p.trim()) || [];

    const renderBioBlock = (text: string) => {
        const trimmed = text.trim();
        
        if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length >= 4) {
             return <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{trimmed.slice(2, -2)}</h2>;
        }

        if (trimmed.startsWith('* ')) {
            return (
                <ul className="list-disc list-inside mb-4 ml-4">
                    <li className="text-justify">{trimmed.slice(2)}</li>
                </ul>
            );
        }

        return <p className="mb-6 text-justify">{trimmed}</p>;
    };

    return (
        <MotionDiv initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
            {/* Breadcrumb */}
            <div className="mb-8">
                <Link href="/doctor" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                    <ChevronLeft size={16} className="mr-1" />
                    Back to Doctors
                </Link>
            </div>

            {/* Header Section */}
            <header className="max-w-4xl mx-auto text-center mb-12">
                {title && (
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
                        {title}
                    </div>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                    dr. {name}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm md:text-base">
                    <div className="flex items-center">
                        <Mail size={18} className="mr-2 text-gray-400" />
                        <a href={`mailto:${email}`} className="font-medium text-gray-900 hover:text-indigo-600">{email}</a>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {imageUrl && (
                <div className="max-w-5xl mx-auto mb-16">
                    <MotionDiv className="mx-auto" initial={{ opacity: 0, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                        <figure className="relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-full shadow-lg bg-gray-100">
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 320px"
                                priority
                            />
                        </figure>
                    </MotionDiv>
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

                        <Link href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(name)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 hover:text-sky-500 hover:border-sky-500 transition-colors cursor-pointer">
                                <Twitter size={18} />
                            </Button>
                        </Link>

                        <Link href={`mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer">
                                <Mail size={18} />
                            </Button>
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-slate prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 text-gray-800 leading-relaxed">
                        <h2 className="text-2xl font-bold mt-0 mb-4 text-gray-900">Biography</h2>
                        {paragraphs.length > 0 ? paragraphs.map((paragraph, index) => (
                            <React.Fragment key={index}>
                                {renderBioBlock(paragraph)}
                            </React.Fragment>
                        )) : <p>No biography available.</p>}
                    </div>

                    {/* Practice Schedule */}
                    {DoctorPracticeSchedule && DoctorPracticeSchedule.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">Practice Schedule</h2>
                            <div className="space-y-4">
                                                {DoctorPracticeSchedule.map((schedule) => (
                                                <MotionDiv key={schedule.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="p-4 border rounded-lg bg-gray-50/80 shadow-sm">
                                                    <p className="font-bold text-lg capitalize text-gray-800">{schedule.day}</p>
                                                    <div className="flex items-center text-gray-600 mt-2">
                                                        <Clock size={16} className="mr-2" />
                                                        <span>{schedule.startTime} - {schedule.endTime}</span>
                                                    </div>
                                                    <p className={`mt-2 text-sm font-semibold ${schedule.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                                        {schedule.isAvailable ? 'Available' : 'Not Available'}
                                                    </p>
                                                </MotionDiv>
                                            ))}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Right Spacer for centering alignment on large screens */}
                <div className="hidden xl:block w-24 shrink-0"></div>
            </div>

            <div className="mt-20 max-w-sm mx-auto">
                <button onClick={onWhatsappClick} className="bg-green-500 hover:bg-green-600 text-white font-semibold h-12 px-6 rounded-lg text-lg cursor-pointer flex items-center justify-center gap-3 w-full">
                    <FaWhatsapp size={24} />
                    Ask this doctor
                </button>
            </div>
        </MotionDiv>
    )
};

export default DoctorDetail;