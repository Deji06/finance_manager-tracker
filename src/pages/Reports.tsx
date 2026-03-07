import { useState } from "react";
import { PieChart, Plus, Loader2 } from "lucide-react";
import { useGetReports, useGenerateReport } from "../services/reportService";
import { toast } from "sonner";
import type { ReportType } from "../types/financial";
import { ReportItem } from "../components/report/ReportItem";

export const Reports = () => {
  const { data, isLoading } = useGetReports();
  const { mutateAsync: generate, isPending } = useGenerateReport();
  const [selectedMonth, setSelectedMonth] = useState("");

  const reports: ReportType[] = data?.data || [];

  const handleGenerate = async () => {
    if (!selectedMonth) return toast.error("Please select a month");
    await generate(selectedMonth);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Financial Reports</h1>
          <p className="text-gray-500 text-sm">Analyze your monthly income vs spending</p>
        </div>

        {/* Generate Section */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <input 
            type="month" 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border-none outline-none text-sm font-bold text-gray-700"
          />
          <button 
            onClick={handleGenerate}
            disabled={isPending}
            className="bg-[#10B981] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
            Generate
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="space-y-4">
           {[1,2,3].map(i => <div key={i} className="h-20 w-full bg-gray-100 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid gap-4">
          {reports.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
              <PieChart className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-400 font-medium">No reports generated yet.</p>
            </div>
          ) : (
            reports.map((report) => (
              <ReportItem
                key={report.id} 
                report={report} 
                onClick={() => toast.info(`Viewing ${report.period} details...`)} 
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};