'use client'

import { AnimatePresence, Transition, useScroll, useTransform } from "framer-motion";
import { MotionDiv } from '@/lib/motion';
import { useCallback, useEffect, useRef, useState } from "react";
import ImagesNavigation from "./ImagesNavigation";
import Image from "next/image";

interface ImageItem {
    imageUrl: string;
}

interface ImagesVisualProps {
    images: (ImageItem | string)[] | { images: (ImageItem | string)[] };
    className?: string;
    onSlideChange?: (index: number, direction: number) => void;
    sizes?: string;
}

const ImagesVisual = ({ images, className, onSlideChange, sizes = "100vw" }: ImagesVisualProps) => {
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

    const imageVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            scale: 1.5
        }),
        center: {
            x: 0,
            scale: 1.5
        },
        exit: (direction: number) => ({
            x: direction < 0 ? "-100%" : "100%",
            scale: 1.5
        })
    };

    const transition: Transition = {
        x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.2 }
    };

    const containRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containRef,
        offset: ["start end", "end start"]
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);
    // const images = promo.images || [];
    const imagesForVisual = Array.isArray(images) ? images : (images?.images || []);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const hasMultipleImages = imagesForVisual.length > 1;
    // const currentImageUrl = images.length > 0 ? images[currentImageIndex].image_url : null;
    const currentItem = imagesForVisual.length > 0 ? imagesForVisual[currentImageIndex] : null;
    const currentImageUrl = typeof currentItem === 'string' ? currentItem : currentItem?.imageUrl;

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        const newIndex = (currentImageIndex + newDirection + imagesForVisual.length) % imagesForVisual.length;
        setCurrentImageIndex(newIndex);
        onSlideChange?.(newIndex, newDirection);
    }, [currentImageIndex, imagesForVisual.length, onSlideChange]);

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const startAutoSlide = useCallback(() => {
        stopAutoSlide();
        if (hasMultipleImages) {
            intervalRef.current = setInterval(() => {
                paginate(1);
            }, 5000); // Slide every 5 seconds
        }
    }, [hasMultipleImages, paginate]);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, [startAutoSlide]);

    const handlePrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        paginate(-1);
        startAutoSlide();
    }, [paginate, startAutoSlide]);

    const handleNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        paginate(1);
        startAutoSlide();
    }, [paginate, startAutoSlide]);

    const handleDotClick = useCallback((idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        paginate(idx - currentImageIndex);
        startAutoSlide();
    }, [paginate, currentImageIndex, startAutoSlide]);

    return (
        <div className={`group w-full relative overflow-hidden bg-gray-100 ${className || 'h-125'}`} ref={containRef} onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
            <div className="w-full h-full relative">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    {currentImageUrl && (
                        <MotionDiv
                            key={currentImageIndex}
                            custom={direction}
                            variants={sliderVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className="absolute inset-0 w-full h-full overflow-hidden"
                        >
                            <MotionDiv
                                custom={direction}
                                variants={imageVariants}
                                transition={transition}
                                style={{ y: parallaxY }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Image
                                    src={currentImageUrl || ''}
                                    alt="Banner Image"
                                    fill
                                    className="object-cover hover:cursor-pointer"
                                    sizes={sizes}
                                    priority
                                />
                            </MotionDiv>
                        </MotionDiv>
                    )}
                </AnimatePresence>

                <ImagesNavigation
                    hasMultipleImages={hasMultipleImages}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    images={imagesForVisual}
                    currentIndex={currentImageIndex}
                    onDotClick={handleDotClick}
                />
            </div>
        </div>
    )
};

export default ImagesVisual;