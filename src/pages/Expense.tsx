import { useState } from "react";
import CreateExpense from "../components/expense/CreateExpense";
import GetExpenses from "../components/expense/GetExpenses";
import EditExpense from "../components/expense/EditExpense";
import { FaPlus } from "react-icons/fa";
import type { expenseResponseType } from "../types/financial";

const Expense = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // state that controls the Edit Modal. If it's null, modal is closed.
  const [selectedExpense, setSelectedExpense] = useState<expenseResponseType | null>(null);

  return (
    <div className="p-3 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-[#10B981] hover:bg-[#10b981]/90 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
        >
          <FaPlus size={14} />
          Add Expense
        </button>
      </div>

      {/* Pass the setter function to the list component */}
      <GetExpenses onEditExpense={(exp) => setSelectedExpense(exp)} />

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">
            <button 
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
            >
              ✕
            </button>
            <div className="p-6">
              <CreateExpense onSuccess={() => setIsCreateModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL - Triggered when selectedExpense is not null */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md relative">
            <button 
              onClick={() => setSelectedExpense(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2"
            >
              ✕
            </button>
            <div className="p-6">
              {/* Pass the current expense data to the edit form */}
              <EditExpense 
                expense={selectedExpense} 
                onSuccess={() => setSelectedExpense(null)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;