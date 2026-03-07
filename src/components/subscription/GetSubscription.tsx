import { Bell, Calendar, Trash2, Edit3 } from "lucide-react";
import { useDeleteSubscription } from "../../services/subscriptionService";
import type { subscriptionResponseType } from "../../types/financial";
import { formatCurrency } from "../../utils/format";
import ProviderIcon from "../ProviderIcon";

export const SubscriptionItem = ({ sub, onEdit }: { sub: subscriptionResponseType; onEdit: () => void }) => {
  const { mutate: deleteSub } = useDeleteSubscription();
  
  const cycleLabel = sub.billingCycle === "YEARLY" ? "yr" : "mo";

  return (
    <div className="flex items-center gap-y-4 gap-x-1 py-2 group border-b border-gray-100  px-2 transition-colors">
      {/* last:border-0 */}
      {/* 1. Icon Section */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-2xl  flex items-center justify-center border border-none">
          <ProviderIcon provider={sub.provider || sub.name} />
        </div>
      </div>
    
      {/* 2. Primary Info Section */}
      <div className="flex-grow">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-500">{sub.name}</h3>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
            <Calendar size={12} />
            <span>Due {new Date(sub.nextBillingDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-orange-400 font-medium bg-orange-50 px-1.5 py-0.5 rounded">
            <Bell size={10} />
            <span>{sub.reminderDaysBefore}d reminder</span>
          </div>
        </div>
      </div>
    
      {/* 3. Amount Section */}
      <div className="text-right">
        <p className="text-base font-black text-gray-900 dark:text-gray-500">
          {formatCurrency(sub.amount)}
          <span className="text-[10px] text-gray-400 font-normal ml-0.5">/{cycleLabel}</span>
        </p>
      </div>
    
      {/* 4. Action Section */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
        <button 
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
          title="Edit"
        >
          <Edit3 size={16} />
        </button>
        <button 
          onClick={() => { if(confirm("Cancel this subscription?")) deleteSub(sub.id) }}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>

);
};