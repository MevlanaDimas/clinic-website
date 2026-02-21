import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* 1. Promo / Banner Skeleton */}
      <section className="w-full relative h-100 md:h-150 bg-gray-100">
        <div className="container mx-auto h-full flex flex-col justify-center px-10 gap-6">
          <Skeleton className="h-10 w-3/4 md:w-1/2 rounded-lg" />
          <Skeleton className="h-6 w-2/3 md:w-1/3 rounded-lg" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-32 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. Hero / Why Choose Us Skeleton */}
      <section className="w-full py-20 bg-gray-50 px-10">
        <div className="container mx-auto flex flex-col items-center gap-12">
          {/* Main Image Box */}
          <Skeleton className="w-full max-w-4xl h-75 md:h-125 rounded-2xl" />
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-row gap-6 p-6 bg-white rounded-xl border border-gray-100">
                <Skeleton className="shrink-0 w-16 h-16 rounded-full" />
                <div className="flex flex-col gap-3 flex-1">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. News Section Skeleton */}
      <section className="w-full py-20 px-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16 gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-1.5 w-20 rounded-full" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Featured News Skeleton */}
          <div className="rounded-2xl overflow-hidden bg-white mx-auto max-w-6xl border border-gray-100 mb-16">
            <Skeleton className="h-64 md:h-96 w-full" />
            <div className="p-8 md:p-10 space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          {/* News Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-56 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Section Skeleton */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <Skeleton className="w-full lg:w-1/2 h-100 lg:h-150 rounded-2xl" />
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <Skeleton className="h-12 w-2/3" />
              <Skeleton className="w-20 h-1.5 rounded-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-12 w-40 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}