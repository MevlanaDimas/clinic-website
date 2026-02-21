import { Skeleton } from "@/components/ui/skeleton";
import { MotionArticle } from '@/lib/motion';

const PromoDetailSkeleton = () => {
  return (
    <MotionArticle className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {/* Back Link Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Header Section Skeleton */}
      <header className="max-w-4xl mx-auto text-center mb-12 flex flex-col items-center">
        {/* Category Badge */}
        <Skeleton className="h-6 w-24 rounded-full bg-indigo-100 dark:bg-indigo-900/50 mb-6" />
        
        {/* Headline - two lines */}
        <div className="w-full space-y-3 mb-6">
          <Skeleton className="h-10 w-full md:w-3/4 mx-auto bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-1/2 mx-auto bg-gray-200 dark:bg-gray-700" />
        </div>
        
        {/* Valid Until Meta */}
        <Skeleton className="h-5 w-48 bg-gray-100 dark:bg-gray-800" />
      </header>

      {/* Featured Image Skeleton - matches aspect-[21/9] and rounded-2xl */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="relative aspect-21/9 w-full rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-lg">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* Content and Action Box Skeleton */}
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Description Paragraphs */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-4 w-full bg-gray-100 dark:bg-gray-800" />
          <Skeleton className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Action Box (Promo Code & WhatsApp) */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left space-y-2">
              <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-center gap-2">
                 <Skeleton className="h-8 w-24 bg-indigo-100 dark:bg-indigo-900/30" />
                 <Skeleton className="h-8 w-8 rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
            {/* WhatsApp Button Placeholder */}
            <Skeleton className="h-12 w-full sm:w-48 rounded-lg bg-green-100 dark:bg-green-900/20" />
          </div>

          {/* Countdown Placeholder */}
          <div className="mt-6 py-6 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-24 bg-slate-100 dark:bg-slate-800" />
            <div className="flex gap-4">
               <Skeleton className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
               <Skeleton className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
               <Skeleton className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
               <Skeleton className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
};

export default PromoDetailSkeleton;