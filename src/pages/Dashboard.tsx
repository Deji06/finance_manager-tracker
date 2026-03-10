import {
  // Loader2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Wallet,
  TrendingUp,
  // Bell,
  // Search,
  // ChevronRight
} from "lucide-react";
import { useDashboard } from "../services/dashboardService";
import { formatCurrency, dateFormatter } from "../utils/format";
import type { subscriptionResponseType } from "../types/financial";
import ProviderIcon from "../components/ProviderIcon";
import { Link } from "react-router-dom";
import { DashboardSkeleton } from "../components/skeletons/DashboardSkeleton";

const Dashboard = () => {
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useDashboard();

  // Loading state
  if (isLoading || isFetching) return <DashboardSkeleton />;

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FBFA] p-6">
        <div className="p-8 bg-white border-2 border-red-50 rounded-[15px] max-w-md w-full text-center shadow-xl">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Connection Error</h2>
          <p className="mt-2 text-gray-600 leading-relaxed">
            {error?.message ||
              "We couldn’t fetch your dashboard data. Please check your internet connection."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full py-3 bg-[#0A0D0C] text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Data Destructuring
  const {
    monthlyIncome = 0,
    totalExpensesThisMonth = 0,
    totalExtraIncomeThisMonth = 0,
    netThisMonth = 0,
    upcomingSubscriptions = [],
    currentMonth = "February 2026",
  } = dashboardData || {};

  return (
    <div className="">
      {/* Top Navigation Bar */}
      {/* <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0A0D0C] rounded-xl flex items-center justify-center">
            <div className="w-4 h-4 bg-[#10B981] rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-xl font-black tracking-tighter">FINANCE.</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Search size={20}/></button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20}/>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" />
          </div>
        </div>
      </nav> */}

      <main className="borde">
        {/* Header Section */}
        <header>
          <h1 className="text-2xl font-black tracking-tight">Summary</h1>
          <p className="text-gray-500 font-medium mt-1 uppercas text-xs tracking-widest">
            Overview for{" "}
            {new Date(currentMonth).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </header>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main "Dark Card" Balance */}
          <div className="lg:col-span-2 relative overflow-hidden bg-[#0A0D0C] rounded-[15px] p-8 lg:p-10 text-white shadow-2xl group mt-3">
            <div className="relative z-10 flex flex-col h-full justify-between space-y-12">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">
                    Net Balance This Month
                  </p>
                  <h2 className="text-5xl lg:text-6xl font-bold tracking-tighter">
                    {formatCurrency(netThisMonth)}
                  </h2>
                </div>
                <div className="bg-[#10B981] p-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <Wallet className="text-white" size={28} />
                </div>
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/5">
                    <ArrowUpRight size={20} className="text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-400 font-bold tracking-wider">
                      Total Income
                    </p>
                    <p className="text-xl font-bold">
                      {formatCurrency(monthlyIncome)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl border border-white/5">
                    <ArrowDownRight size={20} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase text-gray-400 font-bold tracking-wider">
                      Total Expenses
                    </p>
                    <p className="text-xl font-bold">
                      {formatCurrency(totalExpensesThisMonth)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-[#10B981]/20 rounded-full blur-[100px] group-hover:bg-[#10B981]/30 transition-all duration-700"></div>
          </div>

          {/* Extra Income Side Card */}
          <div className="bg-white rounded-[15px] p-8 border border-gray-100 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="p-4 bg-[#F2F4F7] text-[#0A0D0C] rounded-2xl">
                  <TrendingUp size={24} />
                </span>
                <span className="text-[10px] font-black bg-[#10B981]/10 text-[#10B981] px-3 py-1 rounded-full uppercase tracking-tighter">
                  Side Hustle
                </span>
              </div>
              <p className="text-gray-500 dark:text-black font-medium">
                Extra Income
              </p>
              <h3 className="text-3xl font-black mt-1 dark:text-black">
                {formatCurrency(totalExtraIncomeThisMonth)}
              </h3>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-[11px] font-bold uppercase text-gray-400 mb-2">
                <span>Monthly Goal</span>
                <span>72%</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-[#10B981] w-[72%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Subscriptions Section */}
        <section className="mt-5">
          <h2 className="capitalize font-medium">
            <span className="text-gray-400">upcoming</span> subscription
          </h2>
          <div className="mt-2">
            {upcomingSubscriptions.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">
                  No pending bills for this month.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-3 mt-2">
                {upcomingSubscriptions.map((sub: subscriptionResponseType) => (
                  <>
                    <div
                      key={sub.id}
                      className="flex justify-between items-cente "
                    >
                      <div className="flex gap-x-6">
                        {/* <ProviderIcon provider={sub.provider ?? "unknown"} /> */}
                        <ProviderIcon provider={sub.provider || sub.name} />

                        <div className="flex flex-col">
                          <p className="font-medium">{sub.name}</p>
                          <div className="flex gap-x-3 items-center">
                            <p className="text-xs text-gray-400 flex items-center font-bold uppercase">
                              {dateFormatter(sub.nextBillingDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-[12px]">{sub.billingCycle}</p>

                      <p className="font-bold">{formatCurrency(sub.amount)}</p>
                    </div>
                    <div className="w-full border border-gray-50"></div>
                  </>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/subscription"
            className="flex items-center mt-1 dark:text-[#10B981] justify-end"
          >
            more...
            {/* <ChevronRight size={15}  className="pt-1"/> */}
            {/* <ChevronRight size={15}  className="pt-1"/>
            <ChevronRight size={15}  className="pt-1"/> */}
          </Link>
        </section>
        {/* <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-black tracking-tight">Upcoming Subscriptions</h2>
            <button className="text-sm font-bold text-[#10B981] hover:text-[#0da673] transition-colors">View All Schedule</button>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            {upcomingSubscriptions.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Calendar className="text-gray-300" />
                </div>
                <p className="text-gray-400 font-medium">No pending bills for this month.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {upcomingSubscriptions.map((sub:subscriptionResponseType) => (
                  <div key={sub.id} className="p-6 lg:p-8 flex items-center justify-between hover:bg-gray-50/80 transition-all cursor-default group">
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 bg-[#0A0D0C] text-white rounded-[20px] flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {sub.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{sub.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <p className="text-xs text-gray-400 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                            <Calendar size={14} className="text-[#10B981]" /> 
                            {new Date(sub.nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{sub.provider || 'Service'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-gray-900">{formatCurrency(sub.amount)}</p>
                      <div className="inline-block mt-1 px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {sub.billingCycle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default Dashboard;
