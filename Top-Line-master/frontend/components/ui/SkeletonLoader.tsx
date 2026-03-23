"use client";

export function ProductCardSkeleton() {
  return (
    <div className="group flex h-full flex-col border border-neutral-200 bg-white p-3 animate-pulse">
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-200" />
      <div className="mt-3 flex flex-grow flex-col gap-2 md:gap-3">
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 w-3/4" />
          <div className="h-3 bg-neutral-200 w-full" />
          <div className="h-3 bg-neutral-200 w-5/6" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-4 bg-neutral-200" />
            ))}
          </div>
          <div className="h-4 bg-neutral-200 w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
