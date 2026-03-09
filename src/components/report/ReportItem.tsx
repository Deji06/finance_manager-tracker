import { FileText, ChevronRight } from "lucide-react";
import { formatCurrency } from "../../utils/format";
import type { ReportType } from "../../types/financial";

export const ReportItem = ({
  report,
  onClick,
}: {
  report: ReportType;
  onClick: () => void;
}) => {
  const savings = report.totalIncome - report.totalExpenses;
  const isPositive = savings >= 0;

  return (
    <div
      onClick={onClick}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#10B981] hover:shadow-md transition-all cursor-pointer group gap-4"
    >
      {/* Left Section: Icon and Period */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-[#10B981] transition-colors shrink-0">
          <FileText size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{report.period}</h3>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
            Generated {new Date(report.generatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Right Section: Financial Data */}
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
        {/* Income Column */}
        <div className="text-left sm:text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Income
          </p>
          <p className="font-bold text-gray-700">
            {formatCurrency(report.totalIncome)}
          </p>
        </div>

        {/* Savings Column */}
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Net Savings
          </p>
          <p
            className={`font-black ${
              isPositive ? "text-[#10B981]" : "text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(savings)}
          </p>
        </div>

        {/* Arrow - Hidden on mobile to save space, visible on desktop */}
        <ChevronRight className="hidden sm:block text-gray-300 group-hover:text-[#10B981] transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};