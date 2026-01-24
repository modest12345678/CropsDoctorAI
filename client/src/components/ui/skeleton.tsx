import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Detection result skeleton for disease detector
function DetectionResultSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Symptoms box */}
      <div className="p-4 bg-muted/50 rounded-lg space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Treatment box */}
      <div className="p-4 bg-green-50/50 dark:bg-green-950/10 rounded-lg space-y-3">
        <Skeleton className="h-5 w-40" />
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Skeleton className="h-2 w-2 rounded-full mt-2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton className="h-2 w-2 rounded-full mt-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton className="h-2 w-2 rounded-full mt-2" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export { Skeleton, DetectionResultSkeleton }

