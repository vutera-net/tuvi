export function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-100 ${className}`}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <Skeleton className="mb-4 h-6 w-40" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}
