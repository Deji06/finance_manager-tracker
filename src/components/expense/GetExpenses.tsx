import React, { useState } from "react";
import { useGetExpense, useDeleteExpense } from "../../services/expenseService";
import type { expenseResponseType } from "../../types/financial";
import { formatCurrency, formatExpenseDate } from "../../utils/format";
import { HiOutlineDotsVertical, HiOutlinePencil, HiOutlineTrash, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { getCategoryIcon } from "../../utils/categoryIcon";
import { toast } from "sonner";
import { ExpenseSkeleton } from "../skeletons/ExpenseSkeleton";

interface GetExpensesProps {
  onEditExpense: (expense: expenseResponseType) => void;
}

const GetExpenses = ({ onEditExpense }: GetExpensesProps) => {
  // --- CHANGE 1: Added pagination state ---
  const [page, setPage] = useState(1);
  const limit = 10; // We define limit here to pass to our query

  // --- CHANGE 2: Passed page and limit to the hook ---
  const { data: apiResponse, isLoading, isError, isPlaceholderData } = useGetExpense(page, limit);
  const { mutate: deleteExpenseMutation } = useDeleteExpense();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (isLoading) return <ExpenseSkeleton />
  if (isError) return <div className="p-10 text-center text-red-500">Error loading data.</div>;

  // --- CHANGE 3: Destructure the new API structure (data + pagination) ---
  const expenseData: expenseResponseType[] = apiResponse?.data || [];
  const pagination = apiResponse?.pagination;

  // Group by same calendar day (Logic remains same, but uses expenseData from destruction)
  const groupedExpenses = expenseData.reduce(
    (acc: Record<string, expenseResponseType[]>, expense: expenseResponseType) => {
      const dayKey = new Date(expense.date).toDateString();
      if (!acc[dayKey]) acc[dayKey] = [];
      acc[dayKey].push(expense);
      return acc;
    },
    {}
  );

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this?")) {
      deleteExpenseMutation(id, {
        onSuccess: () => toast.success("Expense deleted"),
        onError: () => toast.error("Could not delete, try later!"),
      });
    }
  };

  return (
    <div className="mt-3 relative" onClick={() => setOpenMenuId(null)}>
      {expenseData.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No expenses found.</div>
      ) : (
        <>
          {(Object.entries(groupedExpenses) as [string, expenseResponseType[]][]).map(([day, expenses]) => (
            <div key={day} className="mb-6">
              <div className="flex justify-between items-end border-b border-gray-100 pb-2 mb-2">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                  {new Date(day).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}
                </h3>
                <span className="text-xs text-gray-400">{expenses.length} Transactions</span>
              </div>

              <div className="flex flex-col">
                {expenses.map((expense) => {
                  const { amount, description, id, category, date } = expense;
                  const { timePart } = formatExpenseDate(date);

                  return (
                    <div key={id} className="grid grid-cols-[100px_1fr_120px_100px_30px] items-center py-2 px-4 hover:bg-gray-50 rounded-lg group relative">
                      <span className="text-[12px] text-gray-400 font-medium">{timePart}</span>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center">{getCategoryIcon(category)}</div>
                        <p className="font-semibold text-gray-700 truncate max-w-[200px]">{description}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                          {category}
                        </span>
                      </div>

                      <div className="text-right">
                        <h1 className="font-bold text-gray-900">{formatCurrency(amount)}</h1>
                      </div>

                      <div className="flex justify-end relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleMenu(id); }}
                          className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                        >
                          <HiOutlineDotsVertical />
                        </button>

                        {openMenuId === id && (
                          <div className="absolute right-0 mt-8 w-32 bg-white border border-gray-100 shadow-lg rounded-lg z-10 py-1 overflow-hidden">
                            <button 
                              onClick={() => onEditExpense(expense)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <HiOutlinePencil size={14} /> Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(expense.id)}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50"
                            >
                              <HiOutlineTrash size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* --- CHANGE 4: Added Pagination UI Controls --- */}
          <div className="mt-8 mb-4 flex items-center justify-between px-4 py-3 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="text-sm text-gray-500">
              Showing page <span className="font-semibold text-gray-800">{pagination?.page}</span> of <span className="font-semibold text-gray-800">{pagination?.totalPages}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <HiChevronLeft size={20} />
              </button>
              
              <button
                onClick={() => {
                  if (!isPlaceholderData && page < (pagination?.totalPages || 1)) {
                    setPage((prev) => prev + 1);
                  }
                }}
                disabled={page >= (pagination?.totalPages || 1) || isPlaceholderData}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <HiChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GetExpenses;