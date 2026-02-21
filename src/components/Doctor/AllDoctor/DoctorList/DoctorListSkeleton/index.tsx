import { Skeleton } from "@/components/ui/skeleton";
import DoctorCardSkeleton from "../DoctorCardSkeleton";
import { MotionDiv } from '@/lib/motion';

export const DoctorListSkeleton = () => {
  return (
    <MotionDiv className="space-y-10 px-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Grid container - matches grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Render 6 items to fill the grid layout */}
        {[...Array(6)].map((_, i) => (
          <DoctorCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center py-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-10 w-24 rounded-md bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </MotionDiv>
  );
};