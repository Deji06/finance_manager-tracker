import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSubscription, deleteSubscription, getSubscription, updateSubscription } from "../lib/api";
import { toast } from "sonner";
import type { subscriptionFormType } from "../types/financial";

export const useGetSubscriptions = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const response = await getSubscription();
      return response.data;
    },
  });
};

export const useCreateSubscription = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createSubscription,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
      // toast.success("Subscription cancelled");
    },
        
    })
}


export const useUpdateSubscription = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async({id, data}: {id:string, data:subscriptionFormType}) => {
            const response = await updateSubscription(id, data)
            return response.data
        },
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      // toast.success("Subscription updated");
    },
        
    })
}

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Subscription cancelled");
    },
  });
};