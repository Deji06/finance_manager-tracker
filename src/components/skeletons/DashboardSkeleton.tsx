import { Skeleton } from "../ui/Skeleton";

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    <header>
      <Skeleton className="h-8 w-40 mb-2" />
      <Skeleton className="h-4 w-60" />
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Balance Card Skeleton */}
      <div className="lg:col-span-2 h-64 bg-gray-100 dark:bg-[#1A1F1E] rounded-[15px] p-8">
         <Skeleton className="h-4 w-32 mb-4" />
         <Skeleton className="h-12 w-48 mb-12" />
         <div className="flex gap-8">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
         </div>
      </div>
      {/* Side Card Skeleton */}
      <Skeleton className="h-64 rounded-[15px]" />
    </div>

    <section>
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
      </div>
    </section>
  </div>
);