import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/lib/motion';

const NewsItemSkeleton = () => {
  return (
    <MotionDiv className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row">
        {/* Image Area Skeleton - matches md:w-1/3 and min-h-[200px] */}
        <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-50 shrink-0">
          <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Content Area Skeleton */}
        <div className="p-6 flex flex-col justify-between w-full space-y-4">
          <div className="space-y-3">
            {/* Category Badge */}
            <Skeleton className="h-5 w-24 rounded-full bg-blue-50 dark:bg-blue-900/20" />
            
            {/* Title - two lines */}
            <div className="space-y-2">
              <Skeleton className="h-7 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-7 w-2/3 bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Summary - three lines */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
              <Skeleton className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>

          {/* Metadata (Author/Date) and Tags */}
          <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-32 bg-gray-100 dark:bg-gray-800" />
              
              {/* Tags grid - mimicking the 5-column grid on desktop */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Skeleton className="h-6 w-full rounded-full bg-gray-100 dark:bg-gray-800" />
                <Skeleton className="h-6 w-full rounded-full bg-gray-100 dark:bg-gray-800" />
                <Skeleton className="h-6 w-full rounded-full bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default NewsItemSkeleton;