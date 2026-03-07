import { useState } from "react";
import { CreditCard, X } from "lucide-react";
import { useGetSubscriptions } from "../services/subscriptionService";
import type { subscriptionResponseType } from "../types/financial";
import { SubscriptionItem } from "../components/subscription/GetSubscription";
import CreateSubscription from "../components/subscription/CreateSubscription";
import EditSubscription from "../components/subscription/EditSubscription";
import { SubscriptionSkeleton } from "../components/skeletons/SubscriptionSkeleton";

export const Subscription = () => {
  const { data, isLoading } = useGetSubscriptions();
  const [selectedSub, setSelectedSub] = useState<subscriptionResponseType | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (isLoading) return <SubscriptionSkeleton/>;
  const subscriptions: subscriptionResponseType[] = data?.data || [];
  // console.log("get sub:", data?.data);
  

  return (
    <div className="p-2 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Subscriptions</h1>
          <p className="text-gray-500">Manage your recurring bills and reminders</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#10b981] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#10b981]/50 transition-all active:scale-95 cursor-pointer"
        >
          <CreditCard size={18} /> Add New
        </button>
      </header>

      {subscriptions.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-medium">No active subscriptions found.</p>
        </div>
      )}

      <div className="">
        {subscriptions.map((sub) => (
          <SubscriptionItem
            key={sub.id} 
            sub={sub} 
            onEdit={() => setSelectedSub(sub)} 
          />
        ))}
      </div>

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <Modal onClose={() => setIsCreateOpen(false)}>
          <CreateSubscription onSuccess={() => setIsCreateOpen(false)} />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {selectedSub && (
        <Modal onClose={() => setSelectedSub(null)}>
          <EditSubscription 
            subscription={selectedSub} 
            onSuccess={() => setSelectedSub(null)} 
          />
        </Modal>
      )}
    </div>
  );
};

// Simple reusable Modal Wrapper for this page
const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg relative overflow-hidden">
      <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-10">
        <X size={24} />
      </button>
      <div className="p-8">{children}</div>
    </div>
  </div>
);