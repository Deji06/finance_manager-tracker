import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createBudget, deleteBudget, getBudgets } from "../lib/api";
import type { budgetschemaType } from "../types/financial";


export const useGetBudget = (period:budgetschemaType["period"]) => {
    return useQuery({
        queryKey:['budget'],
        queryFn: async() => {
            const response = await getBudgets(period)
            return response.data.data
        }
    })
}


export const useCreateBudget = () => {
    const usequery = useQueryClient()
    return useMutation({
        mutationFn: async(data: budgetschemaType) => {
            const response = await createBudget(data)
            return response.data
        },
        onSuccess: () => usequery.invalidateQueries({queryKey:['budget']})
    })

}

export const useDeleteBudget = () => {
    const usequery = useQueryClient()
    return useMutation({
        mutationFn: async(id: string) =>  await deleteBudget(id),
        onSuccess: () => usequery.invalidateQueries({queryKey:['budget']})
    })
}