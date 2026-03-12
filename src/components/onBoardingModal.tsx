import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Wallet, ArrowRight, Loader2 } from "lucide-react";
import { updateProfile } from "../lib/api";

export const OnboardingModal = () => {
  const [income, setIncome] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async () => {
    if (!income || isNaN(Number(income)))return;
    
    
    setIsSubmitting(true);
    try {
      await updateProfile({ monthlyIncome: Number(income) });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (err) {
      console.error("Failed to save income", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0D0C]/10 flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-white rounded-[30px] p-8 lg:p-12 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Decorative background circle */}
        {/* <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#10B981]/10 rounded-full blur-3xl"></div> */}
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#10B981]/20">
            <Wallet className="text-white" size={32} />
          </div>

          <h2 className="text-[20px] font-black text-gray-900 leading-tight">
            Oya, let's track that <span className="text-[#10B981]">₦aira.</span>
          </h2>
          <p className="text-gray-500 font-medium mt-3 text-md">
            What's your monthly intake? We'll use this to calculate your net balance.
          </p>

          <div className="mt-5 space-y-4">
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-md font-bold text-gray-400">₦</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="0.00"
                className="w-full text-black bg-gray-50 border-2 border-gray-100 rounded-[15px] py-5 pl-12 pr-6 text-md font-bold outline-none focus:border-[#10B981] transition-all placeholder:text-black"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={isSubmitting || !income}
              className="w-full bg-[#0A0D0C] text-white py-5 rounded-[15px] font-bold text-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <>Start Tracking <ArrowRight size={20} /></>}
            </button>
          </div>
          
          <p className="text-center text-gray-400 text-sm mt-6 font-medium">
            You can always update this later in your profile.
          </p>
        </div>
      </div>
    </div>
  );
};