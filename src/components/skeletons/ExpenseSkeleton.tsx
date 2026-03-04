import { Skeleton } from "../ui/Skeleton";

export const ExpenseSkeleton = () => (
  <div className="mt-8 space-y-6">
    {[1, 2].map((group) => (
      <div key={group}>
        <div className="flex justify-between border-b pb-2 mb-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-20" />
        </div>
        {[1, 2, 3].map((item) => (
          <div key={item} className="grid grid-cols-[100px_1fr_120px_100px_30px] items-center py-4 px-4">
            <Skeleton className="h-3 w-12" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-20 ml-auto" />
            <Skeleton className="h-4 w-4 ml-auto" />
          </div>
        ))}
      </div>
    ))}
  </div>
);