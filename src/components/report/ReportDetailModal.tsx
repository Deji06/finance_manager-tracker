import {
  X,
  ArrowUpCircle,
  ArrowDownCircle,
  PieChart,
//   Wallet,
  Loader2,
} from "lucide-react";
import { formatCurrency } from "../../utils/format";
import { useGetReportDetail } from "../../services/reportService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { ReportPDF } from "./ReportPDF";

export const ReportDetailModal = ({
  period,
  onClose,
}: {
  period: string;
  onClose: () => void;
}) => {
  const { data: report, isLoading, isError } = useGetReportDetail(period);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#10B981]" />
        <p className="text-sm text-gray-500 font-medium">
          Analyzing {period}...
        </p>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-500 font-bold">Could not load report details.</p>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline"
        >
          Close
        </button>
      </div>
    );
  }

  const savings = report.totalIncome - report.totalExpenses;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-gray-900">
          {report.period} Analysis
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-green-50 rounded-2xl">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <ArrowUpCircle size={16} />
            <span className="text-[10px] font-bold uppercase">
              Total Income
            </span>
          </div>
          <p className="text-lg font-black text-green-700">
            {formatCurrency(report.totalIncome)}
          </p>
        </div>
        <div className="p-4 bg-red-50 rounded-2xl">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <ArrowDownCircle size={16} />
            <span className="text-[10px] font-bold uppercase">Total Spent</span>
          </div>
          <p className="text-lg font-black text-red-700">
            {formatCurrency(report.totalExpenses)}
          </p>
        </div>
      </div>
      {/* Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-400">
          <PieChart size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">
            Month Summary
          </span>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Net Savings</span>
            <span
              className={`font-bold ${savings >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {formatCurrency(savings)}
            </span>
          </div>

          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-[#10B981]"
              style={{
                width: `${Math.min((report.totalExpenses / report.totalIncome) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-[10px] text-gray-400 text-center italic">
            You spent{" "}
            {((report.totalExpenses / report.totalIncome) * 100).toFixed(1)}% of
            your total income.
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
      >
        Close Report
      </button>

      <PDFDownloadLink
        document={<ReportPDF report={report} />}
        fileName={`Report-${report.period}.pdf`}
        className="w-full"
      >
        {({ loading }) => (
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
            <Download size={18} />
            {loading ? "Preparing PDF..." : "Download Statement"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};
