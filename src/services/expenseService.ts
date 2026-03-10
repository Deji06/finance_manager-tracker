import { createExpense, updateExpense, getExpense, deleteExpense, getSingleExpense } from "../lib/api";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import  type {expenseType } from "../types/financial";

// get
export const useGetExpense = (page:number, limit:number) => {
    return useQuery({
        queryKey:['expense', page],
        queryFn: async() => {
            const response = await getExpense(page, limit)
            // console.log("expense res:", response.data.data);
            return response.data
        },
        placeholderData: (previousData) => previousData,
    })
}

// services/expenseService.ts
// export const useGetSingleExpense = (page: number, limit: number, search: string = "") => {
//   return useQuery({
//     queryKey: ["expenses", page, limit, search],
//     queryFn: () => getSingleExpense(page, limit, search),
//     placeholderData: (previousData) => previousData, 
//   });
// };


// post
export const useCreateExpense = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async(data:expenseType) => {
            const response = await createExpense(data)
            return response.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['expense']})
        }
    })
} 

// patch

export const useUpdateExpense = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async({id, data}: {id:string, data:expenseType}) => {
            const response = await updateExpense(id, data)
            return response.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['expense']})
            // queryClient.invalidateQueries({queryKey:['dashboardSumaary']})
        }
    })
}

export const useDeleteExpense = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async(id:string) => {
            const response = await deleteExpense(id)
            return response.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['expense']})
            // queryClient.invalidateQueries({queryKey:['dashboardSumaary']})

        }
    })

}