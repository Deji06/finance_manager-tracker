import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseSchema, type expenseType, categoryEnum, type expenseResponseType } from "../../types/financial";
import { useUpdateExpense } from "../../services/expenseService";
import { toast } from "sonner";

interface EditExpenseProps {
  expense: expenseResponseType; // The existing data from the list
  onSuccess: () => void;        // Function to close modal
}

const EditExpense = ({ expense, onSuccess }: EditExpenseProps) => {
  const { mutateAsync: updateExpense, isPending } = useUpdateExpense();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<expenseType>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      recurring: expense.recurring,
    },
  });

  // This ensures the form updates if the user switches which expense they are editing
  useEffect(() => {
    reset(expense);
  }, [expense, reset]);

  const onSubmit = async (data: expenseType) => {
    try {
      await updateExpense({ id: expense.id, data });
      toast.success("Expense updated!");
      onSuccess();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4 dark:text-gray-900">
      <h2 className="text-lg font-bold mb-4">Edit Expense</h2>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                {...register("amount", { valueAsNumber: true })}
                className="border p-2 w-full rounded"
                placeholder="Enter amount"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}
            </div>
    
            {/* Description */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                {...register("description")}
                className="border p-2 w-full rounded"
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>
    
            {/* Category */}
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                {...register("category")}
                className="border p-2 w-full rounded"
              >
                {categoryEnum.options.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category.message}</p>
              )}
            </div>
    
            {/* Recurring */}
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("recurring")} />
              <label>Recurring expense</label>
            </div>
    
            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className=" bg-[#10b981] text-white px-4 py-2 rounded disabled:opacity-60 w-full cursor-pointer"
            >
              {isPending ? "updating..." : "Update Expense"}
            </button>
          </form>
    </div>
  );
};

export default EditExpense;