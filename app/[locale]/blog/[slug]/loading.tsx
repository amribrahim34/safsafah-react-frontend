export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="bg-white border-b border-neutral-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-16 bg-neutral-200 rounded-full" />
            <div className="h-3 w-3 bg-neutral-200 rounded-full" />
            <div className="h-3.5 w-20 bg-neutral-200 rounded-full" />
            <div className="h-3 w-3 bg-neutral-200 rounded-full" />
            <div className="h-3.5 w-32 bg-neutral-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="w-full h-[420px] sm:h-[520px] bg-neutral-300" />

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 xl:gap-14">

          {/* Main article skeleton */}
          <div className="bg-white rounded-3xl shadow-sm px-6 py-8 sm:px-10 sm:py-12 space-y-4">
            <div className="h-4 bg-neutral-200 rounded-full w-3/4" />
            <div className="h-4 bg-neutral-200 rounded-full w-full" />
            <div className="h-4 bg-neutral-200 rounded-full w-5/6" />
            <div className="h-4 bg-neutral-200 rounded-full w-2/3" />
            <div className="mt-6 h-4 bg-neutral-200 rounded-full w-1/2" />
            <div className="h-4 bg-neutral-200 rounded-full w-full" />
            <div className="h-4 bg-neutral-200 rounded-full w-4/5" />
            <div className="h-4 bg-neutral-200 rounded-full w-full" />
            <div className="h-4 bg-neutral-200 rounded-full w-3/4" />
            <div className="mt-8 h-48 bg-neutral-200 rounded-2xl w-full" />
            <div className="h-4 bg-neutral-200 rounded-full w-full" />
            <div className="h-4 bg-neutral-200 rounded-full w-5/6" />
          </div>

          {/* Sidebar skeleton — desktop only */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-3">
              <div className="h-3 bg-neutral-200 rounded-full w-1/2" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-neutral-100 rounded-lg w-full" />
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-neutral-100 p-6 space-y-3">
              <div className="h-3 bg-neutral-200 rounded-full w-1/3" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-9 bg-neutral-100 rounded-xl w-24" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
