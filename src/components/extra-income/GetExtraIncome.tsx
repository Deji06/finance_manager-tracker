import { useState } from "react";
import { useGetExtraIncome, useDeleteExtraIncome } from "../../services/extraIncomeService";
import { formatCurrency } from "../../utils/format";
import { HiOutlineDotsVertical, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { TrendingUp } from "lucide-react";
import { ExpenseSkeleton } from "../skeletons/ExpenseSkeleton";
import type { extraIncomeResponseType } from "../../types/financial";

interface GetExtraIncomeProps {
  onEdit: (income: extraIncomeResponseType) => void;
}

const GetExtraIncome = ({ onEdit }: GetExtraIncomeProps) => {
  const { data: apiResponse, isLoading, isError } = useGetExtraIncome();
  const { mutate: deleteIncome } = useDeleteExtraIncome();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  if (isLoading) return <ExpenseSkeleton />;
  if (isError) return <div className="p-10 text-center text-red-500">Error loading income data.</div>;

  const incomeData: extraIncomeResponseType[] = apiResponse?.data || [];
//   console.log("resp:", incomeData);
  

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this income record?")) {
      deleteIncome(id);
    }
  };

  return (
    <div className="mt-6 relative" onClick={() => setOpenMenuId(null)}>
      {incomeData.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <TrendingUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-400 font-medium">No extra income recorded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {incomeData.map((income) => (
            <div 
              key={income.id} 
              className="grid grid-cols-[1fr_120px_40px] items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow group"
            >
              {/* Info Column */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 text-[#10B981] rounded-full flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{income.source}</p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {new Date(income.date).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Amount Column */}
              <div className="text-right">
                <p className="font-black text-[#10B981] text-lg">
                  +{formatCurrency(income.amount)}
                </p>
              </div>

              {/* Actions Column */}
              <div className="flex justify-end relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === income.id ? null : income.id); }}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <HiOutlineDotsVertical />
                </button>

                {openMenuId === income.id && (
                  <div className="absolute right-0 mt-10 w-32 bg-white border border-gray-100 shadow-xl rounded-lg z-20 py-1 overflow-hidden">
                    <button 
                      onClick={() => onEdit(income)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-[#10B981]"
                    >
                      <HiOutlinePencil size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(income.id)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-50"
                    >
                      <HiOutlineTrash size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetExtraIncome;