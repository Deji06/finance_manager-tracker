// src/pages/auth/SignIn.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeClosed,
  Mail,
  MailCheck,
  MailMinus,
  Lock,
  LockOpen,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type signInFormData } from "../../types/auth";
import { signIn } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";
import { toast } from "sonner";

export default function SignIn() {
  const navigate = useNavigate();
  const { isLoading: authLoading } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<signInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange", 
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Derived icon states — no manual setters needed in events
  const emailIconStatus = errors.email
    ? "error"
    : emailValue && !errors.email
    ? "success"
    : "neutral";

  const passwordIconStatus = errors.password || (passwordValue && passwordValue.length < 8)
    ? "warning"
    : passwordValue
    ? "secure"
    : "neutral";

  const onSubmit = async (data: signInFormData) => {
    try {
      await signIn(data);
      // await sync_user()
      toast.success("Signed in successfully!", { duration: 4000 });
      navigate("/dashboard");
    } catch (error: any) {
      let message = "Something went wrong. Please try again.";

      if (error?.message?.includes("Invalid login credentials")) {
        message = "Incorrect email or password. Please try again.";
        setError("root", { type: "credentials", message });
      } else if (error?.message?.includes("Email not confirmed")) {
        message = "Please check your email and confirm your account first.";
        setError("email", { type: "unconfirmed", message });
      } else if (error?.status >= 500 || error?.status === 0) {
        message = "Server error — please try again later.";
        setError("root", { type: "server_error", message });
      } else {
        message = error?.message || "Failed to sign in";
        setError("root", { type: "manual", message });
      }

      toast.error(message, { duration: 5000 });
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#10B981]" />
        <span className="text-gray-700 font-medium">Checking session...</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-6 px-4 py-8">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-2 text-gray-600">
          Sign in to manage your finances and keep tracking.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Global error banner */}
  
        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email Address
          </label>
          <div
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/20 bg-gray-50/50 transition-all`}
          >
            {emailIconStatus === "success" ? (
              <MailCheck className="h-5 w-5 text-green-500 flex-shrink-0" />
            ) : emailIconStatus === "error" ? (
              <MailMinus className="h-5 w-5 text-red-500 flex-shrink-0" />
            ) : (
              <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
            )}
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email address..."
              className="w-full border-none outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Password
          </label>
          <div
            className={`flex items-center justify-between w-full px-4 py-3 rounded-xl border ${
              errors.password ? "border-red-500" : "border-gray-200"
            } focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/20 bg-gray-50/50 transition-all`}
          >
            <div className="flex items-center gap-3 flex-1">
              {passwordIconStatus === "warning" ? (
                <LockOpen className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              ) : (
                <Lock className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter your password..."
                className="w-full border-none outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeClosed className="h-5 w-5 text-gray-500 cursor-pointer" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 cursor-pointer" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

            {errors.root && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {errors.root.message}
          </div>
        )}

        {/* Buttons Section */}
        <div className="space-y-3 pt-4">
          {/* Primary Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full capitalize bg-[#0A0D0C] text-white font-bold py-4 rounded-xl hover:bg-black/90 transition-all shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Secondary Create Account Button */}
          <Link
            to="/sign-up"
            className="block w-full text-center capitalize bg-[#10B981] text-white font-bold py-4 rounded-xl hover:bg-[#0da673] transition-all shadow-lg active:scale-[0.98]"
          >
            Create account
          </Link>
        </div>
      </form>

      {/* Forgot Password Footer */}
      <div className="text-center pt-2">
        <Link
          to="/forgot-password"
          className="font-bold text-[#10B981] hover:text-[#0da673] transition-colors text-sm underline"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}