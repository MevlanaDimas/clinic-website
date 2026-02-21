import NewsItemSkeleton from "../NewsItemSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from '@/lib/motion';

export const NewsListSkeleton = () => {
  return (
    <MotionDiv className="flex flex-col gap-10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col gap-10 mx-5">
        {/* We render 5 items to fill the initial viewport */}
        {[...Array(5)].map((_, i) => (
          <NewsItemSkeleton key={i} />
        ))}
      </div>
      
      {/* Pagination Placeholder */}
      <div className="flex justify-center py-10">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-10 w-24 rounded-md bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
    </MotionDiv>
  );
};