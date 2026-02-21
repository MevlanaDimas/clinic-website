import { Skeleton } from "@/components/ui/skeleton";

export default function ContactLoading() {
  return (
    <main className="flex flex-col w-full justify-center min-h-screen bg-white">
      <div className="w-full">
        {/* 1. Hero Banner Skeleton */}
        <section className="relative w-full h-75 md:h-112.5 lg:h-150">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <Skeleton className="h-12 w-64 md:w-96 mb-4" />
            <Skeleton className="h-6 w-48 md:w-64" />
          </div>
        </section>

        {/* 2. Main Content Section */}
        <section className="py-16 md:py-24 px-4 md:px-10">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Left Column: Contact Form Skeleton */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-full max-w-sm" />
                </div>
                
                {/* Form Fields Skeletons */}
                <div className="space-y-4 mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>

              {/* Right Column: Info & Map Skeleton */}
              <div className="flex flex-col gap-8">
                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="p-6 bg-blue-50 rounded-2xl border border-blue-100 space-y-3">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))}
                </div>

                {/* Visit Us & Map */}
                <div className="p-8 bg-white rounded-2xl border border-gray-100 space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-32" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                  
                  {/* Google Maps Placeholder */}
                  <Skeleton className="w-full h-75 md:h-100 rounded-2xl" />
                </div>

                {/* WhatsApp CTA */}
                <Skeleton className="w-full h-16 rounded-2xl" />
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}