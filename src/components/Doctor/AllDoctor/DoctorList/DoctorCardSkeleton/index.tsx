import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/lib/motion';

const DoctorCardSkeleton = () => {
  return (
    <MotionDiv className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Image Area Skeleton - matches h-64 */}
      <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700 animate-pulse" />
      
      <div className="p-6 flex flex-col grow space-y-4">
        {/* Name/Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700" /> {/* Name */}
          <Skeleton className="h-4 w-1/2 bg-indigo-50 dark:bg-indigo-900/20" /> {/* Title */}
        </div>

        {/* Biography Lines - matches line-clamp-3 */}
        <div className="space-y-2 grow">
          <Skeleton className="h-3 w-full bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-3 w-full bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-3 w-4/5 bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Footer Skeleton (Schedule) */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <div className="flex items-center">
            <Skeleton className="w-4 h-4 mr-2 rounded bg-indigo-100 dark:bg-indigo-900/30" />
            <Skeleton className="h-3 w-32 bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default DoctorCardSkeleton;