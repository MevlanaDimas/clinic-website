import { Skeleton } from "@/components/ui/skeleton";
import PromoItemSkeleton from "../PromoItemSkeleton";
import { MotionDiv } from '@/lib/motion';

export const PromoListSkeleton = () => {
  return (
    <MotionDiv className="flex flex-col gap-10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col gap-10 mx-5">
        {/* Render 4 skeletons to fill the page */}
        {[...Array(4)].map((_, i) => (
          <PromoItemSkeleton key={i} />
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="flex justify-center py-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-10 w-24 rounded bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </MotionDiv>
  );
};