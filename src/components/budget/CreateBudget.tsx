import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Target, Calendar, Banknote } from "lucide-react";
import { useCreateBudget } from "../../services/budgetService";
import { budgetSchema } from "../../types/financial";

export const CreateBudget = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutateAsync: createBudget, isPending } = useCreateBudget();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: { period: "2026-03", type: "EXPENSE_LIMIT" },
  });

  const budgetType = watch("type");

  const onSubmit = async (data: any) => {
    try {
      await createBudget(data);
      toast.success("Budget set successfully! 🎯");
      reset();
      onSuccess();
    } catch (err: any) {
      toast.error(err?.message || "Failed to set budget");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-4 bg-white rounded-[32px]"
    >
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">
          Limit Amount
        </label>
        <div className="flex items-center gap-3 px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50/50  transition-all">
          <Banknote size={20} className="text-gray-400" />
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            placeholder="e.g. 50000"
            className="w-full bg-transparent outline-none font-bold text-gray-800"
          />
        </div>
        {errors.amount && (
          <p className="text-xs text-red-500 font-bold ml-1">
            {errors.amount.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 outline-none text-sm font-semibold text-gray-500"
          >
            {[
              "FOOD",
              "TRANSPORT",
              "ENTERTAINMENT",
              "RENT",
              "SAVINGS",
              "UTILITIES",
              "OTHERS",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Period</label>
          <div className="flex items-center gap-2 px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50/50">
            <Calendar size={18} className="text-gray-400" />
            <input
              type="text"
              {...register("period")}
              placeholder="YYYY-MM"
              className="w-full bg-transparent outline-none text-sm text-gray-800"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Budget Type
          </label>
          <select
            {...register("type")}
            className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 outline-none font-semibold text-gray-500"
          >
            <option value="EXPENSE_LIMIT">
              Expense Limit (Spend less than...)
            </option>
            <option value="SAVINGS_TARGET">
              Savings Target (Save up to...)
            </option>
          </select>
        </div>
      </div>

      <button
        disabled={isPending}
        className="w-full bg-[#0A0D0C] text-white py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:scale-[0.98] transition-all"
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : // Conditional Button Text
        budgetType === "SAVINGS_TARGET" ? (
          "Create Savings Goal"
        ) : (
          "Set Spending Limit"
        )}
      </button>
    </form>
  );
};
// {isPending ? <Loader2 className="animate-spin" /> : "Set Budget Limit"}
