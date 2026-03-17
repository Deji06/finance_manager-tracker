import { useState } from "react";
import { Plus, Trash2, PieChart, AlertTriangle, Check } from "lucide-react";
import { BudgetSkeleton } from "../components/skeletons/budgetSkeleton";
import { useDeleteBudget, useGetBudget } from "../services/budgetService";
import { formatCurrency } from "../utils/format";
import type { budgetResponseType } from "../types/financial";
import { CreateBudget } from "../components/budget/CreateBudget";

const Budget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Defaulting to current month for the query
  const period = "2026-03";
  const { data: budgets, isLoading } = useGetBudget(period);
  const { mutate: deleteBudget } = useDeleteBudget();

  if (isLoading) return <BudgetSkeleton />;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-4 space-y-5">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl dark:text-gray-500 font-black tracking-tight">
            Budgets
          </h1>
          <p className="text-gray-500 font-medium">Monthly limits & targets</p>
        </div>
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#10B981]/20 hover:bg-[#0da673] transition-all"
        >
          <Plus size={20} />{" "}
          <span className="hidden md:inline">New Budget</span>
        </button>
      </header>

      {isModalOpen && (
        <div className="bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200 p-2">
          <CreateBudget onSuccess={() => setIsModalOpen(false)} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets?.map((budget: budgetResponseType) => {
          const progressPercent = budget.progress * 100;
          const isSavings = budget.type === "SAVINGS_TARGET";
          //   const isWarning = budget.progress >= 0.8;
          //   const isOverLimit = budget.progress >= 1.0;
          //   const isOver = budget.progress > 80;
          const getStatusColors = () => {
            if (isSavings) {
              if (progressPercent >= 100) return "text-[#10B981] bg-[#10B981]";
              if (progressPercent < 40) return "text-red-500 bg-red-500";
              return "text-amber-500 bg-amber-500";
            } else {
              if (progressPercent >= 100) return "text-red-500 bg-red-500";
              if (progressPercent >= 80) return "text-amber-500 bg-amber-500";
              return "text-[#10B981] bg-[#10B981]";
            }
          };
          const [textColor, bgColor] = getStatusColors().split(" ");
          return (
            <div
              key={budget.id}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span
                    className={`px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black tracking-widest uppercase ${isSavings ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"}`}
                  >
                    {isSavings ? "Savings Goal" : budget.category}
                  </span>
                  <h3 className="text-2xl font-black dark:text-black">
                    {formatCurrency(budget.amount)}
                  </h3>
                </div>
                <button
                  onClick={() => deleteBudget(budget.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className={textColor}>
                    {isSavings ? "Saving Progress" : "Spending Progress"}
                  </span>
                  <span className={textColor}>
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${bgColor}`}
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-end pt-2">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {isSavings ? "Total Saved" : "Total Spent"}
                  </p>
                  <p className="font-bold text-gray-900">
                    {formatCurrency(budget.actualSpent)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {isSavings ? "Remaining to Save" : "Remaining Balance"}
                  </p>
                  <p
                    className={`font-bold ${!isSavings && budget.remaining < 0 ? "text-red-500" : "text-gray-900"}`}
                  >
                    {formatCurrency(budget.remaining)}
                  </p>
                </div>
              </div>

              {/* 4. Conditional Icons */}
              {!isSavings && progressPercent >= 80 && (
                <div className="absolute top-2 right-2">
                  <AlertTriangle
                    className={
                      progressPercent >= 100 ? "text-red-500" : "text-amber-500"
                    }
                    size={16}
                  />
                </div>
              )}
              {isSavings && progressPercent >= 100 && (
                <div className="absolute top-2 right-2">
                  <div className="bg-[#10B981] rounded-full p-1 text-white">
                    <Check size={12} strokeWidth={4} />
                  </div>
                </div>
              )}
              {/* {isWarning && (
                <div className="absolute top-2 right-2">
                  <AlertTriangle className="text-amber-500" size={16} />
                </div>
              )}

               {isOverLimit && (
                <div className="absolute top-2 right-2">
                  <AlertTriangle className="text-red-500" size={16} />
                </div>
              )} */}
            </div>
          );
        })}
      </div>

      {budgets?.length === 0 && !isModalOpen && (
        <div className="text-center py-20 bg-white rounded-[40px] border border-gray-100">
          <PieChart className="mx-auto text-gray-200 mb-4" size={48} />
          <p className="text-gray-500 font-medium">
            No budgets set for this period.
          </p>
        </div>
      )}
    </div>
  );
};

export default Budget;
