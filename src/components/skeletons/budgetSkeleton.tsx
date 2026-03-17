
export const BudgetSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center px-2">
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
        <div className="h-12 w-40 bg-gray-200 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white rounded-[32px] border border-gray-100 h-48 space-y-4">
            <div className="flex justify-between">
              <div className="h-6 w-24 bg-gray-200 rounded-md" />
              <div className="h-6 w-16 bg-gray-200 rounded-md" />
            </div>
            <div className="h-4 w-full bg-gray-100 rounded-full" />
            <div className="flex justify-between pt-4">
              <div className="h-4 w-20 bg-gray-100 rounded-md" />
              <div className="h-4 w-20 bg-gray-100 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};