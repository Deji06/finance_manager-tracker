import { useCreateExpense } from "../../services/expenseService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createExpenseSchema,
  type expenseType,
  categoryEnum,
} from "../../types/financial";
import { toast } from "sonner";

interface CreateExpenseProps {
  onSuccess: () => void;
}

const CreateExpense = ({onSuccess}: CreateExpenseProps) => {
  const { mutateAsync: createExpense, isPending } = useCreateExpense();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<expenseType>({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      recurring: false,
      category: "ENTERTAINMENT",
    },
  });

  const onSubmit = async (data: expenseType) => {
    try {
      await createExpense(data);
      toast.success("Expense created successfully");
      reset()
      onSuccess();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to create expense. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="p-6  rounded-lg dark:text-gray-900 space-y-1">
      {isPending && <h3>pending....</h3>}
      <h2 className="text-lg font-semibold mb-4">Create Expense</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="border p-2 w-full rounded outline-none "
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
          {isPending ? "Creating..." : "Create Expense"}
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
