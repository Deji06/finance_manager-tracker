import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateExtraIncome } from "../../services/extraIncomeService";
import { extraIncomeSchema, type extraIncomeType } from "../../types/financial";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreateExtraIncome = ({ onSuccess }: { onSuccess: () => void }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<extraIncomeType>({
    resolver: zodResolver(extraIncomeSchema),
  });
  const { mutateAsync: create } = useCreateExtraIncome();

  const onSubmit = async (data: extraIncomeType) => {
    try {
      await create(data);
      toast.success("Income added!");
      onSuccess();
    } catch (err) { toast.error("Failed to add income"); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 dark:text-gray-900">
      <h2 className="text-xl font-bold mb-4">Add Extra Income</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Source</label>
        <input {...register("source")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#10B981]" placeholder="e.g. Freelance" />
        {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#10B981]" />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>
      <button disabled={isSubmitting} className="w-full bg-[#10B981] text-white py-2 rounded-lg font-bold">
        {isSubmitting ? "Saving..." : "Save Income"}
      </button>
    </form>
  );
};