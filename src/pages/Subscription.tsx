import { useState } from "react";
import { CreditCard, X } from "lucide-react";
import { useGetSubscriptions } from "../services/subscriptionService";
import type { subscriptionResponseType } from "../types/financial";
import { SubscriptionCard } from "../components/subscription/SubscriptionCard";
import CreateSubscription from "../components/subscription/CreateSubscription";
import EditSubscription from "../components/subscription/EditSubscription";

export const Subscription = () => {
  const { data, isLoading } = useGetSubscriptions();
  const [selectedSub, setSelectedSub] = useState<subscriptionResponseType | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // if (isLoading) return <SubscriptionSkeleton />;
  const subscriptions: subscriptionResponseType[] = data?.data || [];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Subscriptions</h1>
          <p className="text-gray-500">Manage your recurring bills and reminders</p>
        </div>
        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-[#0A0D0C] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all active:scale-95 cursor-pointer"
        >
          <CreditCard size={18} /> Add New
        </button>
      </header>

      {subscriptions.length === 0 && !isLoading && (
        <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
           <p className="text-gray-400 font-medium">No active subscriptions found.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptions.map((sub) => (
          <SubscriptionCard
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