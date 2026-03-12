
import { getDashboardSummary } from "../lib/api";
import { useQuery } from "@tanstack/react-query";


export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboardSummary'],
        // userid
        queryFn: async () => {
            const response = await getDashboardSummary()
            // console.log('DASHBOARD:', response.data.data);
            
            return response.data.data
        },
        retry: 2,
        retryDelay: 1000,
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: "always"
        
    })
}

