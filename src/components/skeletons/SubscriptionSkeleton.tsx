export const SubscriptionSkeleton = () => {
  return (
    <div className="p-2 max-w-6xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 rounded-md animate-pulse" />
        </div>
        <div className="h-12 w-32 bg-gray-200 rounded-2xl animate-pulse" />
      </div>

      {/* List Container Skeleton */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="flex flex-col px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 py-5 border-b border-gray-50 last:border-0"
            >
              {/* Icon Circle Skeleton */}
              <div className="w-12 h-12 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />

              {/* Text Info Skeleton */}
              <div className="flex-grow space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-50 rounded animate-pulse" />
                </div>
              </div>

              {/* Amount Skeleton */}
              <div className="text-right space-y-2">
                <div className="h-5 w-20 bg-gray-200 rounded-lg animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};