// src/layouts/AppLayout.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  // Lightbulb,
  CircleUserRound,
  // Menu,
  // X,
  // User,
} from "lucide-react";
import { CgLogOut } from "react-icons/cg";
import { IoWalletSharp } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMenu4Line } from "react-icons/ri";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoIosCreate } from "react-icons/io";
// import { MdNotificationsActive } from "react-icons/md";
// import { MdNotificationsPaused } from "react-icons/md";

import { useAuthStore } from "../store/authStore";
import ThemeToggle from "../components/ThemeToggle";
import { useDashboard } from "../services/dashboardService";
import { formatCurrency } from "../utils/format";
import Profile from "../components/Profile";
import {useProfile} from '../services/profileService'
import NotificationDropdown from "../components/notification/NotificationDropDown";

export default function AppLayout() {
  const { data:dashboardData } = useDashboard();
  const {data:profile} = useProfile()
  const {signOut } = useAuthStore();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/sign-in");
    
  };

  const { netThisMonth = 0 } = dashboardData || {};

  // if(isProfileOpen) {
  //   setIsSidebarOpen(false)
  // }

  // if (isLoading || isFetching) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* ================= HEADER ================= */}
      <header className="bg-white dark:bg-gray-900 lg:px-6 py-3 px-2 shadow-sm flex items-center justify-between w-full">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            <RiMenu4Line size={22} />
          </button>

          <h1 className="text-sm lg:text-2xl font-bold text-[#10B981]">
            Budget Tracker
          </h1>
        </div>

        {/* Center (Hidden on small screens) */}
        <div className="hidden md:flex items-center gap-x-2 text-center">
          <p className="font-bold">{formatCurrency(netThisMonth)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">
            monthly net
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            hi, {profile?.userName || "User"}!
          </p>
          <CircleUserRound
            aria-label="click me"
            size={18}
            onClick={() => setIsProfileOpen(true)}
            className="cursor-pointer"
          />
          <NotificationDropdown/>
         {/* <MdNotificationsActive size={22} /> */}
        </div>
      </header>
      
 {/* profile modal */}
      {isProfileOpen && <Profile onClose={() => setIsProfileOpen(false)} />}

      {/* ================= BODY ================= */}
      <div className="flex flex-1 relative">
        {/* ===== Overlay (Mobile Only) ===== */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            fixed lg:static
            top-0 left-0
            min-h-screen
            w-64
            bg-white dark:bg-gray-900
            border-r border-gray-200 dark:border-gray-800
            z-50
            transform
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          {/* Mobile Header inside Sidebar */}
          <div className="flex justify-between items-center p-4 lg:hidden">
            {/* <h2 className="font-semibold">Menu</h2> */}
            <button onClick={() => setIsSidebarOpen(false)}>
              <HiOutlineMenuAlt3 size={22} />
            </button>
          </div>

          <nav className="px-6 py-3 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

             <Link
              to="/budget"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <IoIosCreate size={20} />
              Budget
            </Link>

            <Link
              to="/expenses"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <GiTakeMyMoney size={20} />
              Expenses
            </Link>

            <Link
              to="/extra-income"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <IoWalletSharp size={20} />
              Extra Income
            </Link>

            <Link
              to="/subscription"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <CreditCard size={20} />
              Subscriptions
            </Link>

            <Link
              to="/reports"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <BarChart3 size={20} />
              Reports
            </Link>

            {/* <Link
              to="/insights"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#10B981]/10 hover:text-[#10B981] transition"
            >
              <Lightbulb size={20} />
              Insights
            </Link> */}

            {/* Logout */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition"
            >
              <CgLogOut size={20} />
              sign out
            </button>

            {/* Divider */}
            <div className="border-t px-4 py-3">
              <ThemeToggle />
            </div>
          </nav>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-auto p-3 lg:p-6 bg-[#F6F6F6] dark:bg-gray-950 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
