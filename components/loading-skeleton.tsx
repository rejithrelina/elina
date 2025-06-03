export function ProductCardSkeleton() {
  return (
    <div className="modern-card overflow-hidden">
      <div className="h-64 w-full skeleton" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 skeleton rounded" />
          <div className="h-4 w-12 skeleton rounded" />
        </div>
        <div className="h-6 w-3/4 skeleton rounded" />
        <div className="space-y-2">
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-full skeleton rounded" />
          <div className="h-3 w-2/3 skeleton rounded" />
        </div>
        <div className="h-4 w-1/2 skeleton rounded" />
        <div className="flex gap-2">
          <div className="h-10 flex-1 skeleton rounded-xl" />
          <div className="h-10 w-12 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
