import { Skeleton } from "../ui/Skeleton";

export const EditFormSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className={i === 5 ? "md:col-span-2" : ""}>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    ))}
    <div className="md:col-span-2 flex justify-center mt-4">
       <Skeleton className="h-14 w-48 rounded-[15px]" />
    </div>
  </div>
);