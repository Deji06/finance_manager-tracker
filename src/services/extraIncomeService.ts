import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExtraIncome, createExtraIncome, updateExtraIncome, deleteExtraIncome } from '../lib/api'
import type { extraIncomeType } from "../types/financial";
import { toast } from "sonner";

export const useGetExtraIncome = () => {
  return useQuery({
    queryKey: ["extra-income"],
    queryFn: async () => {
      const response = await getExtraIncome();
      console.log("exta income:",response.data.data);
      return response.data; 
    },
  });
};

export const useCreateExtraIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExtraIncome,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["extra-income"] }),
    queryClient.invalidateQueries({queryKey:['dashboardSummary']})
}});
};

export const useUpdateExtraIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: extraIncomeType }) => updateExtraIncome(id, data),
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["extra-income"] }),
    queryClient.invalidateQueries({queryKey:["dashboardSumamary"]})

},
  });
};

export const useDeleteExtraIncome = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExtraIncome(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["extra-income"] });
      toast.success("Income deleted successfully");
    },
    onError: () => toast.error("Could not delete income"),
  });
};