
'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../ui/button";


const ImagesNavigation = ({
    hasMultipleImages,
    onPrev,
    onNext,
    images,
    currentIndex,
    onDotClick
}: {
    hasMultipleImages: boolean;
    onPrev: (e: React.MouseEvent) => void;
    onNext: (e: React.MouseEvent) => void;
    images: unknown[];
    currentIndex: number;
    onDotClick: (index: number, e: React.MouseEvent) => void;
}) => {
    if (!hasMultipleImages) return null;

    return (
        <>
            <Button
                onClick={onPrev}
                aria-label="Previous news"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 h-auto bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer border border-white/10"
            >
                <ChevronLeft size={24} />
            </Button>
            <Button
                onClick={onNext}
                aria-label="Next news"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 h-auto bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 cursor-pointer border border-white/10"
            >
                <ChevronRight size={24} />
            </Button>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_, idx) => (
                    <Button
                        key={idx}
                        onClick={(e) => onDotClick(idx, e)}
                        aria-label={`Go to promo ${idx + 1}`}
                        className={`h-2 rounded-full shadow-sm transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'} cursor-pointer p-0 border-none`}
                    />
                ))}
            </div>
        </>
    )
};

export default ImagesNavigation;