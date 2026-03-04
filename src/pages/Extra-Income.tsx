import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import GetExtraIncome from "../components/extra-income/GetExtraIncome"; 
import type { extraIncomeResponseType } from "../types/financial";
import { CreateExtraIncome }  from "../components/extra-income/CreateExtraIncome";
import EditExtraIncome from '../components/extra-income/EditExtraIncome'

const ExtraIncome = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<extraIncomeResponseType | null>(null);

  return (
    <div className="p-3 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Extra Income</h1>
          <p className="text-gray-500 text-sm">Manage your side hustles and bonuses</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-[#10B981] text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-transform active:scale-95"
        >
          <FaPlus size={14} /> Add Income
        </button>
      </div>

      <GetExtraIncome onEdit={(inc) => setSelectedIncome(inc)} />

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setIsCreateModalOpen(false)} className="absolute top-4 right-4 text-gray-400">✕</button>
            <CreateExtraIncome onSuccess={() => setIsCreateModalOpen(false)} />
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {selectedIncome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button onClick={() => setSelectedIncome(null)} className="absolute top-4 right-4 text-gray-400">✕</button>
            <EditExtraIncome income={selectedIncome} onSuccess={() => setSelectedIncome(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtraIncome;