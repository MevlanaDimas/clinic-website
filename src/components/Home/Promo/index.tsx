'use client'

import { AnimatePresence, Transition } from "framer-motion";
import { MotionDiv } from '@/lib/motion';
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PromoItems {
    id: number;
    headline: string;
    description: string;
    CTA: string | null;
    images: { imageUrl: string }[];
}

interface PromoSectionProps {
    promo: PromoItems[];
    mobileCheck: boolean;
}

const PromoSection = ({ promo, mobileCheck }: PromoSectionProps) => {
    const sliderVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%"
        }),
        center: {
            zIndex: 1,
            x: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%"
        })
    };

    const transition: Transition = {
        x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.2 }
    };

    const promoForVisual = Array.isArray(promo) ? promo : [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

    const hasMultiplePromo = promoForVisual.length > 1;
    const currentPromo = promoForVisual.length > 0 ? promoForVisual[currentIndex] : null;

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        const newIndex = (currentIndex + newDirection + promoForVisual.length) % promoForVisual.length;
        setCurrentIndex(newIndex);
    }, [currentIndex, promoForVisual.length]);

    useEffect(() => {
        if (!hasMultiplePromo || isHovering) {
            return;
        }

        const slideInterval = setInterval(() => {
            paginate(1);
        }, 5000); // Slide every 5 seconds

        return () => clearInterval(slideInterval);
    }, [isHovering, paginate, hasMultiplePromo]);

    const textVariants = {
        enter: (direction: number) => ({
            opacity: 0,
            y: direction > 0 ? 20 : -20
        }),
        center: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.5
            }
        },
        exit: (direction: number) => ({
            opacity: 0,
            y: direction < 0 ? 20 : -20,
            transition: {
                duration: 0.2
            }
        })
    };

    const onCTAClick = (headline: string) => {
        const encodedMessage = encodeURIComponent(`Hello, I want to ask about ${headline} promo`);

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    }

    const renderDescription = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    }

    return (
        <div
            className={`w-full relative h-100 md:h-150 overflow-hidden group ${mobileCheck ? "mt-24" : ""}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                {currentPromo && (
                    <MotionDiv
                        key={currentPromo.id}
                        custom={direction}
                        variants={sliderVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={transition}
                        className="absolute inset-0 w-full h-full"
                    >
                        
                            {currentPromo.images.length > 0 && currentPromo.images[0] && (
                                <Image
                                    src={currentPromo.images[0].imageUrl}
                                    alt={currentPromo.headline}
                                    fill
                                    className="object-cover"
                                    priority={currentIndex === 0}
                                    sizes="100vw"
                                />
                            )}
                            <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center bg-black/20 text-left text-white p-4 z-10 group-hover:bg-black/30 transition-colors">
                                <MotionDiv
                                        variants={textVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        custom={direction}
                                        className="flex flex-col w-full max-w-2xl lg:mx-10 gap-5 md:gap-13"
                                    >
                                    <h1 className="text-3xl text-center lg:text-start md:text-5xl font-bold mb-4 drop-shadow-lg">{currentPromo.headline}</h1>
                                    {currentPromo.description && <p className="text-center lg:text-start text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">{renderDescription(currentPromo.description)}</p>}
                                    <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 md:gap-10">
                                        <Button onClick={() => onCTAClick(currentPromo.headline)} className="inline-block bg-green-600 text-gray-100 font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors shadow-lg cursor-pointer text-md h-12 w-fit whitespace-nowrap">
                                            {currentPromo.CTA || "View Promo"}
                                        </Button>
                                        <Link href={`/promo/${encodeURIComponent(currentPromo.headline)}`} className="inline-block text-white font-semibold py-3 px-8 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg cursor-pointer text-md h-12 w-fit whitespace-nowrap">
                                            Learn More
                                        </Link>
                                    </div>
                                </MotionDiv>
                            </div>
                    </MotionDiv>
                )}
            </AnimatePresence>

            {hasMultiplePromo && (
                <>
                    <Button
                        aria-label="Previous promo"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        onClick={() => paginate(-1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </Button>
                    <Button
                        aria-label="Next promo"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        onClick={() => paginate(1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Button>
                </>
            )}
        </div>
    )
};

export default PromoSection;