import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <main className="flex flex-col w-full justify-center min-h-screen bg-white">
      {/* 1. Vision and Mission Skeleton (index-3.tsx) */}
      <section className="flex flex-col w-full px-4 md:px-10 pt-24">
        {/* Banner Placeholder */}
        <div className="w-full aspect-21/9 md:aspect-3/1">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>

        <div className="container mx-auto px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-25">
            {/* About Us Column */}
            <div className="flex flex-col h-full space-y-6">
              <Skeleton className="h-10 w-40" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Vision & Mission Column */}
            <div className="grid grid-rows-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-32" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Culture / CARING Skeleton (index-1.tsx) */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16 gap-4">
            <Skeleton className="h-10 w-64 md:w-96" />
            <Skeleton className="w-24 h-1.5 rounded-full" />
            <Skeleton className="h-4 w-3/4 max-w-xl" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:px-15">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 p-6">
                <Skeleton className="shrink-0 w-16 h-16 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Journey Skeleton (index-2.tsx) */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-10 lg:px-15">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col gap-15">
              <div className="space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="w-24 h-1.5 rounded-full" />
              </div>
              <div className="space-y-10">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
            <Skeleton className="relative w-full aspect-video lg:aspect-square rounded-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}