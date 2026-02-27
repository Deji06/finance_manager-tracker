import { profile } from "../lib/api";
import { useQuery } from "@tanstack/react-query";


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