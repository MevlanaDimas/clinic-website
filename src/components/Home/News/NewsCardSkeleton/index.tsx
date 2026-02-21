import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/lib/motion';

const NewsCardSkeleton = () => {
  return (
    <MotionDiv className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Image Area Skeleton */}
      <div className="relative h-56 w-full bg-gray-100 animate-pulse">
        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 space-y-4">
        {/* Date Skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded bg-gray-100" />
          <Skeleton className="h-4 w-24 bg-gray-100" />
        </div>

        {/* Title Skeleton (2 lines) */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full bg-gray-200" />
          <Skeleton className="h-6 w-2/3 bg-gray-200" />
        </div>

        {/* Excerpt Skeleton (3 lines) */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full bg-gray-100" />
          <Skeleton className="h-3 w-full bg-gray-100" />
          <Skeleton className="h-3 w-4/5 bg-gray-100" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Author Avatar Skeleton */}
            <Skeleton className="w-8 h-8 rounded-full bg-gray-200" />
            <Skeleton className="h-4 w-16 bg-gray-100" />
          </div>
          {/* "Read More" Skeleton */}
          <Skeleton className="h-4 w-20 bg-blue-50" />
        </div>
      </div>
    </MotionDiv>
  );
};

export default NewsCardSkeleton;