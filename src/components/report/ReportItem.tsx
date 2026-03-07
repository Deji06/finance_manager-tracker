import {
  FileText,
  ChevronRight,
  //  TrendingDown,
  //  TrendingUp }
} from "lucide-react";
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
      className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#10B981] hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-green-50 group-hover:text-[#10B981] transition-colors">
          <FileText size={24} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{report.period}</h3>
          <p className="text-xs text-gray-400">
            Generated {new Date(report.generatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:block text-right">
          <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
            Net Savings
          </p>
          <p
            className={`font-black ${isPositive ? "text-[#10B981]" : "text-red-500"}`}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(savings)}
          </p>
        </div>
        <ChevronRight className="text-gray-300 group-hover:text-[#10B981] transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};
