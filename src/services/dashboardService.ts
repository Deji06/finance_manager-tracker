
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
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        
    })
}

