import { Skeleton } from "@/components/ui/skeleton";
import { MotionArticle } from '@/lib/motion';

const NewsDetailSkeleton = () => {
  return (
    <MotionArticle className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Breadcrumb Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-4 w-32 bg-gray-200" />
      </div>

      {/* Header Section Skeleton */}
      <header className="max-w-4xl mx-auto text-center mb-12 flex flex-col items-center">
        {/* Category Badge */}
        <Skeleton className="h-6 w-24 rounded-full bg-indigo-50 mb-6" />
        
        {/* Main Title - multi-line skeleton */}
        <div className="w-full space-y-3 mb-8">
          <Skeleton className="h-10 w-full md:w-3/4 mx-auto bg-gray-200" />
          <Skeleton className="h-10 w-2/3 mx-auto bg-gray-200" />
        </div>
        
        {/* Meta Info (Author & Date) */}
        <div className="flex gap-6">
          <Skeleton className="h-5 w-32 bg-gray-100" />
          <Skeleton className="h-5 w-40 bg-gray-100" />
        </div>
      </header>

      {/* Featured Image Skeleton - matches aspect-[21/9] */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="relative aspect-21/9 w-full rounded-2xl bg-gray-100 overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        <Skeleton className="mt-3 h-3 w-48 mx-auto bg-gray-50" /> {/* Figcaption */}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Share Sidebar Skeleton */}
        <aside className="lg:w-24 shrink-0 flex lg:flex-col gap-4 items-center lg:items-start">
          <Skeleton className="h-3 w-12 bg-gray-100 hidden lg:block mb-2" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-10 h-10 rounded-full bg-gray-100 border border-gray-50" />
          ))}
        </aside>

        {/* Article Content Skeleton */}
        <div className="flex-1 max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            {/* Paragraph 1 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-5/6 bg-gray-100" />
            </div>
            
            {/* Section Heading */}
            <Skeleton className="h-8 w-48 bg-gray-200 mt-10" />

            {/* Paragraph 2 with inline image placeholder */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100" />
            </div>

            {/* Inline Article Image - matches aspect-video */}
            <div className="my-8 relative aspect-video w-full rounded-xl bg-gray-100 overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Paragraph 3 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-full bg-gray-100" />
              <Skeleton className="h-4 w-2/3 bg-gray-100" />
            </div>
          </div>

          {/* Tags Section Skeleton */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Skeleton className="h-4 w-32 bg-gray-200 mb-4" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-9 w-24 rounded-full bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Spacer (Matches the hidden xl:block w-24) */}
        <div className="hidden xl:block w-24 shrink-0"></div>
      </div>
    </MotionArticle>
  );
};

export default NewsDetailSkeleton;