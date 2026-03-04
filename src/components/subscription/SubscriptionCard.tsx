import { Bell, Calendar, Trash2 } from "lucide-react";
import { useDeleteSubscription } from "../../services/subscriptionService";
import type { subscriptionResponseType } from "../../types/financial";
import { formatCurrency } from "../../utils/format";
import ProviderIcon from "../ProviderIcon";

export const SubscriptionCard = ({ sub, onEdit }: { sub: subscriptionResponseType; onEdit: () => void }) => {
  const { mutate: deleteSub } = useDeleteSubscription();
  
  // Logic to show "Monthly" or "Yearly" badge style
  const cycleColor = sub.billingCycle === "YEARLY" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600";

  return (
    <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all relative group">
      <div className="flex justify-between items-start mb-6">
        <ProviderIcon provider={sub.provider || "unknown"} />
        <div className="flex flex-col items-end">
          <span className={`text-[10px] font-black px-2 py-1 rounded-full ${cycleColor}`}>
            {sub.billingCycle}
          </span>
          <p className="text-xl font-black mt-2">{formatCurrency(sub.amount)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900">{sub.name}</h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={14} className="text-[#10B981]" />
          <span>Next: {new Date(sub.nextBillingDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Bell size={14} className="text-orange-400" />
          <span>Remind me {sub.reminderDaysBefore} days before</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
        <button 
          onClick={() => deleteSub(sub.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
        <button 
          onClick={onEdit}
          className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};