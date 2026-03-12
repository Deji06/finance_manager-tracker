import { profile } from "../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../lib/api";
import type { profileFormData } from "../types/financial";

// use query for get request
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await profile();
      //   console.log("profile data:", response.data.data);
      return response.data.data;
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// usemutation for post, pathch and delete requests
export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: profileFormData) => {
      const response = await updateProfile(data);
      return response.data.data;
    },
    onSuccess: (updatedData) => {
      // 1. Update the 'profile' query cache immediately with the response
      // This makes the Profile page update WITHOUT a loading spinner
      queryClient.setQueryData(["profile"], updatedData);

      queryClient.setQueryData(["dashboardSummary"], (old: any) => {
        if (!old) return old;
        const newNet =
          updatedData.monthlyIncome +
          old.totalExtraIncomeThisMonth -
          old.totalExpensesThisMonth;

        return {
          ...old,
          monthlyIncome: updatedData.monthlyIncome,
          netThisMonth: newNet,
          // other fields (expenses, extra income, subs) unchanged
        };
      });

      // 2. Force the dashboard to refetch in the background
      queryClient.refetchQueries({ queryKey: ["dashboardSummary"] });

      // 3. Keep this as a backup
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      // queryClient.invalidateQueries({queryKey:['profile']})
      // queryClient.invalidateQueries({queryKey:["dashboardSummary"]})
    },
  });
};
