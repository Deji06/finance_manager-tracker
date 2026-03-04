import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema, type subscriptionFormType } from "../../types/financial";
import { useCreateSubscription } from "../../services/subscriptionService";
import { toast } from "sonner";
import { Loader2, BellRing } from "lucide-react";

const CreateSubscription = ({ onSuccess }: { onSuccess: () => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<subscriptionFormType>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: { reminderDaysBefore: 2, billingCycle: "MONTHLY" }
  });

  const { mutateAsync: create, isPending } = useCreateSubscription();

  const onSubmit = async (data: subscriptionFormType) => {
    try {
      await create(data);
      toast.success("Subscription added!");
      onSuccess();
    } catch (err) {
      toast.error("Failed to create subscription");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900">New Service</h2>
        <p className="text-gray-500 text-sm">Fill in the details for your recurring bill.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Service Name</label>
            <input {...register("name")} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#10B981] transition-all" placeholder="e.g., Netflix" />
            {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Amount</label>
            <input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none" placeholder="0.00" />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Billing Cycle</label>
            <select {...register("billingCycle")} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none appearance-none">
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-xs font-bold uppercase text-gray-400 ml-1">Next Payment Date</label>
            <input type="datetime-local" {...register("nextBillingDate")} className="w-full mt-1 p-4 bg-gray-50 rounded-2xl border-none" />
            {errors.nextBillingDate && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.nextBillingDate.message}</p>}
          </div>

          <div className="col-span-2 bg-[#F9FBFA] p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BellRing className="text-orange-400" size={20} />
              <span className="text-sm font-bold text-gray-700">Days for Reminder</span>
            </div>
            <input type="number" {...register("reminderDaysBefore", { valueAsNumber: true })} className="w-16 p-2 text-center bg-white border border-gray-100 rounded-xl font-bold" />
          </div>
        </div>

        <button disabled={isPending} className="w-full bg-[#10B981] hover:bg-[#0da673] text-white py-5 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-green-100 disabled:opacity-50">
          {isPending ? <Loader2 className="animate-spin mx-auto" /> : "Start Subscription"}
        </button>
      </form>
    </div>
  );
};

export default CreateSubscription;