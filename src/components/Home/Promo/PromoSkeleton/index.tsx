import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/lib/motion';

const PromoSkeleton = () => {
  return (
    /* Match the container height and styles of your original PromoSection */
    <MotionDiv className="w-full relative h-100 md:h-150 overflow-hidden bg-gray-100" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      
      {/* Background Shimmer */}
      <div className="absolute inset-0 w-full h-full animate-pulse bg-gray-200" />

      {/* Content Overlay - matching the flex layout of your original component */}
      <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center p-4 z-10 lg:mx-10">
        <div className="flex flex-col w-full max-w-2xl gap-5 md:gap-13">
          
          {/* Headline Skeleton */}
          <Skeleton className="h-10 md:h-16 w-3/4 self-center lg:self-start bg-gray-300 rounded-lg" />
          
          {/* Description Skeleton (2 lines) */}
          <div className="space-y-3 flex flex-col items-center lg:items-start">
            <Skeleton className="h-4 md:h-6 w-full bg-gray-300" />
            <Skeleton className="h-4 md:h-6 w-5/6 bg-gray-300" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 md:gap-10 mt-4">
            {/* CTA Button */}
            <Skeleton className="h-12 w-32 md:w-40 rounded-full bg-gray-300" />
            {/* Learn More Button */}
            <Skeleton className="h-12 w-32 md:w-40 rounded-full bg-gray-300" />
          </div>
          
        </div>
      </div>

      {/* Navigation Dots (Optional aesthetic touch) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <Skeleton className="h-2 w-2 rounded-full bg-gray-300" />
        <Skeleton className="h-2 w-2 rounded-full bg-gray-300" />
        <Skeleton className="h-2 w-2 rounded-full bg-gray-300" />
      </div>
    </MotionDiv>
  );
};

export default PromoSkeleton;