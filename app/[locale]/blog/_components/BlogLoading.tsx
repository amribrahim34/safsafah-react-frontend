export default function BlogLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[420px] bg-neutral-200 rounded-none mb-12" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="h-8 w-48 bg-neutral-200 rounded-lg mb-2" />
        <div className="h-4 w-72 bg-neutral-100 rounded-lg mb-10" />

        <div className="grid md:grid-cols-[320px,1fr] gap-10">
          {/* Sidebar skeleton */}
          <div className="hidden md:block space-y-6">
            <div className="h-11 bg-neutral-100 rounded-2xl" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-neutral-100 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[16/9] bg-neutral-200" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-20 bg-neutral-100 rounded" />
                  <div className="h-5 bg-neutral-200 rounded" />
                  <div className="h-4 bg-neutral-100 rounded w-5/6" />
                  <div className="h-4 bg-neutral-100 rounded w-3/4" />
                  <div className="flex justify-between pt-2">
                    <div className="h-3 w-24 bg-neutral-100 rounded" />
                    <div className="h-3 w-16 bg-neutral-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
