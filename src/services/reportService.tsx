import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateReport, getReportByPeriod, getReports } from "../lib/api";
import { toast } from "sonner";

export const useGetReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const response = await getReports();
      return response.data;
    },
  });
};

export const useGenerateReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    //   toast.success("Report generated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to generate report");
    },
  });
};

export const useGetReportDetail = (period: string) => {
  return useQuery({
    queryKey: ["report-detail", period],
    queryFn: async () => {
      const response = await getReportByPeriod(period);
      return response.data.data;
    },
    enabled: !!period, // Only run if a period is provided
  });
};