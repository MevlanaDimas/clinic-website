import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/lib/motion';

const PromoItemSkeleton = () => {
  return (
    <MotionDiv className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row">
        {/* Image Placeholder - matches md:w-1/3 and md:min-h-[200px] */}
        <div className="relative h-48 md:h-auto md:w-1/3 md:min-h-50 shrink-0">
          <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col justify-between w-full space-y-4">
          <div>
            {/* Category Label */}
            <Skeleton className="h-4 w-20 bg-indigo-100 dark:bg-indigo-900/30" />
            
            {/* Headline - Matches text-xl */}
            <Skeleton className="mt-2 h-7 w-3/4 bg-gray-200 dark:bg-gray-700" />
            
            {/* Description - 3 lines matching line-clamp-3 */}
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
              <Skeleton className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>

          {/* Footer: Valid Until and Promo Code */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-40 bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-6 w-16 rounded-full bg-green-50 dark:bg-green-900/20" />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default PromoItemSkeleton;