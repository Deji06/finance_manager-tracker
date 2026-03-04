import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema, type subscriptionFormType, type subscriptionResponseType } from "../../types/financial";
import { useUpdateSubscription } from "../../services/subscriptionService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EditSubscription = ({ subscription, onSuccess }: { subscription: subscriptionResponseType; onSuccess: () => void }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<subscriptionFormType>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: { reminderDaysBefore: 2, billingCycle: "MONTHLY" }
  });

  const { mutateAsync: update, isPending } = useUpdateSubscription();

  useEffect(() => {
    // Format the date to 'YYYY-MM-DDTHH:MM' for the datetime-local input
    const formattedDate = new Date(subscription.nextBillingDate).toISOString().slice(0, 16);
    reset({
      ...subscription,
      nextBillingDate: formattedDate
    });
  }, [subscription, reset]);

  const onSubmit = async (data: subscriptionFormType) => {
    try {
      await update({ id: subscription.id, data });
      toast.success("Details updated");
      onSuccess();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-gray-900">Edit Details</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-400">Name</label>
            <input {...register("name")} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none" />
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-400">Amount</label>
            <input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400">Billing Cycle</label>
            <select {...register("billingCycle")} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none">
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-400">Next Billing Date</label>
            <input type="datetime-local" {...register("nextBillingDate")} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none" />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" onClick={onSuccess} className="flex-1 py-4 text-gray-500 font-bold">Cancel</button>
          <button disabled={isPending} className="flex-[2] bg-[#0A0D0C] text-white py-4 rounded-2xl font-black">
            {isPending ? <Loader2 className="animate-spin mx-auto" /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubscription;