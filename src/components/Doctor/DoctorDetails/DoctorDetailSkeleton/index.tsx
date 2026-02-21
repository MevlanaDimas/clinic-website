import { Skeleton } from "@/components/ui/skeleton";
import { MotionArticle } from '@/lib/motion';

const DoctorDetailSkeleton = () => {
  return (
    <MotionArticle className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Breadcrumb Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-4 w-32 bg-gray-200" />
      </div>

      {/* Header Section Skeleton */}
      <header className="max-w-4xl mx-auto text-center mb-12 flex flex-col items-center">
        <Skeleton className="h-6 w-24 rounded-full bg-indigo-50 mb-6" />
        <Skeleton className="h-12 w-3/4 md:w-1/2 bg-gray-200 mb-6" />
        <Skeleton className="h-5 w-48 bg-gray-100" />
      </header>

      {/* Featured Image Skeleton (Circular) */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="relative aspect-square w-full max-w-xs mx-auto overflow-hidden rounded-full bg-gray-100 shadow-sm flex items-center justify-center">
          <Skeleton className="h-full w-full bg-gray-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Share Sidebar Skeleton */}
        <aside className="lg:w-24 shrink-0 flex lg:flex-col gap-4 items-center lg:items-start">
          <Skeleton className="h-3 w-12 bg-gray-100 hidden lg:block mb-2" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-10 h-10 rounded-full bg-gray-100" />
          ))}
        </aside>

        {/* Main Content Skeleton */}
        <div className="flex-1 max-w-3xl mx-auto space-y-8">
          {/* Biography Area */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-40 bg-gray-200" /> {/* Heading */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-5/6 bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-2/3 bg-gray-100" />
            </div>
          </div>

          {/* Practice Schedule Skeleton */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Skeleton className="h-8 w-56 bg-gray-200 mb-6" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 border rounded-lg bg-gray-50/80 space-y-3">
                  <Skeleton className="h-6 w-24 bg-gray-200" />
                  <Skeleton className="h-4 w-40 bg-gray-100" />
                  <Skeleton className="h-4 w-20 bg-green-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Spacer for alignment */}
        <div className="hidden xl:block w-24 shrink-0"></div>
      </div>

      {/* CTA Button Skeleton */}
      <div className="mt-20 max-w-sm mx-auto">
        <Skeleton className="h-12 w-full rounded-lg bg-green-100" />
      </div>
    </MotionArticle>
  );
};

export default DoctorDetailSkeleton;