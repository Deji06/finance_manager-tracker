import { profile } from "../lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {updateProfile} from "../lib/api";
import type { profileFormData } from "../types/financial";

// use query for get request
export const useProfile = () => {
    return useQuery({
        queryKey:['profile'],
        queryFn: async () => {
          const response =  await profile()
        //   console.log("profile data:", response.data.data);
          return response.data.data
        },
        retry: 2,
        retryDelay: 1000,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    })

}

// usemutation for post, pathch and delete requests
export const useEditProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async(data:profileFormData) => {
      const response = await updateProfile(data)
      return response.data.data
    },
     onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['profile']})
      queryClient.invalidateQueries({queryKey:["dashboardSummary"]})
     }
  })
}