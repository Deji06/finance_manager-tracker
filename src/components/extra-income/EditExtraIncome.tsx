import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  extraIncomeSchema, 
  type extraIncomeType, 
  type extraIncomeResponseType 
} from "../../types/financial";
import { useUpdateExtraIncome } from "../../services/extraIncomeService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EditProps {
  income: extraIncomeResponseType; // The existing data passed from parent
  onSuccess: () => void;           // Logic to close the modal
}

const EditExtraIncome = ({ income, onSuccess }: EditProps) => {
  const { mutateAsync: update, isPending } = useUpdateExtraIncome();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<extraIncomeType>({
    resolver: zodResolver(extraIncomeSchema),
    defaultValues: {
      amount: income.amount,
      source: income.source,
    },
  });

  // --- THE KEY LOGIC ---
  // If the user clicks a different income record while the modal is open, 
  // this ensures the form values update to the new selection.
  useEffect(() => {
    reset({
        amount: income.amount,
        source: income.source
    });
  }, [income, reset]);

  const onSubmit = async (data: extraIncomeType) => {
    try {
      // We pass the ID for the URL and the data for the body
      await update({ id: income.id, data });
      toast.success("Income record updated");
      onSuccess(); // Close modal
    } catch (err) {
      toast.error("Failed to update record");
    }
  };

  return (
    <div className="p-2 dark:text-gray-900">
      <h2 className="text-xl font-bold text-gray-800 mb-1 dark:text-gray-900">Edit Income</h2>
      <p className="text-sm text-gray-500 mb-6">Modify your side hustle details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Source Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Source of Income
          </label>
          <input
            {...register("source")}
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none transition-all bg-gray-50"
            placeholder="e.g. Upwork Project"
          />
          {errors.source && (
            <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>
          )}
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#10B981] outline-none transition-all bg-gray-50"
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onSuccess}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 px-4 py-3 bg-[#10B981] text-white font-bold rounded-xl hover:bg-[#0ea371] transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-green-100"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExtraIncome;