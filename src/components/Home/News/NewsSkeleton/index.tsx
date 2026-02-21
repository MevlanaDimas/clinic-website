import NewsCardSkeleton from "@/components/Home/News/NewsCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionSection } from '@/lib/motion';

const NewsSkeleton = () => {
  return (
    <MotionSection className="w-full py-20 px-10 bg-white" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-10 w-64 mx-auto bg-gray-200" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto bg-gray-100" />
        </div>

        {/* Featured Card Skeleton */}
        {/* (You can use a larger custom skeleton here as done previously) */}

        {/* The Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default NewsSkeleton;