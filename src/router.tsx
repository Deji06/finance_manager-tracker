import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

import SignIn from "../src/pages/auth/SignIn";
import SignUp from "../src/pages/auth/SignUp";
import Dashboard from "../src/pages/Dashboard"
import { useAuthStore } from "./store/authStore";
import Expense from "./pages/Expense";
import ExtraIncome from "./pages/Extra-Income";
import {Subscription} from "./pages/Subscription";
import EditProfile from "./pages/EditProfile";
import Insight from "./pages/Insight";
import { Reports } from "./pages/Reports";
// import Profile from "./pages/Profile";

const ProtectedLayout = () => {
  const {isAuthenticated , isLoading} = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={'/sign-in'} replace/> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp />},
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {path: "/dashboard",element: <Dashboard /> },
          {path: "/edit-profile", element: <EditProfile /> },
          {path: '/expenses', element: <Expense />},
          {path: '/extra-income', element: <ExtraIncome />},
          {path: '/subscription', element: <Subscription />},
          {path: '/expenses', element: <Expense />},
          {path: '/insights', element: <Insight />},
          {path: '/reports', element: <Reports />},
        ],
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className="flex min-h-screen items-center justify-center text-2xl">
        404 - Not Found
      </div>
    ),
  },
]);
